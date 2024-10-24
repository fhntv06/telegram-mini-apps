import Lottie from 'react-lottie'
import { AnimatePresence } from 'framer-motion'
import winAnimationData from '../../shared/assets/animation/win.json'
import consolidatingBetsData from '../../shared/assets/animation/consolidatingBets.json'
import youAreInData from '../../shared/assets/animation/youAreIn.json'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: winAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

const styles = {
  zIndex: 100,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '80%',
  transform: 'translate(-50%, -50%)'
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
      top: '65%',
      left: '62%',
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
      width: '45%',
      height: '45%',
    },
    animation: youAreInData,
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
        <div style={listAnimates[animation].styles}>
          <Lottie
            options={{
              ...defaultOptions,
              // @ts-ignore
              ...listAnimates[animation].settings,
              // @ts-ignore
              animationData: listAnimates[animation].animation,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}