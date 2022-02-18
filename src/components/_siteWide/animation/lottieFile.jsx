import React from 'react'
import Lottie from 'react-lottie'

export const LottieFile = ({ path, animationData, autoplay, containerClass = '', ...others }) => {
  const options = {
    loop: true,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className={containerClass}>
      <Lottie options={options} {...others} />
    </div>
  )
}
