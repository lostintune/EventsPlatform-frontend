import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto, EventSummaryDto, PagedResult, CreateEventRequest, UpdateEventRequest, ChangeEventPictureRequest } from '../models/event.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getPublishedEvents(searchTerm?: string, page = 1, pageSize = 10): Observable<PagedResult<EventSummaryDto>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<PagedResult<EventSummaryDto>>(this.apiUrl, { params });
  }

  getEventById(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  getMyEvents(page = 1, pageSize = 10): Observable<PagedResult<EventDto>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get<PagedResult<EventDto>>(`${this.apiUrl}/my`, { params });
  }

  createEvent(request: CreateEventRequest): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, request);
  }

  updateEvent(id: string, request: UpdateEventRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  changePicture(id: string, request: ChangeEventPictureRequest): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/picture`, request);  
  }

  publishEvent(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/publish`, {});
  }

  unpublishEvent(id: string): Observable<void> {
   return this.http.post<void>(`${this.apiUrl}/${id}/unpublish`, {});
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}