import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteInfoComponent } from './componente-info.component';

describe('ComponenteInfoComponent', () => {
  let component: ComponenteInfoComponent;
  let fixture: ComponentFixture<ComponenteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
