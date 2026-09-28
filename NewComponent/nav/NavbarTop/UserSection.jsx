"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NavbarActions({
  scrolled = false,
  searchOpen,
  setSearchOpen,
}) {
const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState("");

  /* =========================
     وضعیت لاگین
  ========================= */

  useEffect(() => {
    function checkLogin() {
      const savedUser = localStorage.getItem("qomash_auth");

      if (!savedUser) {
        setIsLoggedIn(false);
        setUserIdentifier("");
        return;
      }

      try {
        const user = JSON.parse(savedUser);

        if (user && user.isLoggedIn === true) {
          setIsLoggedIn(true);
          setUserIdentifier(user.identifier || "");
        } else {
          setIsLoggedIn(false);
          setUserIdentifier("");
        }
      } catch (error) {
        console.error("خطا در خواندن اطلاعات کاربر:", error);

        localStorage.removeItem("qomash_auth");

        setIsLoggedIn(false);
        setUserIdentifier("");
      }
    }

    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("qomash-auth-changed", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("qomash-auth-changed", checkLogin);
    };
  }, []);

  /* =========================
     خروج
  ========================= */

  function handleLogout() {
    localStorage.removeItem("qomash_auth");

    setIsLoggedIn(false);
    setUserIdentifier("");

    window.dispatchEvent(new Event("qomash-auth-changed"));

router.push("/profile");  }

  return (
    <div
      className={`
        mr-auto
        flex
        shrink-0
        items-center
        transition-all
        duration-500

        ${
          scrolled
            ? "gap-0.5"
            : "gap-1 sm:gap-2 lg:gap-3 xl:gap-4"
        }
      `}
    >
      {/* =========================
          ذره‌بین فقط Navbar شناور
      ========================= */}

      {scrolled && (
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="جستجو"
          className="
            group
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            text-[#333]
            transition-all
            duration-200
            hover:bg-[#f7f4ef]
            hover:text-[#166534]
          "
        >
          <i
            className="
              bi
              bi-search
              text-[18px]
              transition-colors
              duration-200
              group-hover:text-[#166534]
            "
          />
        </button>
      )}

      {/* =========================
          اعلان
      ========================= */}

      <button
        type="button"
        aria-label="اعلان‌ها"
        className="
          group
          relative
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          text-[#333]
          transition-all
          duration-200
          hover:bg-[#f7f4ef]
        "
      >
        <i
          className="
            bi
            bi-bell
            text-[19px]
            transition-colors
            duration-200
            group-hover:text-[#166534]
          "
        />

        <span
          className="
            absolute
            right-[6px]
            top-[5px]
            h-[5px]
            w-[5px]
            rounded-full
            bg-[#166534]
          "
        />
      </button>

      {/* =========================
          حساب کاربری
      ========================= */}

      {isLoggedIn ? (
        <div className="group relative">
          <button
            type="button"
            aria-label="حساب کاربری"
            className={`
              group
              flex
              shrink-0
              items-center
              justify-center
              border
              border-[#e5e5e5]
              transition-all
              duration-300
              hover:border-[#166534]
              hover:bg-[#fdfbf8]

              ${
                scrolled
                  ? "h-9 w-9 rounded-full"
                  : "h-10 w-10 rounded-full sm:h-[42px] sm:w-auto sm:gap-2.5 sm:rounded-[8px] sm:px-4"
              }
            `}
          >
            <i
              className="
                bi
                bi-person
                text-[18px]
                text-[#555]
                transition-colors
                duration-200
                group-hover:text-[#166534]
              "
            />

            {!scrolled && (
              <>
                <span
                  className="
                    hidden
                    whitespace-nowrap
                    text-[13px]
                    font-medium
                    text-[#333]
                    sm:block
                  "
                >
                  حساب کاربری
                </span>

                <i
                  className="
                    bi
                    bi-chevron-down
                    hidden
                    text-[10px]
                    text-[#999]
                    transition-transform
                    duration-200
                    group-hover:rotate-180
                    sm:block
                  "
                />
              </>
            )}
          </button>

          {/* منوی حساب */}

          <div
            className="
              invisible
              absolute
              left-0
              top-[calc(100%+10px)]
              z-[200]
              w-[235px]
              translate-y-2
              rounded-[16px]
              border
              border-[#eeeeee]
              bg-white
              p-2
              opacity-0
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              transition-all
              duration-200
              group-hover:visible
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <div
              className="
                mb-1
                rounded-[12px]
                bg-[#f8f8f8]
                px-3.5
                py-3
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#173a2c]
                    text-white
                  "
                >
                  <i className="bi bi-person text-[18px]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#333]">
                    حساب کاربری
                  </p>

                  {userIdentifier && (
                    <p
                      className="
                        mt-1
                        truncate
                        text-[10px]
                        text-[#999]
                        text-right
                        direction-ltr
                      "
                    >
                      {userIdentifier}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/profile")
}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-[10px]
                px-3
                py-3
                text-right
                text-[12px]
                text-[#444]
                transition
                hover:bg-[#f7f4ef]
                hover:text-[#166534]
              "
            >
              <i className="bi bi-person-circle text-[16px]" />

              <span>پروفایل من</span>

              <i className="bi bi-chevron-left mr-auto text-[9px] text-[#aaa]" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/orders")
}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-[10px]
                px-3
                py-3
                text-right
                text-[12px]
                text-[#444]
                transition
                hover:bg-[#f7f4ef]
                hover:text-[#166534]
              "
            >
              <i className="bi bi-bag-check text-[16px]" />

              <span>سفارش‌های من</span>

              <i className="bi bi-chevron-left mr-auto text-[9px] text-[#aaa]" />
            </button>

            <div className="my-1 border-t border-[#f0f0f0]" />

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-[10px]
                px-3
                py-3
                text-right
                text-[12px]
                text-[#b44]
                transition
                hover:bg-[#fff6f6]
              "
            >
              <i className="bi bi-box-arrow-right text-[16px]" />

              <span>خروج از حساب</span>
            </button>
          </div>
        </div>
      ) : (
        /* =========================
           قبل از ورود
        ========================= */

        <button
          type="button"
          onClick={() => router.push("/login")}
          aria-label="ورود یا ثبت نام"
          className={`
            group
            flex
            shrink-0
            items-center
            justify-center
            border
            border-[#e5e5e5]
            transition-all
            duration-300
            hover:border-[#166534]
            hover:bg-[#fdfbf8]

            ${
              scrolled
                ? "h-9 w-9 rounded-full"
                : "h-10 w-10 rounded-full sm:h-[42px] sm:w-auto sm:gap-2.5 sm:rounded-[8px] sm:px-4"
            }
          `}
        >
          <i
            className="
              bi
              bi-person
              text-[18px]
              text-[#555]
              transition-colors
              duration-200
              group-hover:text-[#166534]
            "
          />

          {!scrolled && (
            <span
              className="
                hidden
                whitespace-nowrap
                text-[13px]
                font-medium
                text-[#333]
                sm:block
              "
            >
              ورود | ثبت‌نام
            </span>
          )}
        </button>
      )}

      {/* =========================
          جداکننده
      ========================= */}

      {!scrolled && (
        <div
          className="
            hidden
            h-6
            w-px
            bg-[#e5e5e5]
            sm:block
          "
        />
      )}

      {/* =========================
          سبد خرید
      ========================= */}

      <Link
        href="/ShopppSbaddd"
        aria-label="سبد خرید"
        className="
          group
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          transition-all
          duration-200
          hover:bg-[#f7f4ef]
        "
      >
        <i
          className="
            bi
            bi-bag
            text-[20px]
            text-[#333]
            transition-colors
            duration-200
            group-hover:text-[#166534]
          "
        />
      </Link>
    </div>
  );
}