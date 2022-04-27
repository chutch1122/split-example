import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, map, Observable, Subscription} from 'rxjs';
import * as SplitIO from "@splitsoftware/splitio/types/splitio";
import {SplitFactory} from "@splitsoftware/splitio";
import {Treatments} from '@splitsoftware/splitio/types/splitio';

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

  // private isReady = false;
  private treatments = new BehaviorSubject<Treatments>({});
  private readonly splitNames = ['color', 'survey'];

  /**
   * This method initializes the SDK with the required Browser APIKEY
   * and the 'key' according to the Traffic type set (ex.: an user id).
   *
   * @returns void
   */

  initSdk(): void {
    this.splitio = SplitFactory({
      core: {
        authorizationKey: 'qvlsr4mkhd5q56otqo48n2vnhnlevf4kuo5l',
        key: uuidv4()
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
    // const isReadyEvent = fromEvent(this.splitClient, this.splitClient.Event.SDK_READY);
    //
    // this.subscription = isReadyEvent.subscribe(res => {
    //     this.isReady = true;
    //     this.treatments.next(this.splitClient.getTreatments(['color']));
    //     console.log('Sdk ready: ', this.isReady);
    //   },
    //   error => {
    //     console.log('Sdk error: ', error);
    //     this.isReady = false;
    //     this.unsubscribeSDK();
    //   }
    // );


    this.splitClient.on(this.splitClient.Event.SDK_READY, () => {
      console.log('Sdk ready');
      // fired each time the client state changes.
      // For example, when a Split or a Segment changes.
      this.treatments.next(this.splitClient.getTreatments(this.splitNames));
    });

    this.splitClient.on(this.splitClient.Event.SDK_UPDATE, () => {
      console.log('Sdk update');
      // fired each time the client state changes.
      // For example, when a Split or a Segment changes.
      this.treatments.next(this.splitClient.getTreatments(this.splitNames));
    });
  }

  getTreatment(feature: string): Observable<string> {
    return this.treatments.pipe(map((value) => value[feature]));
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
