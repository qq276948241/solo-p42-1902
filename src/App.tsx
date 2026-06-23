import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomTabBar from "./components/BottomTabBar";
import BookingModal from "./components/BookingModal";
import Schedule from "./pages/Schedule";
import Coaches from "./pages/Coaches";
import Pricing from "./pages/Pricing";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-ink-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Schedule />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<Schedule />} />
          </Routes>
        </main>
        <footer className="hidden md:block py-8 text-center text-sm text-ink-400 border-t border-ink-200 bg-white/50">
          <p>© 2026 IRON FIT 健身工作室 · 让每一滴汗水都有价值 💪</p>
          <p className="mt-1">地址：上海市浦东新区健身大道88号 · 电话：400-888-8888</p>
        </footer>
        <BottomTabBar />
        <BookingModal />
      </div>
    </BrowserRouter>
  );
}
