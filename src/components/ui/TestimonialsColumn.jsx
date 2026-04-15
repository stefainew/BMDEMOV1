import React, { useEffect, useRef, useState } from 'react'

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingBottom: '1.5rem',
          animation: `scrollUp ${duration}s linear infinite`,
          animationPlayState: playing ? 'running' : 'paused',
          willChange: 'transform',
        }}
      >
        {[0, 1].map((_, copy) => (
          <React.Fragment key={copy}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 border border-outline-variant/40 bg-surface-container-low max-w-xs w-full"
              >
                <p className="font-body text-on-surface-variant italic leading-relaxed text-sm">
                  "{text}"
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover grayscale opacity-80"
                  />
                  <div className="flex flex-col">
                    <div className="font-label text-on-surface uppercase tracking-widest text-xs">
                      {name}
                    </div>
                    <div className="font-mono text-primary text-xs opacity-80">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes scrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  )
}
