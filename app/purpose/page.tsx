'use client'

import Link from 'next/link'

export default function PurposePage() {

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/" className="text-base font-display text-gray-500 hover:text-black uppercase tracking-wide">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display tracking-wide text-black uppercase mb-6">
            Our Purpose
          </h1>
        </div>

        {/* Mission Statement */}
        <div className="space-y-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Begotten is a profit-free, self-sustaining clothing brand dedicated to serving those in need, 
              in alignment with God's mission for us to love and care for one another.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every garment we create is crafted with intention and quality, but our true purpose extends 
              far beyond fashion. We believe that business can be a force for good—a means to provide 
              for those who need it most, without seeking personal gain.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-black">100% of our profits go directly to charitable causes.</strong> 
              This isn't a marketing slogan—it's our foundational principle. We operate at cost, ensuring 
              that every dollar beyond what's needed to sustain our operations goes to organizations and 
              individuals making a real difference in the world.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              When you purchase from Begotten, you're not just buying clothing. You're participating in 
              a mission to serve others, to extend God's love through action, and to create a sustainable 
              model of giving that can continue to make an impact for years to come.
            </p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="text-2xl font-display tracking-wide text-black uppercase mb-8 text-center">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-5xl font-display text-black mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Profits to Charity
              </div>
            </div>
            <div>
              <div className="text-5xl font-display text-black mb-2">
                ∞
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Commitment
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-200 pt-12 mb-16">
          <h2 className="text-2xl font-display tracking-wide text-black uppercase mb-8 text-center">
            Our Partners
          </h2>
          
          <div className="space-y-6">
            <div>
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

            <div>
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

            <div>
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

            <div>
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

            <div>
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

            <div>
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
        <div className="border-t border-gray-200 pt-12 text-center">
          <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-4">
            &ldquo;Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.&rdquo;
          </p>
          <p className="text-sm text-gray-600">
            Matthew 25:40
          </p>
        </div>
      </div>
    </div>
  )
}

