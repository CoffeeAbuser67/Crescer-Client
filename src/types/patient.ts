
// ● Patient
export type Patient = {
  pkid: string
  patient_name: string;
  parent_name: string;
  phone_number?: string; // optional
  email?: string; // optional
  note?: string; // optional
  birth_date: string; // formatted as YYYY-MM-DD
  expiration_date: string; // formatted as YYYY-MM-DD
  created_at: string;
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


