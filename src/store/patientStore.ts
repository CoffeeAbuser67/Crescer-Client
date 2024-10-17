
import { create } from "zustand";


// {●} PatientBriefData
type PatientBriefData = {
  pkid: number;
  patient_name: string;
  age: number;
  isValid: boolean;
};


// {●} Patient
type PatientDetails = {
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



// {✪} PatientStore 


  interface PatientStore {

    patientID: number | undefined;
    setPatientID: (id: number | undefined) => void;
    
    patientDetails : PatientDetails | null
    setPatientDetails: (PatientDetails : PatientDetails) => void;

    patientList: PatientBriefData[]
    setPatientList: (patientList : PatientBriefData[]) => void;

    page: number;
    setPage: (page : number) => void;
    
    totalPages: number;
    setTotalPages: (totalPages: number) => void
  }
  

  export const usePatientStore = create<PatientStore>((set) => ({
    patientID: undefined,
    setPatientID: (id) => set( {patientID: id}),
    
    patientDetails : null, 
    setPatientDetails: (patientDetails) => set({patientDetails: patientDetails}),

    patientList: [],
    setPatientList: (patientList) => set({patientList: patientList}),

    page: 1,
    setPage: (page) => set( {page: page}),

    totalPages: 0,
    setTotalPages: (totalPages: number) => set( {totalPages: totalPages})

  }));
  


  