import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollment } from './admin-enrollment';

describe('AdminEnrollment', () => {
  let component: AdminEnrollment;
  let fixture: ComponentFixture<AdminEnrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEnrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEnrollment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
