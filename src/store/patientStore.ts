
import { create } from "zustand";

// ✪ PatientStore 
  interface PatientStore {
    patientID: number | undefined;
    setPatientID: (id: number | undefined) => void;
  }
  
  export const usePatientStore = create<PatientStore>((set) => ({
    patientID: undefined,
    setPatientID: (id) => set( {patientID: id})
  
  }));
  


  