export default function HeroSection() {
  return (
    <section className="w-full py-5 text-left sm:py-7">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5">
        <span className="font-mono text-xs tracking-wide text-purple-300">
          ☠ THE PAST IS NEVER TRULY DELETED
        </span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Your Code Has <span className="text-purple-400">Ghosts.</span>
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
        Some files were deleted. Their stories weren't. Unearth forgotten code
        from Git history and let local AI reveal the secrets buried within.
      </p>

      <p className="mt-5 font-mono text-xs tracking-wider text-green-400">
        [LOCAL-FIRST] · GIT FORENSICS · OLLAMA
      </p>
    </section>
  );
}
