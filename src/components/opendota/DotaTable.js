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
  disableFlexLayout,
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
      disableFlexLayout: disableFlexLayout,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full text-xs rounded-sm overflow-auto flex flex-col space-y-2 py-2 my-2">
      <div className="flex items-end justify-between">
        <h2 className="font-bold text-sm">
          {tableTitle}
        </h2>
        {disableGlobalFilter ? null : (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
      </div>
      <table className="w-full border border-border-base" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="text-skin-strong border-b border-border-base bg-skin-secondary"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-3 first:pl-4 last:pr-4 text-left uppercase font-medium whitespace-nowrap overflow-x-auto"
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
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="border-b border-border-base"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="py-1 px-2 first:pl-4 last:pr-4 whitespace-nowrap"
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
      {disablePagination ? null : (
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
      )}
    </div>
  );
};

export default DotaTable;
