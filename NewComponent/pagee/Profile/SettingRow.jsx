"use client";

import { ChevronLeft } from "lucide-react";

export default function SettingRow({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        gap-4
        border-b
        border-[#e7ece9]
        p-5
        text-right
        transition
        last:border-b-0
        hover:bg-[#f5f9f7]
        disabled:cursor-default
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-[#dce6e1]
            bg-[#edf4f0]
            text-[#17634b]
            transition
            group-hover:bg-white
            group-hover:shadow-[0_2px_8px_rgba(23,58,44,0.06)]
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-[#294c3e]">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#8a9690]">
            {description}
          </p>
        </div>
      </div>

      {onClick && (
        <ChevronLeft
          className="
            h-4
            w-4
            text-[#9aa59f]
            transition-transform
            group-hover:-translate-x-1
            group-hover:text-[#17634b]
          "
        />
      )}
    </button>
  );
}