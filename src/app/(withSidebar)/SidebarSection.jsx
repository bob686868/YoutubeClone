export default function SidebarSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 dark:border-neutral-800 pb-2 mb-2">
      {title && (
        <h2 className="px-6 py-2 text-xs uppercase font-semibold text-gray-500">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
