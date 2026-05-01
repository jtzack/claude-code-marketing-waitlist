/* global React */
// "Product mark" for the waitlist hero — a stylized terminal/devtools card
// that mirrors the screenshot the user provided.

function ProductMark({variant = 'terminal'}) {
  return <Terminal />;
}

function Terminal() {
  // blinking caret
  const [on, setOn] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pm-term">
      <div className="pm-term-bar">
        <div className="pm-term-lights">
          <span className="pm-term-light pm-term-light-1"></span>
          <span className="pm-term-light pm-term-light-2"></span>
          <span className="pm-term-light pm-term-light-3"></span>
        </div>
        <div className="pm-term-title">cohort-03 — claude</div>
        <div className="pm-term-pad" aria-hidden="true"></div>
      </div>

      <div className="pm-term-body">
        <div className="pm-term-line">
          <span className="pm-term-prompt">▶</span>
          <span className="pm-term-cmd">claude build landing-page</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">generating from brief...</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">writing copy</span>
          <span className="pm-term-ok">[ok]</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">designing layout</span>
          <span className="pm-term-ok">[ok]</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">deploying to vercel</span>
          <span className="pm-term-ok">[ok]</span>
        </div>

        <div className="pm-term-line pm-term-shipped">
          <span className="pm-term-check">✓</span>
          <span>shipped in 4m 12s</span>
        </div>

        <div className="pm-term-spacer"></div>

        <div className="pm-term-line">
          <span className="pm-term-prompt">▶</span>
          <span className="pm-term-cmd">claude write email-sequence</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">analyzing audience...</span>
        </div>
        <div className="pm-term-line pm-term-indent">
          <span className="pm-term-arrow">→</span>
          <span className="pm-term-dim">drafting 6 emails</span>
          <span className="pm-term-ok">[ok]</span>
        </div>

        <div className="pm-term-line pm-term-shipped">
          <span className="pm-term-check">✓</span>
          <span>shipped in 2m 47s</span>
        </div>

        <div className="pm-term-spacer-sm"></div>

        <div className="pm-term-line">
          <span className="pm-term-prompt">▶</span>
          <span className={`pm-term-caret ${on ? 'on' : 'off'}`}></span>
        </div>
      </div>
    </div>
  );
}

window.ProductMark = ProductMark;
window.Terminal = Terminal;
