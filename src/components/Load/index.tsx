import React from 'react'
import Lottie from 'react-lottie'

import loadAnimated from './../../assets/lottie/load.json'

type LoadProps = {
  height: number
  width: number
}

export const Load = ({ height, width }: LoadProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadAnimated,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
    />
  )
}
