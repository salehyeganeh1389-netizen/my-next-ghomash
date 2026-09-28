"use client";

import {
  UserRound,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    id: "account",
    label: "اطلاعات حساب",
    icon: UserRound,
  },
  {
    id: "orders",
    label: "سفارش‌های من",
    icon: ShoppingBag,
  },
  {
    id: "addresses",
    label: "آدرس‌های من",
    icon: MapPin,
  },
  {
    id: "favorites",
    label: "علاقه‌مندی‌ها",
    icon: Heart,
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: Settings,
  },
];

export default function ProfileSidebar({
  displayName,
  identifier,
  activeSection,
  setActiveSection,
  handleLogout,
}) {
  return (
    <aside
      className="
        h-fit
        rounded-2xl
        border
        border-[#dfe7e2]
        bg-white
        shadow-[0_4px_16px_rgba(23,58,44,0.04)]
      "
    >
      <div className="border-b border-[#e7ece9] p-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#e8f1ec]
              text-[#17634b]
            "
          >
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#294c3e]">
              {displayName}
            </p>

            <p
              dir="ltr"
              className="mt-1 truncate text-xs text-[#8a9690]"
            >
              {identifier}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-3
                text-right
                transition
                ${
                  isActive
                    ? "bg-[#edf4f0] text-[#17634b]"
                    : "text-[#68766f] hover:bg-[#f5f9f7] hover:text-[#294c3e]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />

                <span className="text-xs font-medium">
                  {item.label}
                </span>
              </div>

              <ChevronLeft
                className={`
                  h-3.5
                  w-3.5
                  transition-transform
                  ${
                    isActive
                      ? "-translate-x-0.5 text-[#17634b]"
                      : "text-[#a1aca6] group-hover:-translate-x-0.5"
                  }
                `}
              />
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            mt-2
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-right
            text-[#9b6666]
            transition
            hover:bg-[#faf3f3]
            hover:text-[#8a4f4f]
          "
        >
          <LogOut className="h-4 w-4" />

          <span className="text-xs font-medium">
            خروج از حساب
          </span>
        </button>
      </nav>
    </aside>
  );
}