import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      popup: 'rgba(13, 13, 13, 0.5)',
      dark: {
        10: 'rgba(13, 13, 13, 0.1)',
        20: 'rgba(13, 13, 13, 0.2)',
        30: 'rgba(13, 13, 13, 0.3)',
        40: 'rgba(13, 13, 13, 0.4)',
        50: 'rgba(13, 13, 13, 0.5)',
        60: 'rgba(13, 13, 13, 0.6)',
        70: 'rgba(13, 13, 13, 0.7)',
        80: 'rgba(13, 13, 13, 0.8)',
        90: 'rgba(13, 13, 13, 0.9)',
        100: 'rgba(13, 13, 13, 1)'
      },
      white: {
        10: 'rgba(255, 255, 255, 0.1)',
        20: 'rgba(255, 255, 255, 0.2)',
        30: 'rgba(255, 255, 255, 0.3)',
        40: 'rgba(255, 255, 255, 0.4)',
        50: 'rgba(255, 255, 255, 0.5)',
        60: 'rgba(255, 255, 255, 0.6)',
        70: 'rgba(255, 255, 255, 0.7)',
        80: 'rgba(255, 255, 255, 0.8)',
        90: 'rgba(255, 255, 255, 0.9)',
        100: 'rgba(255, 255, 255, 1)'
      },
    }
  }
}
