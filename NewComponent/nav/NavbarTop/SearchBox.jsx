// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import gsap from "gsap";

// import SearchInput from "./SearchBox/SearchInput";
// import SearchPanel from "./SearchBox/SearchPanel";

// export default function SearchBox({
//   scrolled = false,
//   searchOpen,
//   setSearchOpen,
// }) {
//   const wrapperRef = useRef(null);
//   const inputRef = useRef(null);
//   const searchPanelRef = useRef(null);

//   const [searchValue, setSearchValue] = useState("");

//   /* =========================
//      جستجوهای شما
//   ========================= */

//   const [userSearches, setUserSearches] = useState([]);

//   useEffect(() => {
//     try {
//       const savedSearches = localStorage.getItem("qomash-user-searches");

//       if (savedSearches) {
//         const parsedSearches = JSON.parse(savedSearches);

//         if (Array.isArray(parsedSearches)) {
//           setUserSearches(parsedSearches);
//         }
//       }
//     } catch (error) {
//       console.error("خطا در خواندن جستجوها:", error);
//     }
//   }, []);

//   /* =========================
//      نتایج
//   ========================= */

//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   /* =========================
//      ذخیره جستجوها
//   ========================= */

//   useEffect(() => {
//     try {
//       localStorage.setItem(
//         "qomash-user-searches",
//         JSON.stringify(userSearches)
//       );
//     } catch (error) {
//       console.error("خطا در ذخیره جستجوها:", error);
//     }
//   }, [userSearches]);

//   /* =========================
//      انیمیشن پنل سرچ
//   ========================= */

//   useLayoutEffect(() => {
//     if (!searchOpen || !searchPanelRef.current) return;

//     const panel = searchPanelRef.current;

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         panel,
//         {
//           opacity: 0,
//           y: -12,
//           scaleY: 0.97,
//           transformOrigin: "top center",
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scaleY: 1,
//           duration: 0.28,
//           ease: "power2.out",
//         }
//       );

//       gsap.fromTo(
//         panel.querySelectorAll(".search-panel-item"),
//         {
//           opacity: 0,
//           y: 8,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.22,
//           delay: 0.08,
//           stagger: 0.035,
//           ease: "power2.out",
//         }
//       );
//     }, searchPanelRef);

//     return () => ctx.revert();
//   }, [searchOpen]);

//   /* =========================
//      کلیک بیرون
//   ========================= */

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target)
//       ) {
//         setSearchOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setSearchOpen]);

//   /* =========================
//      Escape
//   ========================= */

//   useEffect(() => {
//     function handleEscape(event) {
//       if (event.key === "Escape") {
//         setSearchOpen(false);
//         inputRef.current?.blur();
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [setSearchOpen]);

//   /* =========================
//      تغییر متن
//   ========================= */

//   function handleSearchChange(event) {
//     const value = event.target.value;

//     setSearchValue(value);
//     setSearchOpen(true);

//     if (!value.trim()) {
//       setSearchResults([]);
//       setHasSearched(false);
//       setSearching(false);
//     } else {
//       setHasSearched(true);
//       setSearching(false);
//       setSearchResults([]);
//     }
//   }

//   /* =========================
//      انتخاب سرچ قبلی
//   ========================= */

//   function handleSearchSelect(title) {
//     setSearchValue(title);
//     setSearchOpen(true);
//     setHasSearched(true);
//     setSearching(false);
//     setSearchResults([]);

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 50);
//   }

//   /* =========================
//      ذخیره سرچ
//   ========================= */

//   function saveSearch(search) {
//     const cleanSearch = search.trim();

//     if (!cleanSearch) return;

//     setUserSearches((prev) => {
//       const filtered = prev.filter((item) => item !== cleanSearch);

//       return [cleanSearch, ...filtered].slice(0, 8);
//     });
//   }

//   /* =========================
//      اجرای سرچ
//   ========================= */

//   async function handleSubmitSearch() {
//     const cleanSearch = searchValue.trim();

//     if (!cleanSearch || searching) return;

//     saveSearch(cleanSearch);

//     setSearching(true);
//     setHasSearched(true);
//     setSearchResults([]);
//     setSearchOpen(true);

//     try {
//       const response = await fetch(
//         "https://fakestoreapi.com/products"
//       );

//       if (!response.ok) {
//         throw new Error("خطا در دریافت محصولات");
//       }

//       const products = await response.json();

//       const searchText = cleanSearch.toLowerCase();

//       const results = products.filter((product) => {
//         const title = product.title?.toLowerCase() || "";
//         const description = product.description?.toLowerCase() || "";
//         const category = product.category?.toLowerCase() || "";

