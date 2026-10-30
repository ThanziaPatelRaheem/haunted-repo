import { useEffect, useRef, useState } from "react";
import { Skull } from "lucide-react";

import HauntedHeader from "./HauntedHeader";
import HauntedFooter from "./HauntedFooter";
import HeroSection from "./HeroSection";
import HauntedAtmosphere from "./HauntedAtmosphere";
import RepositoryScanner from "./RepositoryScanner";
import DeletedFilesList from "./DeletedFilesList";
import DeletedFileContentView from "./DeletedFileContentView";

export default function HauntedWorkspace({
  deletedFiles,
  repoPath,
  selectedFile,
  onScanComplete,
  onFileSelect,
  onReset,
}) {
  const [isScanning, setIsScanning] = useState(false);
  const scrollDownRef = useRef(null);

  useEffect(() => {
    if (!selectedFile || isScanning) return;

    scrollDownRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedFile, isScanning]);

  return (
    <main className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-[#090711] px-1 py-3 text-white sm:px-6 sm:py-5 lg:px-8">
      <HauntedAtmosphere />

      <div className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0d0b14]/80 shadow-[0_0_50px_rgba(88,28,135,0.12)]">
          <HauntedHeader />

          <div className="px-2 py-4 sm:px-7 sm:py-7">
            <div className="grid items-start gap-4 border-b border-purple-500/20 pt-2 pb-8 sm:pt-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 lg:py-8">
              <div className="min-w-0">
                <HeroSection />
              </div>

              <div className="min-w-0">
                <RepositoryScanner
                  key={repoPath || "new-exhumation"}
                  onScanComplete={onScanComplete}
                  onReset={onReset}
                  onLoadingChange={setIsScanning}
                  hasScanned={Boolean(repoPath)}
                />
              </div>
            </div>

            {isScanning && (
              <div
                role="status"
                aria-live="polite"
                className="graveyard-reveal mx-auto mt-8 flex w-full max-w-3xl items-center justify-center gap-4 rounded-xl border border-purple-500/30 bg-[#14101f] px-5 py-5"
              >
                <div className="flex h-11 w-11 shrink-0 animate-pulse items-center justify-center rounded-full border border-purple-500/50 bg-purple-950/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  <Skull size={26} className="text-purple-200" />
                </div>

                <p className="font-mono text-sm text-purple-200">
                  Excavating forgotten Git history...
                </p>
              </div>
            )}

            {!isScanning && (
              <div
                key={repoPath || "empty-graveyard"}
                className={repoPath ? "graveyard-reveal" : ""}
              >
                <DeletedFilesList
                  deletedFiles={deletedFiles}
                  onFileSelect={onFileSelect}
                  repoPath={repoPath}
                  hasScanned={Boolean(repoPath)}
                />
              </div>
            )}

            {selectedFile && !isScanning && (
              <div ref={scrollDownRef} className="scroll-mt-6">
                <DeletedFileContentView
                  key={`${repoPath}:${selectedFile.deletionCommit}:${selectedFile.filePath}`}
                  file={selectedFile}
                />
              </div>
            )}

            <HauntedFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
