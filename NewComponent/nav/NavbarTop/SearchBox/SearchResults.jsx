"use client";

import {
  SearchX,
  PackageSearch,
  LoaderCircle,
} from "lucide-react";

export default function SearchResults({
  hasSearched,
  searching,
  searchResults,
  searchValue,
}) {
  if (!hasSearched) return null;

  return (
    <div className="search-panel-item border-t border-[#f2f2f2] px-5 py-5 sm:px-6">
      {searching && (
        <div
          className="
            flex
            min-h-[180px]
            flex-col
            items-center
            justify-center
            rounded-[16px]
            bg-[#fafbf9]
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#f2f7f3]
              text-[#166534]
            "
          >
            <LoaderCircle
              size={23}
              strokeWidth={1.6}
              className="animate-spin"
            />
          </div>

          <p className="mt-3 text-[12px] font-medium text-[#444]">
            در حال جستجو...
          </p>

          <p className="mt-1 text-[10px] text-[#aaa]">
            محصولات قماش شیخ الاسلامی را بررسی می‌کنیم
          </p>
        </div>
      )}

      {!searching && searchResults.length === 0 && (
        <div
          className="
            relative
            flex
            min-h-[210px]
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-[16px]
            border
            border-[#eeeeee]
            bg-gradient-to-b
            from-[#fcfdfc]
            to-[#f8faf8]
            px-5
            py-7
            text-center
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-[#166534]/[0.035]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-12
              -left-12
              h-32
              w-32
              rounded-full
              bg-[#bd9257]/[0.035]
            "
          />

          <div
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#166534]
              shadow-[0_8px_25px_rgba(22,101,52,0.08)]
            "
          >
            <SearchX size={25} strokeWidth={1.5} />
          </div>

          <h3 className="relative mt-4 text-[14px] font-semibold text-[#333]">
            محصولی پیدا نشد
          </h3>

          <p className="relative mt-1.5 max-w-[320px] text-[10px] leading-5 text-[#999]">
            برای
            <span className="mx-1 font-medium text-[#555]">
              «{searchValue.trim()}»
            </span>
            محصولی در فروشگاه پیدا نکردیم.
          </p>

          <div
            className="
              relative
              mt-4
              flex
              items-center
              gap-2
              rounded-full
              bg-[#f2f6f3]
              px-3.5
              py-2
              text-[9px]
              text-[#66806f]
            "
          >
            <PackageSearch size={12} strokeWidth={1.7} />

            <span>
              نام محصول یا دسته‌بندی دیگری را امتحان کنید
            </span>
          </div>
        </div>
      )}

      {!searching && searchResults.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageSearch
                size={15}
                strokeWidth={1.7}
                className="text-[#166534]"
              />

              <span className="text-[12px] font-semibold text-[#333]">
                نتایج جستجو
              </span>
            </div>

            <span className="text-[10px] text-[#999]">
              {searchResults.length} محصول
            </span>
          </div>

          <div className="space-y-2">
            {searchResults.slice(0, 5).map((product) => (
              <button
                key={product.id}
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-[12px]
                  border
                  border-[#eeeeee]
                  bg-white
                  p-2.5
                  text-right
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:border-[#166534]/20
                  hover:bg-[#f9fbfa]
                  hover:shadow-[0_6px_18px_rgba(0,0,0,0.05)]
                "
              >
                <div
                  className="
                    flex
                    h-[55px]
                    w-[55px]
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[9px]
                    bg-[#f7f7f7]
                  "
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="
                      h-full
                      w-full
                      object-contain
                      p-2
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className="
                      line-clamp-2
                      text-[11px]
                      font-medium
                      leading-5
                      text-[#444]
                      transition-colors
                      group-hover:text-[#166534]
                    "
                  >
                    {product.title}
                  </h4>

                  <p className="mt-1 text-[10px] text-[#999]">
                    {product.category}
                  </p>
                </div>

                <i
                  className="
                    bi
                    bi-chevron-left
                    shrink-0
                    text-[11px]
                    text-[#bbb]
                    transition
                    group-hover:text-[#166534]
                  "
                />
              </button>
            ))}
          </div>

          {searchResults.length > 5 && (
            <button
              type="button"
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-[#f5f8f6]
                py-2.5
                text-[10px]
                font-medium
                text-[#166534]
                transition
                hover:bg-[#edf4ef]
              "
            >
              مشاهده همه نتایج

              <i className="bi bi-arrow-left text-[10px]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}