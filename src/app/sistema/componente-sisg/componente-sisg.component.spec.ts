import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSisgComponent } from './componente-sisg.component';

describe('ComponenteSisgComponent', () => {
  let component: ComponenteSisgComponent;
  let fixture: ComponentFixture<ComponenteSisgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteSisgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteSisgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
