import DeletedFileCard from "./DeletedFileCard";

const DeletedFilesList = ({
  deletedFiles,
  onFileSelect,
  repoPath,
  hasScanned = false,
}) => {
  if (!hasScanned) return null;

  const hasDeletedFiles = deletedFiles.length > 0;

  return (
    <section className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-xl border border-purple-500/30 bg-[#0d0b14] text-left shadow-xl shadow-purple-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 bg-[#181221] px-3 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="font-mono text-xs tracking-wider text-purple-300">
            GRAVEYARD_TERMINAL
          </span>
        </div>

        <span className="hidden font-mono text-xs text-gray-500 sm:inline">
          GIT FORENSICS
        </span>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <p className="font-mono text-sm text-purple-200">
            <span className="text-green-400">$ </span>
            git graveyard --scan
          </p>

          {repoPath && (
            <div className="mt-5 flex min-w-0 items-start gap-3 rounded-lg border border-purple-400/15 bg-purple-500/5 px-4 py-3">
              <div className="mt-0.5 text-purple-400">
                <span aria-hidden="true">⌁</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-purple-400">
                  Exhumed Repository
                </p>

                <p className="mt-1 break-all font-mono text-xs leading-6 text-purple-100">
                  {repoPath}
                </p>

                <p className="mt-1 font-mono text-[11px] text-green-400">
                  {hasDeletedFiles
                    ? "[CRYPT OPENED · FORGOTTEN CODE DISCOVERED]"
                    : "[CRYPT OPENED · NO FORGOTTEN CODE FOUND]"}
                </p>
              </div>
            </div>
          )}

          {hasDeletedFiles ? (
            <>
              <div className="mt-8 mb-8 border-y border-purple-500/20 py-5 font-mono">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs tracking-wider text-purple-300">
                    &gt; SCAN_RESULTS.log
                  </p>

                  <span className="text-xs text-green-400">[SUCCESS]</span>
                </div>

                <p className="text-sm leading-7 text-gray-300">
                  <span className="mr-2 text-green-400">[FOUND]</span>
                  <span className="font-semibold text-purple-100">
                    {deletedFiles.length} deleted{" "}
                    {deletedFiles.length === 1 ? "file" : "files"}
                  </span>{" "}
                  recovered from Git history.
                </p>

                <p className="mt-3 text-xs leading-6 text-purple-300/70">
                  &gt; Select a file below to awaken its forgotten code.
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {deletedFiles.map((filePath) => (
                  <DeletedFileCard
                    key={filePath}
                    filePath={filePath}
                    onSelect={onFileSelect}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-3 py-5 text-center">
              <div className="relative">
                <div className="absolute inset-3 animate-pulse rounded-full bg-purple-500/15 blur-2xl" />

                <svg
                  viewBox="0 0 180 135"
                  width="180"
                  height="135"
                  aria-hidden="true"
                  className="relative"
                >
                  <ellipse cx="90" cy="119" rx="74" ry="12" fill="#281a35" />

                  <path
                    d="M53 110V54a37 37 0 0 1 74 0v56Z"
                    fill="#33283f"
                    stroke="#9870bb"
                    strokeWidth="2.5"
                  />

                  <path
                    d="M63 107V55a27 27 0 0 1 54 0v52"
                    fill="none"
                    stroke="#5e4873"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M90 39v28M79 49h22"
                    stroke="#c4a1e6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <text
                    x="90"
                    y="92"
                    fontSize="15"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="#d8b4fe"
                  >
                    R.I.P.
                  </text>

                  <path
                    d="M26 118q25-15 51 0 29-17 58 0 12-7 25 0"
                    fill="none"
                    stroke="#715189"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="font-mono text-sm font-semibold text-purple-200">
                [EMPTY] The graveyard is silent.
              </p>

              <p className="font-mono text-xs text-gray-400">
                No deleted files were found in this repository's Git history.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DeletedFilesList;
