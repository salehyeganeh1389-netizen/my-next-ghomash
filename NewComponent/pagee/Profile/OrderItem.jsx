"use client";

import {
  Package,
  CalendarDays,
  CheckCircle2,
  Truck,
  ChevronLeft,
} from "lucide-react";

export default function OrderItem({
  orderNumber,
  date,
  price,
  status,
  statusType,
  count,
}) {
  const isCompleted = statusType === "completed";

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-[#dfe7e2]
        bg-white
        p-4
        shadow-[0_3px_12px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#fbfdfc]
        hover:shadow-[0_5px_16px_rgba(23,58,44,0.055)]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#dce7e1]
              bg-[#edf4f0]
              text-[#17634b]
              transition
              group-hover:bg-[#e6f0eb]
            "
          >
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#294c3e]">
              سفارش {orderNumber}
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-[#929d97]">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{date}</span>
              <span>•</span>
              <span>{count}</span>
            </div>
          </div>
        </div>

        <div className="lg:text-center">
          <p className="text-xs text-[#929d97]">
            مبلغ سفارش
          </p>

          <p className="mt-1 text-sm font-semibold text-[#294c3e]">
            {price}
          </p>
        </div>

        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <div
            className={`
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              ${
                isCompleted
                  ? "bg-[#e9f4ee] text-[#287052]"
                  : "bg-[#f1f4ed] text-[#68733e]"
              }
            `}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Truck className="h-4 w-4" />
            )}

            <span className="text-xs">
              {status}
            </span>
          </div>

          <button
            type="button"
            className="
              group/details
              flex
              items-center
              gap-1
              rounded-lg
              px-2
              py-2
              text-xs
              text-[#66736d]
              transition
              hover:bg-[#f0f5f2]
              hover:text-[#173a2c]
            "
          >
            جزئیات

            <ChevronLeft
              className="
                h-3.5
                w-3.5
                transition-transform
                group-hover/details:-translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </div>
  );
}