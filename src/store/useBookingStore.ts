import { create } from "zustand";
import { courses as initialCourses } from "../data/courses";
import type { Course, Booking } from "../types";

interface BookingStore {
  courses: Course[];
  bookings: Booking[];
  selectedCourseId: string | null;
  isModalOpen: boolean;
  openBookingModal: (courseId: string) => void;
  closeBookingModal: () => void;
  submitBooking: (phone: string) => { success: boolean; message: string };
  getCourseById: (id: string) => Course | undefined;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  courses: initialCourses,
  bookings: [],
  selectedCourseId: null,
  isModalOpen: false,

  openBookingModal: (courseId: string) => {
    set({ selectedCourseId: courseId, isModalOpen: true });
  },

  closeBookingModal: () => {
    set({ selectedCourseId: null, isModalOpen: false });
  },

  submitBooking: (phone: string) => {
    const { selectedCourseId, courses, bookings } = get();
    if (!selectedCourseId) {
      return { success: false, message: "未选择课程" };
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return { success: false, message: "请输入有效的11位手机号" };
    }

    const course = courses.find((c) => c.id === selectedCourseId);
    if (!course) {
      return { success: false, message: "课程不存在" };
    }

    if (course.remainingSpots <= 0) {
      return { success: false, message: "该课程已约满" };
    }

    const alreadyBooked = bookings.some(
      (b) => b.courseId === selectedCourseId && b.phone === phone
    );
    if (alreadyBooked) {
      return { success: false, message: "该手机号已预约此课程" };
    }

    const newCourses = courses.map((c) =>
      c.id === selectedCourseId
        ? { ...c, remainingSpots: c.remainingSpots - 1 }
        : c
    );
    const newBooking: Booking = {
      courseId: selectedCourseId,
      phone,
      timestamp: Date.now(),
    };

    set({
      courses: newCourses,
      bookings: [...bookings, newBooking],
      selectedCourseId: null,
      isModalOpen: false,
    });

    return { success: true, message: "预约成功！我们将通过短信提醒您上课" };
  },

  getCourseById: (id: string) => {
    return get().courses.find((c) => c.id === id);
  },
}));
