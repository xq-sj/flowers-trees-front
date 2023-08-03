import {loadFull} from "tsparticles"
import type {Engine} from 'tsparticles-engine'

export default function useParticles(initValue = false) {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine)
  }
  const options = reactive({
    background: {
      color: {
        // 背景颜色
        value: '#f6f6f6'
      }
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
        },
        onHover: {
          enable: true,
          mode: 'repulse' // 可用的hover模式有: "grab", "repulse", "bubble"。
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 8
        },
        repulse: {
          distance: 150,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        // 粒子的颜色
        value: '#3baf6d'
      },
      links: {
        color: '#b7d3bc', // '#dedede'。线条颜色。
        distance: 150, // 线条长度
        enable: true, // 是否有线条
        opacity: 0.5, // 线条透明度。
        width: 1 // 线条宽度。
      },
      collisions: {
        enable: false
      },
      move: {
        //原子移动方向   "none" ,"top" ,"top-right" ,"right" ,"bottom-right" ,"bottom" ,"bottom-left" ,"left" ,"top-left"
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        // 粒子运动速度。
        speed: 3,
        //移动随机方向
        straight: false
      },
      number: {
        density: {
          // 启用粒子的稀密程度
          enable: true,
          // 区域散布密度大小
          area: 600
        },
        // 粒子数量。
        value: 70
      },
      opacity: {
        // 粒子透明度。
        value: 0.3,
        // 渐变动画
        anim: {
          enable: true,
          // 动画速度
          speed: 1,
          // 渐变动画不透明度
          opacity_min: 0.4,
          sync: true
        }
      },
      shape: {
        // 粒子的形状"circle","edge","triangle", "polygon","star"
        type: 'circle',
      },
      size: {
        random: true,
        value: 5,
        // 渐变动画
        anim: {
          enable: true,
          // 动画速度
          speed: 1,
          // 渐变动画不透明度
          opacity_min: 0.4,
          sync: true
        }
      }
    },
    detectRetina: true
  })

  return {
    particlesInit,
    options
  }
}