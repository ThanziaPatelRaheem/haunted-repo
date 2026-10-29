import { useState } from "react";
import { scanRepository } from "../services/repoApi";

export default function RepositoryScanner({
  onScanComplete,
  onReset,
  hasScanned,
}) {
  const [repoPath, setRepoPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async (e) => {
    e.preventDefault();
    setError("");

    if (!repoPath.trim()) {
      setError(
        "[CURSE DETECTED] No repository has been summoned. Enter a valid Git repository path to awaken the forgotten code.",
      );
      return;
    }

    setLoading(true);

    try {
      const data = await scanRepository(repoPath.trim());
      onScanComplete(data.deletedFiles, repoPath.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleScan}
      noValidate
      className="w-full max-w-3xl overflow-hidden rounded-xl border border-purple-500/30 bg-[#0d0b14] text-left shadow-xl shadow-purple-950/20"
    >
      <div className="flex items-center justify-between gap-3 border-b border-purple-500/20 bg-[#181221] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="font-mono text-xs tracking-wider text-purple-300">
            REPOSITORY_EXHUMATION_TERMINAL
          </span>
        </div>

        <span className="font-mono text-xs text-green-400">[READY]</span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="font-mono text-xs text-gray-500">
            &gt; TARGET REPOSITORY
          </p>

          <label
            htmlFor="repoPath"
            className="mt-2 block text-sm text-gray-300"
          >
            Enter the path to the repository you wish to exhume
          </label>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-purple-500/40 bg-black/50 px-4 py-3 focus-within:border-purple-400">
          <span className="font-mono text-green-400">$</span>

          <input
            id="repoPath"
            type="text"
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
            placeholder="/Users/yourname/Developer/my-repo"
            required
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 w-full bg-transparent font-mono text-sm text-purple-100 outline-none placeholder:text-gray-600"
          />
        </div>

        <div className="flex flex-wrap items-stretch gap-3">
          <button
            type="submit"
            disabled={loading}
            className="group w-full cursor-pointer rounded-lg border border-purple-500/50 bg-[#1b1128] px-5 py-4 text-left transition-all duration-300 hover:border-purple-300 hover:bg-[#2b1740] hover:shadow-[0_0_24px_rgba(168,85,247,0.2)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <span className="font-mono text-sm text-purple-200">
                &gt; Searching for buried code...
              </span>
            ) : (
              <span className="flex items-center gap-4">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  ☠️
                </span>

                <span className="flex flex-col gap-1">
                  <span className="font-mono text-sm font-semibold text-purple-100">
                    Exhume Forgotten Code
                  </span>

                  <span className="font-mono text-xs text-green-400">
                    $ exhume --dead
                    <span className="ml-1 animate-pulse">_</span>
                  </span>
                </span>

                <span className="ml-4 font-mono text-purple-400 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            )}
          </button>

          {hasScanned && (
            <button
              type="button"
              onClick={onReset}
              disabled={loading}
              className="w-full cursor-pointer rounded-lg border border-purple-400/40 bg-purple-900/30 px-5 py-3 font-mono text-xs text-purple-200 transition hover:border-purple-300 hover:bg-purple-800/40 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              $ begin --new-exhumation
            </button>
          )}
        </div>

        <p className="font-mono text-xs text-gray-500">
          [LOCAL] Searching Git history for buried files.
        </p>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-950/20 px-4 py-3"
          >
            <p className="font-mono text-sm text-red-300">☠️ {error}</p>
          </div>
        )}
      </div>
    </form>
  );
}
