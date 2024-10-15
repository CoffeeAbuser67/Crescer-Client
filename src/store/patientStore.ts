
import { create } from "zustand";



// {●} PatientBriefData
type PatientBriefData = {
  pkid: number;
  patient_name: string;
  age: number;
  isValid: boolean;
};


// {✪} PatientStore 
  interface PatientStore {
    patientID: number | undefined;
    setPatientID: (id: number | undefined) => void;
    
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
    
    patientList: [],
    setPatientList: (patientList) => set({patientList: patientList}),

    page: 1,
    setPage: (page) => set( {page: page}),

    totalPages: 0,
    setTotalPages: (totalPages: number) => set( {totalPages: totalPages})

  }));
  


  