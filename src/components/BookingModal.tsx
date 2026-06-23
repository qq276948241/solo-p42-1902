import { useEffect, useState } from "react";
import { X, Clock, User, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useBookingStore } from "../store/useBookingStore";

export default function BookingModal() {
  const { isModalOpen, closeBookingModal, selectedCourseId, getCourseById, submitBooking } =
    useBookingStore();
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const course = selectedCourseId ? getCourseById(selectedCourseId) : null;

  useEffect(() => {
    if (!isModalOpen) {
      setPhone("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookingModal();
    };
    if (isModalOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closeBookingModal]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submitBooking(phone.trim());
    setToast({ type: result.success ? "success" : "error", message: result.message });
  };

  if (!isModalOpen || !course) return null;

  const isFull = course.remainingSpots <= 0;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closeBookingModal}
      />
      <div className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex md:items-center md:justify-center p-0 md:p-4">
        <div
          className="w-full md:max-w-md bg-white md:rounded-3xl rounded-t-3xl shadow-2xl animate-scale-in md:mx-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-ink-800 to-ink-900 p-6 text-white">
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold mb-3">
              {course.category}
            </span>
            <h3 className="font-display font-bold text-xl leading-tight mb-2">
              {course.name}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-300">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-400" />
                {course.coach}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-400" />
                {course.startTime} · {course.duration}分钟
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-ink-50 border border-ink-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ink-500" />
                <span className="text-sm text-ink-600">剩余名额</span>
              </div>
              <span
                className={`font-display font-bold text-lg ${
                  isFull
                    ? "text-red-500"
                    : course.remainingSpots <= 5
                    ? "text-amber-500"
                    : "text-brand-500"
                }`}
              >
                {isFull ? "已约满" : `${course.remainingSpots} / ${course.totalSpots}`}
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-ink-700">
                手机号
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="请输入11位手机号接收预约提醒"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                disabled={isFull}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-ink-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 text-base transition-all disabled:bg-ink-50 disabled:text-ink-400"
              />
              <p className="text-xs text-ink-400">
                您的手机号仅用于接收上课提醒，我们承诺保护隐私
              </p>
            </div>

            <button
              type="submit"
              disabled={isFull || phone.length !== 11}
              className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:bg-ink-200 disabled:text-ink-400 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              {isFull ? "课程已约满" : phone.length === 11 ? "确认预约课程" : "请输入完整手机号"}
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl shadow-2xl animate-fade-in flex items-center gap-2.5 font-medium text-sm ${
            toast.type === "success"
              ? "bg-brand-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}
    </>
  );
}
