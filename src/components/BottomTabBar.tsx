import { NavLink } from "react-router-dom";
import { Calendar, Users, Tag } from "lucide-react";

const tabs = [
  { to: "/", label: "课表", icon: Calendar, end: true },
  { to: "/coaches", label: "教练", icon: Users },
  { to: "/pricing", label: "价格", icon: Tag },
];

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ink-800/95 backdrop-blur-md border-t border-ink-700/50 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => {
              const Icon = tab.icon;
              return `flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200 ${
                isActive ? "text-brand-400" : "text-ink-400"
              }`;
            }}
          >
            {({ isActive }) => {
              const Icon = tab.icon;
              return (
                <>
                  <div
                    className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-brand-500/15 text-brand-400 scale-110"
                        : "text-ink-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span
                    className={`text-[11px] font-medium transition-colors ${
                      isActive ? "text-brand-400" : "text-ink-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
