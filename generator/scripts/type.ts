export interface Props {
  name: string,
  specs: {
    steps: number[],
    hue: {
      start: number,
      end: number,
      rotation: string,
      curve: number[]
    },
    chroma: {
      start: number,
      end: number,
      curve: number[]
    },
    // tone needs to stay the same for all?
    tone: {
      start: number,
      end: number
    },
    brand?: string
  }
}

export type Color = {
  name: string,
  swatch: Swatch[]
}

export type Swatch = {
  step: number,
  hex: string,
  contrastWhite: string,
  contrastBlack: string,
  hue: number,
  chroma: number,
  tone: number
}