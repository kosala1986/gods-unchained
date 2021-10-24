import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { CardComponent } from './card.component';
import { Card, God, Rarity } from '../../../shared/models/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const mockCard: Card = {
    id: 123,
    effect: 'Test effect',
    name: 'Test name',
    god: God.DECEPTION,
    rarity: Rarity.MYTHIC,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
  });

  it('has selected class when card is selected', () => {
    component.isSelectedCard = true;
    fixture.detectChanges();

    const containerElement = fixture.debugElement.query(By.css('.selected'));

    expect(containerElement).toBeTruthy();
  });
});
