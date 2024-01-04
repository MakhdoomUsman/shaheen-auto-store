import { toast } from "react-toastify";
import ApiService from "../../../store/services/api.service";

export const getSubCategory = (payload) => {
  ApiService.setHeader();
  const data = ApiService.get(
    "api/subcategories/get-all-subcategory?" + payload
  )
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
export const getSingleSubCategory = (payload) => {
  ApiService.setHeader();
  const data = ApiService.get("api/get-subCategory/" + payload)
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
// export const getSubCategory = (uuid) => {
//   ApiService.setHeader();
//   const data = ApiService.get("api/get-subCategory/" + uuid)
//     .then(function (result) {
//       if (result.data._metadata.outcomeCode === 200) {
//         return result.data.records;
//       } else if (result.data?._metadata?.outcome === "PACKAGE_NOT_ACTIVE") {
//         window.open("/package-expire", "_self");
//       } else {
//         return null;
//       }
//     })
//     .catch(function (error) {
//       console.log("Error: ", error);
//       return error;
//     });

//   return data;
// };
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

export const addSubCategories = (row) => {
  ApiService.setHeader();
  const data = ApiService.post(`api/create-subCategory`, row)
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

export const deleteSubCategories = (id) => {
  ApiService.setHeader();
  const data = ApiService.delete(
    "api/delete-selected-subCategories",
    `uuids=${id}`
  )
    .then(function (result) {
      if (result.data._metadata.outcome === "SUCCESS") {
        toast.success("SubCategory deleted successfully.");
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

export const updateSubCategories = (row) => {
  ApiService.setHeader();
  const data = ApiService.post(`api/update-subCategory/${row.uuid}`, row)
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
