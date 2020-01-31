const runBenchmark = require('../run')

const runFormats = Utils => () => {
  const utils = new Utils();

  utils.parse("2018", utils.formats.year)
  utils.parse("01/01/2019", utils.formats.keyboardDate)
  utils.parse("2019/01/01", utils.formats.keyboardDate)
  utils.parse("11:37", utils.formats.fullTime)
  utils.parse("11:37 PM", utils.formats.fullTime)
  utils.parse("2019/01/01 11:37 PM", utils.formats.keyboardDateTime)
  utils.parse("some invalid input", utils.formats.keyboardDateTime)
};

runBenchmark('parse', runFormats)
