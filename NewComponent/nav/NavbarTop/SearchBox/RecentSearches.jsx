"use client";

import { Clock3, X } from "lucide-react";

export default function RecentSearches({
  userSearches,
  hasSearched,
  handleSearchSelect,
  removeSearch,
  clearSearches,
}) {
  return (
    <div className="search-panel-item px-5 py-5 sm:px-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#777]">
          جستجوهای اخیر
        </span>

        {userSearches.length > 0 && (
          <button
            type="button"
            onClick={clearSearches}
            className="
              text-[10px]
              text-[#aaa]
              transition
              hover:text-[#166534]
            "
          >
            پاک کردن همه
          </button>
        )}
      </div>

      {!hasSearched && (
        <>
          {userSearches.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {userSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSearchSelect(item)}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#eeeeee]
                    bg-white
                    px-3.5
                    py-2.5
                    text-[12px]
                    text-[#555]
                    shadow-[0_1px_3px_rgba(0,0,0,0.02)]
                    transition-all
                    duration-200
                    hover:border-[#166534]
                    hover:bg-[#f8fbf9]
                    hover:text-[#166534]
                  "
                >
                  <Clock3
                    size={12}
                    strokeWidth={1.7}
                    className="
                      shrink-0
                      text-[#aaa]
                      transition
                      group-hover:text-[#166534]
                    "
                  />

                  <span>{item}</span>

                  <span
                    role="button"
                    tabIndex={0}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeSearch(item);
                    }}
                    className="
                      mr-0.5
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      text-[#aaa]
                      transition
                      hover:bg-[#eeeeee]
                      hover:text-[#555]
                    "
                  >
                    <X size={10} strokeWidth={2} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[105px]
                flex-col
                items-center
                justify-center
                rounded-[14px]
                border
                border-dashed
                border-[#e8e8e8]
                bg-[#fcfcfc]
                px-4
                py-5
                text-center
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f7f4ef]
                  text-[#bd9257]
                "
              >
                <Clock3 size={18} strokeWidth={1.6} />
              </div>

              <p className="mt-2.5 text-[11px] font-medium text-[#666]">
                هنوز جستجویی انجام نداده‌اید
              </p>

              <p className="mt-1 text-[9px] text-[#aaa]">
                جستجوهای شما بعد از جستجو اینجا ذخیره می‌شوند
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}