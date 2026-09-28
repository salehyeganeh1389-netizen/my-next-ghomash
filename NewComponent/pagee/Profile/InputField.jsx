"use client";

export default function InputField({
  label,
  value,
  disabled,
  onChange,
  placeholder,
  dir,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#40574d]">
        {label}
      </label>

      <div
        className={`
          relative
          rounded-xl
          transition
          ${
            disabled
              ? ""
              : "focus-within:shadow-[0_4px_14px_rgba(23,58,44,0.06)]"
          }
        `}
      >
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`
            h-12
            w-full
            rounded-xl
            border
            border-[#d8e2dd]
            bg-white
            px-4
            text-sm
            outline-none
            transition
            placeholder:text-[#a5afaa]
            ${
              dir === "ltr"
                ? "text-left"
                : "text-right"
            }
            ${
              disabled
                ? "cursor-default bg-[#f3f6f4] text-[#66756d]"
                : "focus:border-[#789d8d] focus:bg-[#fcfefd]"
            }
          `}
        />
      </div>
    </div>
  );
}