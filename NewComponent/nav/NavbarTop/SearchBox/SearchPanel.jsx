"use client";

import { Search, X } from "lucide-react";

import RecentSearches from "./RecentSearches";
import SearchResults from "./SearchResults";
import SearchSuggestions from "./SearchSuggestions";
import SearchPoster from "./SearchPoster";

export default function SearchPanel({
  searchPanelRef,
  searchOpen,
  setSearchOpen,
  setSearchValue,
  setSearchResults,
  setHasSearched,
  setSearching,
  userSearches,
  hasSearched,
  searching,
  searchResults,
  searchValue,
  handleSearchSelect,
  removeSearch,
  clearSearches,
}) {
  if (!searchOpen) return null;

  return (
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

      <RecentSearches
        userSearches={userSearches}
        hasSearched={hasSearched}
        handleSearchSelect={handleSearchSelect}
        removeSearch={removeSearch}
        clearSearches={clearSearches}
      />

      {/* =========================
          نتایج جستجو
      ========================= */}

      <SearchResults
        hasSearched={hasSearched}
        searching={searching}
        searchResults={searchResults}
        searchValue={searchValue}
      />

      {/* =========================
          پیشنهادهای فروشگاه
      ========================= */}

      <SearchSuggestions
        hasSearched={hasSearched}
        handleSearchSelect={handleSearchSelect}
      />

      {/* =========================
          پوستر پایین
      ========================= */}

      <SearchPoster hasSearched={hasSearched} />
    </div>
  );
}