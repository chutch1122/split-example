import {Component, OnInit} from '@angular/core';
import {SplitioService} from "./splitio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private splitioService: SplitioService
  ) {
    splitioService.initSdk();
    this.splitioService.splitClient.on(splitioService.splitClient.Event.SDK_UPDATE, ()=>{
      console.log("SDK updated")

    });
  }

  getColor(): string {
    const color = this.splitioService.getTreatment('color')
    if(color === 'blue'){
      return 'blue'
    } else if (color === 'black') {
      return 'black'
    } else {
      return ''
    }
  }
}
