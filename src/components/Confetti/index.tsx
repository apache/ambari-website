import React from "react";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import styles from './styles.module.css';

export default function Confetti()  {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    // id="confetti"
    // className={styles.confetti}
    
    return (
        <Particles
          className={styles.confetti}
          id="confetti"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fullScreen: {
              enable: false,
            },
            particles: {
              number: {
                value: 20,
                density: {
                  enable: true,
                  value_area: 200
                }
              },
              size: {
                value: 5,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  size_min: 1,
                  sync: false
                }
              },
              shape: {
                type: "circle",
              },
              color: {
                value: ["#EA5532", "#F6AD3C", "#FFF33F", "#00A95F", "#00ADA9", "#00AFEC", "#4D4398", "#E85298"],
              },
              opacity: {
                value: 1,
                animation: {
                  enable: false,
                  startValue: "max",
                  destroy: "min",
                  speed: 10,
                  sync: true
                }
              },
              move: {
                enable: true,
                speed: {
                  min: 1,
                  max: 5
                },
                direction: "top",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              },
              roll: {
                darken: {
                  enable: true,
                  value: 30
                },
                enable: true,
                speed: {
                  min: 15,
                  max: 25
                }
              },
              tilt: {
                direction: "random",
                enable: true,
                move: true,
                value: {
                  min: 0,
                  max: 360
                },
                animation: {
                  enable: true,
                  speed: 60
                }
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                },
                onclick: {
                  enable: false,
                },
                resize: true
              },
            },
            retina_detect: true
          }}

          
        />
      );
    };