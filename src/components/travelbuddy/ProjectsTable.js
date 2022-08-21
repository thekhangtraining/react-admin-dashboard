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

const PriorityBadge = ({ priority }) => (
  <p
    className={classnames(
      "uppercase rounded-sm text-xs px-2 font-bold text-center inline-block",
      priority === 1 && "text-emerald-900 bg-emerald-300",
      priority === 2 && "text-yellow-900 bg-yellow-300",
      priority === 3 && "text-red-900 bg-red-300"
    )}
  >
    {priority === 1 ? "Low" : priority === 2 ? "Medium" : "High"}
  </p>
);
const Customer = ({ countryCode, customerName }) => {
  const Flag = Flags[countryCode];
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Flag className="w-5 h-3" />
      <p>
        {customerName}
        <span className="text-xs uppercase font-bold text-emerald-200">{` ${countryCode}`}</span>
      </p>
    </div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="flex items-center space-x-2 text-sm">
    <p
      className={classnames(
        progress < 15 && "text-red-700",
        progress >= 15 && progress < 35 && "text-orange-600",
        progress >= 35 && progress < 80 && "text-yellow-500",
        progress >= 80 && progress < 97 && "text-green-500",
        progress >= 97 && "text-sky-500"
      )}
    >{`${progress}%`}</p>
    <div className="w-full bg-gray-200 h-1 rounded-full">
      <div
        className={classnames(
          "h-1 rounded-full",
          progress < 15 && "bg-red-700",
          progress >= 15 && progress < 35 && "bg-orange-600",
          progress >= 35 && progress < 80 && "bg-yellow-500",
          progress >= 80 && progress < 97 && "bg-green-500",
          progress >= 97 && "bg-sky-500"
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
    <div className="w-full text-sm bg-slate-900 text-gray-100 p-4 rounded-sm overflow-auto">
      <h2 className="px-3.5 mb-2 uppercase text-emerald-500 font-bold font-[Poppins]">
        Projects
      </h2>
      <table className="table-auto w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="py-1 px-1 first:pl-4 last:pr-4 text-left whitespace-nowrap text-amber-400 font-medium"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-gray-300">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="even:bg-slate-800 rounded-full"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 px-1 first:pl-4 last:pr-4 first:text-emerald-200"
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
      <div className="pagination flex items-center space-x-1 md:space-x-2 mt-4 justify-between">
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <BiChevronsLeft className="h-6 w-6" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <BiChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <BiChevronRight className="h-6 w-6" />
        </button>
        <button
          className="rounded-md enabled:hover:bg-slate-600 disabled:cursor-not-allowed"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BiChevronsRight className="h-6 w-6" />
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
        accessor: (item) => <PriorityBadge priority={item.priority} />,
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
