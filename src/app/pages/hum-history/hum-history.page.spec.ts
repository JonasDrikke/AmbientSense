import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumHistoryPage } from './hum-history.page';

describe('HumHistoryPage', () => {
  let component: HumHistoryPage;
  let fixture: ComponentFixture<HumHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HumHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
