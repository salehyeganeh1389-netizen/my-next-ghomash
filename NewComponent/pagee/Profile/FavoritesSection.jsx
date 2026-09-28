"use client";

import { Heart, ArrowLeft } from "lucide-react";

export default function FavoritesSection({ router }) {
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
          <Heart className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#173a2c]">
            علاقه‌مندی‌ها
          </h2>

          <p className="mt-1 text-xs text-[#75827c]">
            محصولاتی که ذخیره کرده‌اید
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div
          className="
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-[#cbdad2]
            bg-[#f5f9f7]
            px-5
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              border
              border-[#d9e5df]
              bg-white
              text-[#17634b]
              shadow-[0_3px_10px_rgba(23,58,44,0.06)]
            "
          >
            <Heart className="h-6 w-6" />
          </div>

          <p className="mt-4 text-sm font-medium text-[#355849]">
            هنوز محصولی در علاقه‌مندی‌ها ندارید
          </p>

          <p className="mt-2 max-w-md text-xs leading-6 text-[#8a9690]">
            محصولات مورد علاقه خود را ذخیره کنید تا بعداً به‌راحتی به آن‌ها دسترسی داشته باشید.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="
              group
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#173a2c]
              px-5
              py-2.5
              text-sm
              text-white
              shadow-[0_4px_12px_rgba(23,58,44,0.14)]
              transition
              hover:bg-[#0f2f23]
            "
          >
            مشاهده محصولات

            <ArrowLeft
              className="
                h-4
                w-4
                transition-transform
                group-hover:-translate-x-1
              "
            />
          </button>
        </div>
      </div>
    </div>
  );
}