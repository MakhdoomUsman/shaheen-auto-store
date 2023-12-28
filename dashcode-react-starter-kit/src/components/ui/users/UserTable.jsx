import React, { useState, useEffect } from "react";
import {
  setItemsPerPage,
  setCurrentPage,
  setGlobalSearch,
} from "@/pages/users/store/store";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "@/pages/users/user/GlobalFilter";
import Pagination from "@/components/ui/Pagination";
import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/ui/Button";
import CryptoJS from "crypto-js";

const UserTable = ({
  title,
  columns,
  userData,
  handlePaginationChange,
  setIsEditModal,
  setModalName,
  setEditRow,
  setSelectedUsers,
  // deleteConfirmAll,
  searchRequest,
  resetUser,
}) => {
  const { globalSearch } = useSelector((state) => state.brands);
  const { itemsPerPage } = useSelector((state) => state.brands);
  const { currentPage } = useSelector((state) => state.brands);
  const [totalPages, setTotalPages] = useState(userData.total / itemsPerPage);
  const [globalFilterInput, setGlobalFilterInput] = useState("");
  const [deleteAllOption, setDeleteAllOption] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setPageSize(itemsPerPage);
    setTotalPages(userData.total / itemsPerPage);
  }, [itemsPerPage]);

  const handlePageChange = (page) => {
    handlePaginationChange(page);
    dispatch(setCurrentPage(page));
  };
  const searchRequestButton = () => {
    dispatch(setGlobalSearch(globalFilterInput));
    searchRequest(false);
  };
  const clearSearch = () => {
    setGlobalFilterInput("");
    dispatch(setGlobalSearch(""));
    console.log("globalSearch" + globalSearch);
    searchRequest(true);
  };
  useEffect(() => {
    dispatch(setGlobalSearch(globalFilterInput));
    if (userData.total > itemsPerPage) {
      setTotalPages(userData.total / itemsPerPage);
    } else {
      setTotalPages(1);
    }
  }, [searchRequestButton]);

  const deleteAllUser = (event) => {
    // deleteConfirmAll(event.target.value);
  };

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            className="table-checkbox"
          />
        </>
      );
    }
  );

  const tableInstance = useTable(
    {
      columns,
      data: userData?.data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    rows,
    setGlobalFilter,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;

  const pageSizeSet = (e) => {
    setPageSize(Number(e.target.value));
    dispatch(setItemsPerPage(Number(e.target.value)));
  };

  useEffect(() => {
    var selectedId = selectedFlatRows.map(function (items, index) {
      return items["values"]["uuid"];
    });
    setSelectedUsers(selectedId);
  }, [selectedFlatRows]);
  const { globalFilter, pageSize } = state;
  return (
    <div>
      <div className="md:flex justify-between items-center mb-6">
        <h4 className="card-title">
          {title} ({userData.total})
        </h4>
        <div className="flex items-center gap-3">
          <Button
            text="+ Add User"
            className="btn-dark btn-sm"
            onClick={() => (
              setModalName("add"), setIsEditModal((prev) => !prev), resetUser()
            )}
          />
        </div>
      </div>

      <div className="md:flex justify-between flex-row-reverse mb-6">
        <div className="flex items-center gap-3">
          <GlobalFilter
            filter={globalSearch}
            setGlobalFilter={setGlobalFilterInput}
          />
          <Button
            text="Search"
            className="btn-success btn-sm"
            onClick={() => searchRequestButton()}
          />
          <Button
            text="Clear"
            className="btn-warning btn-sm"
            onClick={() => clearSearch()}
          />
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-y-auto">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps}
            >
              <thead className="bg-slate-200 dark:bg-slate-700">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className=" table-th "
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps}
              >
                {page?.length > 0 ? (
                  page?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="absolute left-[50%] mt-5">
                    <td className="">☹️ No data Available!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => pageSizeSet(e)}
          >
            {[25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Page{" "}
            <span>
              {currentPage} of {userData?.last_page}
            </span>
            <span>
              {Object.keys(selectedRowIds).length > 0 && (
                <select
                  value={deleteAllOption}
                  className="form-control py-2 w-max !inline ml-4"
                  onChange={(e) => deleteAllUser(e)}
                >
                  <option value="">--Select--</option>
                  <option value="deleted">Delete All</option>
                </select>
              )}
            </span>
          </span>
        </div>
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
