import { useEffect, useCallback } from "react";
import { useBookingStore } from "../store/useBookingStore";
import type { Course } from "../types";

const PHONE_REGEX = /^1[3-9]\d{9}$/;

export interface UseBookingReturn {
  selectedCourse: Course | null;
  isModalOpen: boolean;
  phone: string;
  submitting: boolean;
  isPhoneValid: boolean;
  isFull: boolean;
  isLowStock: boolean;
  remainingSpots: number;
  totalSpots: number;
  setPhone: (value: string) => void;
  openBooking: (courseId: string) => void;
  closeBooking: () => void;
  submitBooking: () => void;
  getSpotStatus: (course: Course) => {
    isFull: boolean;
    isLow: boolean;
    remaining: number;
  };
}

export function useBooking(): UseBookingReturn {
  const isModalOpen = useBookingStore((s) => s.isModalOpen);
  const selectedCourseId = useBookingStore((s) => s.selectedCourseId);
  const phone = useBookingStore((s) => s.phone);
  const submitting = useBookingStore((s) => s.submitting);
  const storeSetPhone = useBookingStore((s) => s.setPhone);
  const openBookingModal = useBookingStore((s) => s.openBookingModal);
  const closeBookingModal = useBookingStore((s) => s.closeBookingModal);
  const storeSubmit = useBookingStore((s) => s.submitBooking);
  const getCourseById = useBookingStore((s) => s.getCourseById);
  const showToast = useBookingStore((s) => s.showToast);

  const selectedCourse = selectedCourseId ? getCourseById(selectedCourseId) ?? null : null;

  const isPhoneValid = PHONE_REGEX.test(phone);
  const isFull = selectedCourse ? selectedCourse.remainingSpots <= 0 : false;
  const isLowStock = selectedCourse
    ? selectedCourse.remainingSpots > 0 && selectedCourse.remainingSpots <= 5
    : false;
  const remainingSpots = selectedCourse?.remainingSpots ?? 0;
  const totalSpots = selectedCourse?.totalSpots ?? 0;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) closeBookingModal();
    };
    if (isModalOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closeBookingModal, submitting]);

  const setPhone = useCallback(
    (value: string) => storeSetPhone(value),
    [storeSetPhone]
  );

  const openBooking = useCallback(
    (courseId: string) => openBookingModal(courseId),
    [openBookingModal]
  );

  const closeBooking = useCallback(() => {
    if (!submitting) closeBookingModal();
  }, [submitting, closeBookingModal]);

  const submitBooking = useCallback(() => {
    if (submitting || !selectedCourse) return;

    if (!isPhoneValid) {
      showToast("error", "请输入有效的11位手机号");
      return;
    }

    if (isFull) {
      showToast("error", "该课程已约满");
      return;
    }

    useBookingStore.setState({ submitting: true });

    const result = storeSubmit();
    showToast(result.success ? "success" : "error", result.message);

    if (result.success) {
      setTimeout(() => {
        closeBookingModal();
      }, 600);
    } else {
      useBookingStore.setState({ submitting: false });
    }
  }, [submitting, selectedCourse, isPhoneValid, isFull, storeSubmit, showToast, closeBookingModal]);

  const getSpotStatus = useCallback((course: Course) => {
    const remaining = course.remainingSpots;
    return {
      isFull: remaining <= 0,
      isLow: remaining > 0 && remaining <= 5,
      remaining,
    };
  }, []);

  return {
    selectedCourse,
    isModalOpen,
    phone,
    submitting,
    isPhoneValid,
    isFull,
    isLowStock,
    remainingSpots,
    totalSpots,
    setPhone,
    openBooking,
    closeBooking,
    submitBooking,
    getSpotStatus,
  };
}
