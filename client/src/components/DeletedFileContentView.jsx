import { useEffect, useRef, useState } from "react";
import { analyzeDeletedCode, generateGhostStory } from "../services/aiApi";
import ReactMarkdown from "react-markdown";

const markdownStyles = {
  h1: ({ children }) => (
    <h1 className="mt-5 text-2xl font-bold text-purple-200">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-5 text-xl font-semibold text-purple-200">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 text-lg font-semibold text-purple-200">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-gray-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-2 pl-6 text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-2 pl-6 text-gray-300">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="break-words rounded bg-white/10 px-1 py-0.5 font-mono text-purple-200">
      {children}
    </code>
  ),
};

export default function DeletedFileContentView({ file }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [story, setStory] = useState("");
  const [storyLoading, setStoryLoading] = useState(true);
  const [storyError, setStoryError] = useState("");
  const [storyCancelled, setStoryCancelled] = useState(false);
  const [analysisCancelled, setAnalysisCancelled] = useState(false);
  const storyControllerRef = useRef(null);
  const analysisControllerRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const controller = new AbortController();
    storyControllerRef.current = controller;

    async function summonGhost() {
      try {
        const result = await generateGhostStory(file, controller.signal);

        if (!controller.signal.aborted) {
          setStory(result);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setStoryError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setStoryLoading(false);
        }
      }
    }

    summonGhost();

    return () => {
      controller.abort();
    };
  }, [file]);

  const handleAnalyze = async () => {
    if (!file || storyLoading || !story || loading) return;

    const controller = new AbortController();
    analysisControllerRef.current = controller;

    setLoading(true);
    setError("");
    setAnalysis("");
    setAnalysisCancelled(false);

    try {
      const result = await analyzeDeletedCode(file, controller.signal);

      if (!controller.signal.aborted) {
        setAnalysis(result);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };
  const handleSilenceSpirits = () => {
    if (storyLoading) {
      storyControllerRef.current?.abort();
      setStoryLoading(false);
      setStoryCancelled(true);
    }

    if (loading) {
      analysisControllerRef.current?.abort();
      setLoading(false);
      setAnalysisCancelled(true);
    }
  };

  if (!file) return null;

  return (
    <section className="mt-8 w-full min-w-0 overflow-hidden rounded-xl border border-purple-500/30 bg-[#0d0b14] text-left shadow-xl shadow-purple-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 bg-[#181221] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="font-mono text-xs tracking-wider text-purple-300">
            HAUNTED_INVESTIGATION_CONSOLE
          </span>
        </div>

        <span className="font-mono text-xs text-green-400">
          [ENTITY DETECTED]
        </span>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        <div className="min-w-0 border-b border-purple-500/20 pb-5">
          <p className="font-mono text-xs text-gray-500">
            $ git show --forgotten
          </p>

          <h2 className="mt-2 break-all font-mono text-lg font-semibold text-purple-200">
            ☠️ {file.filePath}
          </h2>
        </div>

        <div className="rounded-xl border border-purple-500/30 bg-[#1a1127] p-5 sm:p-6">
          <div className="mb-4 border-b border-purple-500/20 pb-4">
            <p className="font-mono text-xs tracking-wider text-purple-400">
              01 / TRANSMISSION FROM THE DEAD
            </p>

            <h3 className="mt-2 text-xl font-semibold text-purple-200">
              👻 Echoes from the Graveyard
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              A forgotten file speaks from beyond the commit.
            </p>
          </div>

          {storyLoading && (
            <div role="status" aria-live="polite" className="space-y-5 py-5">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="animate-bounce text-4xl drop-shadow-[0_0_18px_rgba(192,132,252,0.7)]"
                >
                  👻
                </span>

                <div className="space-y-2">
                  <p className="animate-pulse font-mono text-sm text-purple-300">
                    &gt; Establishing contact with the dead...
                  </p>

                  <p className="font-mono text-xs tracking-wider text-gray-500">
                    [SUMMONING] Recovering echoes from forgotten code
                  </p>
                </div>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-purple-950">
                <div className="h-full w-1/3 animate-[ghost-scan_2s_ease-in-out_infinite] rounded-full bg-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.9)]" />
              </div>

              <p className="font-mono text-[11px] text-purple-400/70">
                THE DEAD DO NOT ANSWER IMMEDIATELY_
              </p>
            </div>
          )}

          {storyError && <p className="text-sm text-red-400">{storyError}</p>}

          {storyCancelled && (
            <button
              type="button"
              onClick={() => {
                const controller = new AbortController();
                storyControllerRef.current = controller;

                setStoryCancelled(false);
                setStoryLoading(true);
                setStoryError("");

                generateGhostStory(file, controller.signal)
                  .then((result) => {
                    if (!controller.signal.aborted) setStory(result);
                  })
                  .catch((error) => {
                    if (!controller.signal.aborted)
                      setStoryError(error.message);
                  })
                  .finally(() => {
                    if (!controller.signal.aborted) setStoryLoading(false);
                  });
              }}
              className="rounded-lg border border-purple-400/40 bg-purple-800 px-4 py-2 font-mono text-sm text-white hover:bg-purple-700"
            >
              $ summon --again
            </button>
          )}
          {story && (
            <div>
              <p className="mb-4 font-mono text-xs italic text-gray-500">
                [FICTION] Inspired by recovered Git history.
              </p>

              <ReactMarkdown components={markdownStyles}>{story}</ReactMarkdown>
            </div>
          )}
        </div>

        {storyLoading && (
          <div className="rounded-xl border border-red-500/20 bg-[#1b111d] p-4">
            <button
              type="button"
              onClick={handleSilenceSpirits}
              className="rounded-lg border border-red-400/40 bg-red-950/40 px-5 py-3 font-mono text-sm text-red-200 transition hover:bg-red-900/50"
            >
              $ silence --spirits
            </button>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              Stop the current summoning. The recovered code and Git evidence
              will remain undisturbed.
            </p>
          </div>
        )}

        {(storyCancelled || analysisCancelled) && (
          <p role="status" className="font-mono text-xs text-amber-300">
            [SILENCED] The summoning has been interrupted.
          </p>
        )}

        <div className="grid min-w-0 gap-5 lg:grid-cols-2">
          <div className="min-w-0 overflow-hidden rounded-xl border border-purple-500/20 bg-[#14101f]">
            <div className="border-b border-purple-500/20 px-5 py-4">
              <p className="font-mono text-xs text-purple-400">
                02 / RECOVERED SOURCE
              </p>

              <h3 className="mt-2 font-semibold text-purple-200">
                💻 Source Code
              </h3>
            </div>

            <div className="p-4">
              <pre className="max-h-80 overflow-auto rounded-lg bg-black/50 p-4 font-mono text-xs leading-6 text-gray-300">
                <code>{file.content}</code>
              </pre>
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-purple-500/20 bg-[#14101f] p-5">
            <p className="font-mono text-xs text-purple-400">
              03 / RECOVERED ARTIFACTS
            </p>

            <h3 className="mt-2 font-semibold text-purple-200">
              📜 Git History Evidence
            </h3>

            <div className="mt-5 space-y-5 font-mono text-sm">
              <div>
                <p className="mb-1 text-xs text-gray-500">DELETION DATE</p>
                <p className="text-gray-300">
                  {new Date(file.deletionDate).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500">COMMIT MESSAGE</p>
                <p className="break-words text-gray-300">
                  {file.commitMessage}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500">DELETION COMMIT</p>
                <p className="break-all text-xs text-purple-300">
                  {file.deletionCommit}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-purple-500/30 bg-[#1a1127] p-5 sm:p-6">
          <p className="font-mono text-xs tracking-wider text-purple-400">
            04 / THE REAPER'S CHAMBER
          </p>

          <h3 className="mt-2 text-xl font-semibold text-purple-200">
            ☠️ Summon the Reaper
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Uncover the purpose, vulnerabilities, and possible reasons this code
            was buried.
          </p>

          {analysis ? (
            <div
              role="status"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-3 font-mono text-sm text-green-400"
            >
              <span>✓</span>
              <span>[INVESTIGATION COMPLETE]</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading || storyLoading || !story}
              className="mt-5 w-full cursor-pointer rounded-lg border border-purple-400/40 bg-purple-800 px-5 py-3 text-left font-mono text-sm text-white transition hover:border-purple-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {storyLoading
                ? "> The Reaper Awaits..."
                : loading
                  ? "> The Reaper is examining the remains..."
                  : !story
                    ? "> Awaiting a transmission from the dead..."
                    : "$ summon --reaper"}
            </button>
          )}
          {loading && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSilenceSpirits}
                className="rounded-lg border border-red-400/40 bg-red-950/40 px-5 py-3 font-mono text-sm text-red-200 transition hover:bg-red-900/50"
              >
                $ silence --spirits
              </button>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Stop the current summoning. The recovered code and Git evidence
                will remain undisturbed.
              </p>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          {analysis && (
            <div className="mt-6 rounded-lg border border-purple-500/20 bg-black/40 p-5">
              <div className="mb-4 border-b border-purple-500/20 pb-3">
                <h4 className="text-lg font-semibold text-purple-200">
                  ☠️ The Reaper's Verdict
                </h4>
              </div>

              <ReactMarkdown components={markdownStyles}>
                {analysis}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
