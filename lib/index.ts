import { HCT } from "@material/material-color-utilities";
const color = HCT.fromInt(0xff4285f4)
const test = HCT.from(10, 10, 10)

export function getColor(): {} {
  const toRet = {
    hue: color.hue,
    chrome: color.chroma,
    tone: color.tone
  }
  return toRet;
}