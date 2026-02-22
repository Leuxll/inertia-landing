import { cn } from "@/lib/utils";

function FooterLogo() {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Inertia"
    >
      {/* Inertia logo: circle with three foundation lines below */}
      <circle
        cx="16"
        cy="12"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="10"
        y1="26"
        x2="10"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="28"
        x2="16"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="26"
        x2="22"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="X (Twitter)"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "hello@getinertia.app", href: "mailto:hello@getinertia.app" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/leuxlll", icon: XIcon },
];

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border py-6 px-6 md:px-8 lg:px-12",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="text-text-muted">
          <FooterLogo />
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={isExternal(link.href) ? "_blank" : undefined}
              rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
              className="font-body text-sm text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal(link.href) ? "_blank" : undefined}
                rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="text-text-muted hover:text-text transition-colors"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="font-body text-sm text-text-muted">
          Inertia &copy; 2026
        </p>
      </div>
    </footer>
  );
}
