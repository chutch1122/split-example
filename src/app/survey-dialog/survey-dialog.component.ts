import {Component, Inject} from '@angular/core';
import {from} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss']
})
export class SurveyDialogComponent {
  private pop = new Audio('assets/pop.mp3');

  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  playSound() {
    this.pop.load();
    this.pop.volume = 1;
    from(this.pop.play()).subscribe();
  }
}
