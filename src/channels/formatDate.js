const formatDate = function (date) {
  const now = new Date();
  const jpDate = new Date(
    date + (date.getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  const year = jpDate.getFullYear();
  const month = jpDate.getMonth();
  const day = jpDate.getDate();
  const time = `${jpDate.getHours()}:${jpDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  let formatedDate = time;
  if (now.getFullYear() !== year) {
    formatedDate = `${year}/${jpDate.getMonth() + 1}/${day} ${time}`;
  } else if (now.getMonth() !== month || now.getDate() !== day) {
    formatedDate = `${jpDate.getMonth() + 1}/${day} ${time}`;
  }

  return formatedDate;
};

module.exports = formatDate;
