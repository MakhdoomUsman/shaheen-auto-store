export const getInvoices = (payload) => {
  ApiService.setHeader();
  const data = ApiService.get("api/get-invoices?" + payload)
    .then(function (result) {
      if (result?.data?._metadata?.outcomeCode === 200) {
        return result?.data?.records;
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
