import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenorMayorComponent } from './menor-mayor.component';

describe('MenorMayorComponent', () => {
  let component: MenorMayorComponent;
  let fixture: ComponentFixture<MenorMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenorMayorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenorMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
