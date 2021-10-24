import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Card } from '../shared/models/card';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Cards and other properties returned from the list of cards API.
 */
export interface CardList {
  total: number;
  page: number;
  perPage: number;
  records: Card[];
}

/** Card service providing data to components. */
@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  /** Gets card list from the backend API. */
  //TODO: Loads more records from API with pagenation support or may be 100
  //records at once.
  getCardList(): Observable<Card[]> {
    return this.httpService.get(environment.cardListUrl)
      .pipe(
        map((response) => {
          return (response as CardList).records;
        }));
  }
}
