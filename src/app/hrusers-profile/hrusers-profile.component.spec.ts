import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrusersProfileComponent } from './hrusers-profile.component';

describe('HrusersProfileComponent', () => {
  let component: HrusersProfileComponent;
  let fixture: ComponentFixture<HrusersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrusersProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrusersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
