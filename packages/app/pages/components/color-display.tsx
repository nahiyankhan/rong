import { useState, useEffect } from "react";
import styles from '../../styles/colordisplay.module.scss'
import Palette from './palette'
import { generate } from '@rong/generator'
import { motion } from 'framer-motion'
import AddPalette from './ui/add-palette'
import AddStep from "./ui/add-step";

const ColorDisplay = () => {
  const [colorProps, setColorProps] = useState([]);
  const [palettes, setPalettes] = useState([]);
  const [steps, setSteps] = useState([20,30,45,65,80])
  const [tone, setTone] = useState({
    start: 30,
    end: 90
  })
  const [bg, setBg] = useState('')

  const randomColorProp = () => {
    const hue = randomHue();
    const prop = {
      name: 'color',
      specs: {
        hue,
        chroma: {
          start: 15,
          end: 100,
          curve: [0.5, 0.5, 0.5, 0.5]
        }
      }
    };

    return prop;
  }

  const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomHue = () => {
    const curve = [0.5, 0.5, 0.5, 0.5];
    const start = randomInt(15, 345);
    // const start = randomInt(135, 145); // cash equivalent
    const rotation = randomInt(0, 1) ? 'cw' : 'ccw';
    const end = 'cw' ? start+10 : start-10;

    return {
      start,
      end,
      rotation,
      curve
    }
  }

  // initial state
  useEffect(() => {
    setColorProps([randomColorProp()]);
  }, []);

  // update palette whenever props change
  useEffect(() => {
    const colors = [];
    colorProps.forEach(config => colors.push(generate(config, steps, tone)));
    setPalettes(colors);
  }, [colorProps, steps, tone]);

  // update bg whenever palette chagnes
  useEffect(() => {
    if (palettes.length > 1) {
      const gradient = `linear-gradient(-45deg, ${palettes.map(color => color.averageColor + 'bf').join(',')})`
      console.log(gradient)
      setBg(gradient)
    } else if (palettes.length === 1) {
      setBg(`linear-gradient(-45deg, ${palettes[0].averageColor}bf, ${palettes[0].averageColor}bf)`)
    }
  }, [palettes])
   
  // add-palette onClick
  const addPalette = () => {
    const colorProp = randomColorProp();
    setColorProps(current => [...current, colorProp])
  }

  // add-step onClick
  const addStep = () => {
    const step = (100 - steps[steps.length - 1])/2 + steps[steps.length - 1]
    setSteps( prevState => [...prevState, step])
  }

  // change set
  const changeSet = (e) => {
    const newSteps = e.target.value.replaceAll(' ', '').split(',').map(Number);
    newSteps.sort((a, b) => a - b);
    setSteps(newSteps);
  }

  // change tone start
  const changeToneStart = (e) => {
    setTone(prevState => ({
      ...prevState,
      start: parseInt(e.target.value)
    }))
  }

  // change tone end
  const changeToneEnd = (e) => {
    setTone(prevState => ({
      ...prevState,
      end: parseInt(e.target.value)
    }))
  }

  return (
    <div 
      className={styles['color-display']}
      style={{
        backgroundImage: bg
      }}>
      <motion.div 
        className={styles['palette-container']}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
      >
        {palettes.map((palette, i) => (
          <Palette 
            index={i}
            palette={palette}
            length={palettes.length} />
        ))}
      </motion.div>

      <AddPalette clickHandler={addPalette}/>
      <AddStep clickHandler={addStep}/>

      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          top: 0,
          left: 0
        }}>
        <input 
          onChange={changeSet}
          value={steps.join(',')}
          placeholder="change set"/>
        <input 
          onChange={changeToneStart}
          value={tone.start}
          placeholder="change start tone"/>
        <input 
          onChange={changeToneEnd}
          value={tone.end}
          placeholder="change end tone"/>
      </div>
    </div>
  )
}

export default ColorDisplay