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
  RadioCards
} from "@radix-ui/themes";

const AddSVG = () => (
  // ✪ AddSVG
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </>
); //  . . . . . . . . . . . . . . . . . .

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
      <Table.Row>
        <Table.RowHeaderCell>
          <PatientCard />
        </Table.RowHeaderCell>
      </Table.Row>

      <Table.Row>
        <Table.RowHeaderCell>
          <PatientCard />
        </Table.RowHeaderCell>
      </Table.Row>

      <Table.Row>
        <Table.RowHeaderCell>
          <PatientCard />
        </Table.RowHeaderCell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
); //  . . . . . . . . . . . . . . . . . .




// <Box maxWidth="600px">
//   <RadioCards.Root defaultValue="1" columns={{ initial: '1', sm: '3' }}>

//     <RadioCards.Item value="1">
//       <Flex direction="column" width="100%">
//         <Text weight="bold">8-core CPU</Text>
//         <Text>32 GB RAM</Text>
//       </Flex>
//     </RadioCards.Item>

//     <RadioCards.Item value="2">
//       <Flex direction="column" width="100%">
//         <Text weight="bold">6-core CPU</Text>
//         <Text>24 GB RAM</Text>
//       </Flex>
//     </RadioCards.Item>

//     <RadioCards.Item value="3">
//       <Flex direction="column" width="100%">
//         <Text weight="bold">4-core CPU</Text>
//         <Text>16 GB RAM</Text>
//       </Flex>
//     </RadioCards.Item>

//   </RadioCards.Root>
// </Box>



const PatientCard = () => (
  // (✪) PatientCard
  // NOTE Use the asChild prop to render the card as a link or a button.
  <Box maxWidth="420px" >
    <Card >
      <Flex gap="3" align="center" className="justify-between">
        <Flex gap="3" align="center" className="justify-between">
          <Avatar
            size="4"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="T"
          />

          <Box>
            <Text as="div" size="2" weight="bold">
              Teodros Girmay ✿
            </Text>
            <Text as="div" size="2" color="gray">
              12 Anos
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
    </Card>
  </Box>
); //  . . . . . . . . . . . . . . . . . .

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
        </Card>
      </Box>

      <h1> ✿ ❀ </h1>
    </>
  );
};

export default Home;
