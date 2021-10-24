import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { CardService } from './card.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardList } from './card.service';
import { environment } from 'src/environments/environment';

describe('CardServiceService', () => {
  let service: CardService;
  let mockHttpService: HttpService;
  let httpTestingController: HttpTestingController;

  const mockResponse: CardList = {
    records: [],
    page: 1,
    perPage: 20,
    total: 100,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CardService);
    mockHttpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns data when getCardList method is successful', () => {
    service.getCardList().subscribe(response => {
      expect(response).toEqual(mockResponse.records);
    });

    const req = httpTestingController.expectOne(environment.cardListUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);

    httpTestingController.verify();
  });

});
