import { Component, OnInit, Input } from '@angular/core';
import { Card, Quality } from '../../../shared/models/card';
import { environment } from 'src/environments/environment';

/** represents a game card which has a image and a quality level. */
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Input() quality?: Quality;
  @Input() isSelectedCard = false;

  readonly cardUrl: string = environment.cardUrl;

  constructor() { }

  ngOnInit(): void {
  }
}
