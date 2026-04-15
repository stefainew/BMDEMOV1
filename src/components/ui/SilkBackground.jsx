import { useEffect, useRef } from 'react'

export default function SilkBackground({ opacity = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    let animId
    const speed = 0.018
    const scale = 2
    const noiseIntensity = 0.75

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const noise = (x, y) => {
      const G = 2.71828
      const rx = G * Math.sin(G * x)
      const ry = G * Math.sin(G * y)
      return (rx * ry * (1 + x)) % 1
    }

    const animate = () => {
      const { width, height } = canvas
      if (!width || !height) { animId = requestAnimationFrame(animate); return }

      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      const tOffset = speed * time

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale
          const v = (y / height) * scale

          let tex_x = u
          let tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset)

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y +
              Math.cos(3.0 * tex_x + 5.0 * tex_y) +
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          )

          const rnd = noise(x, y)
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity)

          // Warm gold-bronze silk — matches #C9A84C palette
          const r = Math.floor(148 * intensity)
          const g = Math.floor(108 * intensity)
          const b = Math.floor(42 * intensity)

          const index = (y * width + x) * 4
          if (index + 3 < data.length) {
            data[index]     = r
            data[index + 1] = g
            data[index + 2] = b
            data[index + 3] = 255

            // Fill the skipped pixel (x+1, y) for performance
            if (index + 7 < data.length) {
              data[index + 4] = r
              data[index + 5] = g
              data[index + 6] = b
              data[index + 7] = 255
            }
          }
        }
        // Fill skipped rows (y+1)
        for (let y = 1; y < height; y += 2) {
          const prevRow = (( y - 1) * width + x) * 4
          const thisRow = (y * width + x) * 4
          if (thisRow + 7 < data.length && prevRow + 7 < data.length) {
            data[thisRow]     = data[prevRow]
            data[thisRow + 1] = data[prevRow + 1]
            data[thisRow + 2] = data[prevRow + 2]
            data[thisRow + 3] = 255
            data[thisRow + 4] = data[prevRow + 4]
            data[thisRow + 5] = data[prevRow + 5]
            data[thisRow + 6] = data[prevRow + 6]
            data[thisRow + 7] = 255
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Radial vignette overlay
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      time += 1
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      observer.disconnect()
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        opacity,
      }}
    />
  )
}
