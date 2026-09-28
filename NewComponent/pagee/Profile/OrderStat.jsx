"use client";

export default function OrderStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[#dfe7e2]
        bg-[#fbfdfc]
        p-4
        shadow-[0_3px_10px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#f7faf8]
        hover:shadow-[0_5px_15px_rgba(23,58,44,0.05)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[#e8f1ec]
            text-[#17634b]
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-xs text-[#68766f]">
          {title}
        </span>
      </div>

      <span className="text-lg font-bold text-[#244b3d]">
        {value}
      </span>
    </div>
  );
}