import { Skull } from "lucide-react";

export default function HauntedHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 bg-[#171020] px-5 py-4 sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-purple-500/40 bg-[#1b1128] shadow-[0_0_18px_rgba(168,85,247,0.12)]">
          <Skull
            size={26}
            strokeWidth={1.5}
            className="text-purple-300"
            aria-hidden="true"
          />
        </div>

        <div>
          <h1 className="font-mono text-base font-bold tracking-wider text-purple-100">
            HAUNTED REPO
          </h1>

          <p className="mt-1 font-mono text-[10px] tracking-widest text-gray-500">
            ECHOES OF FORGOTTEN CODE
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-green-400">
        <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        LOCAL MODE
      </div>
    </header>
  );
}
