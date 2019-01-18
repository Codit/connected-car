import { Observable } from "rxjs/Observable";
import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Store } from "@ngrx/store";

import { map, filter } from "rxjs/operators";

import * as selectors from "../app/tracker/store/tracker.selectors";
import { ITrackerState } from "./tracker/store/index";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  public position$: Observable<{ lat: number; lng: number }>;
  public todaysDistance$: Observable<number>;
  public totalDistance$: Observable<number>;
  public currentsong: string =
    "Currently we like the sound of our engine more than music ;-)";
  @ViewChild("powerbi") public element: ElementRef;
  constructor(private store: Store<ITrackerState>, private http: HttpClient) {
    this.todaysDistance$ = this.store.select(selectors.todaysDistanceSelector);
    this.totalDistance$ = this.store.select(selectors.totalDistanceSelector);
    this.position$ = this.store.select(selectors.currentPositionSelector).pipe(
      filter(position => !!position),
      map(position => {
        return {
          lat: position.latitude,
          lng: position.longitude
        };
      })
    );
  }

  public ngAfterViewInit() {
    const config: any = {
      accessToken:
        "eyJrIjoiYTg0YzZiZmMtZGI3MS00MWZlLWI1NDEtMjE2NDIxNzgwYzRkIiwidCI6Ijc1MTdiYzQyLWJjZjgtNDkxNi1hNjc3LWI1NzUzMDUxZjg0NiIsImMiOjh9",
      embedUrl:
        "https://app.powerbi.com/view?r=eyJrIjoiYTg0YzZiZmMtZGI3MS00MWZlLWI1NDEtMjE2NDIxNzgwYzRkIiwidCI6Ijc1MTdiYzQyLWJjZjgtNDkxNi1hNjc3LWI1NzUzMDUxZjg0NiIsImMiOjh9",
      id: "a0d0077b-c9ee-4473-8e78-0b40b2619632",
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        customLayout: {
          displayOption: (<any>window["powerbi-models"]).DisplayOption
            .FitToWidth
        }
      },
      tokenType: 1,
      type: "report"
    };

    (<any>window).powerbi.embed(this.element.nativeElement, config);

    this.http
      .get(
        "https://prod-68.westeurope.logic.azure.com:443/workflows/b1640e9d6ee04178b8fb78d2f4ac9510/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Qrx8oaw6GB516rS4AG1RNUylTT8-Tn3eK5uZFYDURE"
      )
      .subscribe((result: any) => {
        if (result.currently_playing) {
          this.currentsong =
            "We are currently listing to " +
            result.song +
            " by " +
            result.artist;
        }
      });
  }
}
