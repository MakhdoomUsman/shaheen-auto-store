import React, { useEffect, useState } from "react";
import Textinput from "../Textinput";
import Button from "../Button";
import Modal from "../Modal";
import Switch from "../Switch";
import Select, { components } from "react-select";
import { ON_LOADING } from "@/store/loader";
import Loader from "@/components/Loader";
import InputPhone from "@/components/ui/InputPhone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditModel = ({
  subCategory,
  setSubCategory,
  isEditModal,
  setIsEditModal,
  updateSubCategoryDetails,
  modalName,
  addSubCategory,
  deleteConfrim,
  categoryList,
}) => {
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setSubCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelect = (e) => {
    console.log("slect value", e);
    setSubCategory((prev) => ({ ...prev, ["category"]: e.value }));
  };
  const [errors, setErrors] = useState({});
  const { isLoading } = useSelector((state) => state.loader);

  const validateForm = () => {
    const error = {};
    let valid = true;
    const subCategoryName = /[a-zA-Z\s]{3,}/;
    const password = /^[^\s]{8,}$/;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneNumberPattern =
      /^(?:\+?\d{1,3})?[ -]?\(?(?:\d{2,3})\)?[ -]?\d{3}[ -]?\d{4}$/;

    if (!subCategory?.name) {
      error.name = "SubCategory name is required";
      valid = false;
    } else if (!subCategoryName.test(subCategory?.name)) {
      error.name = "Name should be minimum 3 letters";
      valid = false;
    }
    if (!subCategory?.category) {
      error.category = "Category is required";
      valid = false;
    }

    setErrors(error);
    return valid;
  };
  const resetSubCategory = () => {
    setSubCategory({
      name: "",
      description: "",
      category: "",
    });
  };
  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, color: "#626262", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  console.log();
  return (
    <Modal
      title={`${modalName} SubCategory`}
      showModal={isEditModal}
      setShowModal={setIsEditModal}
      uncontrol
      footerContent={
        <>
          <Button
            text="Cancel"
            className=" border-2 border-red-500 outline-red-500 btn-sm text-red-500"
            onClick={() => {
              setIsEditModal(!isEditModal);
            }}
          />
          {modalName === "update" ? (
            <Button
              text="Update"
              className="btn-success btn-sm "
              isLoading={deleteConfrim}
              onClick={
                () => {
                  if (validateForm()) {
                    updateSubCategoryDetails();
                  }
                }
                // setIsEditModal(!isEditModal),
              }
            />
          ) : (
            <Button
              text="Save"
              className="btn-success btn-sm "
              isLoading={deleteConfrim}
              onClick={
                () => {
                  if (validateForm()) {
                    addSubCategory();
                  }
                }
                // setIsEditModal(!isEditModal),
              }
            />
          )}
        </>
      }
    >
      {isLoading && <Loader position="absolute" />}
      <div className="flex flex-col gap-2 text-base text-slate-600 dark:text-slate-300">
        <Textinput
          label="SubCategory Name"
          type="text"
          inputName="name"
          defaultValue={subCategory?.name}
          onChange={handleInputs}
          placeholder="Type your subCategory Name"
          error={errors.name}
          onKeyUp={validateForm}
        />
        <Textinput
          label="SubCategory Discription "
          type="text"
          inputName="description"
          defaultValue={subCategory?.description}
          onChange={handleInputs}
          placeholder="Type your subCategory description"
        />
        <label className="form-label" htmlFor="mul_1">
          Category
        </label>
        {categoryList.length > 0 ? (
          <div className="">
            <Select
              isClearable={false}
              defaultValue={categoryList.map((data) => {
                return data.value === subCategory?.value ? data : null;
              })}
              styles={styles}
              // closeMenuOnSelect={false}
              onChange={handleSelect}
              name="category"
              options={categoryList}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
            {errors?.category && (
              <p className="text-sm text-danger-500">{errors?.category}</p>
            )}
          </div>
        ) : (
          <p
            className="text-sm text-red-600 cursor-pointer after:content-['_↗'] pl-2.5"
            onClick={() => navigate("/category")}
          >
            Please add Category before assiging
          </p>
        )}
      </div>
    </Modal>
  );
};

export default EditModel;
