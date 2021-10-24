import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CardService } from '../../../services/card.service';
import { CardSelectionPanelComponent } from './card-selection-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Card, Rarity, God } from '../../../shared/models/card';
import { of } from 'rxjs';

describe('CardSelectionPanelComponent', () => {
  let component: CardSelectionPanelComponent;
  let fixture: ComponentFixture<CardSelectionPanelComponent>;
  let mockCardService: jasmine.SpyObj<CardService>;

  const mockCardList: Card[] = [
    {
      id: 123,
      effect: 'Test first effect',
      name: 'Test first name',
      god: God.LIGHT,
      rarity: Rarity.MYTHIC,
    },
    {
      id: 124,
      effect: 'Test second effect',
      name: 'Test second name',
      god: God.LIGHT,
      rarity: Rarity.COMMON,
    },
  ];

  beforeEach(async () => {
    const cardServiceSpy = jasmine.createSpyObj('CardServiceService', ['getCardList']);

    await TestBed.configureTestingModule({
      declarations: [CardSelectionPanelComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CardService, useValue: cardServiceSpy }
      ]
    })
      .compileComponents();
    mockCardService = TestBed.inject(CardService) as jasmine.SpyObj<CardService>;

    mockCardService.getCardList.and.returnValue(of(mockCardList));
    fixture = TestBed.createComponent(CardSelectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should initialize the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return all list of card when initialized', fakeAsync(() => {

    component.searchQuery$.next(new Event("Init"));

    tick(600);

    expect(component.cardList).toEqual(mockCardList);
  }));

  it('should show correct cards searching by name', fakeAsync(() => {

    const inputEle = fixture.nativeElement.querySelector('#search-card');
    component.cardList = mockCardList;

    const [SearchedCard]= mockCardList;

    inputEle.value = 'Test first name';
    inputEle.dispatchEvent(new KeyboardEvent('keyup'));

    fixture.detectChanges();
    tick(600);

    expect(component.cardList).toEqual([SearchedCard]);
  }));

  it('should show correct cards searching by effect', fakeAsync(() => {

    const inputEle = fixture.nativeElement.querySelector('#search-card');
    component.cardList = mockCardList;

    const [SearchedCard]= mockCardList;

    inputEle.value = 'Test first effect';
    inputEle.dispatchEvent(new KeyboardEvent('keyup'));

    fixture.detectChanges();
    tick(600);

    expect(component.cardList).toEqual([SearchedCard]);
  }));

});
