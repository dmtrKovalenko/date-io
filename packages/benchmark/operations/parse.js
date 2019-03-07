const runBenchmark = require('../run')

const runFormats = Utils => () => {
  const utils = new Utils();

  utils.parse("2018", "yyyy")
  utils.parse("March 7th 11:37", utils.dateTime24hFormat)
  utils.parse("March 07 11:37", utils.dateTime24hFormat)
  utils.parse("invalid", utils.dateTime24hFormat)
};

runBenchmark('parse', runFormats)
