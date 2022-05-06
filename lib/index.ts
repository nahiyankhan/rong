import { HCT, hexFromArgb } from "@material/material-color-utilities";
import BezierEasing from 'bezier-easing'
import { curves } from "./curves";
import { Props, Color, Swatch } from "./type";
import { default as chromajs } from 'chroma-js'

// Shortcut 
const log = console.log

export function generate(
  props: Props
) {
  const name = props.name
  const hue = props.specs.hue
  const chroma = props.specs.chroma
  const tone = props.specs.tone
  const steps = props.specs.steps
  
  const hueCoords: number[] = getCoords(hue.start, hue.end, hue.curve, steps)
  const chromaCoords: number[] = getCoords(chroma.start, chroma.end, chroma.curve, steps)
  const toneCoords: number[] = getCoords(tone.start, tone.end, curves.linear.value, steps)

  const swatch: Swatch[] = []

  for (const index in steps) {
    const step = steps[index]
    const hct = HCT.from(hueCoords[index], chromaCoords[index], toneCoords[index])
    const hex = hexFromArgb(hct.toInt())
    const contrastBlack = chromajs.contrast(hex, 'black').toFixed(2)
    const contrastWhite = chromajs.contrast(hex, 'white').toFixed(2)

    swatch.push(
      {
        step: step,
        hex: hex,
        contrastBlack: contrastBlack,
        contrastWhite: contrastWhite,
        hue: hct.hue,
        chroma: hct.chroma,
        tone: hct.tone
      }
    )
  }

  const color = {
    name: name,
    swatch: swatch
  }

  return {
    color
  }
}

function getCoords(
  start: number,
  end: number,
  curve: number[],
  steps: number[]
) {
  const coords: number[] = []
  const easing = BezierEasing(curve[0], curve[1], curve[2], curve[3])

  for (const index in steps) {
    const step = steps[index]/100
    const stepRatio = easing(step)
    const value = mapValue(stepRatio, 0, 1, start, end, true)
    coords.push(value)
  }
  
  return coords
}

// Maps a value with a range [start, end] to [0, 1]
// Inspired by https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56

function mapValue(
  input: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
  limit: boolean
) {
  const value = (input - fromLow)/(fromHigh - fromLow) * (toHigh - toLow) + toLow
  
  if (limit === true) {
    if (toLow < toHigh) {
      if (value < toLow) {
          return toLow;
      }
      if (value > toHigh) {
          return toHigh;
      }
    }
    else {
        if (value > toLow) {
            return toLow;
        }
        if (value < toHigh) {
            return toHigh;
        }
    }
  }

  return value
}