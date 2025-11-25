import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChallenge } from './admin-challenge';

describe('AdminChallenge', () => {
  let component: AdminChallenge;
  let fixture: ComponentFixture<AdminChallenge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChallenge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChallenge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
