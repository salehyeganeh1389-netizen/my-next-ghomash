"use client";

export default function CartSection({ scrolled }) {
return ( <div className="flex shrink-0 items-center">
<button
href="/"
aria-label="قماش شیخ الاسلامی"
className={`
flex
shrink-0
items-center
transition-all
duration-500

      ${
        scrolled
          ? "w-[100px] sm:w-[105px]"
          : "w-[115px] sm:w-[145px] lg:w-[175px]"
      }
    `}
  >
    <img
      src="/undraw_mail-sent_dagx.svg"
      alt="قماش شیخ الاسلامی"
      className={`
        block
        max-w-full
        object-contain
        transition-all
        duration-500

        ${
          scrolled
            ? "max-h-[36px]"
            : "max-h-[50px] sm:max-h-[56px] lg:max-h-[62px]"
        }
      `}
    />
  </button>
</div>

);
}
