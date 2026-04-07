import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

/**
 * Mock Service for Google Analytics data
 * To use real data, you would need to set up Google Analytics Data API (GA4)
 * and provide a valid developer token/OAuth client ID.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  getVisitsData(): Observable<any> {
    // Mock data for visits
    return of([
      { date: '2026-03-31', count: 120 },
      { date: '2026-04-01', count: 150 },
      { date: '2026-04-02', count: 200 },
      { date: '2026-04-03', count: 180 },
      { date: '2026-04-04', count: 250 },
      { date: '2026-04-05', count: 300 },
      { date: '2026-04-06', count: 280 }
    ]);
  }

  getTopPages(): Observable<any> {
    return of([
      { page: '/home', views: 500 },
      { page: '/experience', views: 320 },
      { page: '/about', views: 240 },
      { page: '/contact', views: 150 }
    ]);
  }

  getBrowserStats(): Observable<any> {
    return of([
      { name: 'Chrome', value: 65 },
      { name: 'Firefox', value: 15 },
      { name: 'Safari', value: 12 },
      { name: 'Edge', value: 8 }
    ]);
  }
}
