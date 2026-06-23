import { NavLink, Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

const navItems = [
  { to: "/", label: "本周课表" },
  { to: "/coaches", label: "教练团队" },
  { to: "/pricing", label: "会员价格" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-ink-800/95 backdrop-blur-md shadow-lg border-b border-ink-700/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
            <Dumbbell className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-white text-lg tracking-tight">
              IRON FIT
            </span>
            <span className="text-ink-400 text-[11px]">健身工作室</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500 text-white shadow-glow"
                    : "text-ink-300 hover:text-white hover:bg-ink-700/60"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="tel:400-888-8888"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
        >
          立即咨询
        </a>
      </div>
    </header>
  );
}
