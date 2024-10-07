import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";

// [●] items
const items = [...Array(33).keys()];

// [✪]  Items
function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </div>
  );
}

// ✪ PaginatedItems ✦─────➤
function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);

  const [pageCount, setPageCount] = useState(0);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // NOTE He use the itemOffset and setItemOffset to setup the current the items of a respective page.
  // I don't need that since my api Already bring the itens of each page.
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex justify-center items-center"
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
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
        activeClassName="font-bold border rounded shadow-md bg-neutral-900 text-orange-600 border-orange-600"
        renderOnZeroPageCount={null}
        disableInitialCallback={true}
      />
    </>
  );
}

// ● Patient2
type Patient2 = {
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

// ● PatientDetails

const PatientDetails = () => {
  // const PatientDetails: React.FC<Patient2> = (Patient) => {
  return (
    <Card size="2">
      <Heading as="h3" size="4" mb="4" color="orange">
        Nome do paciente
      </Heading>

      {/* <TextField.Root mb="5" variant="soft" placeholder="Enter package number">
        <TextField.Slot>🦀</TextField.Slot>
      </TextField.Root> */}

      <Grid columns="2">
        <Flex gap="4" direction="column" pr="6">
          <Box>
            
            <Text as="div" weight="bold" size="2" mb="1">
              Nome do responsável:
            </Text>
            <Text as="p" color="gray" size="2">
              Package picked up from the warehouse in Phoenix, TX
            </Text>
          </Box>

          <Box>
            <Text as="div" weight="bold" size="2" mb="1">
              Telefone:
            </Text>
            <Text as="p" color="gray" size="2">
              Package picked up from the warehouse in Phoenix, TX
            </Text>
          </Box>

          <Box>
            <Text as="div" weight="bold" size="2" mb="1">
              Email:
            </Text>
            <Text as="div" size="2" color="gray">
              512 Oakwood Avenue, Unit 201, Greenville, SC 67890
            </Text>
          </Box>

          <Grid columns="3">
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
            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Nascimento:
              </Text>
              <Text as="div" color="gray" size="2">
                12/07/1992
              </Text>
            </Box>

            <Box>
              <Text as="div" weight="bold" size="2" mb="1">
                Vencimento
              </Text>
              <Text as="div" color="gray" size="2">
                33/33/2000
              </Text>
            </Box>
          </Grid>
        </Flex>

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
                {/* // _PIN_ aqui */}
                <Text as="p" size="2">
                  
                </Text>

              </Box>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Card>
  );
};

const Temp = () => {
  return (
    <div
      id="canvas"
      className="flex flex-col gap-10 justify-center items-center p-6"
    >
      <PaginatedItems itemsPerPage={4} />

      <PatientDetails />
    </div>
  );
};

export default Temp;
