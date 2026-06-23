import { useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useBookingStore } from "../store/useBookingStore";

export default function GlobalToast() {
  const { toast, hideToast } = useBookingStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => hideToast(), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
      style={{
        animation: "toastSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <style>{`
        @keyframes toastSlideDown {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      <div
        className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md font-medium text-sm min-w-[200px] justify-center ${
          toast.type === "success"
            ? "bg-brand-500/95 text-white"
            : "bg-red-500/95 text-white"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle2 className="w-5 h-5 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
