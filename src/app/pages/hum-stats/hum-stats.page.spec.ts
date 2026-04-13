import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumStatsPage } from './hum-stats.page';

describe('HumStatsPage', () => {
  let component: HumStatsPage;
  let fixture: ComponentFixture<HumStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HumStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
