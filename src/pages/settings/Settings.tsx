import { useEffect } from "react";
import {
  Card,
  Button,
  DataList,
  Flex,
  Code,
  Separator,
  Heading,
} from "@radix-ui/themes";

import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";

import useAxiosHandleError  from "../../hooks/useAxiosHandleError" ;


// ✪ interface User
interface User {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
  user_group: number;
}

// ✪ type Patient
type Patient = {
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

// const patient1: Patient = {
//   patient_name: "John Doe",
//   parent_name: "Jane Doe",
//   phone_number: "+55 77 99999-9999",
//   email: "john.doe@example.com",
//   note: "This is a patient note.",
//   country: "BR",
//   city: "Salvador",
//   birth_date: "1990-01-01",
//   expiration_date: "2025-12-31",
// };

// const patient2: Patient = {
//   patient_name: "Alice Smith",
//   parent_name: "Bob Smith",
//   phone_number: "+55 77 88888-8888",
//   email: "alice.smith@example.com",
//   note: "Another patient note.",
//   country: "BR",
//   city: "Feira de Santana",
//   birth_date: "1995-02-02",
//   expiration_date: "2024-12-31",
// };

// const mockPatient1: Patient = {
//   patient_name: "John Doe",
//   parent_name: "Jane Doe",
//   phone_number: "+15555555555",
//   email: "john.doe@example.com",
//   note: "Patient has a mild allergy to penicillin.",
//   country: "US",
//   city: "New York",
//   birth_date: "1990-05-20",
//   expiration_date: "2030-05-20",
// };

// const mockPatient2: Patient = {
//   patient_name: "Maria Silva",
//   parent_name: "Carlos Silva",
//   // phone_number and email are optional and left out
//   note: "",
//   country: "BR",
//   city: "Ilhéus",
//   birth_date: "2005-11-15",
//   expiration_date: "2025-11-15",
// };

// <✪> DeleteSVG
const DeleteSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7h16M6 10l1.701 9.358A2 2 0 0 0 9.67 21h4.662a2 2 0 0 0 1.968-1.642L18 10M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
    />
  </svg>
);

// <✪> UpdateSVG
const Update = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    aria-hidden="true"
    viewBox="0 0 14 14"
  >
    <path d="M12.805 8.25q0 .04-.008.055-.5 2.093-2.094 3.394Q9.109 13 6.969 13q-1.14 0-2.207-.43t-1.903-1.226l-1.007 1.008q-.149.148-.352.148-.203 0-.352-.148Q1 12.203 1 12V8.5q0-.203.148-.352Q1.297 8 1.5 8H5q.203 0 .352.148.148.149.148.352 0 .203-.148.352l-1.07 1.07q.554.515 1.257.797Q6.242 11 7 11q1.047 0 1.953-.508.906-.508 1.453-1.398.086-.133.414-.914.063-.18.235-.18h1.5q.101 0 .175.074.075.074.075.176zM13 2v3.5q0 .203-.148.352Q12.703 6 12.5 6H9q-.203 0-.352-.148Q8.5 5.703 8.5 5.5q0-.203.148-.352L9.727 4.07Q8.57 3 7 3q-1.047 0-1.953.508-.906.508-1.453 1.398-.086.133-.414.914-.063.18-.235.18H1.391q-.102 0-.176-.074T1.14 5.75v-.055q.507-2.093 2.109-3.394Q4.852 1 7 1q1.14 0 2.219.434 1.078.433 1.914 1.222l1.015-1.008q.149-.148.352-.148.203 0 .352.148Q13 1.797 13 2z" />
  </svg>
);

// <✪> CreateSVG
const CreateSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="#e5e7eb"
  >
    <g id="Layer_2">
      <path d="M12 13h-1v-1c0-.6-.4-1-1-1s-1 .4-1 1v1H8c-.6 0-1 .4-1 1s.4 1 1 1h1v1c0 .6.4 1 1 1s1-.4 1-1v-1h1c.6 0 1-.4 1-1s-.4-1-1-1z" />
      <path d="M17 3h-6C8.8 3 7 4.8 7 7c-2.2 0-4 1.8-4 4v6c0 2.2 1.8 4 4 4h6c2.2 0 4-1.8 4-4 2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4zm-2 13v1c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v5zm4-3c0 1.1-.9 2-2 2v-4c0-2.2-1.8-4-4-4H9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6z" />
    </g>
  </svg>
);

