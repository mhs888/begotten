'use client'

export default function HeroText() {
  return (
    <div className="py-8 px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide text-black mb-8 leading-relaxed italic max-w-4xl mx-auto">
          &ldquo;For God so loved the world, that he gave his only <span className="font-semibold not-italic">Begotten</span> Son, that whosoever believeth in him should not perish, but have everlasting life&rdquo;
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          100% of profits go to charity
        </p>
      </div>
    </div>
  )
}

