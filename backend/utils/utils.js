// utils.js
module.exports = {
  generateResponse: (outcome, outcomeCode, attribute, records, req) => {
    const totalRecords = req.total;
    const totalPages = Math.ceil(totalRecords / req.query.itemsPerPage);

    const response = {
      _metadata: {
        outcome: outcome || "SUCCESS",
        outcomeCode: outcomeCode || 200,
        numOfRecords: records.length,
        message: `${attribute}`,
      },
      records: {
        current_page: req.skip / req.query.itemsPerPage + 1,
        data: records,
        first_page_url: "/",
        from: req.skip + 1,
        last_page: totalPages,
        last_page_url: `/?page=${totalPages}`,
        links: [],
        next_page_url: null,
        path: "/",
        per_page: req.query.itemsPerPage,
        prev_page_url: null,
        to: req.skip + records.length,
        total: totalRecords,
      },
      errors: [],
    };

    // Generate pagination links manually
    for (let i = 1; i <= totalPages; i++) {
      response.records.links.push({
        url: `/?page=${i}`,
        label: i.toString(),
        active: i === response.records.current_page,
      });
    }

    // Set next_page_url and prev_page_url
    if (response.records.current_page < totalPages) {
      response.records.next_page_url = `/?page=${
        response.records.current_page + 1
      }`;
    }
    if (response.records.current_page > 1) {
      response.records.prev_page_url = `/?page=${
        response.records.current_page - 1
      }`;
    }

    return response;
  },
};
