"use client";

import {
  MapPin,
  Plus,
  Trash2,
  Phone,
  ArrowLeft,
} from "lucide-react";

export default function AddressesSection({
  addresses,
  handleAddAddress,
  handleDeleteAddress,
}) {
  return (
    <div>
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#e4ebe7]
          bg-[#edf4f0]
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-7
        "
      >
        <div className="flex items-center gap-3">
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
            <MapPin className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#173a2c]">
              آدرس‌های من
            </h2>

            <p className="mt-1 text-xs text-[#75827c]">
              آدرس‌های مورد استفاده برای ارسال سفارش
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddAddress}
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-[#173a2c]
            px-4
            py-2.5
            text-sm
            text-white
            shadow-[0_4px_12px_rgba(23,58,44,0.16)]
            transition
            hover:bg-[#0f2f23]
          "
        >
          <Plus className="h-4 w-4" />
          افزودن آدرس
        </button>
      </div>

      <div className="p-5 sm:p-7">
        {addresses.length === 0 ? (
          <div
            className="
              flex
              min-h-[250px]
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
              <MapPin className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-medium text-[#355849]">
              هنوز آدرسی ثبت نکرده‌اید
            </p>

            <p className="mt-2 text-xs text-[#8a9690]">
              برای ثبت آدرس جدید روی دکمه افزودن آدرس بزنید.
            </p>

            <button
              type="button"
              onClick={handleAddAddress}
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
              افزودن اولین آدرس

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
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="
                  group
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-[#dfe7e2]
                  bg-white
                  p-5
                  shadow-[0_3px_12px_rgba(23,58,44,0.04)]
                  transition
                  hover:border-[#bfd2c8]
                  hover:bg-[#fbfdfc]
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="flex items-start gap-4">
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
                    "
                  >
                    <MapPin className="h-5 w-5 text-[#17634b]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#294c3e]">
                      {address.title}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#718078]">
                      {address.text}
                    </p>

                    {address.phone && (
                      <p
                        dir="ltr"
                        className="mt-2 flex items-center gap-2 text-xs text-[#8a9690]"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {address.phone}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAddress(address.id)
                  }
                  className="
                    flex
                    w-fit
                    items-center
                    gap-2
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    text-[#777]
                    transition
                    hover:bg-[#f0f5f2]
                    hover:text-[#173a2c]
                  "
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}