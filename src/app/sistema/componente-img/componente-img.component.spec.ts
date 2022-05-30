import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteImgComponent } from './componente-img.component';

describe('ComponenteImgComponent', () => {
  let component: ComponenteImgComponent;
  let fixture: ComponentFixture<ComponenteImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
