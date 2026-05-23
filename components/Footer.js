export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">L</div>
          <span className="footer-name">Lifie AI</span>
        </div>

        <p className="footer-copy">
          &copy; {currentYear} Lifie AI. All rights reserved.
        </p>

        <ul className="footer-links">
          <li>
            <a
              href="https://lifie.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Website
            </a>
          </li>
          <li>
            <a
              href="https://reach.lifie.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              API Docs
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@lifie.ai"
              className="footer-link"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
