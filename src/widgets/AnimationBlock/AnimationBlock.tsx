import Lottie from 'react-lottie'
import { AnimatePresence, motion } from 'framer-motion'
import winAnimationData from '../../shared/assets/animation/win.json'
import consolidatingBetsData from '../../shared/assets/animation/consolidatingBets_2.json'
import youAreInData from '../../shared/assets/animation/youAreIn.json'
import loadPerson from '../../shared/assets/animation/loadPerson.json'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: winAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

const styles = {
  zIndex: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '80%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
}

const listAnimates = {
  wins: {
    styles: {
      ...styles,
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      transform: 'none'
    },
    animation: winAnimationData,
    settings: {
    }
  },
  consolidate: {
    styles: {
      ...styles,
      top: '29%',
      left: '50%',
      height: '350px',
      width: '270px',
    },
    animation: consolidatingBetsData,
    settings: {
      loop: true
    }
  },
  youAreIn: {
    styles: {
      ...styles,
      top: '40%',
      width: '270px',
      height: '420px',
    },
    animation: youAreInData,
    settings: {
    }
  },
  loadPerson: {
    styles: {
      ...styles,
      width: '100%',
      height: '100%',
      zIndex: 2
    },
    animation: loadPerson,
    settings: {
    }
  }
}

interface IProps {
  animation: string | null
}

export const AnimationBlock = ({ animation } :IProps) => {
  return (
    <AnimatePresence>
      {animation && (
        // @ts-ignore
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: .1,
            duration: .1,
            ease: 'easeIn',
          }}
          // @ts-ignore
          style={listAnimates[animation].styles}
        >
          <Lottie
            options={{
              ...defaultOptions,
              // @ts-ignore
              ...listAnimates[animation].settings,
              // @ts-ignore
              animationData: listAnimates[animation].animation,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
