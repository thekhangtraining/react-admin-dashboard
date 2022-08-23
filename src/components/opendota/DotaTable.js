import Flags from "country-flag-icons/react/3x2";
import React, { useMemo } from "react";
import {
  BiCaretDown,
  BiCaretUp,
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiSortAlt2
} from "react-icons/bi";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from "react-table";
import { GlobalFilter, Select } from ".";

const PlaceholderPath = "https://img.icons8.com/cotton/344/user-male--v1.png";

export const PlayerWinrate = ({ winRate, wins, losses }) => (
  <div className="flex flex-col items-center float-left">
    <p>{winRate}%</p>
    <div className="flex space-x-3">
      <span className="text-green-400">{wins}W</span>
      <span className="text-red-400">{losses}L</span>
    </div>
  </div>
);

export const PlayerHeroes = ({ heroes, id }) => (
  <div>
    {heroes.slice(0, 3).map((h) => (
      <span key={`${id}-${h}`}>{`${h}, `}</span>
    ))}
  </div>
);

export const PlayerTeam = ({ teamLogo, teamName, teamId }) => (
  <div className="flex space-x-1 items-center">
    {" "}
    <img
      src={`${teamLogo}`}
      alt=""
      className="rounded-full h-5 w-5 md:h-6 md:w-6"
      // Placeholder image
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = PlaceholderPath;
      }}
    />
    <p className="text-sky-500">{teamName}</p>
  </div>
);

export const Player = ({ teamTag, name, avatar, countryCode, id }) => {
  const Flag = countryCode !== "" ? Flags[countryCode] : null;
  return (
    <div className="flex items-center space-x-2">
      <img
        src={`${avatar}`}
        alt=""
        className="rounded-full h-5 w-5 md:h-6 md:w-6"
        // Placeholder image
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = PlaceholderPath;
        }}
      />
      <div className="flex flex-col space-y-0.5">
        <div className="flex space-x-1 items-center">
          {teamTag !== "" && teamTag !== null ? (
            <span>{`${teamTag}.`}</span>
          ) : (
            ""
          )}
          <span className="text-sky-500">{name}</span>
          {countryCode !== "" ? <Flag className="w-3 h-2" /> : null}
        </div>
        <p className="text-2xs">{id}</p>
      </div>
    </div>
  );
};

export const Team = ({ name, teamTag, logo, id }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        src={`${logo}`}
        alt=""
        className="rounded-full h-5 w-6 md:h-6 md:w-7"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = PlaceholderPath;
        }}
      />
      <div className="flex flex-col">
        <div className="flex space-x-1 items-center">
          <span className="text-sky-500">{name}</span>
          {teamTag !== "" && teamTag !== null ? (
            <span>{`${teamTag}`}</span>
          ) : (
            ""
          )}
        </div>
        <p className="font-2xs">{id}</p>
      </div>
    </div>
  );
};

const Table = ({ columns, data, tableTitle }) => {
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
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full text-xs text-slate-400 rounded-sm overflow-auto flex flex-col space-y-2 my-4">
      <div className="flex justify-between items-end">
        <h2 className="text-slate-200 font-bold text-sm">{tableTitle}</h2>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table className="w-full border border-slate-800" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="text-slate-200 border-b border-slate-800 bg-gradient-to-r from-sky-800/30 via-sky-900/60 to-sky-800/30"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-3 first:pl-4 last:pr-4 text-left whitespace-nowrap uppercase font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BiCaretDown />
                        ) : (
                          <BiCaretUp />
                        )
                      ) : (
                        <BiSortAlt2 />
                      )}
                    </span>
                  </div>
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
                      className="py-1.5 first:pl-4 last:pr-4"
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
    </div>
  );
};

const DotaTable = ({ dataList, columnsDef, tableTitle }) => {
  const data = useMemo(() => dataList, [dataList]);
  const columns = useMemo(() => columnsDef, [columnsDef]);

  return <Table columns={columns} data={data} tableTitle={tableTitle} />;
};
export default DotaTable;
