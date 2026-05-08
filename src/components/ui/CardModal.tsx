import { Edit3 } from "lucide-react";

export default function CardModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      {/* content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <div className="shrink-0 flex items-start justify-between px-8 pt-6 pb-4 border-b border-[#1a1a1a]">
            <div className="flex-1 mr-4">
              <h3
                  className="text-white text-2xl font-semibold cursor-text hover:text-[#e0e0e0] transition-colors pb-1 group flex items-center gap-2"
                >
                ola
                  <Edit3 size={16} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                </h3>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-[#666]">
                  em
                  <span style={{ color:  }} className="font-medium">
                    
                  </span>
                </span>
                <span className="text-[#333]">•</span>
                <span className="text-xs text-[#666]">Criado em</span>
              </div>
            </div>
      </div>
    </div>
    </div>
  )
}
