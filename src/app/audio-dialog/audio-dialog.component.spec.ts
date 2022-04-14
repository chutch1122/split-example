import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioDialogComponent } from './audio-dialog.component';

describe('AudioDialogComponent', () => {
  let component: AudioDialogComponent;
  let fixture: ComponentFixture<AudioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
