import { Link } from "react-router-dom";

const social = [
  {
    label: "GitHub",
    href: "https://github.com/277pawan",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.83.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pawan-bisht-a943161b9/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function Footer({ showProjectLinks = true }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0a0a0a] border-t border-white/10 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-white tracking-tight">
            Pawan Bisht
          </p>
          <p className="mt-1 text-xs font-mono text-gray-500">277pawan · two77pawan</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-xs">
            Official site of Pawan Bisht (277pawan) —{" "}
            <a
              href="https://two77pawan.onrender.com/"
              className="text-[#a78bfa] hover:text-white"
            >
              two77pawan.onrender.com
            </a>
            . Products, open source, and engineering notes.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7843e9] mb-4">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/engineering"
                className="hover:text-white transition-colors"
              >
                Engineering concepts
              </Link>
            </li>
            {showProjectLinks && (
              <>
                <li>
                  <Link
                    to="/projects/react-form-toaster"
                    className="hover:text-white transition-colors"
                  >
                    React-Form-Toaster
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects/revenant"
                    className="hover:text-white transition-colors"
                  >
                    Revenant
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7843e9] mb-4">
            Connect
          </p>
          <div className="flex gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-[#7843e9]/50 transition-colors"
              >
                {s.icon}
              </a>
            ))}
            <a
              href="/PawanBishtResume.pdf"
              download
              aria-label="Download resume"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:border-[#7843e9]/50"
              title="Resume PDF"
            >
              CV
            </a>
          </div>
          <a
            href="https://github.com/277pawan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm px-4 py-2 rounded-full bg-[#7843e9] text-white hover:bg-[#6a35d9] transition-colors"
          >
            Contribute on GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-gray-600">
        © {year} Pawan Bisht. Built with React — portfolio & engineering blog.
      </div>
    </footer>
  );
}

export default Footer;
