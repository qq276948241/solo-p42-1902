import { Clock, User, Users, Flame } from "lucide-react";
import type { Course } from "../types";
import { useBookingStore } from "../store/useBookingStore";

const categoryColors: Record<string, string> = {
  力量: "bg-orange-100 text-orange-700 border-orange-200",
  有氧: "bg-blue-100 text-blue-700 border-blue-200",
  瑜伽: "bg-purple-100 text-purple-700 border-purple-200",
  搏击: "bg-red-100 text-red-700 border-red-200",
  舞蹈: "bg-pink-100 text-pink-700 border-pink-200",
};

interface Props {
  course: Course;
  style?: React.CSSProperties;
  className?: string;
}

export default function CourseCard({ course, style, className = "" }: Props) {
  const { openBookingModal } = useBookingStore();
  const isFull = course.remainingSpots <= 0;
  const isLow = course.remainingSpots > 0 && course.remainingSpots <= 5;

  return (
    <div
      style={style}
      onClick={() => !isFull && openBookingModal(course.id)}
      className={`group relative bg-white rounded-3xl p-5 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer overflow-hidden border border-ink-100 ${
        isFull ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-1"
      } ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold ${
            categoryColors[course.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {course.category}
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              isFull
                ? "bg-red-50 text-red-600"
                : isLow
                ? "bg-amber-50 text-amber-600"
                : "bg-brand-50 text-brand-600"
            }`}
          >
            <Users className="w-3 h-3" />
            {isFull ? "已约满" : `剩${course.remainingSpots}位`}
          </span>
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-ink-900 leading-snug mb-4 line-clamp-2 group-hover:text-brand-700 transition-colors">
        {course.name}
      </h3>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <User className="w-4 h-4 text-ink-400" />
          <span className="font-medium text-ink-700">{course.coach}</span>
          <span className="text-ink-300">·</span>
          <span className="text-ink-500">教练</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <Clock className="w-4 h-4 text-ink-400" />
          <span className="font-medium text-ink-700">{course.startTime}</span>
          <span className="text-ink-300">·</span>
          <span className="text-ink-500">{course.duration} 分钟</span>
        </div>
      </div>

      <button
        disabled={isFull}
        className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
          isFull
            ? "bg-ink-200 text-ink-500 cursor-not-allowed hover:bg-ink-200"
            : "bg-brand-500 hover:bg-brand-600 text-white hover:shadow-glow"
        }`}
      >
        {isFull ? (
          "已满"
        ) : (
          <>
            <Flame className="w-4 h-4" />
            立即预约
          </>
        )}
      </button>
    </div>
  );
}
