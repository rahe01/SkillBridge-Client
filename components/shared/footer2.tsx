import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("border-t py-16", className)}>
      <div className="container">
        {/* Top */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 space-y-4">
            <Logo url="/">
              <LogoImage
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="SkillBridge"
                title="SkillBridge"
                className="h-10"
              />
              <LogoText className="text-xl font-bold">
                SkillBridge 🎓
              </LogoText>
            </Logo>
            <p className="text-muted-foreground font-medium">
              Connect with Expert Tutors, Learn Anything.
            </p>
          </div>

          {/* Public */}
          <div>
            <h3 className="mb-4 font-bold">Explore</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/tutors" className="hover:text-primary">Browse Tutors</a></li>
              <li><a href="/categories" className="hover:text-primary">Categories</a></li>
              <li><a href="/blog" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>

          {/* Student */}
          <div>
            <h3 className="mb-4 font-bold">Students</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="/dashboard" className="hover:text-primary">Dashboard</a></li>
              <li><a href="/dashboard/bookings" className="hover:text-primary">My Bookings</a></li>
              <li><a href="/dashboard/profile" className="hover:text-primary">Profile</a></li>
            </ul>
          </div>

          {/* Tutor */}
          <div>
            <h3 className="mb-4 font-bold">Tutors</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="/tutor/dashboard" className="hover:text-primary">Dashboard</a></li>
              <li><a href="/tutor/availability" className="hover:text-primary">Availability</a></li>
              <li><a href="/tutor/profile" className="hover:text-primary">Profile</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/terms" className="hover:text-primary underline">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:text-primary underline">
              Privacy Policy
            </a>
            <a href="/admin" className="hover:text-primary underline">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
