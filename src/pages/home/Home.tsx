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
import ReactPaginate from "react-paginate";

import { axiosPrivate } from "../../utils/axios";
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
      <IconButton className="py-0 mb-3" variant="ghost">
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


// ✪ CreditCardDemo
const CreditCardDemo : React.FC<CreditCardDemoProps>= ({ patientName , parentName , expire }) => {
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
          {patientName}
        </p>
      </div>

      <div className="mt-2 flex justify-between">

        <div>
          <h4 className="text-sm uppercase tracking-wide ">Reponsible</h4>
          <p className="text-sm"> {parentName} </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-wide">Expires</h4>
          <p className="text-sm">{expire} </p>
        </div>
      </div>
    </div>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

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
        <Flex gap="3" align="center" className="justify-between">
          <Flex gap="3" align="center" className="justify-between">
            <Avatar
              size="4"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="T"
            />

            <Box>
              <Text as="div" size="2" weight="bold" className="mb-2">
                {`${patient.patient_name}`}
              </Text>
              <Text as="div" size="2" color="gray">
                {`${patient.age}`}
              </Text>
            </Box>
          </Flex>

          <Flex direction="column" className="items-end ">
            {/* // (○) PopoverAction */}
            <ComponentProtector
              allowedRoles={[ROLES.Staff, ROLES.Admin, ROLES.User]}
            >
              <PopoverAction />
            </ComponentProtector>

            {/* // (○) Badge */}
            <Badge color="jade" variant="soft" radius="full">
              Authorized
            </Badge>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}; //  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> LeftBox
const LeftBox: React.FC<LeftBoxProps> = ({
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

        const response = await axiosPrivate.get(url, { params: { page } });

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
    <Box className="flex">
      <Card className="flex flex-col gap-8 pt-8 pb-16 pl-10 justify-center items-center">
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          radius="full"
          style={{ height: 750 }}
          className="pr-10"
        >
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
        </ScrollArea>

        {/*//  ○ ReactPaginate */}
        <ReactPaginate
          className="flex justify-center items-center mr-11"
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
    </Box>
  );
}; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// <✪> RightBox
const RightBox: React.FC<RightBoxProps> = ({ patientID }) => {
  const [loadingR, setLoadingR] = useState<boolean>(false);
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);

  useEffect(() => {
    // ✳ ✦── loadPatientsDetails ✉───➤ ❀
    const loadPatientDetails = async (patientID: number | null) => {
      setLoadingR(true);
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
      setLoadingR(false);
    };

    loadPatientDetails(patientID);
  }, [patientID]); //  ✳ ✦── loadPatientsDetails ✉───➤ ✿

  return (
    <Box>
      <Flex direction="column" gap="2">
        {/*//_PIN_ TOP CARD */}
        <Card className="py-8 px-8 flex justify-center">
          {/* // ○ CreditCardDemo*/}
          <CreditCardDemo patientName={patientDetails?.patient_name} parentName = {patientDetails?.parent_name}  expire = {patientDetails?.expiration_date} />
          
        </Card>

        {/*//_PIN_ BOTTOM CARD */}
        <Card className=" py-8 px-8">
          {/* // (○) PopoverAction*/}
          <PopoverAction />
        </Card>
      </Flex>
    </Box>
  );
};

// ★ Home ─────────────────────────────────────────────────────➤
// WARN No type
const Home = () => {
  const [activePatientID, setActivePatientID] = useState<number | null>(null);

  return (
    //──✦─DOM────➤
    <>
      <Flex id="canvas" gap="4" align="center" className="justify-evenly">
        {/*///_PIN_  LEFT BOX */}

        {/* // <○> LeftBox*/}
        <LeftBox
          activePatientID={activePatientID}
          setActivePatientID={setActivePatientID}
        />

        {/*///_PIN_   RIGHT BOX */}
        <RightBox patientID={activePatientID} />
        {/* <h1> ✿ ❀ </h1> */}
      </Flex>
    </>
  );
};

export default Home;
// ★ ───────────────────────────────────────────────────────────────────➤
