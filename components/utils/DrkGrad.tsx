import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const DrkGrad = ({className, radius=8, children, style}: {className?: string, radius?: number, children: React.ReactNode, style?: any}) => {
  return (

        <LinearGradient
          colors={['#681CFF', '#1D006E']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          className={`my-4 mb-6 ${className}`}
          style={[{ borderRadius: radius }, style]}>
            {children}
        </LinearGradient>
  )
}

export default DrkGrad