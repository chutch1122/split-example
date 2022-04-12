import {Injectable} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import * as SplitIO from "@splitsoftware/splitio/types/splitio";
import {SplitFactory} from "@splitsoftware/splitio";

const {v4: uuidv4} = require('uuid');

@Injectable()
export class SplitioService {
  /**
   * The local reference to the Split SDK.
   */
  splitio!: SplitIO.ISDK;

  /**
   * The local reference to the Split SDK's Client.
   */
  splitClient!: SplitIO.IClient;

  /**
   * The local reference to the SDK's ready Observable.
   */
  subscription!: Subscription;

  private isReady = false;

  /**
   * This method initializes the SDK with the required Browser APIKEY
   * and the 'key' according to the Traffic type set (ex.: an user id).
   *
   * @returns void
   */

  initSdk(): void {
    this.splitio = SplitFactory({
      core: {
        authorizationKey: 'localhost',
        key: uuidv4()
      },
      features: {
        'color': {treatment: 'blue', config: null},
      },
    });
    this.splitClient = this.splitio.client();
    // verify if sdk is initialized
    this.verifyReady();
  }

  /**
   * Function to check if the SDK is ready, subscribe to an Observable
   * and set the isReady flag according to the result.
   *
   * @returns void
   */
  private verifyReady(): void {
    const isReadyEvent = fromEvent(this.splitClient, this.splitClient.Event.SDK_READY);

    this.subscription = isReadyEvent.subscribe(res => {
        this.isReady = true;
        console.log('Sdk ready: ', this.isReady);
      },
      error => {
        console.log('Sdk error: ', error);
        this.isReady = false;
        this.unsubscribeSDK();

      }
    );
  }

  getTreatment(feature: string): string {
    return this.splitClient.getTreatment(feature)
  }

  /**
   * Function to unsubscribe the Observable from the SDK initialization.
   *
   * @returns void
   */
  unsubscribeSDK(): void {
    this.subscription.unsubscribe();
  }
}
