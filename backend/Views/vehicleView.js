// vehicleView.js
module.exports = {
  generateResponse: (req, paginatedRecords) => {
    const totalRecords = req.total;
    const totalPages = Math.ceil(totalRecords / req.query.limit);

    const response = {
      _metadata: {
        outcome: "SUCCESS",
        outcomeCode: 200,
        numOfRecords: paginatedRecords.length,
        message: "vehicles Brands!",
      },
      records: {
        current_page: req.skip / req.query.limit + 1,
        data: paginatedRecords,
        first_page_url: "/",
        from: req.skip + 1,
        last_page: totalPages,
        last_page_url: `/?page=${totalPages}`,
        links: [],
        next_page_url: null,
        path: "/",
        per_page: req.query.limit,
        prev_page_url: null,
        to: req.skip + paginatedRecords.length,
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
