import { useEffect, useState } from "react";

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
  RadioCards,
} from "@radix-ui/themes";

const AddSVG = () => (
  // <✪> AddSVG
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
); //  . . . . . . . . . . . . . . . . . .

const patients = [
  // [✪] patients
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
];

// const UserCards = () => {
//   // ✪ UserCards
//   const [activeUserId, setActiveUserId] = useState(null);

//   const handleCardClick = (userId) => {
//     setActiveUserId(userId);
//   };

//   return (
//     <div className="flex space-x-8">
//       {/* User Cards Column */}

//       <div className="flex flex-col space-y-4">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             onClick={() => handleCardClick(user.id)}
//             className={`p-4 border rounded-lg cursor-pointer ${
//               activeUserId === user.id ? " border-blue-400" : ""
//             } hover:shadow-lg`}
//           >
//             <h3 className="text-lg font-semibold">{user.name}</h3>
//           </div>
//         ))}
//       </div>

//       {/* Profile Information */}
//       <div className="flex-1">
//         {activeUserId && (
//           <div className="p-6 border rounded-lg bg-gray-50">
//             <h2 className="text-2xl font-bold">
//               {users.find((user) => user.id === activeUserId).name}
//             </h2>
//             <p className="mt-2 text-gray-700">
//               {users.find((user) => user.id === activeUserId).profile}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }; //  . . . . . . . . . . . . . . . . . .

const DeleteButton = () => (
  // (✪) DeleteButton
  <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="bg-red-900 size-6">D</Button>
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

const MainTable = () => (
  // (✪) MainTable

  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Patient Card</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {patients.map((patient) => (
        <Table.Row key={patient.id}>
          <Table.RowHeaderCell>
            <PatientCard patient={patient} />
          </Table.RowHeaderCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
); //  . . . . . . . . . . . . . . . . . .

// (✪) PatientCard
const PatientCard = ({ patient }) => (
  // NOTE Use the asChild prop to render the card as a link or a button.

  // WARN
  //  Div size is wrong
  //  No type

  <Box maxWidth="420px">
    <Card>
      {/* [LOG] */}
      <div
        onClick={() => console.log("patient: ", patient.name)}
        key={patient.id}
        className={`cursor-pointer ${
          patient.id ? " border-blue-400" : ""
        } hover:shadow-lg`}
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
            <Box>
              {/* (●) Badge */}
              <Badge color="jade" variant="soft" radius="full" className="my-2">
                Authorized
              </Badge>

              <Text as="div" size="1" color="gray">
                Valid Thru:
              </Text>

              <Text as="div" size="1" color="gray">
                12/25
              </Text>
            </Box>
            {/* (●) DeleteButton */}
            <DeleteButton />
          </Flex>
        </Flex>
      </div>
    </Card>
  </Box>
); //  . . . . . . . . . . . . . . . . . .

// const TesteComp = () => (
//   <Flex direction="column" width="100%" gap="3">
//     <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "3" }}>
//       <RadioCards.Item value="1" className="pointer-events-auto">
//         <div onClick={() => console.log("clicked")}>
//           <Flex direction="column" width="100%">
//             <Text weight="bold">8-core CPU</Text>
//             <Text>32 GB RAM</Text>
//           </Flex>
//         </div>
//       </RadioCards.Item>
//       <RadioCards.Item value="2">
//         <Flex direction="column" width="100%">
//           <Text weight="bold">6-core CPU</Text>
//           <Text>24 GB RAM</Text>
//         </Flex>
//       </RadioCards.Item>
//       <RadioCards.Item value="3">
//         <Flex direction="column" width="100%">
//           <Text weight="bold">4-core CPU</Text>
//           <Text>16 GB RAM</Text>
//         </Flex>
//       </RadioCards.Item>
//     </RadioCards.Root>
//   </Flex>
// );

const Home = () => {
  // ★ Home

  useEffect(() => {
    console.log("Home Page"); // [LOG] Home Page log ✿ ❀
  }, []);

  return (
    //────────DOM─────➤
    <>
      <Box maxWidth="520px">
        <Card className=" pt-8 pb-16 px-8">
          <Flex gap="3" align="center" className="justify-between">
            <Heading color="orange">Patients </Heading>
            <IconButton color="orange">
              <AddSVG />
            </IconButton>
          </Flex>

          <MainTable />
          {/* <TesteComp /> */}
          {/* <UserCards /> */}
        </Card>
      </Box>

      <h1> ✿ ❀ </h1>
    </>
  );
};

export default Home;
