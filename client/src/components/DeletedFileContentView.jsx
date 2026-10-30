import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeDeletedCode, generateGhostStory } from "../services/aiApi";
import useGhostNarrator from "../hooks/useGhostNarrator";
import { markdownStyles } from "../utils/markdownStyles";
import ReactMarkdown from "react-markdown";
import { Skull, Ghost, AudioLines, Play } from "lucide-react";
import { getAIErrorMessage } from "../utils/getAiErrorMessage";

export default function DeletedFileContentView({ file }) {
  const {
    readingGhostStory,
    ghostStoryPaused,
    readGhostStory,
    pauseGhostStory,
    resumeGhostStory,
    stopReadingGhostStory,
  } = useGhostNarrator();

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

  const summonGhost = useCallback(async (file, controller) => {
    setStoryLoading(true);
    setStoryError("");
    setStoryCancelled(false);
    setStory("");

    try {
      const result = await generateGhostStory(file, controller.signal);

      if (!controller.signal.aborted) {
        setStory(result);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setStoryError(getAIErrorMessage(error));
      }
    } finally {
      if (!controller.signal.aborted) {
        setStoryLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!file) return;

    const controller = new AbortController();
    storyControllerRef.current = controller;

    const startSummoning = async () => {
      await Promise.resolve();
      if (!controller.signal.aborted) {
        await summonGhost(file, controller);
      }
    };

    startSummoning();

    return () => {
      controller.abort();
    };
  }, [file, summonGhost]);

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
        setError(getAIErrorMessage(error));
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
  const [storyTitle, ...storyParagraphs] = story.trim().split(/\n\s*\n|\n/);
  const storyBody = storyParagraphs.join("\n\n");

  if (!file) return null;

  return (
    <section className="mt-8 w-full min-w-0 overflow-hidden rounded-xl border border-purple-500/20 bg-[#0d0b14]/35 text-left shadow-xl shadow-purple-950/20 backdrop-blur-[2px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 bg-[#181221] px-3 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="min-w-0 font-mono text-[10px] tracking-wide text-purple-300 sm:text-xs">
            <span className="sm:hidden">INVESTIGATION_CONSOLE</span>
            <span className="hidden sm:inline">
              HAUNTED_INVESTIGATION_CONSOLE
            </span>
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
        <div className="mx-auto w-full max-w-4xl rounded-xl border border-purple-400/15 bg-[#1a1127]/45 p-3 sm:p-6">
          <div className="mb-4 border-b border-purple-500/20 pb-4">
            <p className="font-mono text-xs tracking-wider text-purple-400">
              01 / TRANSMISSION FROM THE DEAD
            </p>
            <h3 className="mt-2 flex items-center gap-2 text-base font-semibold leading-snug text-purple-200 sm:text-xl">
              <Ghost
                size={22}
                strokeWidth={1.5}
                className="text-purple-400"
                aria-hidden="true"
              />
              Echoes from the Graveyard
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              A forgotten file speaks from beyond the commit.
            </p>
          </div>

          {storyLoading && (
            <div role="status" aria-live="polite" className="space-y-5 py-5">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-900/50 bg-red-950/30"
                >
                  <Skull
                    size={30}
                    strokeWidth={1.3}
                    className="animate-pulse text-red-400"
                  />
                </div>

                <div className="space-y-2">
                  <p className="animate-pulse font-mono text-sm text-purple-300">
                    &gt; Establishing contact with the dead...
                  </p>
                  <p className="font-mono text-xs tracking-wider text-gray-500">
                    [SUMMONING] Recovering echoes from forgotten code
                  </p>
                </div>
              </div>
              <div
                className="relative h-1.5 w-full overflow-hidden rounded-full bg-purple-950/60"
                aria-hidden="true"
              >
                <div className="ghost-beam absolute inset-y-0 left-0 w-1/3 animate-[ghost-beam_1.1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-purple-400 to-white shadow-[0_0_16px_3px_rgba(192,132,252,0.9)]" />
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

                summonGhost(file, controller);
              }}
              className="rounded-lg border border-purple-400/40 bg-purple-800 px-4 py-2 font-mono text-sm text-white hover:bg-purple-700"
            >
              $ summon --again
            </button>
          )}

          {story && (
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                {!readingGhostStory && (
                  <button
                    type="button"
                    onClick={() => readGhostStory(story)}
                    className="group inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-purple-400/50 bg-gradient-to-r from-[#38204e] to-[#21132f] px-3 py-3 font-mono text-xs font-medium text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.12)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 sm:gap-3 sm:px-5 sm:text-sm"
                  >
                    <AudioLines
                      size={17}
                      strokeWidth={1.7}
                      className="shrink-0 text-purple-300 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />

                    <span>Hear My Last Words</span>

                    <Play
                      size={13}
                      fill="currentColor"
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                )}

                {readingGhostStory && !ghostStoryPaused && (
                  <button
                    type="button"
                    onClick={pauseGhostStory}
                    className="rounded-lg border border-purple-500/40 px-4 py-2 font-mono text-sm text-purple-200 hover:bg-purple-500/20"
                  >
                    ⏸ Pause
                  </button>
                )}

                {readingGhostStory && ghostStoryPaused && (
                  <button
                    type="button"
                    onClick={resumeGhostStory}
                    className="rounded-lg border border-purple-500/40 px-4 py-2 font-mono text-sm text-purple-200 hover:bg-purple-500/20"
                  >
                    ▶ Resume
                  </button>
                )}

                {readingGhostStory && (
                  <button
                    type="button"
                    onClick={stopReadingGhostStory}
                    className="rounded-lg border border-red-500/40 px-4 py-2 font-mono text-sm text-red-300 hover:bg-red-500/10"
                  >
                    ■ Stop
                  </button>
                )}
              </div>

              <div className="relative overflow-hidden rounded-xl border border-purple-400/20 bg-[#100b19] p-3 shadow-[inset_0_0_35px_rgba(88,28,135,0.08)] sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl"
                />

                <div className="relative z-10">
                  <p className="mb-5 font-mono text-[11px] italic tracking-wide text-purple-300/60">
                    [FICTION] Inspired by recovered Git history.
                  </p>

                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-10 w-[3px] shrink-0 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.55)]" />

                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-purple-400/70">
                        Recovered Whisper
                      </p>
                      <p className="text-xs text-purple-200/60">
                        A voice from beyond the commit
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/20 pt-5">
                    <h4 className="mb-4 text-xl font-semibold leading-snug tracking-tight text-purple-200 drop-shadow-[0_0_12px_rgba(192,132,252,0.25)] sm:mb-5 sm:text-2xl">
                      {storyTitle.replace(/^#+\s*/, "")}
                    </h4>

                    <div className="space-y-3 sm:space-y-4 [&_p]:text-[13px] [&_p]:leading-6 sm:[&_p]:text-[15px] sm:[&_p]:leading-8 [&_p]:text-purple-50/85">
                      <ReactMarkdown components={markdownStyles}>
                        {storyBody}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2 border-t border-purple-500/20 pt-4">
                    <Ghost
                      size={14}
                      strokeWidth={1.5}
                      className="text-purple-400/60"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] tracking-widest text-purple-300/50">
                      THE PAST NEVER TRULY DIES
                    </span>
                  </div>
                </div>
              </div>
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

        {story && !storyLoading && (
          <div className="grid min-w-0 gap-5 lg:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-xl border border-purple-400/10 bg-[#14101f]/20">
              <div className="border-b border-purple-500/20 px-5 py-4">
                <p className="font-mono text-xs text-purple-400">
                  02 / RECOVERED SOURCE
                </p>

                <h3 className="mt-2 font-semibold text-purple-200">
                  💻 Source Code
                </h3>
              </div>

              <div className="min-w-0 p-2 sm:p-4">
                <pre className="max-h-80 max-w-full overflow-auto rounded-lg bg-black/50 p-3 font-mono text-[11px] leading-5 text-gray-300 sm:p-4 sm:text-xs sm:leading-6">
                  <code>{file.content}</code>
                </pre>
              </div>
            </div>
            <div className="min-w-0 rounded-xl border border-purple-400/10 bg-[#14101f]/20 p-3 sm:p-5">
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
        )}

        {story && !storyLoading && (
          <div className="min-w-0 rounded-xl border border-purple-400/10 bg-[#1a1127]/20 p-3 sm:p-6">
            <p className="font-mono text-xs tracking-wider text-purple-400">
              04 / THE REAPER'S CHAMBER
            </p>

            <h3 className="mt-2 text-xl font-semibold text-purple-200">
              ☠️ Summon the Reaper
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Uncover the purpose, vulnerabilities, and possible reasons this
              code was buried.
            </p>

            {analysis ? (
              <div
                role="status"
                className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2.5 font-mono text-[11px] text-green-400 sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="shrink-0">✓</span>
                <span className="whitespace-nowrap">
                  [INVESTIGATION COMPLETE]
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading || storyLoading || !story}
                className="group mt-5 w-full cursor-pointer rounded-lg border border-purple-500/50 bg-[#1b1128] px-5 py-4 text-left transition-all duration-300 hover:border-purple-300 hover:bg-[#2b1740] hover:shadow-[0_0_24px_rgba(168,85,247,0.2)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading ? (
                  <span className="font-mono text-sm text-purple-200">
                    &gt; The Reaper is examining the remains...
                  </span>
                ) : (
                  <span className="flex min-w-0 items-center gap-2 sm:gap-4">
                    <Skull
                      size={28}
                      strokeWidth={1.5}
                      className="text-purple-300 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="font-mono text-sm font-semibold text-purple-100">
                        Summon the Reaper
                      </span>

                      <span className="font-mono text-xs text-green-400">
                        $ summon --reaper
                        <span className="ml-1 animate-pulse">_</span>
                      </span>
                    </span>

                    <span className="ml-auto shrink-0 font-mono text-purple-400 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                )}
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
                  Stop the current summoning. The recovered code and Git
                  evidence will remain undisturbed.
                </p>
              </div>
            )}

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            {analysis && (
              <div className="mt-6 min-w-0 rounded-lg border border-purple-400/10 bg-black/15 p-3 sm:p-5">
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
        )}
      </div>
    </section>
  );
}
