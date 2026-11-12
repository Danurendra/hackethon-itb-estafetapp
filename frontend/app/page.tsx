import { ServiceStatus } from "@/app/service-status";

const steps = [
  { number: "01", title: "A donor shares surplus food", detail: "A clear listing with portions, pickup window, and care notes." },
  { number: "02", title: "A coordinator finds the right fit", detail: "Recipient recommendations stay explainable and coordinator-led." },
  { number: "03", title: "A volunteer carries it forward", detail: "One claim, a verified handover, and recipient confirmation." },
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Estafet home">
          <span className="brand-mark" aria-hidden="true">e</span>
          <span>estafet</span>
        </a>
        <span className="pilot-label"><span className="pilot-dot" /> Pilot workspace</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A little surplus can go a long way</p>
          <h1 id="hero-title">Good food.<br /><span>Handed forward.</span></h1>
          <p className="hero-description">
            Estafet helps a community move surplus food from a donor to the people who can use it—with a coordinator and volunteer at every handoff.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            <span className="demo-note">Early build · Synthetic data only</span>
          </div>
        </div>

        <aside className="relay-card" aria-label="Relay workflow preview">
          <div className="card-heading">
            <div>
              <p className="card-kicker">The relay</p>
              <h2>One good thing, passed on.</h2>
            </div>
            <span className="relay-icon" aria-hidden="true">↗</span>
          </div>
          <div className="relay-line" aria-hidden="true"><span /></div>
          <div className="relay-people">
            <div><span className="avatar avatar-donor">D</span><span className="person-role">Donor</span></div>
            <div><span className="avatar avatar-coordinator">C</span><span className="person-role">Coordinator</span></div>
            <div><span className="avatar avatar-volunteer">V</span><span className="person-role">Volunteer</span></div>
            <div><span className="avatar avatar-recipient">R</span><span className="person-role">Recipient</span></div>
          </div>
          <div className="card-footnote"><span className="sparkle" aria-hidden="true">✳</span> Every handoff matters.</div>
        </aside>
      </section>

      <section className="foundation" aria-label="Development status">
        <div className="foundation-copy">
          <span className="status-icon" aria-hidden="true">⌘</span>
          <div>
            <p className="section-kicker">The foundation</p>
            <p className="foundation-title">Local workspace status</p>
          </div>
        </div>
        <ServiceStatus />
      </section>

      <section className="workflow" id="how-it-works" aria-labelledby="workflow-title">
        <div className="workflow-heading">
          <p className="eyebrow">A thoughtful chain, not a marketplace</p>
          <h2 id="workflow-title">Food rescue works<br />better <span>together.</span></h2>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>Estafet <span aria-hidden="true">·</span> Community food rescue</span>
        <span>Built with care, one relay at a time.</span>
      </footer>
    </main>
  );
}
