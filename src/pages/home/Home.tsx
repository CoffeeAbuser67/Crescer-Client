// HERE import
import { useEffect, useState } from "react";

import classNames from "classnames";

import {
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  IconButton,
  Table,
  Badge,
  Heading,
  AlertDialog,
  Button,
  Inset,
  ScrollArea,
  TextField,
  DataList,
  Dialog,
  Popover,
  Separator,
} from "@radix-ui/themes";

import { useFormik } from "formik";
import * as Yup from "yup";

// <●> AddButtonSVG
const AddButtonSVG = () => (
  <>
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M6 12H12M12 12H18M12 12V18M12 12V6"
        stroke="#eceeec"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

// <●> CrescerFlowerSVG
const CrescerFlowerSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="CFSVG"
    data-name="CrescerFlowerSVG"
    viewBox="0 0 120 100"
    width="42px"
    height="35px"
    opacity="1"
  >
    <defs>
      <style>
        {
          ".cls-2{stroke:#000;stroke-miterlimit:10;stroke-width:2px;fill:#f26122}"
        }
      </style>
    </defs>
    <path
      d="M89.3 47.9c7.9.6 19.2 2.8 20.1 12.5 1.1 9-6.1 19.1-15.7 18.7-4.3-.2-7.7-3.2-10.8-6.1-2.6-2.4-5.3-4.7-7.9-7.1-3.6-3.2-10.3-8.3-5.9-13.3 2.3-2.4 6.3-2.7 9.5-3.3 3.5-.5 7-1.3 10.5-1.4h.2Z"
      style={{
        fill: "#f16122",
        stroke: "#000",
        strokeMiterlimit: 10,
        strokeWidth: 2,
      }}
    />
    <path
      d="M58.4 28.9c.1 4.4.8 11.3-2.7 14.4-2 1.7-4.9 2.1-7.3.8-1.6-.8-3.1-2.2-4.5-3.5-3.8-3.8-7.8-7.3-11-11.6-8.7-11.6 3.7-24.4 16.2-22.3 11.2 2.3 8.7 13.2 9.3 21.8v.4ZM101.9 29.7c0 5.4-2.7 9.4-7.5 10.7-7.7 2.1-15.4 3.9-23.2 5.7-4.2.9-8.5-3.5-7-7.3C67 31.3 70.8 24.3 77.1 19c4.7-3.9 10-5.3 15.7-2.5s8.5 7.7 9.1 13.1ZM29.1 69.6c-8.1.4-17.7-5.3-17.9-14.1-.2-7.3 6.9-12.3 13.6-12.8 7.8-.7 19.2 1.9 24.3 7.9 1.9 3 1.7 7.7-1 10.2-2.7 2.3-6.4 3.5-9.6 5.1-3.2 1.3-6.1 3.1-9.1 3.7h-.2ZM73.3 81.1c.5 8.7-9.1 13.6-16.5 13.5-6 0-13.2-3.8-14.6-10.1-1.3-6.2 2.9-12 6.2-17 4.1-6.8 5.7-4.8 12.5-5.9 5.9-1.7 7.6 3 9.3 8.1 1.1 3.7 2.6 7.3 3.2 11v.4Z"
      className="cls-2"
    />
    <path
      d="M70.6 51.5c0 6.9-5.5 13.1-11.3 12.9-5.6-.1-10.9-6.1-10.9-12.2s5-12.1 11.4-11.9c6.3.1 10.9 4.8 10.8 11.3Z"
      style={{
        stroke: "#000",
        strokeMiterlimit: 10,
        strokeWidth: 2,
        fill: "#f6eb00",
      }}
    />
  </svg>
);

// <●> DotsSVG
const DotsSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 256 256"
  >
    <path
      fill="#eceeec"
      d="M76 128a12 12 0 1 1-12-12 12.014 12.014 0 0 1 12 12Zm52-12a12 12 0 1 0 12 12 12.014 12.014 0 0 0-12-12Zm64 0a12 12 0 1 0 12 12 12.014 12.014 0 0 0-12-12Z"
    />
  </svg>
);

