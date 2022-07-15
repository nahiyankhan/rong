import {useEffect, useRef} from 'react'
import styles from '../../styles/palette.module.scss'
import { motion } from 'framer-motion'

const Palette = (props) => {
  // const firstRender = useRef(true);

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  // });

  // const paletteInitial = {opacity: 0, flexGrow: 0.00001};
  // const paletteAnimate = {opacity: 1, flexGrow: 1};
  // const paletteTransition = {duration: 0.2, type: "spring", stiffness: 50};

  return (
    <motion.div
      key={props.index}
      className={styles.palette}
      initial={{opacity: 0, flexGrow: 0.00001}}
      animate={{opacity: 1, flexGrow: 1}}
      transition={{duration: 0.2}}
    >
      {props.palette.swatch.map((color, i) => (
        <motion.div 
          initial={{opacity: 0, flexGrow: 0.00001}}
          animate={{opacity: 1, flexGrow: 1}}
          transition={{duration: 0.2}}
          key={i}
          className={styles['color']}
          style={{
            background: color.hex
          }}
          >
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Palette