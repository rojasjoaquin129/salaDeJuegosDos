import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentaComponent } from './encuenta.component';

describe('EncuentaComponent', () => {
  let component: EncuentaComponent;
  let fixture: ComponentFixture<EncuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