// [●] patients
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
    parentName: "Mary Doe",
    isValid: true,
    joiningDate: "2022-05-15",
    expiringDate: "2024-12-31",
    info: "Experienced software developer passionate about clean code.",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    parentName: "David Smith",
    isValid: false,
    joiningDate: "2021-09-10",
    expiringDate: "2023-06-30",
    info: "Data enthusiast with a knack for statistical analysis.",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 40,
    parentName: "Alice Johnson",
    isValid: true,
    joiningDate: "2019-03-20",
    expiringDate: "2025-03-19",
    info: "Seasoned product manager driving innovation.",
  },
  {
    id: 4,
    name: "Emily Brown",
    age: 26,
    parentName: "Michael Brown",
    isValid: true,
    joiningDate: "2023-01-05",
    expiringDate: "2026-12-31",
    info: "Front-end developer with a passion for user experience.",
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    age: 35,
    parentName: "Maria Rodriguez",
    isValid: true,
    joiningDate: "2020-07-18",
    expiringDate: "2024-06-30",
    info: "Marketing specialist with a creative flair.",
  },
]; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// (●) RemovePatient
const RemovePatient = () => (
  <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="crimson" variant="ghost">
          Remove
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="500px">
        <AlertDialog.Title>Delete Users</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete these users? This action is permanent
          and cannot be undone.
        </AlertDialog.Description>

        <Inset side="x" my="5">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                <Table.Cell>danilo@example.com</Table.Cell>
                <Table.Cell>Developer</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                <Table.Cell>zahra@example.com</Table.Cell>
                <Table.Cell>Admin</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Inset>

        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete users</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  </>
); //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .




// (●) UpdatePatient
const UpdatePatient = () => (
  <>

    



  </>
); //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .







