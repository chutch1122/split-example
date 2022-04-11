import {Component, OnInit} from '@angular/core';
import {SplitioService} from "./splitio.service";
import {Treatments} from "@splitsoftware/splitio/types/splitio";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  treatments!: Treatments;

  constructor(private splitioService: SplitioService) {
    splitioService.initSdk();
  }

  ngOnInit(): void {
    this.treatments = this.splitioService.treatments
  }

  getColor(): string {
    const color = this.splitioService.getTreatment('color')
    if(color === 'blue'){
      return 'blue'
    } else {
      return 'black'
    }
  }
}
