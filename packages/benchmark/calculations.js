const Benchmark = require("benchmark");
const DayjsUtils = require("@date-io/dayjs");
const LuxonUtils = require("@date-io/luxon");
const MomentUtils = require("@date-io/moment");
const DateFnsUtils = require("@date-io/date-fns");

const suite = new Benchmark.Suite('calculations', {
  minSamples: 1000,
  onError: event => console.log(event.target.error)
});

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

  utils.isBeforeDay(date, utils.date())
  utils.isAfterDay(date, utils.date())

  utils.getDiff(date, utils.date())
};

suite
  .add("day-js", runCalculations(DayjsUtils))
  .add("luxon", runCalculations(LuxonUtils))
  .add("moment", runCalculations(MomentUtils))
  .add("date-fns", runCalculations(DateFnsUtils))
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