// <✪> ReadSVG
const ReadSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path
      fill="#e5e7eb"
      d="M23 10h-.1a5 5 0 0 0-8.33-2.64C13.78 7.13 12.91 7 12 7s-1.78.12-2.57.36A5 5 0 0 0 1.1 10H1c-.55 0-1 .45-1 1s.45 1 1 1h.1a5 5 0 0 0 9.9-1c0-.66-.13-1.29-.36-1.87.43-.08.88-.13 1.36-.13s.94.04 1.36.13A5.002 5.002 0 1 0 22.9 12h.1c.55 0 1-.45 1-1s-.45-1-1-1zM6 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm12 0c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"
    />
  </svg>
); // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// [✪] generateMockPatient
const generateMockPatient = (): Patient => {
  return {
    patient_name: faker.person.fullName(),
    parent_name: faker.person.fullName(),
    phone_number: "+55 77 99999-9999",
    email: faker.internet.email(),
    note: faker.lorem.sentence(),
    country: faker.location.countryCode("alpha-2"), // Generates ISO country code
    city: faker.location.city(),
    birth_date: faker.date
      .birthdate({ min: 18, max: 60, mode: "age" })
      .toISOString()
      .split("T")[0],
    expiration_date: faker.date.future().toISOString().split("T")[0], // Generates a future date
  };
};

// // {✪} handleAxiosError
// const handleAxiosError = (error: unknown) => {
//   if (axios.isAxiosError(error)) {
//     if (error.response) {
//       // Server responded with a status code other than 2xx
//       console.error("Response Error:", {
//         status: error.response.status,
//         data: error.response.data,
//         headers: error.response.headers,
//       });

//       // Handle specific error codes
//       switch (error.response.status) {
//         case 401:
//           toast.error("Unauthorized. Please log in.");
//           break;
//         case 500:
//           toast.error("Internal server error. Please try again later.");
//           break;
//         default:
//           toast.error(`Server Error: ${error.response.status}`);
//       }
//     } else if (error.request) {
//       // Request was made but no response was received (Network or timeout issue)
//       if (error.code === "ECONNABORTED") {
//         console.error("Network Timeout Error:", error.message);
//         toast.error("Request timed out. Please try again.");
//       } else if (!navigator.onLine) {
//         console.error("Network Error: The device is offline.");
//         toast.error("You are offline. Check your network connection.");
//       } else {
//         console.error("Network Error:", error.request);
//         toast.error("Network error. Please try again.");
//       }
//     } else {
//       // Something happened in setting up the request
//       console.error("Axios Error:", error.message);
//       toast.error("An error occurred. Please try again.");
//     }

//     console.error("Request Config:", error.config);
//   } else if (error instanceof Error) {
//     console.error("Non-Axios Error:", error.message);
//     toast.error("An error occurred. Please try again.");
//   } else {
//     console.error("An unexpected error occurred.");
//     toast.error("An unexpected error occurred.");
//   }
// };

// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ★ Settings ────────────────────➤
const Settings = () => {

  const axios = useAxiosHandleError();

  // (●) getProfiles
  const getProfiles = async () => {
    const url = "/auth/all/";
    const response = await axios.get(url);
    console.log("Response Data:", response.data);
    toast.success("Request successful");
    // No need to handle errors here, as the interceptor will take care of them
  };

  // (●) addUser
  const addUser = async (body: User) => {
    const url = "/auth/registration/";
    const response = await axios.post(url, body);
    console.log("Response Status:", response.status);
    toast.success("Request successful");
    // No need to handle errors here, as the interceptor will take care of them
  };

   //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  // {●} addPatient
  const addPatient = async (body: Patient) => {
    const url = "/patients/";
    console.log("addPatient", body); //[LOG] addPatient ✦
    const response = await axios.post(url, body);
    console.log("Response Status:", response.status);
    toast.success("Request successful");
  };  //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


  // {●} getAllPatients
  const getAllPatients = async () => {
    const url = "/patients/";
    const response = await axios.get(url);
    console.log("Response Data:", response.data);
    toast.success("Request successful");
    // No need to handle errors here, as the interceptor will take care of them
  };

  // {●} retrievePatient
  const retrievePatient = async (pk: string) => {
    const url = "/patients/" + pk + "/";
    const response = await axios.get(url);
    console.log("Response Data:", response.data);
    toast.success("Request successful");
    // No need to handle errors here, as the interceptor will take care of them
  };

  // ● user
  const user: User = {
    first_name: "Laoreno",
    last_name: "Dunlap",
    email: "dsfsdfsdfas@example.org",
    password1: "$%+4uCI(6q",
    password2: "$%+4uCI(6q",
    user_group: 1,
  };

  // [●] patients
  const patients = Array.from({ length: 5 }, () => generateMockPatient());

  // useEffect(() => {
  //   // Set up interceptors
  //   const errorResponseInterceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       // {○} handleAxiosError
  //       handleAxiosError(error);
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axios.interceptors.response.eject(errorResponseInterceptor);
  //   };
  // }, []);

  // _PIN_ ✦─DOM───➤
  return (
    <>
      <div className="flex justify-center items-center h-full w-full">
        <Card className="py-8 px-8 flex flex-col gap-2">
          {/*  //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}

          {/* // ✳  ✦─── User API ──➤  */}
          <Heading size="5" className="text-red-900 mb-4">
            ✦ ─── User API ──➤
          </Heading>

          <DataList.Root>
            {/*  //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}

            {/* // _PIN_ /auth/all/  */}
            <DataList.Item className="items-center">
              <DataList.Label minWidth="88px" className="items-center">
                {/*// <○> ReadSVG */}
                <ReadSVG />

                <Code variant="ghost" className="ml-4">
                  get all profiles:
                </Code>
              </DataList.Label>

              <DataList.Value>
                <Flex align="center">
                  <Code variant="ghost" className="mr-4">
                    /auth/all/
                  </Code>

                  {/*// (○) getProfiles */}
                  <Button variant="ghost" onClick={getProfiles}>
                    ↯
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>

            {/*  //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}
            {/* // _PIN_  /auth/registration/  */}
            <DataList.Item className="items-center">
              <DataList.Label minWidth="88px" className="items-center">
                {/*// <○> CreateSVG */}
                <CreateSVG />
                <Code variant="ghost" className="ml-4">
                  add user:
                </Code>
              </DataList.Label>

              <DataList.Value>
                <Flex align="center">
                  <Code variant="ghost" className="mr-4">
                    /auth/registration/
                  </Code>
                  {/*// (○) addUser */}
                  <Button variant="ghost" onClick={() => addUser(user)}>
                    ↯
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Separator orientation="horizontal" size="4" className=" my-4" />

          {/* // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}

          {/* // ✳  ✦─── Patient API ──➤   */}
          <Heading size="5" className="text-red-900 my-4">
            ✦ ─── Patient API ──➤
          </Heading>

          <DataList.Root>
            {/* // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}
            {/* // _PIN_  // /patients/ : post */}
            <DataList.Item className="items-center">
              <DataList.Label minWidth="88px" className="items-center">
                {/*// <○> CreateSVG */}
                <CreateSVG />
                <Code variant="ghost" className="ml-4">
                  add patient:
                </Code>
              </DataList.Label>

              <DataList.Value>
                <Flex align="center">
                  <Code variant="ghost" className="mr-4">
                    /patients/ : post
                  </Code>

                  {/*// {○} addPatient */}
                  <Button
                    variant="ghost"
                    onClick={() => addPatient(patients[0])}
                  >
                    ↯
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>

            {/*  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}
            {/* // _PIN_  // /patients/ : get */}
            <DataList.Item className="items-center">
              <DataList.Label minWidth="88px" className="items-center">
                {/*// <○> ReadSVG */}
                <ReadSVG />
                <Code variant="ghost" className="ml-4">
                  get all patients:
                </Code>
              </DataList.Label>

              <DataList.Value>
                <Flex align="center">
                  <Code variant="ghost" className="mr-4">
                    /patients/ : get
                  </Code>

                  {/*// {○} getAllPatients */}
                  <Button variant="ghost" onClick={getAllPatients}>
                    ↯
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>

            {/* // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . */}

            {/* // _PIN_  // /patients/<int:pk>/ : get */}
            <DataList.Item className="items-center">
              <DataList.Label minWidth="88px" className="items-center">
                {/*// <○> ReadSVG */}
                <ReadSVG />
                <Code variant="ghost" className="ml-4">
                  retrieve patient:
                </Code>
              </DataList.Label>

              <DataList.Value>
                <Flex align="center">
                  <Code variant="ghost" className="mr-4">
                    {"/patients/<int:pk>/ : get"}
                  </Code>

                  {/*// {○} retrievePatient */}
                  <Button variant="ghost" onClick={() => retrievePatient("22")}>
                    ↯
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      </div>
    </>
  );
};

export default Settings;
