import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, Calendar as CalendarIcon } from "lucide-react";
import { useBookingStore } from "../store/useBookingStore";
import { weekDates } from "../data/courses";
import CourseCard from "../components/CourseCard";

const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

function formatDate(dateStr: string): { month: number; day: number } {
  const d = new Date(dateStr);
  return { month: d.getMonth() + 1, day: d.getDate() };
}

function getTodayIndex(): number {
  const today = new Date().toISOString().split("T")[0];
  const idx = weekDates.indexOf(today);
  return idx >= 0 ? idx : 0;
}

export default function Schedule() {
  const courses = useBookingStore((s) => s.courses);
  const [selectedDay, setSelectedDay] = useState<number>(getTodayIndex());

  const filteredCourses = useMemo(
    () =>
      courses
        .filter((c) => c.date === weekDates[selectedDay])
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [courses, selectedDay]
  );

  const scrollRef = (el: HTMLDivElement | null) => {
    if (el) {
      const activeBtn = el.querySelector<HTMLButtonElement>(
        `[data-day="${selectedDay}"]`
      );
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-400 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>
        <div className="container relative py-14 md:py-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-5">
            <Dumbbell className="w-3.5 h-3.5" />
            IRON FIT 健身工作室
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
            本周<span className="text-brand-400">课表</span>
            <br className="hidden sm:block" />
            开启你的训练之旅
          </h1>
          <p className="text-ink-300 text-base md:text-lg max-w-xl leading-relaxed">
            21+ 精选课程，6 位资深教练陪你练。点击课程卡片即可预约，名额先到先得！
          </p>
        </div>
      </section>

      <section className="container -mt-8 md:-mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-3 md:p-4 shadow-card border border-ink-100">
          <div className="flex items-center gap-2 mb-2 px-2">
            <CalendarIcon className="w-4 h-4 text-ink-500" />
            <span className="text-sm font-semibold text-ink-700">选择日期</span>
            <span className="text-xs text-ink-400 ml-auto hidden sm:inline">左右滑动查看更多</span>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
          >
            {weekDates.map((dateStr, i) => {
              const { month, day } = formatDate(dateStr);
              const isToday = i === getTodayIndex();
              const isActive = i === selectedDay;
              return (
                <button
                  key={dateStr}
                  data-day={i}
                  onClick={() => setSelectedDay(i)}
                  className={`shrink-0 flex flex-col items-center justify-center min-w-[68px] md:min-w-[84px] py-3 px-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-brand-500 text-white shadow-glow scale-105"
                      : "bg-ink-50 text-ink-600 hover:bg-ink-100"
                  }`}
                >
                  <span className={`text-xs font-semibold mb-1 ${isActive ? "text-brand-100" : "text-ink-400"}`}>
                    {weekdays[i]}
                  </span>
                  <span className={`font-display font-bold text-lg ${isActive ? "text-white" : "text-ink-900"}`}>
                    {day}
                  </span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-brand-100" : "text-ink-400"}`}>
                    {month}月
                  </span>
                  {isToday && !isActive && (
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mt-8 md:mt-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink-900">
              {weekdays[selectedDay]} · 共 {filteredCourses.length} 节课程
            </h2>
            <p className="text-sm text-ink-500 mt-1">点击任意卡片即可预约</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-ink-400">
            <ChevronLeft className="w-4 h-4" />
            日期滚动
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-ink-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ink-50 flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-ink-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-ink-700 mb-1">暂无课程安排</h3>
            <p className="text-sm text-ink-400">休息一天也是训练的一部分 💪</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 animate-fade-in">
            {filteredCourses.map((course, idx) => (
              <CourseCard
                key={course.id}
                course={course}
                style={{ animationDelay: `${idx * 60}ms` }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
