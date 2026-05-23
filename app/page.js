import Navbar from '@/components/Navbar';
import DemoForm from '@/components/DemoForm';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          {/* Left: Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              AI-Powered Voice Agents
            </div>

            <h1 className="hero-title">
              Transform Your Sales Pipeline with{' '}
              <span className="hero-title-gradient">AI Voice Agents</span>
            </h1>

            <p className="hero-subtitle">
              Request a demo and experience Lifie AI instantly — our autonomous
              AI agent will call you within seconds to showcase the future of
              sales outreach.
            </p>

            <div className="hero-trust-badges">
              <div className="trust-badge">
                <span className="trust-badge-icon">✓</span>
                Instant AI-powered demo call
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">✓</span>
                No credit card required
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">✓</span>
                Enterprise-grade security &amp; compliance
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">✓</span>
                Trusted by leading sales teams
              </div>
            </div>
          </div>

          {/* Right: Demo Form */}
          <DemoForm />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </>
  );
}
