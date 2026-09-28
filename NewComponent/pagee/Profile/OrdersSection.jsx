"use client";

import {
  ShoppingBag,
  Package,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import OrderStat from "./OrderStat";
import OrderItem from "./OrderItem";

export default function OrdersSection() {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[#e4ebe7]
          bg-[#edf4f0]
          p-5
          sm:p-7
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            text-[#17634b]
            shadow-[0_2px_8px_rgba(23,58,44,0.08)]
          "
        >
          <ShoppingBag className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#173a2c]">
            سفارش‌های من
          </h2>

          <p className="mt-1 text-xs text-[#75827c]">
            سفارش‌های ثبت‌شده شما
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <OrderStat
            icon={Package}
            title="همه سفارش‌ها"
            value="۳"
          />

          <OrderStat
            icon={Clock3}
            title="در حال پردازش"
            value="۱"
          />

          <OrderStat
            icon={CheckCircle2}
            title="تحویل شده"
            value="۲"
          />
        </div>

        <div className="space-y-3">
          <OrderItem
            orderNumber="#10024"
            date="۲۴ شهریور ۱۴۰۵"
            price="۸۵۰,۰۰۰ تومان"
            status="در حال پردازش"
            statusType="processing"
            count="۲ کالا"
          />

          <OrderItem
            orderNumber="#10018"
            date="۱۸ شهریور ۱۴۰۵"
            price="۴۲۰,۰۰۰ تومان"
            status="تحویل شده"
            statusType="completed"
            count="۱ کالا"
          />

          <OrderItem
            orderNumber="#10011"
            date="۱۱ شهریور ۱۴۰۵"
            price="۱,۲۰۰,۰۰۰ تومان"
            status="تحویل شده"
            statusType="completed"
            count="۳ کالا"
          />
        </div>
      </div>
    </div>
  );
}