import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../services/profile';
import { UserDto } from '../models/auth.model';


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  profile = signal<UserDto | null>(null);
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.profileService.getMyProfile().subscribe({
      next: (user) => {
        this.profile.set(user);
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName
        });
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load profile');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.profileService.updateMyProfile(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage.set('Profile updated');
        this.saving.set(false);
      },
      error: (err) => {
        const body = err.error;
        if (body?.error && Array.isArray(body.error)) {
          this.errorMessage.set(body.error.map((e: any) => e.ErrorMessage).join(', '));
        } else {
          this.errorMessage.set('Failed to update profile');
        }
        this.saving.set(false);
      }
    });
  }
}