import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbName: string = 'ambient_sense_db';

  constructor() { }

  async inicializarLogica() {
  if (Capacitor.getPlatform() === 'web') {
    console.log('Modo Desarrollo Web: SQLite desactivado, usando LocalStorage');
    return; // Salimos antes de que truene el WASM
  }
try {
    this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
    await this.db.open();

      // Creamos las tablas necesarias
      const schema = `
        CREATE TABLE IF NOT EXISTS usuarios (
          email TEXT PRIMARY KEY,
          password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS mediciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          tipo TEXT NOT NULL, -- 'temp' o 'hum'
          valor REAL NOT NULL,
          fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await this.db.execute(schema);
      console.log('Tablas inicializadas correctamente');
    } catch (e) {
      console.error('Error al inicializar la base de datos', e);
    }
  }

  // --- GESTIÓN DE USUARIOS ---

  async registrarUsuario(email: string, pass: string) {
  if (Capacitor.getPlatform() === 'web') {
    localStorage.setItem(`user_${email}`, pass);
    return true;
  }
  
  const sql = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
  return await this.db.run(sql, [email, pass]);
}

async validarUsuario(email: string, pass: string) {
  if (Capacitor.getPlatform() === 'web') {
    const savedPass = localStorage.getItem(`user_${email}`);
    if (savedPass && savedPass === pass) {
      return { email: email };
    }
    return null;
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  const res = await this.db.query(sql, [email, pass]);
  return res.values && res.values.length > 0 ? res.values[0] : null;
}
  async actualizarPassword(email: string, nuevaPass: string) {
  // Si usas el navegador con el bridge de Android activo
  if (Capacitor.getPlatform() === 'web' && !this.db) { 
    localStorage.setItem(`user_${email}`, nuevaPass);
    return true;
  }

  // La sentencia CORRECTA es UPDATE
  const sql = 'UPDATE usuarios SET password = ? WHERE email = ?';
  return await this.db.run(sql, [nuevaPass, email]);
}

  async borrarUsuario(email: string) {
    const sql = 'DELETE FROM usuarios WHERE email = ?';
    return await this.db.run(sql, [email]);
  }

  // --- GESTIÓN DE MEDICIONES (Para el futuro) ---

  async guardarMedicion(tipo: 'temp' | 'hum', valor: number) {
    const sql = 'INSERT INTO mediciones (tipo, valor) VALUES (?, ?)';
    return await this.db.run(sql, [tipo, valor]);
  }

// Para las páginas de Historial
async getHistoryByType(type: 'temp' | 'hum') {
  // Retornamos los últimos 50 registros del tipo solicitado
  const res = await this.db.query(
    `SELECT * FROM mediciones WHERE tipo = ? ORDER BY fecha DESC LIMIT 50`,
    [type]
  );
  return res.values || [];
}

// Para las futuras páginas de Estadísticas (un adelanto)
async getStatsByType(type: 'temp' | 'hum') {

  const res = await this.db.query(
    `SELECT AVG(valor) as promedio, MAX(valor) as maximo, MIN(valor) as minimo 
     FROM mediciones WHERE tipo = ?`,
    [type]
  );
  return res.values?.[0];
}

}