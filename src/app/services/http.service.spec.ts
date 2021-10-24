import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpServiceService', () => {
  let mockService: HttpService;
  let httpTestingController: HttpTestingController;
  const mockResponse = {
    success: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    mockService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(mockService).toBeTruthy();
  });

  it('returns data when get method is successful', () => {
    mockService.get('getUrl').subscribe(response => {
      expect(mockResponse.success).toBe(true);
    });

    const req = httpTestingController.expectOne('getUrl');
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it('returns error when get method fails', () => {
    mockService.get('getUrl').subscribe(response => {
    }, (errorInfo) => {
      expect(errorInfo.status).toBe(400);
      expect(errorInfo.message).toBe('Bad request');
    });

    const mockError = new ErrorEvent('error', {
      message: 'Bad request',
    });

    const req = httpTestingController.expectOne('getUrl');
    req.error(mockError, { status: 400 });
  });

  it('returns data when post method is successful', () => {
    mockService.post('postUrl', {}).subscribe(response => {
      expect(mockResponse.success).toBe(true);
    });

    const req = httpTestingController.expectOne('postUrl');
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);
  });

  it('returns error when post method fails', () => {
    mockService.get('postUrl').subscribe(response => {
    }, (errorInfo) => {
      expect(errorInfo.status).toBe(500);
      expect(errorInfo.message).toBe('Server error');
    });

    const mockError = new ErrorEvent('error', {
      message: 'Server error',
    });

    const req = httpTestingController.expectOne('postUrl');
    req.error(mockError, { status: 500 });
  });

});
