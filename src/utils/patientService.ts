
import { usePatientStore } from "../store/patientStore";
import handleAxiosError from "../utils/handleAxiosError";
import useAxiosErrorInterceptor from "../hooks/useAxiosErrorInterceptor";

// {✪} usePatientService
const usePatientService = () => {
  
  const axios = useAxiosErrorInterceptor()

  const patientID = usePatientStore((state) => state.patientID);

  const setPatientDetails = usePatientStore((state) => state.setPatientDetails);
  const setPatientList = usePatientStore((state) => state.setPatientList);

  const page = usePatientStore((state) => state.page);
  const setTotalPages = usePatientStore((state) => state.setTotalPages);

  const PAGE_SIZE = 10;


  // (●) getTotalPages
  const getTotalPages = (count: number): number => {
    return Math.ceil(count / PAGE_SIZE);
  };


  // {●} loadPatients()
  const loadPatients = async () => {
    
    try {
      const url = "/patientsList/";
      const response = await axios.get(url, {
        params: { page },
        withCredentials: true,
      });

      console.log("loaded patients:", response?.data); // [LOG] loaded patients ✿ 
      setPatientList(response?.data?.results);
      setTotalPages(getTotalPages(response?.data?.count)); // (○) getTotalPages


    } catch (err: unknown) {
      if (err) {
        handleAxiosError(err);
      }
    }

     // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  }

    // {●} loadPatientDetails()
    const loadPatientDetails = async () => {
      try {

        if(patientID){
          const url = `/patientsRUD/${patientID}/`;
          const response = await axios.get(url);
          setPatientDetails(response?.data);
        }

      } catch (err: unknown) {
        if (err) {
          handleAxiosError(err);
        }
      }
    };

  return {loadPatients,loadPatientDetails }

}

export default usePatientService