//         return (
//           title.includes(searchText) ||
//           description.includes(searchText) ||
//           category.includes(searchText)
//         );
//       });

//       setSearchResults(results);
//     } catch (error) {
//       console.error("خطا در جستجو:", error);
//       setSearchResults([]);
//     } finally {
//       setSearching(false);
//     }
//   }

//   /* =========================
//      حذف سرچ
//   ========================= */

//   function removeSearch(search) {
//     setUserSearches((prev) =>
//       prev.filter((item) => item !== search)
//     );
//   }

//   /* =========================
//      پاک کردن همه
//   ========================= */

//   function clearSearches() {
//     setUserSearches([]);
//   }

//   return (
//     <div
//       ref={wrapperRef}
//       className="
//         relative
//         z-[110]
//         w-full
//         pointer-events-auto
//       "
//     >
//       <SearchInput
//         inputRef={inputRef}
//         searchValue={searchValue}
//         setSearchOpen={setSearchOpen}
//         handleSearchChange={handleSearchChange}
//         handleSubmitSearch={handleSubmitSearch}
//         scrolled={scrolled}
//       />

//       <SearchPanel
//         searchPanelRef={searchPanelRef}
//         searchOpen={searchOpen}
//         setSearchOpen={setSearchOpen}
//         setSearchValue={setSearchValue}
//         setSearchResults={setSearchResults}
//         setHasSearched={setHasSearched}
//         setSearching={setSearching}
//         userSearches={userSearches}
//         hasSearched={hasSearched}
//         searching={searching}
//         searchResults={searchResults}
//         searchValue={searchValue}
//         handleSearchSelect={handleSearchSelect}
//         removeSearch={removeSearch}
//         clearSearches={clearSearches}
//       />
//     </div>
//   );
// }



















