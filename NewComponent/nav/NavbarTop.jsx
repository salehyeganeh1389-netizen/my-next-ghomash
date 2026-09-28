"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import SearchBox from "./NavbarTop/SearchBox";
import UserSection from "./NavbarTop/UserSection";
import CartSection from "./NavbarTop/CartSection";
import MobileActions from "./NavbarTop/MobileActions";

export default function NavbarTop({
  mobileMenu,
  setMobileMenu,
  scrolled,
  searchOpen,
  setSearchOpen,
}) {
  const floatingSearchRef = useRef(null);

  useLayoutEffect(() => {
    if (!scrolled || !floatingSearchRef.current) return;

    const searchBox = floatingSearchRef.current;

    if (searchOpen) {
      gsap.fromTo(
        searchBox,
        {
          opacity: 0,
          x: 35,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(searchBox, {
        opacity: 0,
        x: 20,
        scale: 0.96,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [searchOpen, scrolled]);

  return (
    <>
      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[80]
            bg-black/20
            backdrop-blur-[1px]
          "
          onClick={() => setSearchOpen(false)}
        />
      )}

      <div
        className="
          relative
          z-[90]
          w-full
          transition-all
          duration-500
        "
      >
        <div
          className={`
            mx-auto
            flex
            items-center
            transition-all
            duration-500

            ${
              scrolled
                ? "h-[60px] px-4 sm:px-5"
                : "min-h-[72px] max-w-[1650px] px-4 sm:px-6 lg:h-[78px]"
            }
          `}
        >
          {!scrolled && (
            <MobileActions
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          )}

          <CartSection scrolled={scrolled} />

          {!scrolled && (
            <div
              className="
                hidden
                lg:block
                w-full
                mr-6
                max-w-[540px]
                transition-all
                duration-500
                xl:mr-10
              "
            >
              <SearchBox
                scrolled={false}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
              />
            </div>
          )}

          <div className="hidden flex-1 lg:block" />

          {!scrolled && (
            <div className="px-4 pb-4 sm:px-6 lg:hidden">
              <SearchBox
                scrolled={false}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
              />
            </div>
          )}

          {scrolled && searchOpen && (
            <div
              ref={floatingSearchRef}
              className="
                pointer-events-auto
                absolute
                left-[54px]
                top-1/2
                z-[250]
                w-[min(360px,calc(100vw-90px))]
                -translate-y-1/2
              "
            >
              <SearchBox
                scrolled={true}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
              />
            </div>
          )}

          <UserSection
            scrolled={scrolled}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
        </div>
      </div>
    </>
  );
}