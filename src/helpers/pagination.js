exports.getPagination = (page, size) => {
  // limit and offset which indicate respectively how many to take and how many records to skip .
  const limit = size ? size : 5;   
  const offset = page ? page * limit : 0;

  return {limit, offset};
};

exports.getPagingData = (data, page, limit) => {
  const {count: totalItems, rows: records} = data;
  const currentPage = page ? +page : 0;                   
  const totalPages = Math.ceil(totalItems / limit); // which returns total pages needed to display all records

  return {totalItems, records, totalPages, currentPage};
};
