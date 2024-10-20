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
  Tabs,

  ScrollArea,
  TextField,

  TextArea,
  Dialog,

  Separator,
} from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import "yup-phone-lite";

import useAxiosErrorInterceptor from "../../hooks/useAxiosErrorInterceptor";

import { usePatientStore } from "../../store/patientStore";
import Loader from "../../components/Loader";
import handleAxiosError from "../../utils/handleAxiosError";
import ComponentProtector from "../../components/guard/ComponentProtector";

import usePatientService from "../../utils/patientService";

import { PatientBriefData } from "../../types/patient";

import flowerIMG from "../../assets/no_stroke_flower.svg";

// [●] PatientCardProps
interface PatientCardProps {
  patient: PatientBriefData;
}

// [●] ROLES
const ROLES = {
  User: 4,
  Staff: 3,
  Admin: 2,
  Super: 1
};

// <●> DeleteSVG
const DeleteSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="#990000"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#990000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7h16M6 10l1.701 9.358A2 2 0 0 0 9.67 21h4.662a2 2 0 0 0 1.968-1.642L18 10M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
    />
  </svg>
);

// <●> ReadSVG
const ReadSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <path
      fill="#ffa057"
      d="M23 10h-.1a5 5 0 0 0-8.33-2.64C13.78 7.13 12.91 7 12 7s-1.78.12-2.57.36A5 5 0 0 0 1.1 10H1c-.55 0-1 .45-1 1s.45 1 1 1h.1a5 5 0 0 0 9.9-1c0-.66-.13-1.29-.36-1.87.43-.08.88-.13 1.36-.13s.94.04 1.36.13A5.002 5.002 0 1 0 22.9 12h.1c.55 0 1-.45 1-1s-.45-1-1-1zM6 14c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm12 0c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"
    />
  </svg>
);

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

// <●> UpdateSVG
const UpdateSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    aria-hidden="true"
    fill="#ffa057"
    viewBox="0 0 14 14"
  >
    <path d="M12.805 8.25q0 .04-.008.055-.5 2.093-2.094 3.394Q9.109 13 6.969 13q-1.14 0-2.207-.43t-1.903-1.226l-1.007 1.008q-.149.148-.352.148-.203 0-.352-.148Q1 12.203 1 12V8.5q0-.203.148-.352Q1.297 8 1.5 8H5q.203 0 .352.148.148.149.148.352 0 .203-.148.352l-1.07 1.07q.554.515 1.257.797Q6.242 11 7 11q1.047 0 1.953-.508.906-.508 1.453-1.398.086-.133.414-.914.063-.18.235-.18h1.5q.101 0 .175.074.075.074.075.176zM13 2v3.5q0 .203-.148.352Q12.703 6 12.5 6H9q-.203 0-.352-.148Q8.5 5.703 8.5 5.5q0-.203.148-.352L9.727 4.07Q8.57 3 7 3q-1.047 0-1.953.508-.906.508-1.453 1.398-.086.133-.414.914-.063.18-.235.18H1.391q-.102 0-.176-.074T1.14 5.75v-.055q.507-2.093 2.109-3.394Q4.852 1 7 1q1.14 0 2.219.434 1.078.433 1.914 1.222l1.015-1.008q.149-.148.352-.148.203 0 .352.148Q13 1.797 13 2z" />
  </svg>
);


