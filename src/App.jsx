import { useEffect, useRef, useState } from 'react'

// All copy, numbers, outlets and testimonials below are PLACEHOLDERS — replace with your real data before launch.
const stats = [
  ['500+', 'Brands published', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'],
  ['1,200+', 'Partner outlets', 'M3 4h18v12H3zM8 20h8M12 16v4'],
  ['8,000+', 'Articles placed', 'M4 4h12v16H6a2 2 0 0 1-2-2zM16 8h4v10a2 2 0 0 1-2 2M8 8h4M8 12h4M8 16h4'],
  ['14 days', 'Average turnaround', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2'],
]

// [name, logo?] — put logo files in public/logos/ and add the path, e.g. ['The Signal', '/logos/the-signal.svg']. No logo = name shown as text.
const outlets = [
  ['Forbes', '/logos/forbes.png'], ['Business Insider', '/logos/business-insider.png'], ['Reuters', '/logos/reuters.png'],
  ['The Times', '/logos/the-times.png'], ['BuzzFeed', '/logos/buzzfeed.png'], ['Wired', '/logos/wired.png'],
  ['The Guardian', '/logos/the-guardian.png'],
]

const benefits = [
  ['Use PR to Create Undeniable Social Proof in Sales', 'Most importantly, you will learn exactly how Visibility Press helps businesses and personal brands leverage PR to build credibility, establish authority, and gain a competitive advantage. You’ll also learn how you can ‘skip the line’ and begin capitalizing on the advantages press coverage has the power to provide.'],
  ['Use “Press Coverage” To Skyrocket Profitability of Marketing Campaigns', 'If you’ve ever felt like your marketing efforts are leaking profits, then PR may be your best, and quickest bet at plugging that leak for good, preventing your ads and content marketing from wasting any more time and money.'],
  ['Create A “Legacy That Lasts” In Weeks Rather Than Decades', 'Discover the exact steps to help your business or personal brand build a lasting legacy by securing features inside major media outlets. Learn how to leverage media exposure to strengthen your reputation, increase brand recognition, and start dominating your niche before your competition knows what hit them.'],
  ['Build Instant Credibility and Authority in Your Industry', 'Position yourself as a trusted name in your niche by getting your brand featured in reputable publications. Use strategic media placements to build trust with potential customers, differentiate yourself from competitors, and strengthen your professional reputation.'],
]

// Free-to-use photos from Unsplash (unsplash.com/license). To use your own, put it in public/services/ and swap in its path, e.g. '/services/pr.jpg'
const unsplash = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`
// [title, description, icon path, image]
const services = [
  ['Strategic Positioning & Messaging', 'We sharpen your story and the message behind it, so every audience understands why you’re different.', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', unsplash('1542744173-8e7e53415bb0')],
  ['Public Relations & Media Strategy', 'A media plan that puts you in the publications your customers, investors and partners actually read.', 'M4 4h12v16H6a2 2 0 0 1-2-2zM16 8h4v10a2 2 0 0 1-2 2M8 8h4M8 12h4M8 16h4', unsplash('1504711434969-e33886168f5c')],
  ['Executive Thought Leadership', 'Bylined articles, interviews and speaking angles that make you the go-to voice in your industry.', 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8', unsplash('1587825140708-dfaf72ae4b04')],
  ['Content & Reports', 'Research, data and editorial pieces that earn citations, build authority and bring in qualified leads.', 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8', unsplash('1551288049-bebda4e38f71')],
  ['AI Visibility', 'Coverage and content built so AI assistants recognise your brand and recommend it when people ask.', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', unsplash('1677442135703-1787eea5ce01')],
  ['Reputation Management', 'We monitor, protect and strengthen what people find when they search for you or your company.', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', unsplash('1521791136064-7986c2920216')],
  ['Websites & Digital Brand Experiences', 'Websites and landing pages that turn press attention into enquiries, bookings and sales.', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z', unsplash('1547658719-da2b51169166')],
  ['AI & GEO', 'Generative engine optimisation that shapes how AI search describes your company, and keeps it accurate.', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35', unsplash('1674027326254-88c960d8e561')],
]

// /services/strategic-positioning-and-messaging etc.
const slug = t => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const serviceHref = t => `/services/${slug(t)}`

// Service page copy, keyed by slug: intro, what's included, outcomes [title, text]
const serviceDetails = {
  'strategic-positioning-and-messaging': {
    intro: 'Before anyone writes about you, you need a story worth telling. We find the angle that makes you different, then turn it into clear messaging your team, the press and your customers can all repeat.',
    includes: ['Brand and founder story workshop', 'Positioning statement and key messages', 'Audience and competitor messaging review', 'Media-ready bios and boilerplate', 'Messaging guide for your team'],
    outcomes: [['Clarity', 'Everyone tells the same story, in the same words.'], ['Differentiation', 'Prospects understand in seconds why they should choose you.'], ['Media-ready', 'Journalists get an angle they can actually use.']],
  },
  'public-relations-and-media-strategy': {
    intro: 'We map out which publications matter to your audience, build the pitches and secure the placements, so your name shows up where your customers, investors and partners already read.',
    includes: ['Target publication list for your niche', 'Story angles and pitch development', 'Feature and article placements', 'Press release writing and distribution', 'Coverage report with live links'],
    outcomes: [['Credibility', 'Third-party proof you can put on every sales page.'], ['Reach', 'New audiences who already trust the outlet.'], ['Lasting assets', '“As Seen In” badges and links that keep working for you.']],
  },
  'executive-thought-leadership': {
    intro: 'We position your founders and executives as the voices people look to in your industry, through bylined articles, interviews, podcasts and speaking opportunities.',
    includes: ['Thought leadership angles and topics', 'Ghostwritten bylined articles', 'Interview and podcast booking', 'Speaking opportunity sourcing', 'Media and interview preparation'],
    outcomes: [['Authority', 'Become the person journalists call for comment.'], ['Trust', 'Investors and partners know you before you meet.'], ['Opportunities', 'Invitations to speak, contribute and partner.']],
  },
  'content-and-reports': {
    intro: 'Original research and editorial content give journalists a reason to cite you. We turn your data and expertise into reports, articles and assets that earn coverage and generate leads.',
    includes: ['Industry surveys and data reports', 'Editorial articles and guides', 'Infographics and data visuals', 'Gated lead-generation assets', 'Pitching your findings to the media'],
    outcomes: [['Citations', 'Journalists and AI tools quote your numbers.'], ['Leads', 'Downloadable reports that capture interested buyers.'], ['Expertise', 'Proof you understand your market better than anyone.']],
  },
  'ai-visibility': {
    intro: 'More buyers now ask AI assistants for recommendations. We make sure the coverage and content about you is the kind those tools read, trust and repeat.',
    includes: ['Audit of how AI assistants describe you today', 'Coverage in sources AI tools rely on', 'Structured, citation-friendly content', 'Consistent brand profiles across the web', 'Ongoing monitoring of AI answers'],
    outcomes: [['Recommended', 'Show up when people ask AI who to choose.'], ['Accurate', 'AI describes your business the way you want.'], ['Ahead', 'Stand out while competitors are still catching up.']],
  },
  'reputation-management': {
    intro: 'Your reputation is what people find when they search your name. We monitor it, protect it and build up positive coverage so the first page tells the right story.',
    includes: ['Search and sentiment audit', 'Ongoing brand and media monitoring', 'Positive coverage to strengthen search results', 'Response planning for negative press', 'Review and profile management guidance'],
    outcomes: [['Control', 'A first page of search results you’re proud of.'], ['Resilience', 'A plan in place before anything goes wrong.'], ['Confidence', 'Prospects find proof, not doubts.']],
  },
  'websites-and-digital-brand-experiences': {
    intro: 'Press brings attention; your website decides what happens next. We design and build sites and landing pages that turn that attention into enquiries, bookings and sales.',
    includes: ['Website and landing page design', 'Copywriting built around your coverage', '“As Seen In” and press page setup', 'Conversion-focused layouts and forms', 'Speed, mobile and SEO essentials'],
    outcomes: [['Conversion', 'More visitors become leads and customers.'], ['Consistency', 'Your site matches the story the press tells.'], ['Proof', 'Coverage shown where it does the most work.']],
  },
  'ai-and-geo': {
    intro: 'Generative engine optimisation (GEO) is SEO for AI search. We shape the content and sources AI answers draw from, so your company is described accurately and keeps showing up as those answers change.',
    includes: ['GEO audit across major AI search tools', 'Content built to be quoted in AI answers', 'Authority placements that AI tools cite', 'Tracking of key questions in your category', 'Monthly reporting and adjustments'],
    outcomes: [['Visibility', 'Appear in AI-generated answers in your category.'], ['Narrative', 'Shape how AI explains what you do.'], ['Longevity', 'Authority that compounds as AI search grows.']],
  },
}

// SAMPLE reviews for layout only — replace with real client quotes (with their permission) before launch.
// [quote, name, role, service]
const testimonials = [
  ['Within a month of our first feature, prospects were quoting the article back to us on sales calls. It changed how people see us.', 'Sarah', 'Founder', 'Media placements'],
  ['They handled everything, from shaping my story to getting it published. All I did was approve the drafts.', 'Daniel', 'CEO', 'Personal branding'],
  ['We added the “As Seen In” logos to our landing page and it immediately felt like a more trustworthy brand.', 'Priya', 'E-commerce owner', 'Media placements'],
  ['I spent two years trying to get press on my own. Visibility Press made it happen in a matter of weeks.', 'Marcus', 'Author & Speaker', 'Contributor features'],
  ['Clear process, honest advice and no fluff. They told me exactly which outlets made sense for my niche.', 'Lina', 'Wellness coach', 'PR strategy'],
  ['Investors had already read about us before our first meeting. That credibility made every conversation easier.', 'Omar', 'Startup founder', 'Reputation strategy'],
]

const fitNo = [
  'You know your brand needs more visibility, but you’re not ready to take the steps required to stand out in your industry.',
  'You don’t have a compelling story, unique expertise, or business achievements you’re willing to share with the world.',
  'You’re looking for overnight fame without understanding that lasting credibility and media recognition take a strategic approach.',
]
const fitYes = [
  'You’re a serious entrepreneur, founder, or established business owner with a story, expertise, or achievement worth sharing.',
  'You’re ready to take action and understand that strategic PR and media exposure can help position you as an authority in your industry.',
  'You want long-term results that build credibility, strengthen your personal brand, and open doors to bigger media opportunities.',
]
const FitIcon = ({ yes }) => (
  <svg className={'fit-icon ' + (yes ? 'yes' : 'no')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={yes ? 'M7 12.5l3.2 3.2L17 9' : 'M8.5 8.5l7 7M15.5 8.5l-7 7'} />
  </svg>
)

const footerLinks = [
  ['Company', [['About us', '/about'], ['Why Visibility Press', '/#why'], ['What We Do', '/#services'], ['Testimonials', '/#testimonials'], ['Contact', '/contact']]],
  ['What We Do', services.map(([t]) => [t, serviceHref(t)])],
  ['Legal', [['Privacy policy', '/privacy'], ['Terms of service', '/terms']]],
]

const svc = i => [services[i][0], serviceHref(services[i][0])]
const megaColumns = [
  ['PR & Media', [0, 1, 2, 5].map(svc)],
  ['Digital & AI', [3, 4, 7, 6].map(svc)],
  ['Get Started', [['About us', '/about'], ['Why Visibility Press', '/#why'], ['Client stories', '/#testimonials'], ['Book a strategy call', '/contact']]],
]

// Sector pages don't exist yet — each sector links to the contact page until they do
const sectors = [
  ['Consumer', ['Food & Drink', 'Retail & FMCG', 'Health & Beauty', 'Luxury & Travel', 'Hospitality & Leisure']],
  ['B2B & Professional', ['B2B PR', 'Technology', 'Property & Construction', 'Corporate']],
]

// header dropdowns: [label, href, intro, [button label, href], columns]
const menus = [
  ['What We Do', '/#services', 'Visibility Press turns your story into coverage people trust, then makes that credibility work across sales, search and AI.', ['How We Work', '/about'], megaColumns],
  ['Who We Work With', '/about', 'From consumer brands to B2B and professional firms, we know the outlets your customers actually read.', ['Talk to Us', '/contact'], sectors.map(([title, items]) => [title, items.map(t => [t, '/contact'])])],
]

const Cta = ({ children = 'Book a strategy call' }) => <a className="btn" href="/contact">{children}</a>

function Testimonials() {
  const [{ cur, prev }, setPos] = useState({ cur: 1, prev: 1 })
  const drag = useRef({ x: 0, moved: false })
  const n = testimonials.length
  const half = Math.floor(n / 2)
  const mod = a => ((a % n) + n) % n
  const offset = (i, c) => mod(i - c + half) - half // distance from the centre card, wrapped
  const go = step => setPos(p => ({ cur: p.cur + step, prev: p.cur }))

  return (
    <section id="testimonials" className="voices" aria-label="Client testimonials">
      <div className="wrap voices-head">
        <p className="eyebrow">Client stories</p>
        <h2>Real Words From Clients Who Got Featured</h2>
        <p>Founders, experts and brands on what changed once the press started talking about them.</p>
      </div>
      <div className="voices-track"
        onPointerDown={e => (drag.current = { x: e.clientX, moved: false })}
        onPointerUp={e => { const dx = e.clientX - drag.current.x; if (Math.abs(dx) > 40) { drag.current.moved = true; go(dx < 0 ? 1 : -1) } }}>
        {testimonials.map(([q, name, role, service], i) => {
          const d = offset(i, cur)
          // a card that wrapped to the other end jumps there unseen and only fades in
          const wrapped = d !== offset(i, prev) - (cur - prev)
          return (
            <figure key={name} className={'voice' + (d === 0 ? ' current' : '')} aria-hidden={d !== 0}
              style={{ '--d': d, '--ad': Math.abs(d), transition: wrapped ? 'opacity .7s' : undefined }}
              onClick={() => { if (d && !drag.current.moved) go(Math.sign(d)) }}>
              <figcaption>
                <span className="avatar" aria-hidden="true">{name[0]}</span>
                <span><b>{name}</b>{role}</span>
              </figcaption>
              <blockquote>{q}</blockquote>
              <span className="voice-tag">{service}</span>
            </figure>
          )
        })}
      </div>
      <div className="voices-nav">
        <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)}>←</button>
        <span className="voices-counter" aria-live="polite">{String(mod(cur) + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <div className="voices-progress"><span style={{ width: `${((mod(cur) + 1) / n) * 100}%` }} /></div>
        <button type="button" aria-label="Next testimonial" onClick={() => go(1)}>→</button>
      </div>
    </section>
  )
}

const Icon = ({ d, width = 1.75 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

function ServiceCard({ service: [t, d, icon, img] }) {
  return (
    <a className="service" href={serviceHref(t)}>
      <div className="service-media">
        {img && <img src={img} alt="" loading="lazy" />}
        <span className="service-icon"><Icon d={icon} /></span>
      </div>
      <h3>{t}</h3>
      <p>{d}</p>
      <span className="service-more">Learn more <span aria-hidden="true">→</span></span>
    </a>
  )
}

function ServicePage({ service }) {
  const [title, summary, icon, img] = service
  const { intro, includes, outcomes } = serviceDetails[slug(title)]
  return (
    <>
      <section className="svc-hero" style={{ '--img': `url(${img})` }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#services">What We Do</a> / <span>{title}</span></nav>
          <span className="svc-hero-icon"><Icon d={icon} /></span>
          <h1>{title}</h1>
          <p>{summary}</p>
          <a className="btn-pill" href={`/contact?service=${slug(title)}`}>Get Featured <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="wrap svc-detail">
        <div>
          <p className="eyebrow">How we help</p>
          <h2>What This Looks Like</h2>
          <p className="svc-intro">{intro}</p>
        </div>
        <div className="fit-col fit-yes">
          <h3>What’s included</h3>
          <ul>{includes.map(x => <li key={x}><FitIcon yes />{x}</li>)}</ul>
        </div>
      </section>

      <section className="svc-outcomes">
        <div className="wrap">
          <p className="eyebrow">The result</p>
          <h2>What You Walk Away With</h2>
          <div className="svc-outcome-grid">
            {outcomes.map(([t, d], i) => (
              <article key={t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="services svc-more">
        <div className="wrap">
          <p className="eyebrow">Explore more</p>
          <h2>Other Services</h2>
          <div className="services-grid">
            {services.filter(([t]) => t !== title).slice(0, 4).map(sv => <ServiceCard key={sv[0]} service={sv} />)}
          </div>
        </div>
      </section>
    </>
  )
}

function Outlets() {
  return (
        <section className="outlets">
          <div className="wrap">
            <p className="eyebrow">Our media network</p>
            <h2>Our Clients Get Featured In The Publications People Trust</h2>
          </div>
          <div className="marquee">
            {/* Rendered 4x so short lists still fill wide screens and loop seamlessly; copies are hidden from screen readers */}
            {[0, 1, 2, 3].map(copy => (
              <ul key={copy} aria-hidden={copy > 0 || undefined}>
                {outlets.map(([name, logo]) => (
                  <li key={name}>{logo ? <img src={logo} alt={copy ? '' : name} /> : name}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>
  )
}

// About page copy — written for VisibilityPress. Add your founder story and team once you have them.
const aboutSteps = [
  ['Discover', 'We start with a strategy call to understand your business, your goals and the audience you need to reach.'],
  ['Shape', 'Our editors find the angle that makes you newsworthy and turn it into a story you approve word for word.'],
  ['Publish', 'We place your story in the outlets on your plan and hand over the links, badges and a plan to reuse them.'],
]
const aboutPillars = [
  ['Media placements', 'Features and articles in business, lifestyle, tech and regional publications your audience already trusts.', 'M4 4h12v16H6a2 2 0 0 1-2-2zM16 8h4v10a2 2 0 0 1-2 2M8 8h4M8 12h4M8 16h4'],
  ['Personal branding', 'Bylines, interviews and positioning that make founders and executives the recognised voice in their field.', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  ['Visibility strategy', 'A plan that connects your coverage to sales, search and AI answers, so every feature keeps working after it’s published.', 'M3 3v18h18M7 15l4-4 3 3 6-6'],
]
const aboutValues = [
  ['Honesty first', 'If press won’t move the needle for you yet, we say so on the first call.'],
  ['Clear and upfront', 'You know the outlets, the timeline and the price before anything starts.'],
  ['Built around you', 'No fixed bundles. Your plan is shaped around your goals, niche and budget.'],
  ['Results you can use', 'Every placement comes with the assets and guidance to turn it into growth.'],
]

function AboutPage() {
  return (
    <>
      <section className="svc-hero" style={{ '--img': `url(${unsplash('1603201667230-bd139210db18').replace('w=800', 'w=1920')})` }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>About</span></nav>
          <h1>We Make Credible Brands Impossible To Ignore</h1>
          <p>Visibility Press is a PR and media agency for founders, experts and growing businesses. We turn real stories into published coverage that builds trust before the first conversation.</p>
          <a className="btn-pill" href="/contact">Work With Us <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="wrap svc-detail">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2>Press That Works As Hard As You Do</h2>
        </div>
        <div className="about-copy">
          <p>Great businesses often stay invisible because nobody has told their story in the places people look for proof. We exist to close that gap.</p>
          <p>We combine editorial skill with strong publisher relationships to get your story in front of the right readers. Then we help you turn that coverage into something useful: social proof on your website, trust in your sales calls and authority in search and AI answers.</p>
        </div>
      </section>

      <section className="svc-outcomes">
        <div className="wrap">
          <p className="eyebrow">How we work</p>
          <h2>From First Call To Published Feature</h2>
          <div className="svc-outcome-grid">
            {aboutSteps.map(([t, d], i) => (
              <article key={t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap about-pillars">
        <p className="eyebrow">What we do</p>
        <h2>Three Ways We Build Your Visibility</h2>
        <div className="about-pillar-grid">
          {aboutPillars.map(([t, d, icon]) => (
            <article key={t}>
              <span className="stat-icon"><Icon d={icon} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <Outlets />

      <section className="wrap about-values">
        <div>
          <p className="eyebrow">Why choose us</p>
          <h2>What You Can Expect From Us</h2>
          <a className="btn-pill fit-cta" href="/services/public-relations-and-media-strategy">See Our Services <span aria-hidden="true">→</span></a>
        </div>
        <div className="about-value-grid">
          {aboutValues.map(([t, d]) => <div key={t}><FitIcon yes /><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
    </>
  )
}

function Home() {
  const [active, setActive] = useState(0)
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Get Your Brand Published In <span className="nowrap">Top-Tier</span> Media</h1>
          <p className="hero-desc">Let trusted headlines do the convincing, so clients, investors and partners already believe in you before you say a word. Book a free call today and start turning credibility into growth.</p>
          <a className="btn-pill" href="/contact">Get Featured <span aria-hidden="true">→</span></a>
        </div>
        <ul className="stats hero-stats">
          {stats.map(([n, l, d]) => (
            <li key={l}>
              <span className="stat-icon"><Icon d={d} /></span>
              <strong>{n}</strong>{l}
            </li>
          ))}
        </ul>
      </section>

      <section id="services" className="services">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2>Everything You Need To Be Seen And Trusted</h2>
          <p className="services-intro">From the story you tell to where it gets published and how AI repeats it, we cover every part of your visibility.</p>
          <div className="services-grid">
            {services.map(sv => <ServiceCard key={sv[0]} service={sv} />)}
          </div>
        </div>
      </section>

      <Outlets />

      <section id="why" className="wrap process">
        <p className="eyebrow">Why Visibility Press?</p>
        <h2>Our Time Together Will Reveal How You Can:</h2>
        <div className="process-list">
          {benefits.map(([t, d], i) => (
            <button key={t} type="button" className={'process-item' + (i === active ? ' active' : '')} aria-expanded={i === active}
              onMouseMove={() => i !== active && setActive(i)} onFocus={() => setActive(i)}>
              <span className="num">{i + 1}</span>
              <span className="process-body">
                <span className="process-title">{t}</span>
                <span className="process-desc">{d}</span>
              </span>
            </button>
          ))}
        </div>
        <Cta />
      </section>

      <Testimonials />


      <section className="fit">
        <div className="wrap">
          <p className="eyebrow">Not every business is ready for the spotlight</p>
          <h2>Are You Ready to Become an Industry Leader with Visibility Press?</h2>
          <div className="fit-cols">
            <div className="fit-col">
              <h3><FitIcon /> Who Is This NOT For?</h3>
              <ul>{fitNo.map(x => <li key={x}><FitIcon />{x}</li>)}</ul>
            </div>
            <div className="fit-col fit-yes">
              <h3><FitIcon yes /> Who Is This FOR?</h3>
              <ul>{fitYes.map(x => <li key={x}><FitIcon yes />{x}</li>)}</ul>
            </div>
          </div>
          <a className="btn-pill fit-cta" href="/contact">Yes! I’m Ready To Get Featured <span aria-hidden="true">→</span></a>
          <p className="fit-note">Take the first step toward greater visibility, stronger credibility, and the recognition your brand deserves.</p>
        </div>
      </section>
    </>
  )
}

// Form submissions: paste a form-service endpoint here (e.g. Formspree: 'https://formspree.io/f/abcd1234').
// Left empty, the form opens the visitor's email app with their details filled in instead.
const CONTACT_ENDPOINT = ''
const CONTACT_EMAIL = 'hello@visibilitypress.com'

const contactFaqs = [
  ['How long does it take to get featured?', 'Most clients see their first placement within 2–4 weeks of approving their story. Timelines depend on the outlets in your plan, and we confirm them before we start.'],
  ['Which publications can you get me into?', 'We work with business, lifestyle, tech and regional outlets. On your strategy call we show you the exact publications that fit your niche and budget.'],
  ['What if a placement doesn’t get published?', 'If a booked outlet doesn’t publish, we replace it with an equivalent one or refund that placement. You only pay for coverage that goes live.'],
  ['Do I need to write the article myself?', 'No. Our editors interview you, draft the piece and shape the angle. You review and approve everything before it’s submitted.'],
  ['Is this right for a new or small business?', 'If you have a real product, service or expertise, yes. If you’re still pre-launch, we’ll tell you honestly and suggest when the timing is better.'],
  ['What does it cost?', 'It depends on the outlets and services you choose. After your free call you get a clear proposal with fixed pricing, with no hidden fees.'],
]

const contactSteps = [
  ['Tell us about you', 'Share a little about your business, your story and what you want press to do for you.'],
  ['Free strategy call', 'We spend 20 minutes on your goals and tell you honestly whether PR will move the needle.'],
  ['Your visibility plan', 'You get a clear plan with target outlets, angles and timelines, ready to start.'],
]

function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const preselected = new URLSearchParams(window.location.search).get('service') ?? ''

  async function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (!CONTACT_ENDPOINT) {
      const body = [...data].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(body)}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(CONTACT_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(res.statusText)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error') // the form keeps what they typed so they can retry
    }
  }

  return (
    <>
      <section className="svc-hero contact-hero" style={{ '--img': 'url(/hero-sunglasses.png)' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>Contact</span></nav>
          <h1>Let’s Get You Featured</h1>
          <p>Tell us where you are and where you want to be seen. We’ll come back with an honest view of what press can do for you.</p>
        </div>
      </section>

      <section className="wrap contact-grid">
        <div className="contact-info">
          <p className="eyebrow">What happens next</p>
          <h2>Three Simple Steps</h2>
          <ol className="contact-steps">
            {contactSteps.map(([t, d], i) => <li key={t}><span>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}
          </ol>
          <div className="contact-direct">
            <p>Prefer email?</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        {status === 'sent' ? (
          <div className="contact-form contact-done" role="status">
            <FitIcon yes />
            <h2>Thanks, we’ve got it.</h2>
            <p>We’ll be in touch shortly to book your free strategy call.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <div className="field-row">
              <label>Full name *<input name="name" required autoComplete="name" /></label>
              <label>Email *<input name="email" type="email" required autoComplete="email" /></label>
            </div>
            <div className="field-row">
              <label>Company or brand<input name="company" autoComplete="organization" /></label>
              <label>Website<input name="website" type="url" placeholder="https://" autoComplete="url" /></label>
            </div>
            <label>Service you’re interested in
              <select name="service" defaultValue={preselected}>
                <option value="">Not sure yet</option>
                {services.map(([t]) => <option key={t} value={slug(t)}>{t}</option>)}
              </select>
            </label>
            <label>Tell us about your goals *<textarea name="message" rows="5" required placeholder="Your story, what you’d like to be featured for, any outlets you have in mind…" /></label>
            {status === 'error' && <p className="form-error" role="alert">Something went wrong sending your message. Please try again or email us at {CONTACT_EMAIL}.</p>}
            <button className="btn-pill contact-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </section>

      <section className="contact-faq">
        <div className="wrap">
          <div className="contact-faq-head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions Before You Reach Out</h2>
            <p>Can’t find your answer? Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
          <div className="faq-list">
            {contactFaqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// TEMPLATE legal copy — fill in the [bracketed] details and have a lawyer review both pages before launch.
// Each section: [heading, ...items]; a string is a paragraph, an array is a bullet list.
const legalUpdated = '16 October 2026'
const legalPages = {
  '/privacy': ['Privacy Policy', 'How we collect, use and protect your personal information.', [
    ['Who we are', 'Visibility Press (“we”, “us”) is a PR and media agency operated by [legal company name], [registered address]. This policy explains what personal information we collect when you visit our website or contact us, how we use it and the choices you have.'],
    ['What we collect',
      'Information you give us. When you use our contact form or email us, we receive your name, email address, company or brand, website, the service you’re interested in and your message. If you become a client, we also receive what we need to do the work, such as your story, bio, photos, interview answers and billing details.',
      'Information collected automatically. Our hosting provider keeps standard server logs, including your IP address, browser type, the pages you request and when. We don’t use analytics or advertising cookies on this website.',
      'Third-party content. Our fonts are loaded from Google Fonts and some images from Unsplash. Loading them sends your IP address and browser details to those providers, who handle it under their own privacy policies.'],
    ['How we use it', [
      'To reply to your enquiry and prepare a proposal',
      'To deliver our services, including pitching your approved story to publications',
      'To send invoices and keep financial records',
      'To keep our website secure and working',
      'To meet our legal obligations',
    ], 'We don’t sell your personal information, and we won’t send you marketing without your permission.'],
    ['Our legal basis', 'Where data protection law requires a legal basis, we rely on taking steps before or performing a contract with you, our legitimate interest in running our business and answering enquiries, complying with the law, and your consent where we ask for it.'],
    ['Who we share it with', [
      'Service providers who help us run the business, such as email, hosting, form handling and accounting, under contract and only for that purpose',
      'Publications, editors and journalists, but only the material you have approved for publication',
      'Professional advisers, such as lawyers and accountants',
      'Authorities, when the law requires it',
    ]],
    ['International transfers', 'Some of our providers process data outside your country. When that happens, we use appropriate safeguards, such as standard contractual clauses.'],
    ['How long we keep it', 'We keep enquiries that don’t lead to work for up to [24 months]. We keep client records for as long as we work together and afterwards for as long as tax, accounting or legal rules require.'],
    ['Your rights', 'Depending on where you live, you can ask to see, correct or delete your personal information, object to or restrict how we use it, receive a copy of it, or withdraw consent you have given. Email hello@visibilitypress.com and we’ll reply within one month. You can also complain to your local data protection authority.'],
    ['Security', 'We use reasonable technical and organisational measures to protect your information. No method of sending or storing data is completely secure, so we can’t guarantee absolute security.'],
    ['Children', 'Our website and services are for businesses and adults. We don’t knowingly collect information from anyone under 18.'],
    ['Changes to this policy', 'We may update this policy. The date at the top shows when it last changed.'],
    ['Contact us', 'Questions about your privacy? Email hello@visibilitypress.com.'],
  ]],
  '/terms': ['Terms of Service', 'The terms that apply when you use our website or work with us.', [
    ['About these terms', 'These terms apply to your use of the Visibility Press website and to the services we provide. Visibility Press is operated by [legal company name], [registered address]. By using our website or services, you agree to these terms. If you’re a client, your proposal or agreement also applies, and where it conflicts with these terms, the proposal or agreement wins.'],
    ['Our services', 'We provide PR, media placement, thought leadership, content, reputation, website and AI visibility services. The scope, target outlets, deliverables, timelines and fees for your work are set out in your proposal.'],
    ['No guaranteed outcomes', 'Publications make their own editorial decisions. We place both earned and sponsored coverage and tell you which is which. We don’t guarantee specific business results, such as sales, search rankings or how AI tools describe you. If a booked outlet doesn’t publish, we replace it with an equivalent outlet or refund that placement.'],
    ['Your responsibilities', [
      'Give us accurate information about you and your business',
      'Only send us material you have the right to use, such as photos, logos and quotes',
      'Make sure the claims in your story are true and lawful',
      'Review and approve drafts within a reasonable time',
    ]],
    ['Approvals and published content', 'You approve every piece before we submit it. Once an article is published, the outlet controls it, and any later edits or removal are at the outlet’s discretion.'],
    ['Fees and payment', 'Fees are set out in your proposal. Unless your proposal says otherwise, payment is due [before work starts]. Prices exclude any applicable taxes.'],
    ['Cancellations and refunds', 'You can cancel as set out in your proposal. Work already completed and placements already published are not refundable, except as described under “No guaranteed outcomes”.'],
    ['Intellectual property', 'The content of this website belongs to us. Once you have paid in full, you may use the content we create for you for your own business. Publications may own the rights to the articles they publish, so check their terms before republishing an article in full.'],
    ['Using our website', 'Please don’t misuse our website, for example by trying to break its security or copying its content for commercial use. The information on the website is general and isn’t professional advice. We aren’t responsible for the content of third-party websites we link to.'],
    ['Liability', 'To the extent the law allows, we aren’t liable for indirect or consequential losses, such as lost profits or lost opportunities, and our total liability to you is limited to the fees you paid us in the 12 months before the claim. Nothing in these terms limits liability that can’t be limited by law.'],
    ['Changes to these terms', 'We may update these terms. The date at the top shows when they last changed. The version in place when you signed your proposal applies to that work.'],
    ['Governing law', 'These terms are governed by the laws of [jurisdiction], and the courts of [jurisdiction] deal with any disputes.'],
    ['Contact us', 'Questions about these terms? Email hello@visibilitypress.com.'],
  ]],
}

function LegalPage({ page: [title, intro, sections] }) {
  return (
    <>
      <section className="svc-hero" style={{ '--img': 'none' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span>{title}</span></nav>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <article className="wrap legal">
        <p className="legal-updated">Last updated {legalUpdated}</p>
        {sections.map(([heading, ...items]) => (
          <div key={heading}>
            <h2>{heading}</h2>
            {items.map((item, i) => Array.isArray(item)
              ? <ul key={i}>{item.map(li => <li key={li}>{li}</li>)}</ul>
              : <p key={i}>{item}</p>)}
          </div>
        ))}
      </article>
    </>
  )
}

const homeTitle = 'VisibilityPress — Get Featured in Top Publications'

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const isContact = path === '/contact'
  const isAbout = path === '/about'
  const legal = legalPages[path]
  const match = path.match(/^\/services\/([^/]+)$/)
  const service = match && services.find(([t]) => slug(t) === match[1])
  useEffect(() => {
    document.title = isContact ? 'Contact — Visibility Press' : isAbout ? 'About — Visibility Press' : legal ? `${legal[0]} — Visibility Press` : service ? `${service[0]} — Visibility Press` : homeTitle
  }, [isContact, isAbout, legal, service])
  const [menuOpen, setMenuOpen] = useState(false)
  const current = href => (href === path ? 'page' : undefined)

  return (
    <>
      <header className="nav">
        <a className="logo" href="/"><img src="/visibilty-press-brand-logo-tertiary.png" alt="Visibility Press" /></a>
        <nav className="nav-links" aria-label="Main">
          <a href="/about" aria-current={current('/about')}>About</a>
          {/* opens on hover or keyboard focus (CSS :focus-within); the link itself still goes to its href */}
          {menus.map(([label, href, intro, [btn, btnHref], columns]) => (
            <div key={label} className="dropdown">
              <a href={href} aria-haspopup="true" className={label === 'What We Do' && service ? 'is-active' : undefined}>{label} <Icon d="M6 9l6 6 6-6" width={2} /></a>
              <div className="mega">
                <div className="mega-inner">
                  <div className="mega-intro">
                    <p>{intro}</p>
                    <a className="mega-btn" href={btnHref}>{btn} <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 15l6-6M10 9h5v5" /></a>
                  </div>
                  {columns.map(([title, links]) => (
                    <div key={title} className="mega-col">
                      <h4>{title}</h4>
                      <ul>{links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <a href="/contact" aria-current={current('/contact')}>Contact</a>
        </nav>
        <a className="nav-cta" href="/contact">Get featured <span aria-hidden="true">→</span></a>
        <button type="button" className="nav-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(o => !o)}>
          <Icon d={menuOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} width={2} />
        </button>
        {/* phones only: the desktop links are hidden below 720px */}
        <nav id="mobile-menu" className="mobile-menu" hidden={!menuOpen} aria-label="Mobile">
          <a href="/about">About</a>
          <p>What We Do</p>
          {services.map(([t]) => <a key={t} className="mobile-sub" href={serviceHref(t)}>{t}</a>)}
          <p>Who We Work With</p>
          {sectors.flatMap(([, items]) => items).map(t => <a key={t} className="mobile-sub" href="/contact">{t}</a>)}
          <a href="/contact">Contact</a>
          <a className="btn-pill nav-cta-mobile" href="/contact">Get Featured <span aria-hidden="true">→</span></a>
        </nav>
      </header>

      <main>
        {isContact ? <ContactPage /> : isAbout ? <AboutPage /> : legal ? <LegalPage page={legal} /> : service ? <ServicePage service={service} /> : <Home />}

        {!isContact && (
          <section className="final">
            <h2>Ready to make headlines?</h2>
            <p>Book a free 20-minute call. We’ll tell you honestly whether press will move the needle for you.</p>
            <a className="btn" href="/contact">Book a strategy call</a>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="wrap footer-top">
          <div className="footer-brand">
            <a href="/" aria-label="Visibility Press home"><img src="/visibilty-press-brand-logo-tertiary.png" alt="Visibility Press" /></a>
            <p>PR and media placement for founders, experts and brands who want to be seen and trusted.</p>
            <a className="footer-mail" href="mailto:hello@visibilitypress.com">hello@visibilitypress.com</a>
          </div>
          {footerLinks.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h4>{title}</h4>
              <ul>{links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Visibility Press. All rights reserved.</span>
          <span>We place earned and sponsored coverage. Results vary; no specific business outcome is guaranteed.</span>
        </div>
      </footer>
    </>
  )
}
