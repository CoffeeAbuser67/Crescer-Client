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
  Grid,
  DataList,
  Dialog,
  Popover,
  Separator,
} from "@radix-ui/themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";

import { axiosPrivate, axiosDefault } from "../../utils/axios";
import Loader from "../../components/Loader";
import handleAxiosError from "../../utils/handleAxiosError";
import ComponentProtector from "../../components/guard/ComponentProtector";
import {
  Patient,
  PatientBriefData,
  PaginatedResponse,
} from "../../types/patient";

// [●] CreditCardDemoProps
interface CreditCardDemoProps {
  patientName: string | undefined;
  parentName: string | undefined;
  expire: string | undefined;
}

// [●] PatientCardProps
interface PatientCardProps {
  patient: PatientBriefData;
  activePatientID: number | null;
  setActivePatientID: (id: number | null) => void;
}

// [●] LeftBoxProps
interface LeftBoxProps {
  activePatientID: number | null;
  setActivePatientID: (id: number | null) => void;
}

// [●] RightBoxProps
interface RightBoxProps {
  patientID: number | null;
}

// [●] DetailsBoxProps
interface DetailsBoxProps {
  patient: Patient | null;
}

const ROLES = {
  User: 3,
  Staff: 2,
  Admin: 1,
  AnyRole: 0,
};

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
); //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

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
  // _PIN_ Missing
  <>Let go</>
); //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// (✪) PopoverAction
const PopoverAction = () => (
  <Popover.Root>
    <Popover.Trigger>
      <IconButton className="py-0" variant="ghost">
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

      {/* // (○) RemovePatient*/}
      <RemovePatient />
    </Popover.Content>
  </Popover.Root>
); // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <●> AddPatient
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
    birth_date: Yup.date().required("Birth date is required"),
    expiration_date: Yup.date().required("Expiration date is required"),
    email: Yup.string().email("Invalid email address"),
    phone_number: brazilianPhoneNumberSchema,
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
      console.log("Form values:", values); // [LOG] Patient saved ➤

      // ✳ ↯ ── Add Patient ✉ ─── ↯
      try {
        const url = "/create_patient/";
        const res = await axiosDefault.post(url, values, {
          withCredentials: true,
        });

        console.log("response :", res); // [LOG] response status ➤
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
                  Birth Date
                </Text>
                <TextField.Root
                  type="date"
                  name="birth_date"
                  value={formik.values.birth_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.birth_date &&
                  formik.errors.birth_date && (
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
    </>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <●> PatientCard
const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  activePatientID,
  setActivePatientID,
}) => {
  const handleCardClick = (id: number) => {
    setActivePatientID(id);
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
            activePatientID === patient.pkid
              ? "border-orange-500 opacity-100"
              : "border-transparent opacity-75"
          }`
        )}
      >
        <Box className="flex justify-around items-center">
          <div className="flex items-center w-6/12">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="T"
            />

            <Text as="div" size="2" weight="bold" className=" ml-4">
              {`${patient.patient_name}`}
            </Text>
          </div>

          <Text as="div" size="2" color="gray">
            {`Idade: ${patient.age}`}
          </Text>

          {/* // (○) Badge */}
          <Badge color="jade" variant="soft" radius="full">
            Authorized
          </Badge>

          {/* // (○) PopoverAction */}
          <ComponentProtector
            allowedRoles={[ROLES.Staff, ROLES.Admin, ROLES.User]}
          >
            <PopoverAction />
          </ComponentProtector>
        </Box>
      </Card>
    </Box>
  );
}; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> PatientListBox
const PatientListBox: React.FC<LeftBoxProps> = ({
  activePatientID,
  setActivePatientID,
}) => {
  const PAGE_SIZE = 10;
  const [PatientList, setPatientList] = useState<PatientBriefData[]>([]);
  const [count, setCount] = useState<number>(0); //WARN no need of a count state until now
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // ✳ ✦── loadPatients ✉───➤ ❀
    const loadPatients = async (page: number = 1) => {
      setLoading(true);
      try {
        const url = "/patientsList/";
        console.log("Active Page : ", page); // [LOG]

        const response = await axiosDefault.get(url, {
          params: { page },
          withCredentials: true,
        });

        setPatientList(response?.data?.results);

        const _count = response?.data?.count;
        setCount(_count);
        setTotalPages(getTotalPages(_count)); // (○) getTotalPages

        console.log("AllPatients", response?.data); // [LOG] AllPatients ✿
      } catch (err: unknown) {
        if (err) {
          handleAxiosError(err);
        }
      }
      setLoading(false);
    };

    loadPatients(page);
  }, [page]); //  ✳ ✦── loadPatients ✉───➤ ✿ ❀

  // (●) getTotalPages
  const getTotalPages = (count: number): number => {
    return Math.ceil(count / PAGE_SIZE);
  };

  // (●) handlePageChange
  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  // ── DOM
  return (
    <Card size="4" className=" flex flex-col flex-1 justify-stretch h-full">
      <Flex gap="3" align="center" className="justify-between">
        <Heading color="orange">Patients </Heading>

        {/* // ○ AddPatient*/}
        <ComponentProtector
          allowedRoles={[ROLES.Staff, ROLES.Admin, ROLES.User]}
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
            PatientList.map((patient) => (
              <Table.Row key={patient.pkid}>
                <Table.RowHeaderCell>
                  {/* // (○) PatientCard*/}
                  <PatientCard
                    patient={patient}
                    activePatientID={activePatientID}
                    setActivePatientID={setActivePatientID}
                  />
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

// ✪ NoteBox
const NoteBox = () => {
  return (
    <Card size="2" className="h-full p-8">
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
              <Box>
                <Text as="div" size="1" color="gray" mb="1">
                  Note:
                </Text>
                <Text as="p" size="2">
                  ...
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </ScrollArea>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ✪ DetailsBox
const DetailsBox: React.FC<DetailsBoxProps> = ({ patient }) => {
  return (
    <Card size="2" className="h-full p-8">
      <Heading as="h3" size="4" mb="6" color="orange">
        {patient?.patient_name}
      </Heading>

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
            <Badge color="green" ml="-2px">
              On time
            </Badge>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ● CreditCardDemo
const CreditCardDemo: React.FC<CreditCardDemoProps> = ({
  patientName,
  expire,
}) => {
  // Format the card number for display

  return (
    <Card size="2" className="flex justify-center items-center h-full">
      <div className="w-96 h-56 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Crescer Card</h2>

          {/* //<○> CrescerFlowerSVG */}
          <CrescerFlowerSVG />
        </div>

        <div className="mt-4">
          <h4 className="text-sm uppercase tracking-wide">Card Owner</h4>
          <p className="text-xl font-mono mt-1">
            {patientName && `${patientName} ✿`}
          </p>
        </div>

        <div className="mt-8 pb-0 flex justify-end">
          <div>
            <h4 className="text-sm uppercase tracking-wide">Expires</h4>
            <p className="text-sm">{expire} </p>
          </div>
        </div>
      </div>
    </Card>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// ★ Home ─────────────────────────────────────────────────────➤
// WARN No type
const Home = () => {
  const [activePatientID, setActivePatientID] = useState<number | null>(null);
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);

  useEffect(() => {
    // ✳ ✦── loadPatientsDetails ✉───➤ ❀
    const loadPatientDetails = async (patientID: number | null) => {
      try {
        if (patientID) {
          const url = `/patientsRUD/${patientID}/`;
          console.log(" id : ", patientID); // [LOG]
          const response = await axiosPrivate.get(url);
          setPatientDetails(response?.data);
          console.log("Patient Details", response?.data); // [LOG] Patient Details ✿
        }
      } catch (err: unknown) {
        if (err) {
          handleAxiosError(err);
        }
      }
    };

    loadPatientDetails(activePatientID);
  }, [activePatientID]); //  ✳ ✦── loadPatientsDetails ✉───➤ ✿

  return (
    //──✦─DOM───➤
    <>
      <Box id="canvas" className="h-full grid grid-rows-3 grid-flow-col gap-4">
        {/* // <○> PatientListBox*/}
        <Box className="row-start-1 row-span-3 ">
          <PatientListBox
            activePatientID={activePatientID}
            setActivePatientID={setActivePatientID}
          />
        </Box>

        {/* // <○> CreditCardDemo*/}
        <Box className="row-start-1 row-span-1 ">
          <CreditCardDemo
            patientName={patientDetails?.patient_name}
            parentName={patientDetails?.parent_name}
            expire={patientDetails?.expiration_date}
          />
        </Box>

        {/* // <○> DetailsBox*/}
        <Box className="row-start-2 row-span-1 ">
          <DetailsBox patient={patientDetails} />
        </Box>

        {/* // <○> NoteBox*/}
        <Box className="row-start-3 row-span-1 ">
          <NoteBox />
        </Box>
      </Box>
    </>
  );
};

export default Home;
// ★ ───────────────────────────────────────────────────────────────────➤
