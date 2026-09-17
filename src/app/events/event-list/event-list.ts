import { Component, OnInit, signal } from '@angular/core';
import { EventService } from '../../services/event';
import { EventSummaryDto } from '../../models/event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss'
})
export class EventList implements OnInit {
  events = signal<EventSummaryDto[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  totalPages = signal(0);
  searchTerm = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading.set(true);
    this.eventService.getPublishedEvents(this.searchTerm || undefined, this.currentPage()).subscribe({
      next: (result) => {
        this.events.set(result.items);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load events');
        this.loading.set(false);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadEvents();
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage.set(1);
    this.loadEvents();
  }
}
