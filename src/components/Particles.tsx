import { useEffect, useState, useMemo, useId } from 'react'

import Particles, { initParticlesEngine } from '@tsparticles/react'
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode
} from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

interface Props {
  color: string
  min?: number
  max?: number
}

const ParticlesPkg = ({ color, min = 1, max = 5 }: Props) => {
  const id = useId()
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = async (): Promise<void> => {}
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent'
        }
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'repulse'
          }
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: color
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 3
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out
          },
          random: false,
          speed: 2,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: min, max: max }
        }
      },
      detectRetina: true,
      fullScreen: false
    }),
    []
  )

  if (init) {
    return (
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
        className='h-full w-full absolute top-0 left-0'
      />
    )
  }

  return <></>
}

export default ParticlesPkg
