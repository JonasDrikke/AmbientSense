import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TempStatsPage } from './temp-stats.page';

describe('TempStatsPage', () => {
  let component: TempStatsPage;
  let fixture: ComponentFixture<TempStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TempStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
