import type { Membership } from "../types";

export const memberships: Membership[] = [
  {
    id: "m1",
    type: "月卡",
    price: 399,
    originalPrice: 499,
    features: [
      "无限次团课预约",
      "健身房全场馆使用",
      "1次免费体测评估",
      "线上训练计划咨询",
    ],
  },
  {
    id: "m2",
    type: "季卡",
    price: 1099,
    originalPrice: 1499,
    popular: true,
    features: [
      "月卡全部权益",
      "每月2节私教体验课",
      "专属训练计划定制",
      "营养饮食指导方案",
      "会员专属社群服务",
    ],
  },
  {
    id: "m3",
    type: "年卡",
    price: 3699,
    originalPrice: 4999,
    features: [
      "季卡全部权益",
      "每月4节私教体验课",
      "每季度体态评估",
      "1对1饮食监督打卡",
      "免费参加户外活动",
      "专属储物柜使用权",
    ],
  },
];
