import DeletedFileCard from "./DeletedFileCard";

const DeletedFilesList = ({ deletedFiles, onFileSelect }) => {
  if (deletedFiles.length === 0) return null;

  return (
    <section className="mt-10 w-full max-w-5xl overflow-hidden rounded-xl border border-purple-500/30 bg-[#0d0b14] text-left shadow-xl shadow-purple-950/20">
      <div className="flex items-center justify-between border-b border-purple-500/20 bg-[#181221] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="font-mono text-xs tracking-wider text-purple-300">
            GRAVEYARD_TERMINAL
          </span>
        </div>

        <span className="font-mono text-xs text-gray-500">GIT FORENSICS</span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-sm text-purple-200">
          <span className="text-green-400">$ </span>
          git graveyard --scan
        </p>

        <p className="mt-4 font-mono text-sm text-gray-300">
          <span className="text-green-400">[FOUND]</span> {deletedFiles.length}{" "}
          deleted file(s) discovered in Git history.
        </p>

        <p className="mt-3 font-mono text-xs text-purple-300/80">
          &gt; The dead code is waiting. Select a file to awaken what lies
          beneath.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {deletedFiles.map((filePath) => (
            <DeletedFileCard
              key={filePath}
              filePath={filePath}
              onSelect={onFileSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeletedFilesList;
