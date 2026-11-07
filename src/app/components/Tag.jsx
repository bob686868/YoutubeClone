import React from "react";

const Tag = ({ name, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`rounded-lg px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer select-none pressable ${
        active
          ? "bg-[#f1f1f1] text-[#0f0f0f] font-semibold shadow-sm"
          : "bg-white/10 hover:bg-white/15 active:bg-white/20 text-[#f1f1f1]"
      }`}
    >
      {name}
    </button>
  );
};

export default Tag;
