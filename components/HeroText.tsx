'use client'

export default function HeroText() {
  return (
    <div className="py-20 md:py-32 px-6 lg:px-8 flex items-center justify-center min-h-[50vh]">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide text-black mb-8 leading-relaxed italic max-w-4xl mx-auto">
          &ldquo;For God so loved the world, that he gave his only <span className="font-bold not-italic">Begotten</span> Son, that whosoever believeth in him should not perish, but have everlasting life&rdquo;
        </h1>
        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
          100% of profits go to charity
        </p>
      </div>
    </div>
  )
}

