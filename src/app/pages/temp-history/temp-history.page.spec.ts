import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TempHistoryPage } from './temp-history.page';

describe('TempHistoryPage', () => {
  let component: TempHistoryPage;
  let fixture: ComponentFixture<TempHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TempHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
