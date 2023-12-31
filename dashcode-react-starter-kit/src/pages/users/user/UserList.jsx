import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import {
  removeUsersError,
  setUsersErrors,
  setUsers,
  updateUser,
  setCurrentPage,
  setSingleUser,
} from "../store/store";
import { ON_LOADING } from "@/store/loader";
import Loader from "@/components/Loader";
import { useSelector, useDispatch } from "react-redux";
import UserTable from "@/components/ui/users/UserTable";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import {
  setactiveModal,
  setdeleteConfrim,
  setDeleteAll,
} from "@/store/services/common/confirmation.module";
import EditModel from "@/components/ui/users/EditModel";
import {
  addUsers,
  deleteUsers,
  getUsers,
  updateUsers,
  getUser,
  getPermissionList,
} from "@/pages/users/store/actions";
import { getSingleUser } from "../store/actions";
import ViewUser from "@/components/ui/users/ViewUser";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
// import { getRoleListsForUser } from "../../role_management/store/actions";

const UserList = ({ title = "Manage Brands" }) => {
  const [modalName, setModalName] = useState("");

  const COLUMNS = [
    {
      Header: "Brand name",
      accessor: "brand_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "brand disc",
      accessor: "brand_disc",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "category",
      accessor: "category",
      Cell: (row) => {
        return <span>{row?.cell?.value?.category_name}</span>;
      },
    },
    {
      Header: "sub category",
      accessor: "subcategory",
      Cell: (row) => {
        return <span>{row?.cell?.value?.subCategory_name}</span>;
      },
    },
    // {
    //   Header: "action",
    //   accessor: "uuid",
    //   Cell: (row) => {
    //     return (
    //       <div className="flex space-x-3 rtl:space-x-reverse">
    //         <Tooltip
    //           content="View"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={(e) => viewUserRecord(row?.cell?.value)}
    //           >
    //             <Icon icon="heroicons:eye" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip
    //           content="Edit"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={(e) => (
    //               editRecord(row?.cell?.row?.values), setModalName("update")
    //             )}
    //           >
    //             <Icon icon="heroicons:pencil-square" />
    //           </button>
    //         </Tooltip>

    //         <Tooltip
    //           content="Delete"
    //           placement="top"
    //           arrow
    //           animation="shift-away"
    //           theme="danger"
    //         >
    //           <button
    //             className="action-btn"
    //             type="button"
    //             onClick={() => deleteConfirm(row)}
    //           >
    //             <Icon icon="heroicons:trash" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  const { isLoading } = useSelector((state) => state.loader);
  const { users } = useSelector((state) => state.brands);
  const { itemsPerPage } = useSelector((state) => state.brands);
  const { currentPage } = useSelector((state) => state.brands);
  const { globalSearch } = useSelector((state) => state.brands);
  const { singleUser } = useSelector((state) => state.brands);
  const [deleteRow, setDeleteRow] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [veiwUserData, setVeiwUserData] = useState(false);
  const [editRow, setEditRow] = useState({
    name: "",
    email: "",
    phone: "",
    is_verified: 0,
    status: 0,
    password: "",
    uuid: "",
    role_id: null,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers(handleParams());
  }, [itemsPerPage]);

  const handleParams = (page = currentPage, clearSearch = false) => {
    let params = [];
    params.page = page;
    params.itemsPerPage = itemsPerPage;
    params.sortDesc = "desc";
    params.query = clearSearch ? "" : globalSearch;
    let query = Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    return query;
  };

  const fetchUsers = async (query) => {
    dispatch(removeUsersError());
    dispatch(ON_LOADING(true));

    await getUsers(query).then((users) => {
      dispatch(ON_LOADING(false));
      users && dispatch(setUsers(users));
    });
  };
  // const viewUserRecord = async (query) => {
  //   dispatch(ON_LOADING(true));
  //   // console.log("query ",query);
  //   await getSingleUser(query).then((singleUser) => {
  //     dispatch(ON_LOADING(false));
  //     setVeiwUserData(true);
  //     singleUser && dispatch(setSingleUser(singleUser));
  //   });
  // };

  const searchRequest = async (state) => {
    // console.log("globalSearch" + globalSearch);
    dispatch(setCurrentPage(1));
    const query = handleParams(1, state);
    dispatch(removeUsersError());
    dispatch(ON_LOADING(true));
    await getUsers(query).then((users) => {
      dispatch(ON_LOADING(false));
      users && dispatch(setUsers(users));
    });
  };

  const handlePaginationChange = (page) => {
    fetchUsers(handleParams(page));
  };

  // const deleteConfirmAll = (value) => {
  //   const text = '{"cell":{"row":{"values":{"name":"Delete All"}}}}';
  //   const obj = JSON.parse(text);
  //   //console.log('obj', obj);
  //   if (value == "deleted") {
  //     setDeleteRow(obj);
  //     dispatch(setDeleteAll(true));
  //     dispatch(setactiveModal(true));
  //   }
  // };

  // const deleteConfirm = async (row) => {
  //   setDeleteRow(row);
  //   dispatch(setactiveModal(true));
  // };

  // const deleteRecord = async () => {
  //   dispatch(ON_LOADING(true));
  //   if (deleteAll == true) {
  //     dispatch(removeUsersError());
  //     await deleteUsers(selectedUsers).then((data) => {
  //       if (data.resp) {
  //         dispatch(ON_LOADING(false));
  //         dispatch(setactiveModal(false));
  //         dispatch(setdeleteConfrim(false));
  //         fetchUsers(handleParams());
  //       } else {
  //         dispatch(ON_LOADING(true));
  //         toast.error(data.error);
  //       }
  //     });
  //   } else {
  //     dispatch(removeUsersError());
  //     //console.log(deleteRow);
  //     await deleteUsers(deleteRow?.cell?.value).then((data) => {
  //       if (data.resp) {
  //         dispatch(ON_LOADING(false));
  //         dispatch(setactiveModal(false));
  //         dispatch(setdeleteConfrim(false));
  //         fetchUsers(handleParams());
  //       } else {
  //         dispatch(ON_LOADING(false));
  //         toast.error(data.error);
  //       }
  //     });
  //   }
  // };

  // const editRecord = async (row) => {
  //   // await getRoleListsForUser().then((rolesList) => {
  //   //   dispatch(ON_LOADING(false));
  //   //   setRolesList(rolesList);
  //   // });
  //   await getUser(row.uuid).then((user) => {
  //     dispatch(ON_LOADING(false));
  //     //setSelectedUser(user);
  //     setIsEditModal(true);
  //     setEditRow((prev) => ({
  //       email: user.email,
  //       name: user.name,
  //       phone: user.phone,
  //       is_verified: user.is_verified,
  //       status: user.status,
  //       uuid: user.uuid,
  //       role_id: user.role?.id,
  //     }));
  //   });
  // };

  // const updateUserDetails = async () => {
  //   dispatch(setdeleteConfrim(true));
  //   dispatch(ON_LOADING(true));
  //   // console.log(editRow);
  //   await updateUsers(editRow).then((data) => {
  //     console.log(data);
  //     dispatch(setdeleteConfrim(false));
  //     if (data.resp) {
  //       toast.success("User updated successfully.");
  //       dispatch(ON_LOADING(false));
  //       fetchUsers(handleParams());
  //       setIsEditModal(false);
  //       resetUser();
  //     } else {
  //       dispatch(ON_LOADING(false));
  //       toast.error(data.error);
  //     }
  //   });
  // };

  // const addUser = async () => {
  //   delete editRow.uuid;
  //   dispatch(ON_LOADING(true));
  //   dispatch(setdeleteConfrim(true));
  //   await addUsers(editRow).then((data) => {
  //     dispatch(setdeleteConfrim(false));
  //     if (data.resp) {
  //       dispatch(ON_LOADING(false));
  //       toast.success("User added succesfully!");
  //       fetchUsers(handleParams());
  //       setIsEditModal(false);
  //       resetUser();
  //     } else {
  //       dispatch(ON_LOADING(false));
  //       toast.error(data.error);
  //     }
  //   });
  // };

  const resetUser = async () => {
    console.log();
    // await getRoleListsForUser().then((rolesList) => {
    //   dispatch(ON_LOADING(false));
    //   setRolesList(rolesList);
    // });
    setEditRow({
      name: "",
      email: "",
      phone: "",
      is_verified: 0,
      status: 0,
      uuid: "",
      password: "",
      role_id: null,
    });
  };

  const columns = useMemo(() => COLUMNS, []);

  return (
    <>
      {/* <Confirmation
        title="Confirm"
        label="Confirm"
        labelClass="btn-outline-dark"
        className="max-w-md"
        centered
        footerContent={
          <Button
            text={"Delete"}
            isLoading={deleteConfrim}
            className="btn-danger "
            onClick={() => {
              dispatch(setdeleteConfrim(true));
              deleteRecord();
            }}
          />
        }
      >
        <h4 className="font-medium text-[16px] text-center text-slate-900">
          ({deleteRow?.cell?.row?.values?.name})
        </h4>
        <h4 className="font-medium text-[12px] text-center text-slate-900">
          Are you sure you want delete..?
        </h4>
      </Confirmation> */}
      {/* {veiwUserData && (
        <ViewUser
          singleUser={singleUser}
          veiwUserData={veiwUserData}
          setVeiwUserData={setVeiwUserData}
        />
      )} */}

      {/* {isEditModal && (
        <EditModel
          user={editRow}
          setUser={setEditRow}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          updateUserDetails={updateUserDetails}
          modalName={modalName}
          addUser={addUser}
          deleteConfrim={deleteConfrim}
          rolesList={rolesList}
        />
      )} */}

      {/* {isLoading && <Loader />} */}
      <Card>
        {users?.data && (
          <UserTable
            title={title}
            columns={columns}
            userData={users}
            handlePaginationChange={handlePaginationChange}
            setModalName={setModalName}
            setIsEditModal={setIsEditModal}
            setEditRow={setEditRow}
            setSelectedUsers={setSelectedUsers}
            // deleteConfirmAll={deleteConfirmAll}
            searchRequest={searchRequest}
            resetUser={resetUser}
          />
        )}
      </Card>
    </>
  );
};

export default UserList;
