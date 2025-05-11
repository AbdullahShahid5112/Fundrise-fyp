import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const items = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 bg-base-100 shadow-xl border-r border-base-300
                 flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 flex items-center gap-2">
        <Users className="w-6 h-6 text-primary animate-pulse" />
        <span className="hidden lg:block font-semibold text-lg">Contacts</span>
      </div>

      {/* Skeleton List */}
      <div className="overflow-y-auto py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-3 py-2 rounded-xl 
                       hover:bg-base-200 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-base-300 to-base-100 animate-pulse" />
            </div>

            {/* Info */}
            <div className="hidden lg:flex flex-col flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-gradient-to-r from-base-300 to-base-100 animate-pulse" />
              <div className="h-3 w-20 rounded bg-gradient-to-r from-base-300 to-base-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
