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
  user,
  setUser,
  isEditModal,
  setIsEditModal,
  updateUserDetails,
  modalName,
  addUser,
  deleteConfrim,
  rolesList,
}) => {
  useEffect(() => {
    if (modalName === "add") {
      (user.password = ""), resetUser();
    } else {
      delete user.password;
    }
    // console.log("user detail => ", user);
  }, []);
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelect = (e) => {
    console.log("slect value", e);
    setUser((prev) => ({ ...prev, ["role_id"]: e.value }));
  };
  const [errors, setErrors] = useState({});
  const { isLoading } = useSelector((state) => state.loader);

  const validateForm = () => {
    const error = {};
    let valid = true;
    const userName = /[a-zA-Z\s]{3,}/;
    const password = /^[^\s]{8,}$/;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneNumberPattern =
      /^(?:\+?\d{1,3})?[ -]?\(?(?:\d{2,3})\)?[ -]?\d{3}[ -]?\d{4}$/;

    if (!user?.name) {
      error.name = "User name is required";
      valid = false;
    } else if (!userName.test(user?.name)) {
      error.name = "Name should be minimum 3 letters";
      valid = false;
    }
    if (modalName === "add") {
      if (!user?.password) {
        error.password = "Password is required";
        valid = false;
      } else if (!password.test(user?.password)) {
        error.password = "Password must be minimum 8 letters without spaces";
        valid = false;
      }
    }
    if (!user?.phone) {
      error.phone = "Phone is required";
      valid = false;
    } else if (!phoneNumberPattern.test(user?.phone)) {
      error.phone = "Phone is Invalid";
      valid = false;
    }
    if (!user?.email) {
      error.email = "Email is required";
      valid = false;
    } else if (!regex.test(user?.email)) {
      error.email = "Email is invalid";
      valid = false;
    }
    if (!user?.role_id) {
      error.role_id = "User role is required";
      valid = false;
    }

    setErrors(error);
    return valid;
  };
  const resetUser = () => {
    setUser({
      name: "",
      email: "",
      phone: "",
      is_verified: 0,
      status: 0,
      uuid: "",
      role_id: null,
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
      title={`${modalName} User`}
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
                    updateUserDetails();
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
                    addUser();
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
          label="Name"
          type="text"
          inputName="name"
          defaultValue={user?.name}
          onChange={handleInputs}
          placeholder="Type your name"
          error={errors.name}
          onKeyUp={validateForm}
        />
        <Textinput
          label="Email"
          type="email"
          inputName="email"
          defaultValue={user?.email}
          onChange={handleInputs}
          placeholder="Type your email"
          error={errors.email}
          onKeyUp={validateForm}
        />
        {/* <Textinput
          label="Phone"
          type="text"
          inputName="phone"
          defaultValue={user?.phone}
          onChange={handleInputs}
          placeholder="Enter your phone number"
          error={errors.phone}
          onKeyUp={validateForm}
        /> */}
        <InputPhone
          label="Phone"
          countryCallingCodeEditable={false}
          defaultCountry="AE"
          onChange={(e) => setUser((prev) => ({ ...prev, ["phone"]: e }))}
          phone={user?.phone}
          control={false}
          error={errors.phone}
        />
        {modalName === "add" && (
          <Textinput
            label="Password"
            type="password"
            inputName="password"
            defaultValue={user?.password}
            onChange={handleInputs}
            placeholder="Enter your account password"
            error={errors.password}
            onKeyUp={validateForm}
          />
        )}
        <label className="form-label" htmlFor="mul_1">
          Role
        </label>
        {rolesList.length > 0 ? (
          <div className="">
            <Select
              isClearable={false}
              defaultValue={rolesList.map((data) => {
                return data.value === user?.role_id ? data : null;
              })}
              styles={styles}
              // closeMenuOnSelect={false}
              onChange={handleSelect}
              name="role_id"
              options={rolesList}
              className="react-select"
              classNamePrefix="select"
              id="mul_1"
            />
            {errors?.role_id && (
              <p className="text-sm text-danger-500">{errors?.role_id}</p>
            )}
          </div>
        ) : (
          <p
            className="text-sm text-red-600 cursor-pointer after:content-['_↗'] pl-2.5"
            onClick={() => navigate("/role-management")}
          >
            Please add Role before assiging
          </p>
        )}
        <div className="flex items-center gap-x-6 my-3">
          <Switch
            label="Is Verified"
            value={user?.is_verified}
            onChange={() =>
              setUser((prev) => ({
                ...prev,
                is_verified: prev.is_verified === 1 ? 0 : 1,
              }))
            }
          />
          <Switch
            label="Status"
            value={user?.status}
            onChange={() =>
              setUser((prev) => ({
                ...prev,
                status: prev.status === 1 ? 0 : 1,
              }))
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModel;
