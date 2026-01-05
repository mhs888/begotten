export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-condensed text-black tracking-wide mb-4">
              <span className="font-bold">Begotten</span> | Divine Garments
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Quality clothing with a purpose. Every purchase supports charitable causes.
            </p>
          </div>
          
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-condensed">
            <p>&copy; {new Date().getFullYear()} <span className="font-bold">Begotten</span>. All rights reserved.</p>
            <p className="mt-2 md:mt-0 tracking-wide">100% of profits go to charity</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

