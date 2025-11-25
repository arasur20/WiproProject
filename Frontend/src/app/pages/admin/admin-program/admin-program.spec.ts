import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgram } from './admin-program';

describe('AdminProgram', () => {
  let component: AdminProgram;
  let fixture: ComponentFixture<AdminProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProgram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProgram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