// (✪) PopoverAction
const PopoverAction = () => (
  <Flex gap="4" align="center">
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <DotsSVG />
        </IconButton>
      </Popover.Trigger>

      <Popover.Content
        size="1"
        maxWidth="300px"
        className="flex flex-col items-center"
      >
        <Button color="orange" variant="ghost">
          Edit profile
        </Button>
        <Separator orientation="horizontal" size="4" className=" my-4" />
        {/* <Button color="crimson" variant="ghost">
          Remove
        </Button> */}

        {/* // (○) RemovePatient*/}
        <RemovePatient />
      </Popover.Content>
    </Popover.Root>
  </Flex>
); // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// (✪) PatientCard
const PatientCard = ({ patient, activePatientId, setActivePatientId }) => {
  // WARN No type

  const handleCardClick = (id) => {
    setActivePatientId(id);
    console.log("patient: ", id); // [LOG]  card click log
  };

  return (
    <Box maxWidth="440px">
      <Card
        variant="surface"
        onClick={() => handleCardClick(patient.id)}
        key={patient.id}
        className={classNames(
          "cursor-pointer border hover:shadow-lg",
          `${
            activePatientId === patient.id
              ? "border-orange-500"
              : "border-transparent"
          }`
        )}
      >
        <Flex gap="3" align="center" className="justify-between">
          <Flex gap="3" align="center" className="justify-between">
            <Avatar
              size="4"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="T"
            />

            <Box>
              <Text as="div" size="2" weight="bold">
                {`${patient.name}`}
              </Text>
              <Text as="div" size="2" color="gray">
                {`${patient.age}`}
              </Text>
            </Box>
          </Flex>

          <Flex align="center" gap="5">
            {/* (●) Badge */}
            <Badge
              color="jade"
              variant="soft"
              radius="full"
              className="my-1 mx-3"
            >
              Authorized
            </Badge>
          </Flex>

          <Flex align="center" gap="5">
            {/* //(○) PopoverAction */}
            <PopoverAction />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ✪ CreditCardDemo
const CreditCardDemo = ({ patientID }) => {
  // Format the card number for display

  return (
    <div className="w-96 h-56 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Crescer Card</h2>

        {/* //<○> CrescerFlowerSVG */}
        <CrescerFlowerSVG />
      </div>

      <div className="mt-4">
        <h4 className="text-sm uppercase tracking-wide">Card Owner</h4>
        <p className="text-xl font-mono mt-1">
          {patients.find((patient) => patient.id === patientID)?.id}
        </p>
      </div>

      <div className="mt-2 flex justify-between">
        <div>
          <h4 className="text-sm uppercase tracking-wide ">Card Holder</h4>
          <p className="text-sm"> d </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wide">Expires</h4>
          <p className="text-sm">e </p>
        </div>
      </div>
    </div>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


// ✪ AddPatient
const AddPatient = () => {
  const [open, setOpen] = useState(false);

  const brazilianPhoneNumberSchema = Yup.string()
    // Brzillian phone Number validation
    .matches(
      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
      "Invalid phone number format"
    );

  const validationSchema = Yup.object({
    patient_name: Yup.string().required("Patient name is required"),
    parent_name: Yup.string().required("Parent name is required"),
    expiration_date: Yup.date().required("Expiration date is required"),
    email: Yup.string()
      .email("Invalid email address"),
    phone_number: brazilianPhoneNumberSchema,
  });

  const formik = useFormik({
    initialValues: {
      patient_name: "",
      parent_name: "",
      phone_number: "",
      email: "",
      expiration_date: "",
    },

    validationSchema,


    onSubmit: async (values) => {

      // _PIN_ API CALL HERE  ✉  
      console.log("Patient saved:", values); // [LOG] Patient saved ➤ 
      setOpen(false);

    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        {/* //<○>  AddButtonSVG */}
        <IconButton color="orange">
          <AddButtonSVG />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <form onSubmit={formik.handleSubmit}>
          <Dialog.Title>Add Patient</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create a new patient card.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Patient Name
              </Text>
              <TextField.Root
                type="text"
                name="patient_name"
                value={formik.values.patient_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.patient_name && formik.errors.patient_name && (
                <Text size="2" color="red">
                  {formik.errors.patient_name}
                </Text>
              )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Parent Name
              </Text>
              <TextField.Root
                type="text"
                name="parent_name"
                value={formik.values.parent_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.parent_name && formik.errors.parent_name && (
                <Text size="2" color="red">
                  {formik.errors.parent_name}
                </Text>
              )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Expiration Date
              </Text>
              <TextField.Root
                type="date"
                name="expiration_date"
                value={formik.values.expiration_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.expiration_date &&
                formik.errors.expiration_date && (
                  <Text size="2" color="red">
                    {formik.errors.expiration_date}
                  </Text>
                )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <Text size="2" color="red">
                  {formik.errors.email}
                </Text>
              )}
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Phone
              </Text>
              <TextField.Root
                type="tel"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <Text size="2" color="red">
                  {formik.errors.phone_number}
                </Text>
              )}
            </label>

            {/* -------------------------------------------- */}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit">Save</Button>
            
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ★ Home ─────────────────────────────────────────────────────➤
const Home = () => {
  // WARN No type

  // NOTE 
  // Need to define the patients official fields asap  
  // type Patient = {
  //   patient_name: string;
  //   parent_name: string;
  //   phone_number?: string; // optional
  //   email?: string; // optional
  //   note?: string; // optional
  //   country?: string; // should use ISO 3166-1 alpha-2 code
  //   city?: string;
  //   birth_date?: string; // formatted as YYYY-MM-DD
  //   expiration_date?: string; // formatted as YYYY-MM-DD
  // };



  // make axios hooks universal 
  // Patient DataList component
  // User validation  
  // User Page  ADMINx
  

  // DDD phonenumber field
  // IMAGE FIELD?

  // make types universal 

  // messageria ? 
  // update Patient component
  // Remove Patient Component 




  const [activePatientId, setActivePatientId] = useState(null);

  useEffect(() => {
    console.log("Home Page"); // [LOG] Home Page log ✿ ❀
  }, []);

  return (
    //──DOM────➤

    <>
      <Flex gap="4" align="center" className="justify-evenly">
        {/*//_PIN_ LEFT BOX */}
        <Box maxWidth="520px">
          <Card className=" pt-8 pb-16 pl-12">
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              radius="full"
              style={{ height: 650 }}
              className="pr-10"
            >
              <Flex gap="3" align="center" className="justify-between">
                <Heading color="orange">Patients </Heading>
                {/* // ○ AddPatient*/}
                <AddPatient />
              </Flex>

              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>
                      Patient Card
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {patients.map((patient) => (
                    <Table.Row key={patient.id}>
                      <Table.RowHeaderCell>
                        <PatientCard
                          patient={patient}
                          activePatientId={activePatientId}
                          setActivePatientId={setActivePatientId}
                        />
                      </Table.RowHeaderCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </ScrollArea>
          </Card>
        </Box>

        {/*//_PIN_ RIGHT BOX */}
        <Box maxWidth="620px">
          <Flex direction="column" gap="2">
            {/*//_PIN_ TOP CARD */}
            <Card className="py-8 px-8 flex justify-center">
              {/* {activePatientId && (
              <div className="p-6 rounded-lg">
                <h2 className="text-2xl font-bold">
                  {patients.find((patient) => patient.id === activePatientId).name}
                </h2>
                <p className="mt-2 text-gray-700">
                  {patients.find((patient) => patient.id === activePatientId).age}
                </p>
              </div>
            )} */}

              {/* // ○ CreditCardDemo*/}
              <CreditCardDemo patientID={activePatientId} />
            </Card>

            {/*//_PIN_ BOTTOM CARD */}
            <Card className=" py-8 px-8">
              {/* // (○) PopoverAction*/}
              <PopoverAction />
            </Card>
          </Flex>
        </Box>

        {/* <h1> ✿ ❀ </h1> */}
      </Flex>
    </>
  );
};

export default Home;
// ★ ───────────────────────────────────────────────────────────────────➤
