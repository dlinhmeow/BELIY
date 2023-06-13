import clsx from 'clsx'
import React, { useState } from 'react'
import { Blurhash } from 'react-blurhash'
import {
  LazyLoadComponent,
  LazyLoadImage,
  trackWindowScroll
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
// yarn add blurhash react-blurhash react-lazy-load-image-component
interface ImageOptimizingProps {
  alt?: string
  src?: any
  blurhash?: string
  scrollPosition?: any
  objectFit?: 'cover' | 'contain' | 'fill'
  className?: string
}

const ImageOptimizing: React.FC<ImageOptimizingProps> = ({
  alt,
  blurhash = 'MFSigQof_3j[M{t7j[ofWBRj~qj[4nj[xu',
  src,
  scrollPosition,
  className,
  objectFit = 'cover'
}) => {
  const [isLoaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div className="relative w-full h-full">
      <LazyLoadComponent scrollPosition={scrollPosition}>
        {
          <div
            className={`absolute top-0 left-0 z-20 duration-700 transition-opacity ease-linear w-full h-full ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Blurhash
              hash={blurhash}
              height="100%"
              width="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        }
        <LazyLoadImage
          alt={alt}
          src={src}
          height="100%"
          width="100%"
          className={clsx('h-full w-full object-bottom', {
            'object-contain': objectFit == 'contain',
            'object-cover': objectFit == 'cover',
            'object-fill': objectFit == 'fill',
            [className as string]: className
          })}
          afterLoad={handleLoad}
          // effect="blur"
        />
      </LazyLoadComponent>
    </div>
  )
}

export default trackWindowScroll<ImageOptimizingProps | any>(ImageOptimizing)
