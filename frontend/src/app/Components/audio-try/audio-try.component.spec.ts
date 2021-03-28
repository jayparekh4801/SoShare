import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTryComponent } from './audio-try.component';

describe('AudioTryComponent', () => {
  let component: AudioTryComponent;
  let fixture: ComponentFixture<AudioTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
