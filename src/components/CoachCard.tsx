import { Award, Sparkles } from "lucide-react";
import type { Coach } from "../types";

interface Props {
  coach: Coach;
  index?: number;
}

export default function CoachCard({ coach, index = 0 }: Props) {
  return (
    <div
      className="group relative shrink-0 w-[280px] sm:w-[300px] bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-ink-100"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-ink-100 to-ink-200">
        <img
          src={coach.avatar}
          alt={coach.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-2xl text-white">{coach.name}</h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-brand-500/90 text-white text-xs font-semibold">
              <Award className="w-3 h-3" />
              {coach.experience}年经验
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {coach.specialties.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-100"
            >
              <Sparkles className="w-3 h-3" />
              {s}
            </span>
          ))}
        </div>
        <p className="text-sm text-ink-600 leading-relaxed line-clamp-4">
          {coach.bio}
        </p>
      </div>
    </div>
  );
}
