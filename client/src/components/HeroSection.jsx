export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-4 text-left sm:py-5 lg:py-10">
      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-900/40 bg-red-950/20 px-3 py-1.5">
          <span className="font-mono text-xs tracking-wide text-red-300">
            ☠ THE PAST IS NEVER TRULY DELETED
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Buried in Git.
          <span className="block text-purple-400">Awakened by AI.</span>
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Some files were deleted. Their stories weren't. Unearth forgotten code
          from Git history and let local AI reveal the secrets buried within.
        </p>

        <p className="mt-5 font-mono text-[10px] tracking-normal text-green-400 sm:text-xs sm:tracking-wider">
          <span className="sm:hidden">LOCAL-FIRST · GIT · GEMMA 3</span>

          <span className="hidden sm:inline">
            [LOCAL-FIRST] · GIT FORENSICS · POWERED BY GEMMA 3
          </span>
        </p>
      </div>
    </section>
  );
}
