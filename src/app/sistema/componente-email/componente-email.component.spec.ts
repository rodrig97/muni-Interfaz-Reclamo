import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEmailComponent } from './componente-email.component';

describe('ComponenteEmailComponent', () => {
  let component: ComponenteEmailComponent;
  let fixture: ComponentFixture<ComponenteEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
