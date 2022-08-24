import React, { useMemo } from "react";
import { BiCaretDown, BiCaretUp, BiSortAlt2 } from "react-icons/bi";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFilter, PaginationButtons } from ".";

const DotaTable = ({
  columnsDef,
  data,
  tableTitle,
  disableSortBy,
  disableGlobalFilter,
  disableFilters,
  disablePagination,
}) => {
  const dataMemo = useMemo(() => data, [data]);
  const columnsMemo = useMemo(() => columnsDef, [columnsDef]);
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
      columns: columnsMemo,
      data: dataMemo,
      initialState: { pageIndex: 0 },
      disableSortBy: disableSortBy,
      disableGlobalFilter: disableGlobalFilter,
      disableFilters: disableFilters,
      disablePagination: disablePagination,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full text-xs text-slate-400 rounded-sm overflow-auto flex flex-col space-y-2 py-2 my-2">
      <div className="flex items-end justify-between">
        <h2 className="text-slate-200 font-bold text-sm">{tableTitle}</h2>
        {disableGlobalFilter ? null : (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
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
                  className="py-3 first:pl-4 last:pr-4 text-left uppercase font-medium"
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
                      ) : column.canSort ? (
                        <BiSortAlt2 />
                      ) : (
                        ""
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
                      className="py-1.5 first:pl-4 last:pr-4 truncate"
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
      <PaginationButtons
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        nextPage={nextPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default DotaTable;
