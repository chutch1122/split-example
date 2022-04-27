import {Component, OnDestroy, OnInit} from '@angular/core';
import {SplitioService} from "./splitio.service";
import {MatDialog} from "@angular/material/dialog";
import {SurveyDialogComponent} from "./survey-dialog/survey-dialog.component";
import {filter, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  color: string = ''

  constructor(
    public dialog: MatDialog,
    private splitioService: SplitioService,
  ) {
    splitioService.initSdk();
  }

  ngOnInit(): void {
    this.splitioService.getTreatment('color')
      .pipe(tap((color) => this.color = color))
      .subscribe();
    this.splitioService.getTreatment('survey')
      .pipe(tap(console.log))
      .pipe(filter(x => x == 'on'))
      .pipe(tap(() => this.dialog.open(SurveyDialogComponent, {width: '50%', height: '50%'})))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.splitioService.unsubscribeSDK();
  }
}
