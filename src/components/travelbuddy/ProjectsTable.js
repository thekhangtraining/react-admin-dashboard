import Flags from "country-flag-icons/react/3x2";
import React, { useMemo } from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { usePagination, useTable } from "react-table";
import { Select } from ".";
import { mockProjects } from "../../data/mockProjects";

var classnames = require("classnames");

const Priority = ({ priority }) => (
  <p
    className={classnames(
      "text-xs text-center inline-block",
      priority === 1 && "text-emerald-400",
      priority === 2 && "text-yellow-400",
      priority === 3 && "text-red-400"
    )}
  >
    {priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}
  </p>
);
const Customer = ({ countryCode, customerName }) => {
  const Flag = Flags[countryCode];
  return (
    <div className="flex items-center space-x-1 text-xs">
      <Flag className="w-3 h-2" />
      <p>
        {customerName}
        <span className="text-xs uppercase font-bold text-sky-600">{` ${countryCode}`}</span>
      </p>
    </div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="flex items-center space-x-1 md:space-x-2 text-2xs">
    <p
      className={classnames(
        progress < 33 && "text-red-400",
        progress >= 33 && progress < 67 && "text-yellow-400",
        progress >= 67 && progress < 100 && "text-green-400"
      )}
    >{`${progress}%`}</p>
    <div className="w-full bg-gray-200 h-1 rounded-full">
      <div
        className={classnames(
          "h-1 rounded-full",
          progress < 33 && "bg-red-400",
          progress >= 33 && progress < 67 && "bg-yellow-400",
          progress >= 67 && progress < 100 && "bg-green-400"
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div className="w-full text-xs text-slate-400 rounded-sm overflow-auto">
      <table className="w-full border border-slate-800" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="text-slate-200 border-b border-slate-800 bg-gradient-to-r from-sky-800/30 via-sky-900/60 to-sky-800/30"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-4 first:pl-4 last:pr-4 text-left whitespace-nowrap uppercase font-medium"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-slate-800 bg-gradient-to-r from-slate-900/30 via-slate-900/50 to-slate-900"
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 first:pl-4 last:pr-4"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
            <strong className="mx-1.5 text-amber-400">{pageIndex + 1}</strong>of
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
    </div>
  );
};

const ProjectsTable = () => {
  const columns = useMemo(
    () => [
      { Header: "App", accessor: "appName" },
      {
        Header: "Team Lead",
        accessor: (item) => (
          <div className="flex items-center space-x-2">
            <img
              src={`${item.avatar}`}
              alt=""
              className="bg-zinc-100 rounded-full h-5 w-5 md:h-6 md:w-6"
            />
            <span>{item.manager}</span>
          </div>
        ),
      },
      {
        Header: "Customer",
        accessor: (item) => (
          <Customer
            countryCode={item.countryCode}
            customerName={item.customer}
          />
        ),
      },
      {
        Header: "Priority",
        accessor: (item) => <Priority priority={item.priority} />,
      },
      {
        Header: "Progress",
        accessor: (item) => <ProgressBar progress={item.progress} />,
      },
    ],
    []
  );

  const data = useMemo(() => mockProjects, []);

  return <Table columns={columns} data={data} />;
};
export default ProjectsTable;
