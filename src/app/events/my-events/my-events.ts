import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event';
import { EventDto } from '../../models/event.model';

@Component({
  selector: 'app-my-events',
  imports: [RouterLink],
  templateUrl: './my-events.html',
  styleUrl: './my-events.scss'
})
export class MyEvents implements OnInit {
  events = signal<EventDto[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  totalPages = signal(0);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading.set(true);
    this.eventService.getMyEvents(this.currentPage()).subscribe({
      next: (result) => {
        this.events.set(result.items);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load your events');
        this.loading.set(false);
      }
    });
  }

  togglePublish(event: EventDto): void {
    const action = event.isPublished
      ? this.eventService.unpublishEvent(event.id)
      : this.eventService.publishEvent(event.id);

    action.subscribe({
      next: () => this.loadEvents(),
      error: () => this.errorMessage.set('Failed to update event status')
    });
  }

  deleteEvent(event: EventDto): void {
    if (!confirm(`Delete "${event.name}"? This cannot be undone.`)) {
      return;
    }

    this.eventService.deleteEvent(event.id).subscribe({
      next: () => this.loadEvents(),
      error: () => this.errorMessage.set('Failed to delete event')
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
}