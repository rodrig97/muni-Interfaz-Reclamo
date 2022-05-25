import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePdfComponent } from './componente-pdf.component';

describe('ComponentePdfComponent', () => {
  let component: ComponentePdfComponent;
  let fixture: ComponentFixture<ComponentePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
