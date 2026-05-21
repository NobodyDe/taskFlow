export default function AvatarSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="flex items-center gap-3 px-3 py-4 border-t border-border animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
      {!isCollapsed && (
        <div className="flex flex-col gap-1">
          <div className="w-24 h-3 bg-gray-200 rounded" />
          <div className="w-16 h-2 bg-gray-200 rounded" />
        </div>
      )}
    </div>
  )
}
