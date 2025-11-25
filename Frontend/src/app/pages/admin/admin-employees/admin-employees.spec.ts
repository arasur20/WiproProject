import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployees } from './admin-employees';

describe('AdminEmployees', () => {
  let component: AdminEmployees;
  let fixture: ComponentFixture<AdminEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
