import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPageComponent } from './submitted-page.component';

describe('SubmittedPageComponent', () => {
  let component: SubmittedPageComponent;
  let fixture: ComponentFixture<SubmittedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
