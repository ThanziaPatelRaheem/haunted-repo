export default function DeletedFileCard({ filePath, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(filePath)}
      className="group w-full cursor-pointer rounded-xl border border-purple-500/30 bg-[#14101f] p-4 text-left transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">☠️</span>

        <div className="min-w-0">
          <p className="font-mono text-xs text-gray-500">DELETED_FILE</p>

          <p className="break-all font-mono text-sm text-purple-200">
            {filePath}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-purple-500/40 bg-black/40 px-4 py-3 transition-colors group-hover:border-purple-400 group-hover:bg-purple-950/40">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm text-purple-300">
            <span className="text-green-400">$ </span>
            awaken --dead
          </span>

          <span className="text-purple-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">
          Click to execute · Awaken the dead
        </p>
      </div>
    </button>
  );
}