// <●> AddPatient
const AddPatient = () => {
  const [open, setOpen] = useState(false);
  const axios = useAxiosErrorInterceptor();
  const { loadPatients } = usePatientService();

  const validationSchema = Yup.object({
    patient_name: Yup.string().required("Patient name is required"),
    parent_name: Yup.string().required("Parent name is required"),
    birth_date: Yup.date().required("Birth date is required"),
    expiration_date: Yup.date().required("Expiration date is required"),
    email: Yup.string().email("Invalid email address"),
    phone_number: Yup.string()
      .phone("BR", "Please enter a valid phone number")
      .required("A phone number is required"),
    // phone_number: brazilianPhoneNumberSchema,
  });

  const formik = useFormik({
    initialValues: {
      patient_name: "",
      parent_name: "",
      phone_number: "",
      email: "",
      birth_date: "",
      expiration_date: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      // _PIN_ ↯ ── Add Patient ✉ ─── ↯
      console.log("Add Patient:", values); // [LOG] Add Patient ➤
      try {
        const url = "/create_patient/";
        const res = await axios.post(url, values);
        console.log("response status:", res.status); // [LOG] response status ➤
        await loadPatients();
      } catch (err) {
        console.log("err", err); // [LOG] err  ➤
        handleAxiosError(err);
      }

      setOpen(false);
    },
  });

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          {/* //<○>  AddButtonSVG */}
          <IconButton color="orange" className="cursor-pointer">
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
                  Birth Date
                </Text>
                <TextField.Root
                  type="date"
                  name="birth_date"
                  value={formik.values.birth_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.birth_date && formik.errors.birth_date && (
                  <Text size="2" color="red">
                    {formik.errors.birth_date}
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
                  DDD + Phone
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
    </>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <●> RemovePatient
const RemovePatient = () => {
  const axios = useAxiosErrorInterceptor();
  const patientID = usePatientStore((state) => state.patientID);
  const { loadPatients } = usePatientService();

  // _PIN_ ✦── peformRemove ✉ ───➤
  const peformRemove = async () => {
    try {
      console.log("id is :", patientID); // [LOG]
      const url = `/patientsRUD/${patientID}/`;
      const res = await axios.delete(url);
      console.log("response :", res); // [LOG]
      await loadPatients();
    } catch (err) {
      console.log("err", err); // [LOG]
      handleAxiosError(err);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton
            color="crimson"
            variant="ghost"
            size="1"
            className="cursor-pointer"
          >
            {/* // <○> DeleteSVG */}
            <DeleteSVG />
          </IconButton>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>Delete Patient Card</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this card? This action is permanent
            and cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button onClick={peformRemove} color="red">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <●> PatientCard
const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const patientID = usePatientStore((state) => state.patientID);
  const setPatientID = usePatientStore((state) => state.setPatientID);

  const handleCardClick = (id: number) => {
    setPatientID(id);
  };

  // ── DOM
  return (
    <Box>
      <Card
        variant="surface"
        onClick={() => handleCardClick(patient.pkid)}
        key={patient.pkid}
        className={classNames(
          "cursor-pointer border opacity-75 hover:shadow-lg hover:opacity-100 ",
          `${
            patientID === patient.pkid
              ? "border-orange-500 opacity-100"
              : "border-transparent opacity-75"
          }`
        )}
      >
        <Box className="flex justify-around items-center gap-4">
          <div className="flex items-center w-6/12">
            <Avatar size="3" src={flowerIMG} fallback="P" />

            <Text as="div" size="2" weight="bold" className=" ml-4">
              {`${patient.patient_name}`}
            </Text>
          </div>

          <Text as="div" size="2" color="gray">
            {`Idade: ${patient.age}`}
          </Text>

          {/* // ○ Badge */}
          {patient.isValid ? (
            <Badge color="jade" variant="soft" radius="full">
              Authorized
            </Badge>
          ) : (
            <Badge color="crimson" variant="soft" radius="full">
              Expired
            </Badge>
          )}

          <ComponentProtector
            allowedRoles={[ROLES.Admin, ROLES.Super]}
          >
            <RemovePatient />
          </ComponentProtector>
        </Box>
      </Card>
    </Box>
  );
}; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> PatientListBox
const PatientListBox = () => {
  const page = usePatientStore((state) => state.page);
  const setPage = usePatientStore((state) => state.setPage);
  const patientList = usePatientStore((state) => state.patientList);
  const totalPages = usePatientStore((state) => state.totalPages);

  const [loading, setLoading] = useState<boolean>(false);

  const { loadPatients } = usePatientService();

  useEffect(() => {
    // _PIN_ ✦── reloadPatients ✉ ───➤ ❀
    const reloadPatients = async () => {
      setLoading(true);
      await loadPatients();
      setLoading(false);
    };
    reloadPatients();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // (●) handlePageChange
  const handlePageChange = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  // ── DOM
  return (
    <Card size="4" className=" flex flex-col flex-1 justify-stretch h-full">
      <Flex gap="3" align="center" className="justify-between">
        <Heading color="orange">Patients </Heading>

        {/* // <○> AddPatient*/}
        <ComponentProtector
          allowedRoles={[ ROLES.Admin, ROLES.Super]}
        >
          <AddPatient />
        </ComponentProtector>
      </Flex>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Patient Card</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading ? (
            <Table.Row>
              <Table.RowHeaderCell>
                <Loader />
              </Table.RowHeaderCell>
            </Table.Row>
          ) : (
            patientList.map((patient) => (
              <Table.Row key={patient.pkid}>
                <Table.RowHeaderCell>
                  {/* // <○> PatientCard*/}
                  <PatientCard patient={patient} />
                </Table.RowHeaderCell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      {/*//  ○ ReactPaginate */}
      <ReactPaginate
        className="flex justify-center items-center mr-11 mt-11"
        nextLabel=" >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel="< "
        pageClassName="inline-flex items-center justify-center w-7 h-7 text-sm border rounded shadow-md bg-neutral-900 border-neutral-800 opacity-70 hover:opacity-100 mx-0.5"
        pageLinkClassName="inline-flex w-full h-full justify-center items-center"
        previousClassName="inline-flex items-center justify-center w-7 h-7 text-sm border rounded shadow-md bg-neutral-900 border-neutral-800 opacity-70 mx-0.5"
        previousLinkClassName="inline-flex w-full h-full justify-center items-center"
        nextClassName="inline-flex items-center justify-center w-7 h-7 text-sm border rounded shadow-md bg-neutral-900 border-neutral-800 opacity-70 mx-0.5"
        nextLinkClassName="inline-flex w-full h-full justify-center items-center"
        disabledClassName="opacity-20 cursor-default"
        disabledLinkClassName="opacity-20 cursor-default"
        breakLabel="..."
        breakClassName="mx-0.5"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="font-bold border rounded shadow-md bg-neutral-900 text-orange-500 border-orange-500"
        renderOnZeroPageCount={null}
        disableInitialCallback={true}
      />
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> NoteBox
const NoteBox = () => {
  const patientDetails = usePatientStore((state) => state.patientDetails);
  const axios = useAxiosErrorInterceptor();
  const patientID = usePatientStore((state) => state.patientID);
  const { loadPatientDetails } = usePatientService();

  const formik = useFormik({
    initialValues: { note: patientDetails?.note },
    enableReinitialize: true, //need to reinitialize the form whenever the patient prop changes.

    onSubmit: async (values) => {
      // _PIN_ ↯ ── update note ✉ ─── ↯

      console.log("note values : ", values); //[LOG]
      try {
        const url = `/patientNote/${patientID}/`;
        const res = await axios.patch(url, values);
        console.log("response status:", res.status); // [LOG]
        await loadPatientDetails();
      } catch (err) {
        console.log("err", err); // [LOG] err
        handleAxiosError(err);
      }
    },
  });

  return (
    <Card size="2" className="h-full p-6">
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        radius="full"
        style={{ height: 320 }}
        className="pr-10"
      >
        <Box position="relative" pt="1">
          <Box position="absolute" top="0" bottom="0" width="1px" ml="-0.5px">
            <Separator
              size="4"
              orientation="vertical"
              mt="2"
              style={{
                background:
                  "linear-gradient(to bottom, var(--orange-6) 90%, transparent)",
              }}
            />
          </Box>

          <Box pl="6">
            <Flex direction="column" gap="4">
              <Tabs.Root defaultValue="list">
                <Tabs.List className=" flex items-center justify-between mb-7 max-w-[620px]">
                  <Text as="div" size="2" color="orange" mb="1">
                    Note:
                  </Text>

                  <Box className="flex items-center gap-2">
                    {/* // <○> ReadSVG*/}
                    <Tabs.Trigger value="list">
                      <ReadSVG />
                    </Tabs.Trigger>

                    {/* // <○> UpdateSVG*/}
                    <ComponentProtector
                      allowedRoles={[ ROLES.Admin, ROLES.Super]}
                    >
                      <Tabs.Trigger value="edit">
                        <UpdateSVG />
                      </Tabs.Trigger>
                    </ComponentProtector>
                  </Box>
                </Tabs.List>

                <Tabs.Content className="max-w-[620px]" value="list">
                  <Text className="whitespace-pre-wrap" size="2">
                    {patientDetails?.note}
                  </Text>
                </Tabs.Content>

                <Tabs.Content value="edit">
                  <form onSubmit={formik.handleSubmit}>
                    <label>
                      <TextArea
                        className="flex h-48"
                        name="note"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </label>

                    <Flex justify={"end"}>
                      <Button
                        className=" w-1/6 mt-6"
                        type="submit"
                        disabled={!formik.dirty}
                      >
                        Save
                      </Button>
                    </Flex>
                  </form>
                </Tabs.Content>
              </Tabs.Root>
            </Flex>
          </Box>
        </Box>
      </ScrollArea>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <●> UpdatePatient
const UpdatePatient = () => {
  const patientDetails = usePatientStore((state) => state.patientDetails);
  const { loadPatientDetails } = usePatientService();
  const axios = useAxiosErrorInterceptor();
  const patientID = usePatientStore((state) => state.patientID);
  const { loadPatients } = usePatientService();

  const validationSchema = Yup.object({
    patient_name: Yup.string().required("Patient name is required"),
    parent_name: Yup.string().required("Parent name is required"),
    birth_date: Yup.date().required("Birth date is required"),
    expiration_date: Yup.date().required("Expiration date is required"),
    email: Yup.string().email("Invalid email address"),
    phone_number: Yup.string()
      .phone("BR", "Please enter a valid phone number")
      .required("A phone number is required"),
    // phone_number: brazilianPhoneNumberSchema,
  });

  const formik = useFormik({
    initialValues: { ...patientDetails },
    enableReinitialize: true, //need to reinitialize the form whenever the patient prop changes.
    validationSchema,

    onSubmit: async (values) => {
      // _PIN_ ↯ ── update Patient ✉ ─── ↯

      console.log("updated values:", values); // [LOG] update content ➤

      try {
        const url = `/patientsRUD/${patientID}/`;
        const res = await axios.put(url, values);
        console.log("response status:", res.status); // [LOG] response status ➤
        await loadPatientDetails();
        await loadPatients();
      } catch (err) {
        handleAxiosError(err);
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className="grid grid-rows-3 grid-flow-col gap-4">
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
              Birth Date
            </Text>
            <TextField.Root
              type="date"
              name="birth_date"
              value={formik.values.birth_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.birth_date && formik.errors.birth_date && (
              <Text size="2" color="red">
                {formik.errors.birth_date}
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
              DDD + Phone
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
        </Box>

        <Flex justify={"end"}>
          <Button
            className=" w-1/6 mt-6"
            type="submit"
            disabled={!formik.dirty}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Box>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> DetailsBox
const DetailsBox = () => {
  const patient = usePatientStore((state) => state.patientDetails);
  const patientList = usePatientStore((state) => state.patientList);
  const patientID = usePatientStore((state) => state.patientID);

  return (
    <Card size="2" className="h-full p-8">
      <Tabs.Root defaultValue="list">
        {/* <Tabs.Root value={tabValue} onValueChange={setTabValue}> */}

        <Tabs.List className=" flex items-center justify-between mb-7 max-w-[650px] ">
          <Heading as="h3" size="4" color="orange">
            {patient?.patient_name}
          </Heading>

          <Box className="flex items-center gap-2">
            {/* // <○> ReadSVG*/}
            <Tabs.Trigger value="list">
              <ReadSVG />
            </Tabs.Trigger>

            {/* // <○> UpdateSVG*/}
            <ComponentProtector
              allowedRoles={[ROLES.Admin, ROLES.Super]}
            >
              <Tabs.Trigger value="edit">
                <UpdateSVG />
              </Tabs.Trigger>
            </ComponentProtector>
          </Box>
        </Tabs.List>

        <Tabs.Content value="list">
          <Box className="grid grid-rows-3 grid-flow-col gap-4">
            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Nome do responsável:
              </Text>
              <Text as="p" color="gray" size="2">
                {patient?.parent_name}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Telefone:
              </Text>
              <Text as="p" color="gray" size="2">
                {patient?.phone_number}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Email:
              </Text>
              <Text as="div" size="2" color="gray">
                {patient?.email}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Criado em:
              </Text>
              <Text as="div" color="gray" size="2">
                {patient?.created_at}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Nascimento:
              </Text>
              <Text as="div" color="gray" size="2">
                {patient?.birth_date}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Vencimento:
              </Text>
              <Text as="div" color="gray" size="2">
                {patient?.expiration_date}
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Status
              </Text>

              <Flex height="24px" align="center">
                {patientList.find((patient) => {
                  return patient.pkid === patientID;
                })?.isValid ? (
                  <Badge color="green" ml="-2px">
                    Authorized
                  </Badge>
                ) : (
                  <Badge color="red" ml="-2px">
                    Expired
                  </Badge>
                )}
              </Flex>
            </Box>
          </Box>
        </Tabs.Content>

        {/* // <○> UpdatePatient*/}
        <Tabs.Content value="edit">
          <UpdatePatient />
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> CreditCardDemo
const CreditCardDemo = () => {
  const patientDetails = usePatientStore((state) => state.patientDetails);

  // (●) truncateNameIfNeed
  const truncateNameIfNeed = (patientName: string) => {
    if (patientName.length >= 23) {
      const slicedName = patientName.slice(0, 23);
      return `${slicedName}...`;
    }
    return patientName;
  };

  return (
    <Card
      size="2"
      className="flex flex-col justify-center items-center h-full gap-2"
    >
      <div className="w-96 h-56 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Crescer Card</h2>

          {/* //<○> CrescerFlowerSVG */}
          <CrescerFlowerSVG />
        </div>

        <div className="mt-4">
          <h4 className="text-sm uppercase tracking-wide">Card Owner</h4>
          <p className="text-xl font-mono mt-1">
            {patientDetails?.patient_name &&
              `${truncateNameIfNeed(patientDetails.patient_name)} ✿`}
          </p>
        </div>

        <div className="mt-8 pb-0 flex justify-end">
          <div>
            <h4 className="text-sm uppercase tracking-wide">Expires</h4>
            <p className="text-sm">{patientDetails?.expiration_date} </p>
          </div>
        </div>
      </div>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ★ Home ─────────────────────────────────────────────────────➤
const Home = () => {
  // const [activePatientID, setActivePatientID] = useState<number | null>(null);

  const { loadPatientDetails } = usePatientService();
  const patientID = usePatientStore((state) => state.patientID);

  useEffect(() => {
    // _PIN_ ✦── loadPatientDetails ✉ ───➤ ❀
    const reloadPatientDetails = async () => {
      await loadPatientDetails();
    };

    reloadPatientDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientID]);

  return (
    //──✦DOM➤
    <>
      <Box
        id="canvas"
        className="h-full grid grid-rows-3 grid-flow-col gap-4 justify-center"
      >
        {/* // <○> PatientListBox*/}
        <Box className="row-start-1 row-span-3 ">
          <PatientListBox />
        </Box>

        {/* // <○> CreditCardDemo*/}
        <Box className="row-start-1 row-span-1 w-[750px]">
          <CreditCardDemo />
        </Box>

        {/* // <○> DetailsBox*/}
        <Box className="row-start-2 row-span-1 w-[750px]">
          <DetailsBox />
        </Box>

        {/* // <○> NoteBox*/}
        <Box className="row-start-3 row-span-1 w-[750px]">
          <NoteBox />
        </Box>
      </Box>
    </>
  );
};
export default Home;
// ★ ──────────────────────────────────────────────────────────➤
