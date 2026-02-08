import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";
import { Github, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "relative border-t bg-background overflow-hidden",
        className
      )}
    >
      {/* Gradient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container py-16">
        {/* ================= Top Section ================= */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <Logo url="/">
              <LogoImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="SkillBridge"
                title="SkillBridge"
                className="h-10"
              />
              <LogoText className="text-xl font-bold tracking-tight">
                SkillBridge 🎓
              </LogoText>
            </Logo>

            <p className="text-sm text-muted-foreground leading-relaxed">
              SkillBridge connects students with verified expert tutors across
              multiple subjects. Learn smarter, grow faster, succeed together.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Github size={18} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Reusable link styles */}
          {[
            {
              title: "Explore",
              links: [
                { href: "/", label: "Home" },
                { href: "/tutors", label: "Browse Tutors" },
                { href: "/categories", label: "Categories" },
                { href: "/search", label: "Search Tutors" },
              ],
            },
            {
              title: "Resources",
              links: [
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact Us" },
              ],
            },
            {
              title: "Legal",
              links: [
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative inline-block transition hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= Bottom Section ================= */}
        <div className="mt-14 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              SkillBridge
            </span>
            . All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/admin"
              className="hover:text-primary transition"
            >
              Admin
            </Link>
            <Link
              href="/status"
              className="hover:text-primary transition"
            >
              System Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
