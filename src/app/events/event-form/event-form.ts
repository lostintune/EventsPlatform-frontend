import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event';
import { FileService } from '../../services/file';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
})
export class EventForm implements OnInit {
  eventForm: FormGroup;
  saving = signal(false);
  loading = signal(false);
  uploadingPicture = signal(false);
  errorMessage = signal('');
  isEditMode = signal(false);
  eventId: string | null = null;
  currentPicture = signal<string | null>(null);
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fileService: FileService,
  ) {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      picture: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (!this.eventId) {
      return;
    }

    this.isEditMode.set(true);
    this.eventForm.get('picture')?.clearValidators();
    this.eventForm.get('picture')?.updateValueAndValidity();

    this.loading.set(true);
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.currentPicture.set(event.picture);
        this.eventForm.patchValue({
          name: event.name,
          shortDescription: event.shortDescription,
          fullDescription: event.fullDescription,
          date: event.date.substring(0, 10),
        });
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load event');
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    if (this.isEditMode() && this.eventId) {
      const { name, shortDescription, fullDescription, date } = this.eventForm.value;
      this.eventService.updateEvent(this.eventId, { name, shortDescription, fullDescription, date: `${date}T00:00:00Z` }).subscribe({
      next: () => this.router.navigate(['/my-events']),
      error: () => {
        this.errorMessage.set('Failed to update event');
        this.saving.set(false);
      },
    });
    return;
  }

    const payload = {
      ...this.eventForm.value,
      date: `${this.eventForm.value.date}T00:00:00Z`,
    };

    this.eventService.createEvent(payload).subscribe({
      next: () => this.router.navigate(['/my-events']),
      error: () => {
        this.errorMessage.set('Failed to create event');
        this.saving.set(false);
      },
    });
  }

  onFileSelectedForCreate(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  this.uploadingPicture.set(true);
  this.fileService.uploadImage(file).subscribe({
    next: (result) => {
      this.eventForm.get('picture')?.setValue(result.url);
      this.uploadingPicture.set(false);
    },
    error: () => {
      this.errorMessage.set('Failed to upload image');
      this.uploadingPicture.set(false);
    },
  });
}

onFileSelectedForEdit(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file || !this.eventId) {
    return;
  }

  this.uploadingPicture.set(true);
  this.fileService.uploadImage(file).subscribe({
    next: (result) => {
      this.eventService.changePicture(this.eventId!, { picture: result.url }).subscribe({
        next: () => {
          this.currentPicture.set(result.url);
          this.uploadingPicture.set(false);
        },
        error: () => {
          this.errorMessage.set('Failed to update picture');
          this.uploadingPicture.set(false);
        },
      });
    },
    error: () => {
      this.errorMessage.set('Failed to upload image');
      this.uploadingPicture.set(false);
    },
  });
}
}