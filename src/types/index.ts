export type CourseCategory = "力量" | "有氧" | "瑜伽" | "搏击" | "舞蹈";

export interface Course {
  id: string;
  name: string;
  coach: string;
  coachId: string;
  date: string;
  startTime: string;
  duration: number;
  totalSpots: number;
  remainingSpots: number;
  category: CourseCategory;
}

export interface Coach {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  bio: string;
  experience: number;
}

export interface Membership {
  id: string;
  type: "月卡" | "季卡" | "年卡";
  price: number;
  originalPrice: number;
  features: string[];
  popular?: boolean;
}

export interface Booking {
  courseId: string;
  phone: string;
  timestamp: number;
}
