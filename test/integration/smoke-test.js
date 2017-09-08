const {test} = require('tap')

test('smoke test', (t) => {
  require('../../server')
  t.end()
})
