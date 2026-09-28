"use client";

export default function SearchPoster({ hasSearched }) {
  if (hasSearched) return null;

  return (
    <div className="search-panel-item px-5 pb-5 sm:px-6">
      <div
        className="
          relative
          min-h-[125px]
          overflow-hidden
          rounded-[10px]
          bg-[#173a2c]
          px-5
          py-5
          text-white
        "
      >
        <img
          src="/file_00000000d58c820da9bfbc1b74d4fefb.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 max-w-[65%]">
          <h3 className="text-[17px] font-bold">
            تازه‌های قماش شیخ الاسلامی
          </h3>

          <p className="mt-1.5 text-[10px] leading-5 text-white/65">
            جدیدترین پارچه‌ها و پوشاک را همین حالا ببینید.
          </p>

          <button
            type="button"
            className="
              mt-3
              rounded-[5px]
              bg-[#bd9257]
              px-4
              py-2
              text-[10px]
              font-medium
              text-white
              transition
              hover:bg-[#aa7f4a]
            "
          >
            مشاهده محصولات
          </button>
        </div>
      </div>
    </div>
  );
}