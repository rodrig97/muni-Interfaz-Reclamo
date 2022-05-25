import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamLibroComponent } from './reclam-libro.component';

describe('ReclamLibroComponent', () => {
  let component: ReclamLibroComponent;
  let fixture: ComponentFixture<ReclamLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
