const { test } = require("tap");

test("smoke test", (t) => {
  require("../../app");
  t.end();
});
