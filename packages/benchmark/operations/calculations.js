const runBenchmark = require("../run");

const runCalculations = Utils => () => {
  const utils = new Utils();
  const date = utils.date();

  utils.startOfDay(date);
  utils.startOfMonth(date);
  utils.getNextMonth(date);
  utils.setMonth(date, 3);

  utils.addDays(date, 5);
  utils.addDays(date, -2);
  utils.setYear(date, 2000);

  utils.isBeforeDay(date, utils.date());
  utils.isAfterDay(date, utils.date());

  utils.getDiff(date, utils.date());
};

runBenchmark("formats", runCalculations);
