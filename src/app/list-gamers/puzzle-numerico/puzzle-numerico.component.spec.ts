import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleNumericoComponent } from './puzzle-numerico.component';

describe('PuzzleNumericoComponent', () => {
  let component: PuzzleNumericoComponent;
  let fixture: ComponentFixture<PuzzleNumericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleNumericoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleNumericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
