import {Component} from '@angular/core';
import {SplitioService} from "./splitio.service";
import {MatDialog} from "@angular/material/dialog";
import {AudioDialogComponent} from "./audio-dialog/audio-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public dialog: MatDialog,
    private splitioService: SplitioService,
  ) {
    splitioService.initSdk();
    this.splitioService.splitClient.on(splitioService.splitClient.Event.SDK_UPDATE, () => {
      console.log('SDK updated');
      this.dialog.open(AudioDialogComponent);
    });
  }

  getColor(): string {
    const color = this.splitioService.getTreatment('color')
    if (color === 'blue') {
      return 'blue'
    } else if (color === 'black') {
      return 'black'
    } else {
      return ''
    }
  }
}
