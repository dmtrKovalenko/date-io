const Benchmark = require("benchmark");
const DayjsUtils = require("@date-io/dayjs");
const LuxonUtils = require("@date-io/luxon");
const MomentUtils = require("@date-io/moment");
const DateFnsUtils = require("@date-io/date-fns");

const suite = new Benchmark.Suite('formats', {
  minSamples: 1000,
  onError: event => console.log(event.target.error)
});

const runFormats = Utils => () => {
  const utils = new Utils();
  const date = utils.date();

  [
    utils.yearFormat,
    utils.yearMonthFormat,
    utils.dateTime12hFormat,
    utils.dateTime24hFormat,
    utils.time12hFormat,
    utils.time24hFormat,
    utils.dateFormat
  ].forEach(formatString => {
    utils.format(date, formatString)
  })
};

suite
  .add("day-js", runFormats(DayjsUtils))
  .add("luxon", runFormats(LuxonUtils))
  .add("moment", runFormats(MomentUtils))
  .add("date-fns", runFormats(DateFnsUtils))
  .on("cycle", event => {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .on("error", console.log)
  .run({ async: true });
