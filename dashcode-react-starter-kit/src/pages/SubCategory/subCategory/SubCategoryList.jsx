import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import {
  removeSubCategoriesError,
  setSubCategoriesErrors,
  setSubCategories,
  updateSubCategory,
  setCurrentPage,
  setSingleSubCategory,
} from "../store/store";
import { ON_LOADING } from "@/store/loader";
import Loader from "@/components/Loader";
import { useSelector, useDispatch } from "react-redux";
import SubCategoryTable from "@/components/ui/subCategory/SubCategoryTable";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import {
  setactiveModal,
  setdeleteConfrim,
  setDeleteAll,
} from "@/store/services/common/confirmation.module";
import EditModel from "@/components/ui/subCategory/EditModel";

import {
  addSubCategories,
  getCategory,
  getSingleSubCategory,
  getSubCategory,
} from "../store/actions";
import ViewSubCategory from "@/components/ui/subCategory/ViewSubCategory";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
// import { getRoleListsForSubCategory } from "../../role_management/store/actions";

const SubCategoryList = ({ title = "Manage Sub-Category" }) => {
  const [modalName, setModalName] = useState("");

  const COLUMNS = [
    {
      Header: "Sub category name",
      accessor: "subCategory_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Sub Category disc",
      accessor: "subCategory_disc",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "category Name",
      accessor: "category",
      Cell: (row) => {
        return <span>{row?.cell?.value?.category_name}</span>;
      },
    },

    {
      Header: "action",
      accessor: "uuid",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            {/* <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={(e) => viewSubCategoryRecord(row?.cell?.value)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip> */}

            <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={(e) => (
                  editRecord(row?.cell?.row?.values), setModalName("update")
                )}
              >
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>

            <Tooltip
              content="Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => deleteConfirm(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const { isLoading } = useSelector((state) => state.loader);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { itemsPerPage } = useSelector((state) => state.subCategory);
  const { currentPage } = useSelector((state) => state.subCategory);
  const { globalSearch } = useSelector((state) => state.subCategory);
  const { singleSubCategory } = useSelector((state) => state.subCategory);
  const [deleteRow, setDeleteRow] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [veiwSubCategoryData, setVeiwSubCategoryData] = useState(false);
  const [editRow, setEditRow] = useState({
    name: "",
    description: "",
    category: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    fetchsubCategory(handleParams());
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

  const fetchsubCategory = async (query) => {
    dispatch(removeSubCategoriesError());
    dispatch(ON_LOADING(true));

    await getSubCategory(query).then((subCategories) => {
      dispatch(ON_LOADING(false));
      subCategories && dispatch(setSubCategories(subCategories));
    });
  };
  // const viewSubCategoryRecord = async (query) => {
  //   dispatch(ON_LOADING(true));
  //   // console.log("query ",query);
  //   await getSingleSubCategory(query).then((singleSubCategory) => {
  //     dispatch(ON_LOADING(false));
  //     setVeiwSubCategoryData(true);
  //     singleSubCategory && dispatch(setSingleSubCategory(singleSubCategory));
  //   });
  // };

  const searchRequest = async (state) => {
    // console.log("globalSearch" + globalSearch);
    dispatch(setCurrentPage(1));
    const query = handleParams(1, state);
    dispatch(removeSubCategoriesError());
    dispatch(ON_LOADING(true));
    await getSubCategory(query).then((subCategories) => {
      dispatch(ON_LOADING(false));
      subCategories && dispatch(setSubCategories(subCategories));
    });
  };

  const handlePaginationChange = (page) => {
    fetchsubCategory(handleParams(page));
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
  //     dispatch(removeSubCategoriesError());
  //     await deleteSubCategories(selectedSubCategories).then((data) => {
  //       if (data.resp) {
  //         dispatch(ON_LOADING(false));
  //         dispatch(setactiveModal(false));
  //         dispatch(setdeleteConfrim(false));
  //         fetchsubCategory(handleParams());
  //       } else {
  //         dispatch(ON_LOADING(true));
  //         toast.error(data.error);
  //       }
  //     });
  //   } else {
  //     dispatch(removeSubCategoriesError());
  //     //console.log(deleteRow);
  //     await deleteSubCategories(deleteRow?.cell?.value).then((data) => {
  //       if (data.resp) {
  //         dispatch(ON_LOADING(false));
  //         dispatch(setactiveModal(false));
  //         dispatch(setdeleteConfrim(false));
  //         fetchsubCategory(handleParams());
  //       } else {
  //         dispatch(ON_LOADING(false));
  //         toast.error(data.error);
  //       }
  //     });
  //   }
  // };

  const editRecord = async (row) => {
    await getCategory().then((categoryList) => {
      dispatch(ON_LOADING(false));
      setCategoryList(categoryList);
    });
    row &&
      (await getSubCategory(row.uuid).then((subCategory) => {
        dispatch(ON_LOADING(false));
        //setSelectedSubCategory(subCategory);
        setIsEditModal(true);
        setEditRow((prev) => ({
          email: subCategory.email,
          name: subCategory.name,
          phone: subCategory.phone,
          is_verified: subCategory.is_verified,
          status: subCategory.status,
          uuid: subCategory.uuid,
          category: subCategory.role?.id,
        }));
      }));
  };

  const updateSubCategoryDetails = async () => {
    dispatch(setdeleteConfrim(true));
    dispatch(ON_LOADING(true));
    // console.log(editRow);
    await updateSubCategories(editRow).then((data) => {
      console.log(data);
      dispatch(setdeleteConfrim(false));
      if (data.resp) {
        toast.success("SubCategory updated successfully.");
        dispatch(ON_LOADING(false));
        fetchsubCategory(handleParams());
        setIsEditModal(false);
        resetSubCategory();
      } else {
        dispatch(ON_LOADING(false));
        toast.error(data.error);
      }
    });
  };

  const addSubCategory = async () => {
    dispatch(ON_LOADING(true));
    // dispatch(setdeleteConfrim(true));
    console.log("Edit record data", editRow);
    const recordData = {
      subCategory_name: editRow?.name,
      subCategory_disc: editRow?.description,
      category: editRow?.category,
    };

    await addSubCategories(recordData).then((data) => {
      dispatch(setdeleteConfrim(false));
      if (data) {
        dispatch(ON_LOADING(false));
        toast.success("SubCategory added succesfully!");
        fetchsubCategory(handleParams());
        setIsEditModal(false);
        resetSubCategory();
      } else {
        dispatch(ON_LOADING(false));
        toast.error(data.error);
      }
    });
  };

  const resetSubCategory = async () => {
    console.log();
    // await getRoleListsForSubCategory().then((categoryList) => {
    //   dispatch(ON_LOADING(false));
    //   setCategoryList(categoryList);
    // });
    setEditRow({
      name: "",
      description: "",
      category: "",
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
      {/* {veiwSubCategoryData && (
        <ViewSubCategory
          singleSubCategory={singleSubCategory}
          veiwSubCategoryData={veiwSubCategoryData}
          setVeiwSubCategoryData={setVeiwSubCategoryData}
        />
      )} */}

      {isEditModal && (
        <EditModel
          subCategory={editRow}
          setSubCategory={setEditRow}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          updateSubCategoryDetails={updateSubCategoryDetails}
          modalName={modalName}
          addSubCategory={addSubCategory}
          // deleteConfrim={deleteConfrim}
          categoryList={categoryList}
        />
      )}

      {/* {isLoading && <Loader />} */}
      <Card>
        {subCategories?.data && (
          <SubCategoryTable
            title={title}
            columns={columns}
            subCategoryData={subCategories}
            handlePaginationChange={handlePaginationChange}
            setModalName={setModalName}
            setIsEditModal={setIsEditModal}
            setEditRow={setEditRow}
            setSelectedSubCategories={setSelectedSubCategories}
            // deleteConfirmAll={deleteConfirmAll}
            editRecord={editRecord}
            searchRequest={searchRequest}
            resetSubCategory={resetSubCategory}
          />
        )}
      </Card>
    </>
  );
};

export default SubCategoryList;
