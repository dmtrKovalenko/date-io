const Benchmark = require("benchmark");
const DayjsUtils = require("@date-io/dayjs");
const LuxonUtils = require("@date-io/luxon");
const MomentUtils = require("@date-io/moment");
const DateFnsUtils = require("@date-io/date-fns");

module.exports = (name, operation) => {
  const suite = new Benchmark.Suite('formats', {
    minSamples: 1000,
    onError: event => console.log(event.target.error)
  });

  suite
    .add("day-js", operation(DayjsUtils))
    .add("luxon", operation(LuxonUtils))
    .add("moment", operation(MomentUtils))
    .add("date-fns", operation(DateFnsUtils))
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .on("error", console.log)
    .run({ async: true });
}
