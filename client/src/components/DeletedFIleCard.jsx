import { Skull, ArrowUpRight } from "lucide-react";

export default function DeletedFileCard({ filePath, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(filePath)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-purple-500/30 bg-[#120e1b] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/70 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-700/10 blur-2xl transition-colors group-hover:bg-purple-600/20" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-t-full rounded-b-md border border-purple-500/30 bg-[#21152d]">
          <Skull
            size={25}
            strokeWidth={1.4}
            className="text-purple-300 transition-colors group-hover:text-red-400"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-widest text-gray-500">
            REST IN CODE
          </p>

          <p className="mt-1 break-all font-mono text-sm font-semibold text-purple-100">
            {filePath}
          </p>
        </div>
      </div>

      <div className="relative mt-5 rounded-lg border border-purple-500/30 bg-black/40 px-4 py-3 transition-colors group-hover:border-purple-400/60 group-hover:bg-purple-950/30">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm text-purple-300">
            <span className="text-green-400">$ </span>
            awaken --dead
          </span>

          <ArrowUpRight
            size={18}
            className="text-purple-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>

        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">
          Click to execute · Awaken the dead
        </p>
      </div>
    </button>
  );
}