"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import {
SearchX,
PackageSearch,
LoaderCircle,
Search,
X,
Clock3,
} from "lucide-react";
export default function SearchBox({ scrolled = false, searchOpen, setSearchOpen }) { const wrapperRef = useRef(null);
const inputRef = useRef(null);
const searchPanelRef = useRef(null);

const [searchValue, setSearchValue] = useState("");

/* =========================
جستجوهای شما
========================= */

const [userSearches, setUserSearches] = useState([]);

useEffect(() => {
try {
const savedSearches = localStorage.getItem("qomash-user-searches");

if (savedSearches) {
  const parsedSearches = JSON.parse(savedSearches);

  if (Array.isArray(parsedSearches)) {
    setUserSearches(parsedSearches);
  }
}

} catch (error) {
console.error("خطا در خواندن جستجوها:", error);
}
}, []);

/* =========================
نتایج
========================= */

const [searchResults, setSearchResults] = useState([]);
const [searching, setSearching] = useState(false);
const [hasSearched, setHasSearched] = useState(false);

/* =========================
ذخیره جستجوها
========================= */

useEffect(() => {
try {
localStorage.setItem(
"qomash-user-searches",
JSON.stringify(userSearches)
);
} catch (error) {
console.error("خطا در ذخیره جستجوها:", error);
}
}, [userSearches]);

/* =========================
انیمیشن پنل سرچ
========================= */

useLayoutEffect(() => {
if (!searchOpen || !searchPanelRef.current) return;

const panel = searchPanelRef.current;

const ctx = gsap.context(() => {
  gsap.fromTo(
    panel,
    {
      opacity: 0,
      y: -12,
      scaleY: 0.97,
      transformOrigin: "top center",
    },
    {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration: 0.28,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    panel.querySelectorAll(".search-panel-item"),
    {
      opacity: 0,
      y: 8,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.22,
      delay: 0.08,
      stagger: 0.035,
      ease: "power2.out",
    }
  );
}, searchPanelRef);

return () => ctx.revert();

}, [searchOpen]);

/* =========================
کلیک بیرون
========================= */

useEffect(() => {
function handleClickOutside(event) {
if (
wrapperRef.current &&
!wrapperRef.current.contains(event.target)
) {
setSearchOpen(false);
}
}

document.addEventListener("mousedown", handleClickOutside);

return () => {
  document.removeEventListener("mousedown", handleClickOutside);
};

}, [setSearchOpen]);

/* =========================
Escape
========================= */

useEffect(() => {
function handleEscape(event) {
if (event.key === "Escape") {
setSearchOpen(false);
inputRef.current?.blur();
}
}

document.addEventListener("keydown", handleEscape);

return () => {
  document.removeEventListener("keydown", handleEscape);
};

}, [setSearchOpen]);

/* =========================
تغییر متن
========================= */

function handleSearchChange(event) {
const value = event.target.value;

setSearchValue(value);
setSearchOpen(true);

if (!value.trim()) {
  setSearchResults([]);
  setHasSearched(false);
  setSearching(false);
} else {
  setHasSearched(true);
  setSearching(false);
  setSearchResults([]);
}

}

/* =========================
انتخاب سرچ قبلی
========================= */

function handleSearchSelect(title) {
setSearchValue(title);
setSearchOpen(true);
setHasSearched(true);
setSearching(false);
setSearchResults([]);

setTimeout(() => {
  inputRef.current?.focus();
}, 50);

}

/* =========================
ذخیره سرچ
========================= */

function saveSearch(search) {
const cleanSearch = search.trim();

if (!cleanSearch) return;

setUserSearches((prev) => {
  const filtered = prev.filter((item) => item !== cleanSearch);

  return [cleanSearch, ...filtered].slice(0, 8);
});

}

/* =========================
اجرای سرچ
========================= */

async function handleSubmitSearch() {
const cleanSearch = searchValue.trim();

if (!cleanSearch || searching) return;

saveSearch(cleanSearch);

setSearching(true);
setHasSearched(true);
setSearchResults([]);
setSearchOpen(true);

try {
  const response = await fetch(
    "https://fakestoreapi.com/products"
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  const products = await response.json();

  const searchText = cleanSearch.toLowerCase();

  const results = products.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";

    return (
      title.includes(searchText) ||
      description.includes(searchText) ||
      category.includes(searchText)
    );
  });

  setSearchResults(results);
} catch (error) {
  console.error("خطا در جستجو:", error);
  setSearchResults([]);
} finally {
  setSearching(false);
}

}

/* =========================
حذف سرچ
========================= */

function removeSearch(search) {
setUserSearches((prev) =>
prev.filter((item) => item !== search)
);
}

/* =========================
پاک کردن همه
========================= */

function clearSearches() {
setUserSearches([]);
}

return (
<div ref={wrapperRef} className=" relative z-[110] w-full pointer-events-auto " >
{/* =========================
Input
========================= */}

  <div className="relative">
    <input
      ref={inputRef}
      type="text"
      value={searchValue}
      onFocus={() => setSearchOpen(true)}
      onClick={() => setSearchOpen(true)}
      onChange={handleSearchChange}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleSubmitSearch();
        }
      }}
      placeholder="جستجو در محصولات..."
      aria-label="جستجو در محصولات"
      className={`
        w-full
        border
        border-[#e8e8e8]
        bg-[#f7f7f7]
        px-5
        pl-12
        text-right
        text-[13px]
        text-[#333]
        outline-none
        transition-all
        duration-300
        placeholder:text-[#999]
        hover:border-[#d8d8d8]
        focus:border-[#bd9257]
        focus:bg-white
        focus:shadow-[0_4px_18px_rgba(189,146,87,0.08)]

        ${
          scrolled
            ? "h-[42px] rounded-full bg-white/90"
            : "h-[44px] rounded-full"
        }
      `}
    />

    <i
      className="
        bi
        bi-search
        pointer-events-none
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-[16px]
        text-[#888]
      "
    />
  </div>

  {/* =========================
      پنل سرچ
  ========================= */}

  {searchOpen && (
    <div
      ref={searchPanelRef}
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      className="
        absolute
        right-0
        top-[calc(100%+10px)]
        z-[120]
        max-h-[calc(100vh-110px)]
        w-full
        overflow-y-auto
        overflow-x-hidden
        rounded-[18px]
        border
        border-[#eeeeee]
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.14)]
      "
    >
      {/* =========================
          Header
      ========================= */}

      <div className="search-panel-item border-b border-[#f0f0f0] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#f7f4ef]
                text-[#166534]
              "
            >
              <Search size={14} strokeWidth={1.8} />
            </span>

            <div>
              <h3 className="text-[14px] font-semibold text-[#222]">
                جستجوهای شما
              </h3>

              <p className="mt-0.5 text-[10px] text-[#999]">
                جستجوهای اخیر شما در فروشگاه
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setSearchValue("");
              setSearchResults([]);
              setHasSearched(false);
              setSearching(false);
            }}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-[#999]
              transition
              hover:bg-[#f7f7f7]
              hover:text-[#333]
            "
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* =========================
          جستجوهای اخیر
      ========================= */}

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

      {/* =========================
          نتایج جستجو
      ========================= */}

      {hasSearched && (
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
      )}

      {/* =========================
          پیشنهادهای فروشگاه
      ========================= */}

      {!hasSearched && (
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
      )}

      {/* =========================
          پوستر پایین
      ========================= */}

      {!hasSearched && (
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
      )}
    </div>
  )}
</div>

);
}