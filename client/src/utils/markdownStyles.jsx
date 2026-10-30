export const markdownStyles = {
  h1: ({ children }) => (
    <h1 className="mt-5 text-2xl font-bold text-purple-200">{children}</h1>
  ),

  h2: ({ children }) => {
    const headingText = String(children);

    const isFinalVerdict = headingText.includes("THE REAPER'S FINAL VERDICT");

    if (isFinalVerdict) {
      return (
        <h2 className="mt-8 rounded-t-xl border border-b-0 border-purple-500/40 bg-purple-950/50 px-5 py-4 text-lg font-bold tracking-wide text-purple-200">
          ☠️ {children}
        </h2>
      );
    }

    return (
      <h2 className="mt-6 border-b border-purple-500/20 pb-2 text-lg font-semibold text-purple-200">
        {children}
      </h2>
    );
  },

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
