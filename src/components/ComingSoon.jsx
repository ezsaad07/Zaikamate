import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './progress.css'

const floatingElements = [
  {
    id: 'emoji-1',
    content: '🍔',
    className: 'left-[6%] top-[10%] text-3xl sm:text-4xl md:text-5xl',
    duration: 8,
    delay: 0.2,
  },
  {
    id: 'emoji-2',
    content: '🍕',
    className: 'right-[6%] top-[12%] text-3xl sm:text-4xl md:text-5xl',
    duration: 9,
    delay: 0.8,
  },
  {
    id: 'emoji-3',
    content: '🍜',
    className: 'left-[10%] bottom-[10%] text-3xl sm:text-4xl md:text-5xl',
    duration: 10,
    delay: 0.5,
  },
  {
    id: 'emoji-4',
    content: '🍟',
    className: 'right-[8%] bottom-[10%] text-3xl sm:text-4xl md:text-5xl',
    duration: 7.5,
    delay: 1.2,
  },
]

const celebrationParticles = [
  { id: 'p1', icon: '🎉', x: '8%', y: '16%', delay: 0.05 },
  { id: 'p2', icon: '✨', x: '20%', y: '72%', delay: 0.1 },
  { id: 'p3', icon: '🎊', x: '35%', y: '20%', delay: 0.15 },
  { id: 'p4', icon: '🍕', x: '48%', y: '80%', delay: 0.2 },
  { id: 'p5', icon: '✨', x: '62%', y: '22%', delay: 0.25 },
  { id: 'p6', icon: '🍔', x: '76%', y: '76%', delay: 0.3 },
  { id: 'p7', icon: '🎉', x: '88%', y: '26%', delay: 0.35 },
  { id: 'p8', icon: '🍟', x: '14%', y: '42%', delay: 0.4 },
  { id: 'p9', icon: '🎊', x: '84%', y: '58%', delay: 0.45 },
]

function ComingSoon() {
  const countdownDuration = 1 * 15 * 1000
  const startTime = useMemo(() => Date.now(), [])
  const [progress, setProgress] = useState(0)
  const [showLaunchPopup, setShowLaunchPopup] = useState(false)

  useEffect(() => {
    if (progress >= 100) {
      setShowLaunchPopup(true)
    }
  }, [progress])
  
  useEffect(() => {
    let rafId;
  
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculated = (elapsed / countdownDuration) * 100;
      const clamped = Math.max(0, Math.min(100, calculated));
      setProgress(clamped);
  
      if (clamped < 100) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    };
  
    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, [countdownDuration, startTime]);

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[url('/bg-food.webp')] bg-cover bg-center px-4 py-8 font-[Poppins]">
      <div className="pointer-events-none absolute inset-0 bg-white/18 backdrop-blur-[1px]" />
      {floatingElements.map((item) => (
        <motion.div
          key={item.id}
          className={`pointer-events-none absolute flex h-16 w-16 items-center justify-center rounded-full border border-white/45 bg-white/20 opacity-80 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md sm:h-20 sm:w-20 md:h-24 md:w-24 ${item.className}`}
          animate={{
            y: [0, -16, 0, 10, 0],
            rotate: [0, -4, 4, 0],
            x: [0, 6, -6, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">{item.content}</span>
        </motion.div>
      ))}

      <motion.section
        className="relative w-full max-w-xl rounded-3xl border border-white/70 bg-[#fff7ee]/78 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#2ECC71] sm:text-sm">
          ZAIKAMATE
        </p>

        <motion.h1
          className="bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-4xl font-bold leading-tight text-transparent drop-shadow-[0_2px_10px_rgba(234,88,12,0.45)] md:text-6xl"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: [1, 1.04, 1] }}
          transition={{
            opacity: { duration: 0.7, ease: 'easeOut' },
            scale: { duration: 2.4, delay: 0.15, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          Coming Soon
        </motion.h1>

        <motion.p className="mx-auto mt-4 max-w-sm text-sm font-medium text-zinc-700 md:text-lg">
          Discover food like never before
        </motion.p>

        <div className="mt-5 flex justify-center">
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-fill-track">
                <motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
              </div>
              <span className="progress-text">{`${Math.round(progress)}% Cooked`}</span>
              <motion.img
  className="progress-icon"
  src="/forksnknives.svg"
  alt="Fork and knives"
  animate={{ left: `${progress}%` }}
  transition={{ duration: 0, ease: 'linear' }} // 👈 was 0.5s, now instant
/>
            </div>
          </div>
        </div>

      </motion.section>

      <AnimatePresence>
        {showLaunchPopup && (
          <>
            <motion.div
              className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {celebrationParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="pointer-events-none absolute z-50 text-2xl sm:text-3xl"
                style={{ left: particle.x, top: particle.y }}
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.2, 1, 0.8], y: [20, -24, -60] }}
                transition={{ duration: 1.6, delay: particle.delay, repeat: Infinity, repeatDelay: 0.35, ease: 'easeOut' }}
              >
                {particle.icon}
              </motion.span>
            ))}

            <motion.div
              className="absolute inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg rounded-3xl border border-white/70 bg-[#fff7ee]/88 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                initial={{ scale: 0.85, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={() => setShowLaunchPopup(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-red-200/70 bg-white/45 text-2xl leading-none text-red-500 shadow-[0_8px_20px_rgba(239,68,68,0.2)] backdrop-blur-md transition hover:bg-white/60 hover:text-red-600"
                  aria-label="Close popup"
                >
                  ×
                </button>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#2ECC71]">ZaikaMate</p>
                <h2 className="bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Fresh off the grill — ZaikaMate is here!
                </h2>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}

export default ComingSoon
