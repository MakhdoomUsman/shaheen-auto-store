import { toast } from "react-toastify";
import ApiService from "../../../store/services/api.service";

export const getUsers = (payload) => {
  ApiService.setHeader();
  const data = ApiService.get("api/categories/get-all-category?" + payload)
    .then(function (result) {
      if (result.data._metadata.outcomeCode === 200) {
        return result.data.records;
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};
export const getSingleUser = (payload) => {
  ApiService.setHeader();
  const data = ApiService.get("api/get-user/" + payload)
    .then(function (result) {
      if (result.data._metadata.outcomeCode === 200) {
        return result.data.records;
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};
export const getUser = (uuid) => {
  ApiService.setHeader();
  const data = ApiService.get("api/get-user/" + uuid)
    .then(function (result) {
      if (result.data._metadata.outcomeCode === 200) {
        return result.data.records;
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};
export const getPermissionList = () => {
  ApiService.setHeader();
  const data = ApiService.get("api/get-vendor-permissions-list")
    .then(function (result) {
      if (result.data._metadata.outcomeCode === 200) {
        return result.data.records;
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return null;
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};

export const addUsers = (row) => {
  ApiService.setHeader();
  const data = ApiService.post(`api/create-user`, row)
    .then(function (result) {
      if (result.data._metadata.outcome === "SUCCESS") {
        return { resp: true, data: result.data.records };
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return { resp: false, error: result.data.errors[0] };
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};

export const deleteUsers = (id) => {
  ApiService.setHeader();
  const data = ApiService.delete("api/delete-selected-users", `uuids=${id}`)
    .then(function (result) {
      if (result.data._metadata.outcome === "SUCCESS") {
        toast.success("User deleted successfully.");
        return { resp: true, data: result.data.records };
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return { resp: false, error: result.data.errors[0] };
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};

export const updateUsers = (row) => {
  ApiService.setHeader();
  const data = ApiService.post(`api/update-user/${row.uuid}`, row)
    .then(function (result) {
      if (result.data._metadata.outcome === "SUCCESS") {
        return { resp: true, data: result.data.records };
      } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
        window.open("/package-expire", "_self");
      } else {
        return { resp: false, error: result.data.errors[0] };
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return error;
    });

  return data;
};
