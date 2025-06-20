import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const PupGrad = ({className, radius=8, children}: {className?: string, radius?: number, children: React.ReactNode}) => {
  return (

        <LinearGradient
          colors={['#8A31FF', '#240059']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          className={`my-4 mb-6 ${className}`}
          style={{ borderRadius: radius }}>
            {children}
        </LinearGradient>
  )
}

export default PupGrad