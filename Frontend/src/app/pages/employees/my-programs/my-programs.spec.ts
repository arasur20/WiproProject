import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrograms } from './my-programs';

describe('MyPrograms', () => {
  let component: MyPrograms;
  let fixture: ComponentFixture<MyPrograms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPrograms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPrograms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
