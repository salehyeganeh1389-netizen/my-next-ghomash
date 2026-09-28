"use client";

export default function MobileActions({
mobileMenu,
setMobileMenu,
}) {
return (
<button
type="button"
onClick={() => setMobileMenu(!mobileMenu)}
aria-label={mobileMenu ? "بستن منو" : "باز کردن منو"}
className="
ml-1
flex
h-9
w-9
shrink-0
items-center
justify-center
rounded-full
text-[#333]
transition-all
duration-200
hover:bg-[#f7f4ef]
hover:text-[#166534]
sm:ml-2
lg:hidden
"
>
<i
className={`           bi
          ${mobileMenu ? "bi-x-lg" : "bi-list"}
          text-[20px]
        `}
/> </button>
);
}
