const runBenchmark = require("../run");

const runFormats = Utils => () => {
  const utils = new Utils();
  const date = utils.date();

  Object.keys(utils.formats).forEach(formatKey => {
    utils.format(date, formatKey);
  });
};

runBenchmark("formats", runFormats);
