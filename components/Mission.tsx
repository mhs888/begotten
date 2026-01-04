export default function Mission() {
  return (
    <section id="mission" className="py-24 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-2xl font-light tracking-wide text-black uppercase mb-8">
            Our Mission
          </h2>
          <p className="text-sm text-gray-600 font-light leading-relaxed max-w-2xl">
            Every purchase supports causes that matter. 100% of profits go directly to charitable organizations we partner with, creating real impact in communities around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
          <div>
            <h3 className="text-sm font-light text-black uppercase tracking-wide mb-3">100% Profits</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Every dollar of profit goes directly to charitable causes we support.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-light text-black uppercase tracking-wide mb-3">Quality First</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Premium materials and ethical manufacturing practices.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-light text-black uppercase tracking-wide mb-3">Make Impact</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Your purchase creates real change in communities around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

