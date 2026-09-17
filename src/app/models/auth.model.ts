export interface LoginCommand {
  email: string | null;
  password: string | null;
}

export interface RegisterCommand {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  password: string | null;
}

export interface UpdateProfileRequest {
  firstName: string | null;
  lastName: string | null;
}

export interface AuthResponse {
  token: string;
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  createdAt: string;
}