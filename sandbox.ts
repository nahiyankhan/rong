import { generate } from './dist/index.js'
import mkdirp from 'mkdirp'
import * as fs from 'fs'

// Shortcut
const log = console.log

// Create Directory
mkdirp.sync('./palette');

// Color specs
const config = {
  name: 'powpow',
  specs: {
    steps: [0,20,40,60,80,100],
    hue: {
      start: 20,
      end: 60,
      rotation: 'cw',
      curve: [0.5, 0.5, 0.5, 0.5]
    },
    chroma: {
      start: 5,
      end: 40,
      curve: [0.5, 0.5, 0.5, 0.5]
    },
    tone: {
      start: 5,
      end: 80
    }
  }
}

const colors = generate(config)

//

fs.writeFileSync(
  './palette/palette.json',
  JSON.stringify(colors, null, 2)
);