import { useEffect, useState } from 'react'

// Постепенного уменьшения прозрачности
const fadeOutAnimationHandler = (element: HTMLElement, duration: number, opacity: number = 1) => {
  if (!element) return

  // Уменьшаем прозрачность элемента
  element.style.opacity = `${opacity}`;
  opacity -= 10 / duration;

  // Если прозрачность больше 0, продолжаем вызов функции
  if (opacity > 0) requestAnimationFrame(() => fadeOutAnimationHandler(element, duration, opacity))
  else element.style.display = 'none'
}

export const useFadeOut = () => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [duration, setDuration] = useState<number>(1000)

  const openFadeHandler = (element:HTMLElement | null, duration = 1000) => {
    setElement(element)
    setDuration(duration)
  }

  useEffect(() => {
    if (element) {
      const timer = setTimeout(() => {
        fadeOutAnimationHandler(element, duration)

        clearTimeout(timer)
      }, 2000)
    }
  }, [duration, element])

  return { openFadeHandler }
}
