"use client";

import { Search } from "lucide-react";

export default function SearchSuggestions({
  hasSearched,
  handleSearchSelect,
}) {
  if (hasSearched) return null;

  return (
    <div className="search-panel-item border-t border-[#f2f2f2] px-5 py-5 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="bi bi-lightning-charge-fill text-[14px] text-[#bd9257]" />

          <span className="text-[13px] font-semibold text-[#333]">
            پیشنهادهای جستجو
          </span>
        </div>

        <span className="text-[10px] text-[#aaa]">
          پیشنهاد برای شما
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {[
          "پارچه‌های جدید",
          "محصولات پرفروش",
          "تخفیف‌های ویژه",
          "پیراهن‌های مردانه",
          "شلوارهای جدید",
          "حوله و جوراب",
        ].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSearchSelect(item)}
            className="
              flex
              items-center
              gap-2
              rounded-[9px]
              bg-[#fafafa]
              px-3
              py-3
              text-right
              text-[11px]
              text-[#555]
              transition-all
              hover:bg-[#f5f8f6]
              hover:text-[#166534]
            "
          >
            <Search
              size={11}
              strokeWidth={1.7}
              className="shrink-0 text-[#aaa]"
            />

            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}