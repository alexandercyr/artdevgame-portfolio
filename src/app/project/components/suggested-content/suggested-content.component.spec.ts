import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedContentComponent } from './suggested-content.component';

describe('SuggestedContentComponent', () => {
  let component: SuggestedContentComponent;
  let fixture: ComponentFixture<SuggestedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
