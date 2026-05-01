/* global React, ProductMark */
// Three hero-only directions, all aligned with the existing dark thank-you page:
//   Tar background · Linen text · Burnt-orange accent words.
// Palette: #E8682A orange · #FFB86C peach · #3A322A espresso
//          #F0E4D0 linen · #16120E tar · #B4A690 taupe
// Font: Space Grotesk only.

function useCountdown(targetIso) {
  const [t, setT] = React.useState({d:'00',h:'00',m:'00',s:'00'});
  React.useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const pad = (n) => String(n).padStart(2,'0');
      setT({
        d: pad(Math.floor(diff/86400000)),
        h: pad(Math.floor((diff/3600000)%24)),
        m: pad(Math.floor((diff/60000)%60)),
        s: pad(Math.floor((diff/1000)%60)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);
  return t;
}

function useEmail() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const onSubmit = (e) => { e.preventDefault(); if (email.includes('@')) setSubmitted(true); };
  return {email, setEmail, submitted, onSubmit};
}

/* A · CENTERED STAGE — mirrors the thank-you page composition. */
function HeroLinen() {
  const cd = useCountdown('2026-05-11T16:00:00Z');
  const {email, setEmail, submitted, onSubmit} = useEmail();

  return (
    <div className="hl-root">
      <header className="hl-nav">
        <div className="hl-brand">
          <span className="hl-brand-mark">CCM</span>
          <span className="hl-brand-tag">CLAUDE CODE FOR GROWTH MARKETING</span>
        </div>
        <div className="hl-nav-status">
          <span className="hl-pulse"></span>
          <span>ENROLLMENT OPENS MAY 11</span>
        </div>
      </header>

      <main className="hl-hero">
        <div className="hl-eyebrow">
          <span>EDITION 01 · 2-WEEK LIVE BOOTCAMP · PREMIERES MAY 18</span>
        </div>

        <h1 className="hl-h1">
          MARKETING AGENCIES CHARGE <span className="hl-money">$5–$15K</span> TO BUILD WORKFLOWS LIKE THIS
        </h1>
        <p className="hl-h1-paren">
          (and we&rsquo;re going to teach you to build them <span className="hl-paren-accent">yourself in 2 weeks</span>)
        </p>

        <p className="hl-sub">
          On <strong>Monday, May 18th</strong>, we&rsquo;re launching <strong>Claude Code For Growth Marketing</strong>: a 2-week live bootcamp to help you build, automate, and scale your marketing with Claude Code.
        </p>

        <form className="hl-form" onSubmit={onSubmit}>
          <input
            type="email" required
            placeholder="your@email.com"
            className="hl-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="hl-btn">
            {submitted ? 'CHECK YOUR INBOX ✓' : 'JOIN THE WAITLIST →'}
          </button>
        </form>
        <div className="hl-form-fine">
          <span className="hl-fine-dot"></span>
          Waitlist subscribers unlock <span className="hl-fine-accent">exclusive bonuses</span>. No spam, ever.
        </div>

        <div className="hl-cd">
          <div className="hl-cd-label">— ENROLLMENT OPENS IN —</div>
          <div className="hl-cd-grid">
            <CD value={cd.d} label="DAYS" theme="hl" />
            <span className="hl-cd-sep">:</span>
            <CD value={cd.h} label="HOURS" theme="hl" />
            <span className="hl-cd-sep">:</span>
            <CD value={cd.m} label="MIN" theme="hl" />
            <span className="hl-cd-sep">:</span>
            <CD value={cd.s} label="SEC" theme="hl" />
          </div>
        </div>
      </main>
    </div>
  );
}

/* B · TAR TWO-COLUMN — terminal mock as the side image.
   `variant` controls how the $5–$15K phrase is treated:
     'baseline' (inline orange) | 'sticker' (rotated price-tag block)
     | 'spotlight' (oversized solo-line w/ glow) */
function HeroTar({variant = 'baseline'}) {
  const cd = useCountdown('2026-05-11T16:00:00Z');
  const {email, setEmail, submitted, onSubmit} = useEmail();

  return (
    <div className={`ht-root ht-root--${variant}`}>
      <header className="ht-nav">
        <div className="ht-brand">
          <span className="ht-brand-dot"></span>
          <span className="ht-brand-mark">CCM</span>
          <span className="ht-brand-sep">·</span>
          <span className="ht-brand-tag">CLAUDE CODE FOR GROWTH MARKETING</span>
        </div>
        <div className="ht-nav-status">
          <span className="ht-pulse"></span>
          <span>LIVE — ENROLLMENT OPENS MAY 11</span>
        </div>
      </header>

      <main className="ht-hero">
        <div className="ht-glow" aria-hidden="true"></div>

        <section className="ht-left">
          <div className="ht-eyebrow">
            <span>EDITION 01 / 2026</span>
            <span className="ht-eb-sep">—</span>
            <span>2-WEEK LIVE BOOTCAMP</span>
          </div>

          <MoneyHeadline variant={variant} />
          <p className="ht-h1-paren">
            (and we&rsquo;re going to teach you to build them <span className="ht-paren-accent">yourself in 2 weeks</span>)
          </p>

          <p className="ht-sub">
            On <strong>Monday, May 18th</strong>, we&rsquo;re launching <strong>Claude Code For Growth Marketing</strong>: a 2-week live bootcamp to help you build, automate, and scale your marketing with Claude Code.
          </p>

          <form className="ht-form" onSubmit={onSubmit}>
            <div className="ht-form-row">
              <input
                type="email" required
                placeholder="your@email.com"
                className="ht-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="ht-btn">
                {submitted ? 'CHECK INBOX ✓' : 'JOIN THE WAITLIST'}
              </button>
            </div>
            <div className="ht-form-fine">
              <span className="ht-fine-dot"></span>
              <span>Waitlist subscribers unlock <span className="ht-fine-accent">exclusive bonuses</span></span>
            </div>
          </form>

          <div className="ht-cd">
            <div className="ht-cd-label">— ENROLLMENT OPENS IN —</div>
            <div className="ht-cd-grid">
              <CD value={cd.d} label="DAYS" theme="ht" />
              <span className="ht-cd-sep">:</span>
              <CD value={cd.h} label="HOURS" theme="ht" />
              <span className="ht-cd-sep">:</span>
              <CD value={cd.m} label="MIN" theme="ht" />
              <span className="ht-cd-sep">:</span>
              <CD value={cd.s} label="SEC" theme="ht" />
            </div>
          </div>
        </section>

        <aside className="ht-right">
          <ProductMark variant="terminal" />
        </aside>
      </main>
    </div>
  );
}

/* C · CENTERED STAGE + TERMINAL — same tar/centered feel as the
   thank-you page, with the terminal mock as the featured demo. */
function HeroPoster() {
  const cd = useCountdown('2026-05-11T16:00:00Z');
  const {email, setEmail, submitted, onSubmit} = useEmail();

  return (
    <div className="hp-root">
      <header className="hp-nav">
        <div className="hp-brand">
          <span className="hp-brand-mark">CCM</span>
          <span className="hp-brand-tag">CLAUDE CODE FOR GROWTH MARKETING</span>
        </div>
        <div className="hp-nav-status">
          <span className="hp-pulse"></span>
          <span>ENROLLMENT OPENS MAY 11</span>
        </div>
      </header>

      <main className="hp-hero">
        <div className="hp-eyebrow">
          <span>EDITION 01 · 2-WEEK LIVE BOOTCAMP · PREMIERES MAY 18</span>
        </div>

        <h1 className="hp-h1">
          MARKETING AGENCIES CHARGE <span className="hp-money">$5–$15K</span> TO BUILD WORKFLOWS LIKE THIS
        </h1>
        <p className="hp-h1-paren">
          (and we&rsquo;re going to teach you to build them <span className="hp-paren-accent">yourself in 2 weeks</span>)
        </p>

        <div className="hp-terminal-wrap">
          <ProductMark variant="terminal" />
        </div>

        <p className="hp-sub">
          On <strong>Monday, May 18th</strong>, we&rsquo;re launching <strong>Claude Code For Growth Marketing</strong>: a 2-week live bootcamp to help you build, automate, and scale your marketing with Claude Code.
        </p>

        <form className="hp-form" onSubmit={onSubmit}>
          <input
            type="email" required
            placeholder="your@email.com"
            className="hp-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="hp-btn">
            {submitted ? 'CHECK YOUR INBOX ✓' : 'JOIN THE WAITLIST →'}
          </button>
        </form>
        <div className="hp-form-fine">
          <span className="hp-fine-dot"></span>
          Waitlist subscribers unlock <span className="hp-fine-accent">exclusive bonuses</span>. No spam, ever.
        </div>

        <div className="hp-cd">
          <div className="hp-cd-label">— ENROLLMENT OPENS IN —</div>
          <div className="hp-cd-grid">
            <CD value={cd.d} label="DAYS" theme="hp" />
            <span className="hp-cd-sep">:</span>
            <CD value={cd.h} label="HOURS" theme="hp" />
            <span className="hp-cd-sep">:</span>
            <CD value={cd.m} label="MIN" theme="hp" />
            <span className="hp-cd-sep">:</span>
            <CD value={cd.s} label="SEC" theme="hp" />
          </div>
        </div>
      </main>
    </div>
  );
}

/* Three different headline treatments to make $5–$15K pop. */
function MoneyHeadline({variant}) {
  if (variant === 'sticker') {
    return (
      <h1 className="ht-h1 ht-h1--sticker">
        MARKETING AGENCIES CHARGE
        {' '}
        <span className="ht-sticker">
          <span className="ht-sticker-tape" aria-hidden="true"></span>
          <span className="ht-sticker-amt">$5–$15K</span>
        </span>
        {' '}
        TO BUILD WORKFLOWS LIKE THIS
      </h1>
    );
  }
  if (variant === 'spotlight') {
    return (
      <h1 className="ht-h1 ht-h1--spotlight">
        <span className="ht-spot-line">MARKETING AGENCIES CHARGE</span>
        <span className="ht-spot-money" aria-label="$5–$15K">
          <span className="ht-spot-glow" aria-hidden="true"></span>
          <span className="ht-spot-amt">$5–$15K</span>
        </span>
        <span className="ht-spot-line ht-spot-line--bottom">TO BUILD WORKFLOWS LIKE THIS</span>
      </h1>
    );
  }
  return (
    <h1 className="ht-h1">
      MARKETING AGENCIES CHARGE <span className="ht-money">$5–$15K</span> TO BUILD WORKFLOWS LIKE THIS
    </h1>
  );
}

/* Shared countdown unit */
function CD({value, label, theme}) {
  return (
    <div className={`${theme}-cd-unit`}>
      <div className={`${theme}-cd-num`}>{value}</div>
      <div className={`${theme}-cd-name`}>{label}</div>
    </div>
  );
}

window.HeroLinen = HeroLinen;
window.HeroTar = HeroTar;
window.HeroPoster = HeroPoster;
