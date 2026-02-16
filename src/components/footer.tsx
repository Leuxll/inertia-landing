import { cn } from "@/lib/utils";

function FooterLogo() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Momentum"
    >
      <path
        d="M4 28V8L16 20L28 8V28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
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

function InstagramIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Instagram"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "hello@momentum-app.com", href: "mailto:hello@momentum-app.com" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "#", icon: XIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border py-12 px-6 md:px-8 lg:px-12",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-8">
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
          Momentum &copy; 2026
        </p>
      </div>
    </footer>
  );
}
