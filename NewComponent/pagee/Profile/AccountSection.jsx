"use client";

import {
  UserRound,
  Pencil,
  Save,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";

import ProfileInfoCard from "./ProfileInfoCard";
import InputField from "./InputField";

export default function AccountSection({
  isEditing,
  setIsEditing,
  handleSaveProfile,
  displayName,
  profileData,
  handleProfileChange,
}) {
  return (
    <div>
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#e4ebe7]
          bg-[#edf4f0]
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-white
                text-[#17634b]
                shadow-[0_2px_8px_rgba(23,58,44,0.08)]
              "
            >
              <UserRound className="h-4 w-4" />
            </div>

            <h2 className="text-lg font-bold text-[#173a2c]">
              اطلاعات حساب
            </h2>
          </div>

          <p className="mt-2 text-xs text-[#75827c]">
            اطلاعات شخصی حساب کاربری شما
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              group
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#cfdcd5]
              bg-white
              px-4
              py-2.5
              text-sm
              text-[#315748]
              shadow-[0_2px_8px_rgba(23,58,44,0.05)]
              transition
              hover:border-[#a9c2b5]
              hover:bg-[#f7faf8]
            "
          >
            <Pencil className="h-4 w-4" />
            ویرایش اطلاعات
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSaveProfile}
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-[#173a2c]
              px-4
              py-2.5
              text-sm
              text-white
              shadow-[0_4px_12px_rgba(23,58,44,0.16)]
              transition
              hover:bg-[#0f2f23]
            "
          >
            <Save className="h-4 w-4" />
            ذخیره تغییرات
          </button>
        )}
      </div>

      <div className="p-5 sm:p-7">
        {/* Profile Summary */}
        <div
          className="
            mb-6
            grid
            gap-3
            sm:grid-cols-3
          "
        >
          <ProfileInfoCard
            icon={UserRound}
            title="نام کاربر"
            value={displayName}
          />

          <ProfileInfoCard
            icon={Phone}
            title="شماره موبایل"
            value={profileData.phone || "ثبت نشده"}
            dir="ltr"
          />

          <ProfileInfoCard
            icon={Mail}
            title="ایمیل"
            value={profileData.email || "ثبت نشده"}
            dir="ltr"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="نام"
            value={profileData.firstName}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "firstName",
                value
              )
            }
            placeholder="نام خود را وارد کنید"
          />

          <InputField
            label="نام خانوادگی"
            value={profileData.lastName}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "lastName",
                value
              )
            }
            placeholder="نام خانوادگی خود را وارد کنید"
          />

          <InputField
            label="شماره موبایل"
            value={profileData.phone}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "phone",
                value
              )
            }
            placeholder="09123456789"
            dir="ltr"
          />

          <InputField
            label="ایمیل"
            value={profileData.email}
            disabled={!isEditing}
            onChange={(value) =>
              handleProfileChange(
                "email",
                value
              )
            }
            placeholder="example@gmail.com"
            dir="ltr"
          />
        </div>

        {/* Account Status */}
        <div
          className="
            mt-7
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-[#cfe0d7]
            bg-[#eef6f2]
            p-4
            shadow-[0_3px_10px_rgba(23,58,44,0.04)]
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-[#17634b]
              shadow-[0_2px_7px_rgba(23,58,44,0.07)]
            "
          >
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#244b3d]">
              حساب فعال
            </p>

            <p className="mt-1 text-xs leading-6 text-[#718078]">
              حساب کاربری شما فعال است و می‌توانید سفارش‌های خود را مدیریت کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}