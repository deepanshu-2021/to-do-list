const today = () => {
  const options = {
    weekday: "long",
  };
  const day = new Date();

  return day.toLocaleDateString("en-us", options);
};
module.exports.today = today;
const date = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const day = new Date();
  return day.toLocaleDateString("en-us", options);
};
module.exports.date = date;
