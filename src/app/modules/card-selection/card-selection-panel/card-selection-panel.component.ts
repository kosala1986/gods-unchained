import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { Card, Quality } from '../../../shared/models/card';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, mergeMap } from 'rxjs/operators';

/**
 *  This component renders list of cards view with the search box.
 */
@Component({
  selector: 'card-selection-panel',
  templateUrl: './card-selection-panel.component.html',
  styleUrls: ['./card-selection-panel.component.scss']
})
export class CardSelectionPanelComponent implements OnInit, OnDestroy {

  readonly qualities = Quality;
  cardList: Card[] = [];
  selectedCard?: Card;
  searchQuery$ = new Subject<Event>();

  constructor(private readonly cardService: CardService) {
    this.search();
  }

  ngOnInit(): void {
    this.searchQuery$.next(new Event("Init"));
  }

  getCard(selectedCard: Card): void {
    this.selectedCard = selectedCard;
  }

  /**
   * Retrieves cards from godsunchained API. Current implementation only loads
   * 20 records at once and searching happens on already loaded cards.
   * Loading/searching event triggers either when component is loading with
   * empty string or search string length more than 3 characters.
   */
  search(): void {
    this.searchQuery$
      .pipe(
        map(event => {
          const { target } = event;
          if (target) {
            return (target as HTMLInputElement).value;
          } else {
            return '';
          }
        }),
        filter(searchQuery => searchQuery.length === 0 || searchQuery.length > 3),
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(searchQuery => {
          if (searchQuery.length > 0) {
            const cardList: Card[] = this.cardList.filter(card => {
              const cardName = card.name.toLowerCase();
              const cardEffect = card.effect.toLowerCase();
              return cardName.includes(searchQuery.toLowerCase()) || cardEffect.includes(searchQuery.toLowerCase());
            });
            return of(cardList);
          } else {
            return this.cardService.getCardList().pipe(
              map(records => records));
          }

        })).subscribe(cardlist => {
          this.cardList = cardlist;
        });
  }

  ngOnDestroy() {
    this.searchQuery$.unsubscribe();
  }
}
