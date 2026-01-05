'use client'

import { useState, useEffect, useRef } from 'react'

export default function HeroText() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={sectionRef}
      className={`py-20 md:py-32 px-6 lg:px-8 flex items-center justify-center min-h-[50vh] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide text-black mb-8 leading-relaxed italic max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          &ldquo;For God so loved the world, that he gave his only <span className="font-bold not-italic">Begotten</span> Son, that whosoever believeth in him should not perish, but have everlasting life&rdquo;
        </h1>
        <p className={`text-xs md:text-sm text-gray-500 uppercase tracking-wider transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          100% of profits go to charity
        </p>
      </div>
    </div>
  )
}

