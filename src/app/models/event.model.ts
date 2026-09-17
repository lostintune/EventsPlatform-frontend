export interface ChangeEventPictureRequest {
  picture: string | null;
}

export interface CreateEventRequest {
  name: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  picture: string | null;
  date: string;
}

export interface UpdateEventRequest {
  name: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  date: string;
}

export interface EventSummaryDto {
  id: string;
  name: string;
  shortDescription: string;
  picture: string;
  date: string;
}

export interface EventDto {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  picture: string;
  date: string;
  createdAt: string;
  isPublished: boolean;
  authorId: string;
  authorUsername: string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}