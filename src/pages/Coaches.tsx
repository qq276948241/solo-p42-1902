import { useRef } from "react";
import { Users, ChevronLeft, ChevronRight, Award, Star } from "lucide-react";
import { coaches } from "../data/coaches";
import CoachCard from "../components/CoachCard";

export default function Coaches() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const totalExperience = coaches.reduce((sum, c) => sum + c.experience, 0);

  return (
    <div className="min-h-screen pb-24 md:pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500 rounded-full blur-3xl -translate-y-1/3" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-400 rounded-full blur-3xl translate-y-1/3" />
        </div>
        <div className="container relative py-14 md:py-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-5">
            <Users className="w-3.5 h-3.5" />
            专业教练团队
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
            遇见你的
            <span className="text-brand-400"> 专属教练</span>
          </h1>
          <p className="text-ink-300 text-base md:text-lg max-w-xl leading-relaxed">
            {coaches.length} 位国家级认证教练，累计执教 {totalExperience}+ 年经验。
            每位教练都有独特专长，帮你找到最适合的训练方式。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { icon: Award, label: "专业认证教练" },
              { icon: Star, label: "学员好评 4.9+" },
              { icon: Users, label: "累计学员 5000+" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
              >
                <item.icon className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-white/90">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900">
              横向滑动查看全部教练
            </h2>
            <p className="text-sm text-ink-500 mt-1">左右滑动浏览，或点击按钮翻页</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              aria-label="上一页"
              className="w-11 h-11 rounded-2xl bg-white border border-ink-200 hover:border-brand-500 hover:text-brand-600 text-ink-500 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-soft"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              aria-label="下一页"
              className="w-11 h-11 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-glow"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gradient-fade-right"
          >
            {coaches.map((coach, idx) => (
              <CoachCard key={coach.id} coach={coach} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-14 md:mt-16">
        <div className="bg-gradient-to-br from-ink-800 to-ink-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: coaches.length,
                suffix: "位",
                title: "认证教练",
                desc: "全部持有国家级教练资质认证",
              },
              {
                num: totalExperience,
                suffix: "年+",
                title: "累计经验",
                desc: "平均每位教练拥有8年以上经验",
              },
              {
                num: 5000,
                suffix: "+",
                title: "服务学员",
                desc: "累计帮助超过5000名学员达成目标",
              },
            ].map((s) => (
              <div key={s.title} className="text-center md:text-left">
                <div className="flex items-baseline gap-1 justify-center md:justify-start mb-2">
                  <span className="font-display font-extrabold text-5xl md:text-6xl text-brand-400">
                    {s.num}
                  </span>
                  <span className="font-display font-bold text-2xl text-brand-300">{s.suffix}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-ink-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
