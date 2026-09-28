"use client";

export default function ProfileInfoCard({
  icon: Icon,
  title,
  value,
  dir,
}) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-[#dfe7e2]
        bg-[#fbfdfc]
        p-4
        shadow-[0_3px_10px_rgba(23,58,44,0.035)]
        transition
        hover:border-[#c7d8cf]
        hover:bg-[#f7faf8]
        hover:shadow-[0_5px_15px_rgba(23,58,44,0.055)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#e8f1ec]
            text-[#17634b]
            transition
            group-hover:bg-[#deebe4]
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] text-[#87938d]">
            {title}
          </p>

          <p
            dir={dir}
            className={`
              mt-1
              truncate
              text-sm
              font-medium
              text-[#294c3e]
              ${dir === "ltr" ? "text-left" : ""}
            `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}