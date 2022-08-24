import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { Select } from "./";

const PaginationButtons = ({
  pageIndex,
  pageCount,
  pageOptions,
  canNextPage,
  nextPage,
  canPreviousPage,
  previousPage,
  gotoPage,
  setPageSize,
}) => {
  return (
    <div className="flex flex-col space-y-1 my-3 text-xs text-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex space-x-0.5 md:space-x-1 items-center">
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <BiChevronsLeft className="h-5 w-5" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <BiChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <BiChevronRight className="h-5 w-5" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BiChevronsRight className="h-5 w-5" />
        </button>
        <span>
          Page
          <strong className="mx-1.5 text-sky-500">{pageIndex + 1}</strong>of
          <strong className="mx-1.5">{pageOptions.length}</strong>
        </span>
        <span className="w-full">
          Go to page:
          <input
            type="number"
            className="bg-slate-800 outline-0 px-2 rounded-sm p-0.5 mx-2 w-9"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>
      </div>
      <Select setPageSize={setPageSize} />
    </div>
  );
};

export default PaginationButtons;
