import { useState } from "react";
import { Tag, Shield, Gift, Headphones, ArrowRight } from "lucide-react";
import { memberships } from "../data/memberships";
import PriceCard from "../components/PriceCard";

export default function Pricing() {
  const [selected, setSelected] = useState<string>(
    memberships.find((m) => m.popular)?.id || memberships[1].id
  );

  const selectedPlan = memberships.find((m) => m.id === selected);

  return (
    <div className="min-h-screen pb-24 md:pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl -translate-y-1/3" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-400 rounded-full blur-3xl translate-y-1/3" />
        </div>
        <div className="container relative py-14 md:py-20 animate-fade-in text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-5 mx-auto md:mx-0">
            <Tag className="w-3.5 h-3.5" />
            灵活方案 · 随时升级
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 max-w-3xl mx-auto md:mx-0">
            选择你的
            <span className="text-brand-400"> 专属会员方案</span>
          </h1>
          <p className="text-ink-300 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            无隐藏费用，随时升级降级。现在开通即享限时优惠，年卡更省 ¥1300！
          </p>
        </div>
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-stretch animate-fade-in">
          {memberships.map((m, idx) => (
            <PriceCard
              key={m.id}
              membership={m}
              isSelected={selected === m.id}
              onSelect={setSelected}
              index={idx}
            />
          ))}
        </div>
      </section>

      <section className="container mt-10 md:mt-14">
        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-soft border border-ink-100 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-ink-100">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
                已选择方案
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-ink-900">
                {selectedPlan?.type}
              </h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-4xl text-brand-600">
                ¥{selectedPlan?.price}
              </span>
              <span className="text-ink-400 line-through">¥{selectedPlan?.originalPrice}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-base transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 flex items-center justify-center gap-2">
              立即开通会员
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="sm:w-auto px-8 py-4 rounded-2xl bg-ink-100 hover:bg-ink-200 text-ink-800 font-bold text-base transition-all duration-200">
              先体验 7 天
            </button>
          </div>
        </div>
      </section>

      <section className="container mt-12 md:mt-16">
        <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900 mb-5 text-center">
          成为会员即享专属权益
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              title: "7天无忧退款",
              desc: "开通后7天内不满意，全额退款无理由",
            },
            {
              icon: Gift,
              title: "新人开卡礼",
              desc: "首次办卡送定制运动毛巾+水杯套装",
            },
            {
              icon: Headphones,
              title: "1对1顾问服务",
              desc: "专属顾问全程跟进，解答训练疑问",
            },
            {
              icon: ArrowRight,
              title: "亲友推荐奖励",
              desc: "推荐好友办卡，双方各得1个月会期",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-5 border border-ink-100 hover:border-brand-200 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-500 flex items-center justify-center mb-4 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-ink-900 mb-1.5">{item.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
