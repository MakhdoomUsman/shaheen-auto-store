import React, { useEffect } from "react";
// import Textinput from '../Textinput';
// import Button from '../Button';
import Modal from "../Modal";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import ProfileImage from "@/assets/images/users/user-1.jpg";
// import Switch from '../Switch';
// import Select, { components } from "react-select";

const ViewUser = ({ singleUser, veiwUserData, setVeiwUserData }) => {
  return (
    <Modal
      title={`User Detials`}
      showModal={veiwUserData}
      setShowModal={setVeiwUserData}
      uncontrol
      //   footerContent={ }
    >
      <div className="">
        <ul className="list space-y-7">
          <li className=" rtl:space-x-reverse border-b pb-1">
            <div className="rounded-full ring-4 ring-slate-900 relative w-[100px] mx-auto overflow-hidden">
              {singleUser?.image_public_url ? (
                <img src={singleUser?.image_public_url} alt={"User Image"} />
              ) : (
                <img src={ProfileImage} alt={"User Image"} />
              )}
            </div>

            <div className="capitalize text-center mt-3 font-semibold text-2xl text-slate-900 dark:text-slate-300 ">
              {singleUser?.name}
            </div>
          </li>
          <li className="flex  items-center rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="heroicons:envelope" />
            </div>

            <div className="capitalize ml-1.5 text-base text-slate-500 dark:text-slate-300 ">
              Email
            </div>
            <a
              href="mailto:someone@example.com"
              className="text-base w-max rtl:mr-auto ml-auto text-slate-600 dark:text-slate-50"
            >
              {singleUser?.email}
            </a>
          </li>
          <li className="flex  items-center rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="material-symbols:phone-in-talk" />
            </div>

            <div className="capitalize ml-1.5 text-base text-slate-500 dark:text-slate-300 ">
              Phone #
            </div>
            <a
              href="tel:0189749676767"
              className="text-base w-max rtl:mr-auto ml-auto text-slate-600 dark:text-slate-50"
            >
              {singleUser?.phone}
            </a>
          </li>
          <li className="flex  items-center rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="material-symbols:data-check" />
            </div>

            <div className="capitalize ml-1.5 text-base text-slate-500 dark:text-slate-300 ">
              Account Status
            </div>
            <div className="text-base w-max rtl:mr-auto ml-auto text-slate-600 dark:text-slate-50">
              {singleUser?.status == 1 ? (
                <Badge
                  label="Active"
                  className="bg-success-200 text-success-600 px-5 py-2 pill"
                />
              ) : (
                <Badge
                  label="Inactive"
                  className=" bg-danger-200 text-danger-600 px-5 py-2 pill"
                />
              )}
            </div>
          </li>
          <li className="flex  items-center rtl:space-x-reverse">
            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="material-symbols:playlist-add-check" />
            </div>

            <div className="capitalize ml-1.5 text-base text-slate-500 dark:text-slate-300 ">
              Verification Status
            </div>
            <div className="text-base w-max rtl:mr-auto ml-auto text-slate-600 dark:text-slate-50">
              {singleUser?.is_verified == 1 ? (
                <Badge
                  label="Verified"
                  className="bg-success-200 text-success-600 px-5 py-2 pill"
                />
              ) : (
                <Badge
                  label="Unverified"
                  className=" bg-danger-200 text-danger-600 px-5 py-2 pill"
                />
              )}
            </div>
          </li>
          <li className="rtl:space-x-reverse">
            <div className="flex-none flex items-center text-2xl text-slate-600 dark:text-slate-300">
              <Icon icon="mdi:wallet-membership" />
              <div className="capitalize ml-1.5 text-base text-slate-500 dark:text-slate-300 ">
                User Permissions
              </div>
            </div>

            <div className="text-base gap-2.5 flex flex-wrap mt-5 text-slate-600 dark:text-slate-50">
              {singleUser?.permission_ids.length > 0 ? (
                singleUser?.permission_ids.map((data, ind) => (
                  <Badge
                    label={data?.label}
                    className="bg-slate-900 px-4 py-2.5  text-white"
                  />
                ))
              ) : (
                <div className="capitalize  ml-8 text-sm text-slate-800 dark:text-slate-300 ">
                  No permission Granted
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ViewUser;
