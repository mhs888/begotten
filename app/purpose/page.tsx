'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { fetchProducts } from '@/lib/shopify'

export default function PurposePage() {
  const [images, setImages] = useState<string[]>([])
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({})
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Fetch product images for scrolling band
  useEffect(() => {
    const loadImages = async () => {
      try {
        const products = await fetchProducts()
        const productImages: string[] = []
        
        products.forEach((product: any) => {
          const imageEdges = product.images?.edges || []
          imageEdges.forEach((edge: any) => {
            if (edge.node?.url) {
              productImages.push(edge.node.url)
            }
          })
        })
        
        // If we have images, use them; otherwise use placeholder squares
        if (productImages.length > 0) {
          // Duplicate images for seamless infinite scroll (need at least 2 copies)
          setImages([...productImages, ...productImages])
        } else {
          // Fallback: create array of placeholder colors
          const placeholders = Array(12).fill(null).map((_, i) => `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="%23${['f3f4f6', 'e5e7eb', 'd1d5db'][i % 3]}"/></svg>`)}`)
          setImages([...placeholders, ...placeholders])
        }
      } catch (error) {
        console.error('Error loading images:', error)
        // Fallback placeholders
        const placeholders = Array(12).fill(null).map((_, i) => `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="%23${['f3f4f6', 'e5e7eb', 'd1d5db'][i % 3]}"/></svg>`)}`)
        setImages([...placeholders, ...placeholders])
      }
    }
    
    loadImages()
  }, [])

  // Scroll animation observer
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    
    Object.keys(sectionRefs.current).forEach((key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }))
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      )
      
      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]!)
        observers.push(observer)
      }
    })
    
    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  const setSectionRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Scrolling Image Band */}
      <div className="relative w-full overflow-hidden bg-white border-b border-gray-200">
        <div className="flex animate-scroll">
          {images.map((img, index) => (
            <div
              key={`img-${index}`}
              className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 relative"
            >
              <Image
                src={img}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                unoptimized={img.includes('cdn.shopify.com') || img.startsWith('data:')}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-16 pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div 
            ref={setSectionRef('back')}
            className={`mb-12 transition-all duration-1000 ${
              visibleSections.back 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Link href="/" className="text-base font-display text-gray-500 hover:text-black uppercase tracking-wide">
              ← Back to Home
            </Link>
          </div>

          {/* Header */}
          <div 
            ref={setSectionRef('header')}
            className={`mb-16 text-center transition-all duration-1000 delay-100 ${
              visibleSections.header 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-display tracking-wide text-black uppercase mb-6">
              Our Purpose
            </h1>
          </div>

          {/* Mission Statement */}
          <div 
            ref={setSectionRef('mission')}
            className={`space-y-8 mb-16 transition-all duration-1000 delay-200 ${
              visibleSections.mission 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Begotten is a profit-free, self-sustaining clothing brand dedicated to serving those in need, 
                in alignment with God's mission for us to love and care for one another.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We make quality clothing, but that's not why we exist. This is about using what we have 
                to help those who don't. Every sale moves us closer to that goal.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-black">100% of our profits go directly to charitable causes.</strong> Our 
                foundational principle is to operate at cost, ensuring that every dollar beyond what's 
                needed to sustain our operations goes to organizations and individuals making a difference 
                in the world.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                When you purchase from Begotten, you are participating in a mission to serve others and extend 
                God's love through action.
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div 
            ref={setSectionRef('impact')}
            className={`border-t border-gray-200 pt-12 mb-16 transition-all duration-1000 delay-300 ${
              visibleSections.impact 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-2xl font-display tracking-wide text-black uppercase mb-8 text-center">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="h-20 flex items-center justify-center mb-2">
                  <div className="text-4xl font-display text-black">
                    100%
                  </div>
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Profits to Charity
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-20 flex items-center justify-center mb-2">
                  <div className="text-6xl font-display text-black">
                    ∞
                  </div>
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Commitment
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div 
            ref={setSectionRef('partners')}
            className={`border-t border-gray-200 pt-12 mb-16 transition-all duration-1000 delay-400 ${
              visibleSections.partners 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-2xl font-display tracking-wide text-black uppercase mb-8 text-center">
              Our Partners
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  World Vision
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Global relief and development.
                </p>
                <a 
                  href="https://www.worldvision.org/sponsor-a-child?&campaign=400100252&utm_campaign=search-trust-FY26-brand&utm_medium=search&utm_source=google&utm_content=Sponsorship%20Q2FY26&gclsrc=aw.ds&gad_source=1&gad_campaignid=23382668876&gbraid=0AAAAAD_qsmyc3-56mZWjoInJWvOsrPhg4&gclid=CjwKCAiA3-3KBhBiEiwA2x7FdNvle5bC08TzF9WZxwvfgVdSMw6c-44ur-igJRvcQvEjNsH1PmhTHxoClGIQAvD_BwE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  Samaritan's Purse
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Disaster relief, medical aid, and evangelism.
                </p>
                <a 
                  href="https://www.samaritanspurse.org/our-ministry/broadcast-ads/?utm_source=Ggl&utm_medium=cpc&utm_campaign=m_YGGM-B26V&utm_content=BroadcastLP&gad_source=1&gad_campaignid=68852315&gbraid=0AAAAAD2XO8ddfR2cnCQYKFRQ5wvBqsXt6&gclid=CjwKCAiA3-3KBhBiEiwA2x7FdNk-VPTridFcKqS7eUkEH2s8H9-TBF5omQgGM8aP68LXTZu03w8-0xoCk1gQAvD_BwE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  Compassion International
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Child sponsorship and development.
                </p>
                <a 
                  href="https://www.compassion.com/sponsor-a-child/?referer=630527&utm_source=google&utm_medium=cpc&utm_campaign=fy26_dm_convert_sponsorship_marketing_campaign&utm_content=google_brand_all-devices_brand-kws_cc2608-131781083753&utm_creative_format=responsive&utm_term=compassion%20international&utm_marketing_tactic=historic&gad_source=1&gad_campaignid=15416753223&gbraid=0AAAAABIfH0rPePy-zfFDsXmL763pTeQc5&gclid=CjwKCAiA3-3KBhBiEiwA2x7FdAsvv3tj5SYTxzl2iC9h1ssSg0bXM-sFi4yoIyYR0THYCeHBodRwfRoCiJMQAvD_BwE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  Convoy of Hope
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Disaster relief and community support.
                </p>
                <a 
                  href="https://convoyofhope.org/wrm/?utm_source=google&utm_medium=PMAX&utm_campaign=CAM-007081&utm_content=&gad_source=1&gad_campaignid=23042118195&gbraid=0AAAAADsB1DDE83q2wQbhnwpnzGoeD-Fii&gclid=CjwKCAiA3-3KBhBiEiwA2x7FdP-HgUUrWAiKjS49Xb316O3lKQdpfK7rZ3tVdic3O1mnsg7rTob_3BoCq3AQAvD_BwE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  The Salvation Army
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Broad social services, disaster relief, and thrift stores.
                </p>
                <a 
                  href="https://give.salvationarmyusa.org/campaign/676125/donate?utm_source=google&utm_medium=ppc&utm_campaign=sal-national-fy26&utm_content=ppc-givewithjoy-nonsustaining&utm_term=usn-usn&id=22959212843&c_src=NC26TLGAJC&gad_source=1&gad_campaignid=22959212843&gbraid=0AAAAADFROe0Y2dmJQe1KNM-tRFfxwdeF1&gclid=CjwKCAiA3-3KBhBiEiwA2x7FdLXzF6HJvVvjr2R0R9HzKGmcdCiL_K8RqSXkLJjw9kvZCEhh-rREkBoCPB4QAvD_BwE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display text-black uppercase mb-2">
                  Children's Hunger Fund
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Providing food and resources to children in need.
                </p>
                <a 
                  href="https://childrenshungerfund.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-gray-600 underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Scripture */}
          <div 
            ref={setSectionRef('scripture')}
            className={`border-t border-gray-200 pt-12 mb-8 text-center transition-all duration-1000 delay-500 ${
              visibleSections.scripture 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-4">
              &ldquo;Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.&rdquo;
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Matthew 25:40
            </p>
            <Link 
              href="/" 
              className="inline-block bg-black text-white px-8 py-3 text-sm font-display uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
