export default function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-5 w-full px-6 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors
        ${active ? "font-semibold bg-gray-100 dark:bg-neutral-800" : "text-gray-700 dark:text-gray-200"}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
