import {Component, Inject} from '@angular/core';
import {from} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent {
  private pop = new Audio('assets/pop.mp3');

  constructor(
    public dialogRef: MatDialogRef<AudioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  playSound() {
    this.pop.load();
    this.pop.volume = 1;
    from(this.pop.play()).subscribe(
      () => {
        this.dialogRef.close();
      },
    );
  }
}
