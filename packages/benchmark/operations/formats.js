const runBenchmark = require('../run')

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

runBenchmark('formats', runFormats)
