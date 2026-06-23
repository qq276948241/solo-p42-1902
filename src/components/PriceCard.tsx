import { useState } from "react";
import { Check, Crown, Sparkles } from "lucide-react";
import type { Membership } from "../types";

interface Props {
  membership: Membership;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

export default function PriceCard({ membership, isSelected, onSelect, index }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isSelected || isHovered;

  const discount = Math.round((1 - membership.price / membership.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelect(membership.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white rounded-3xl p-7 cursor-pointer transition-all duration-500 overflow-hidden ${
        isActive
          ? "ring-2 ring-brand-500 shadow-glow -translate-y-2 scale-[1.02]"
          : "shadow-soft hover:shadow-card border border-ink-100"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {membership.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-br from-brand-400 to-brand-600 text-white px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl flex items-center gap-1.5 shadow-lg">
            <Crown className="w-3.5 h-3.5" />
            <span className="text-xs font-bold tracking-wide">最热门</span>
          </div>
        </div>
      )}

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/5 pointer-events-none animate-pulse-ring rounded-3xl" />
      )}

      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <h3
            className={`font-display font-bold text-xl transition-colors ${
              isActive ? "text-brand-700" : "text-ink-800"
            }`}
          >
            {membership.type}
          </h3>
          {isActive && (
            <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center animate-scale-in">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-display text-4xl font-extrabold transition-colors ${
                isActive ? "text-brand-600" : "text-ink-900"
              }`}
            >
              ¥{membership.price}
            </span>
            <span className="text-ink-400 text-sm font-medium">
              / {membership.type === "年卡" ? "年" : membership.type === "季卡" ? "季" : "月"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-ink-400 text-sm line-through">¥{membership.originalPrice}</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-bold">
              <Sparkles className="w-3 h-3" />
              省{discount}%
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-7 min-h-[180px]">
          {membership.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all ${
                  isActive ? "bg-brand-500" : "bg-brand-100"
                }`}
              >
                <Check
                  className={`w-3 h-3 transition-colors ${
                    isActive ? "text-white" : "text-brand-600"
                  }`}
                  strokeWidth={3}
                />
              </div>
              <span className="text-sm text-ink-700 leading-snug">{f}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow hover:shadow-glow"
              : "bg-ink-100 hover:bg-ink-800 text-ink-700 hover:text-white"
          }`}
        >
          {isActive ? "✓ 已选择此方案" : "立即购买"}
        </button>
      </div>
    </div>
  );
}
