


// ● Patient
export type Patient = {
  patient_name: string;
  parent_name: string;
  phone_number?: string; // optional
  email?: string; // optional
  note?: string; // optional
  country: string; // should use ISO 3166-1 alpha-2 code
  city: string;
  birth_date: string; // formatted as YYYY-MM-DD
  expiration_date: string; // formatted as YYYY-MM-DD
};


// ● PaginatedResponse
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


// ● PatientBriefData
export type PatientBriefData = {
  pkid: number;
  patient_name: string;
  age: number;
  isValid: boolean;
};


