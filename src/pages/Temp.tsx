
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

// [●] items
const items = [...Array(33).keys()];

// [✪]  Items
function Items({ currentItems }) {
  return (

    <div className="items">

    {currentItems && currentItems.map((item) => (
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
    const newOffset = event.selected * itemsPerPage % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
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
        nextLinkClassName= "inline-flex w-full h-full justify-center items-center"
        
        disabledClassName = "opacity-20 cursor-default"
        disabledLinkClassName= "opacity-20 cursor-default"
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


const Temp = () => {

  return (

      <div id = 'canvas' className = "flex flex-col gap-10 justify-center items-center p-6">

      <PaginatedItems itemsPerPage={4}/>

      </div>
      

  )

}



export default Temp