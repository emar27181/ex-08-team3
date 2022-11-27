const formatDate = function (date) {
  const formatDateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
  };
  return new Intl.DateTimeFormat("ja", formatDateOptions).format(date);
};

module.exports = formatDate;