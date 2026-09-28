"use client";

import {
  Settings,
  UserRound,
  MapPin,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import SettingRow from "./SettingRow";

export default function SettingsSection({
  setActiveSection,
  handleLogout,
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[#e4ebe7]
          bg-[#edf4f0]
          p-5
          sm:p-7
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            text-[#17634b]
            shadow-[0_2px_8px_rgba(23,58,44,0.08)]
          "
        >
          <Settings className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#173a2c]">
            تنظیمات حساب
          </h2>

          <p className="mt-1 text-xs text-[#75827c]">
            مدیریت تنظیمات حساب کاربری
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#dfe7e2]
            bg-white
            shadow-[0_3px_12px_rgba(23,58,44,0.04)]
          "
        >
          <SettingRow
            title="اطلاعات شخصی"
            description="مدیریت نام، شماره موبایل و ایمیل"
            icon={UserRound}
            onClick={() =>
              setActiveSection("account")
            }
          />

          <SettingRow
            title="آدرس‌های ارسال"
            description="مدیریت آدرس‌های مورد استفاده برای سفارش"
            icon={MapPin}
            onClick={() =>
              setActiveSection("addresses")
            }
          />

          <SettingRow
            title="امنیت حساب"
            description="حساب شما با اطلاعات ورود محافظت می‌شود"
            icon={ShieldCheck}
          />

          <SettingRow
            title="خروج از حساب"
            description="خروج از حساب کاربری در این دستگاه"
            icon={LogOut}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}