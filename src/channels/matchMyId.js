const matchMyId = function (id1, id2) {
  if (id1 === id2) {
    return "me";
  }
  return "other";
};

module.exports = matchMyId;
