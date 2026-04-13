import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealTimePage } from './real-time.page';

describe('RealTimePage', () => {
  let component: RealTimePage;
  let fixture: ComponentFixture<RealTimePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
