"use client";

export default function SearchInput({
  inputRef,
  searchValue,
  setSearchOpen,
  handleSearchChange,
  handleSubmitSearch,
  scrolled,
}) {
  return (
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
  );
}