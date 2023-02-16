const { clean, build } = require('./script')
const { lint } = require('./validates')
const { redFont } = require('./utils')
const action = process.argv[2]
const net = process.argv[3]

async function buildAll() {
  await clean()
  await build('main', 'fungible')
  await build('test', 'fungible')
}

async function lintAll() {
  await lint('main', 'fungible')
  await lint('test', 'fungible')
}

async function execFun(net) {
  if (action === '-l') {
    if (net === 'all') {
      await lintAll()
    } else {
      await lint(net, 'fungible')
    }
  } else if (action === '-b') {
    if (net === 'all') {
      await lintAll()
      await buildAll()
    } else {
      clean()
      await lint(net, 'fungible')
      await build(net, 'fungible')
    }
  }
}

async function start() {
  switch (net) {
    case 'main':
      await execFun('main')
      break

    case 'test':
      await execFun('test')
      break
    case 'clean':
      await clean()
      break
    default:
      await execFun('all')
      break
  }
}

start().catch((error) => {
  console.error(redFont(error.message))
  process.exit(1)
})