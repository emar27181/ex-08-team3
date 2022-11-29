const formatDate = function (date) {
  const now = new Date();
  const jpDate = new Date(
    date + (date.getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const year = jpDate.getFullYear();
  const day = jpDate.getDate();
  let formatedDate = `${jpDate.getHours()}:${jpDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  if (now.getDate() !== day) {
    formatedDate = `${jpDate.getMonth() + 1}/${day} ${formatedDate}`;
  }
  if (now.getFullYear() !== year) {
    formatedDate = `${year}/${formatedDate}`;
  }
  return formatedDate;
};

module.exports = formatDate;
