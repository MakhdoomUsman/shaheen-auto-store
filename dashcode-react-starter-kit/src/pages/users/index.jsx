import React from "react";
import Card from "@/components/ui/Card";
import UserList from "./user/UserList";

const ManageUsers = () => {
  return (
    <div className=" space-y-5">
      <UserList />
    </div>
  );
};

export default ManageUsers;
