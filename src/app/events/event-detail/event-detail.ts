import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event';
import { EventDto } from '../../models/event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail implements OnInit {
  event = signal<EventDto | null>(null);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage.set('Event not found');
      return;
    }

    this.loading.set(true);
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event.set(event);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load event');
        this.loading.set(false);
      }
    });
  }
}
