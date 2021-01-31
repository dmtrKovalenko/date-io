const fs = require("fs");
const path = require("path");

const readmePath = path.resolve(__dirname, "..", "README.md");
const currentReadmeContent = fs.readFileSync(readmePath, {
  encoding: "utf-8",
});

const START_COMMENT = "<!--inline-interface-start-->";
const END_COMMENT = "<!--inline-interface-end-->";

const [startOfFile, afterStartMark] = currentReadmeContent.split(START_COMMENT);
const [_, endOfFile] = afterStartMark.split(END_COMMENT);

const utilsCode = fs.readFileSync(
  path.resolve(__dirname, "..", "packages", "core", "IUtils.d.ts"),
  {
    encoding: "utf-8",
  }
);

fs.writeFileSync(
  readmePath,
  [
    startOfFile,
    START_COMMENT,
    "\n```tsx\n",
    utilsCode,
    "```\n",
    END_COMMENT,
    endOfFile,
  ].join("")
);
