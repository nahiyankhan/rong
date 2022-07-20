import { useState } from 'react'
import styles from '../../../styles/ui.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

const AddStep = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const addPalette = () => {

  }

  return (
    <div 
    className={`${styles['add-hitbox']} ${styles['step']}`}
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            className={styles['ui-button']}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.15}}
            onClick={props.clickHandler}
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AddStep