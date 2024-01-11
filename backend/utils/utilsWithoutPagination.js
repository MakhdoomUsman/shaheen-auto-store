// utils.js
module.exports = {
  generateSimpleResponse: (outcome, outcomeCode, attribute, records) => {
    const response = {
      _metadata: {
        outcome: outcome || "SUCCESS",
        outcomeCode: outcomeCode || 200,
        numOfRecords: records.length,
        message: `${attribute}`,
      },
      records,

      errors: [],
    };

    return response;
  },
};
