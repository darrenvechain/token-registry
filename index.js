const { clean, build } = require('./script')
const { lint } = require('./validates')
const { redFont, yellowFont } = require('./utils')
const action = process.argv[2]
const net = process.argv[3]

async function buildAll() {
  console.log(yellowFont('start build all'));
  await clean()
  console.log(yellowFont('clean done'));
  await build('main', 'fungible')
  console.log(yellowFont('build main done'));
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
