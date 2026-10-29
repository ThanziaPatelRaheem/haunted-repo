import HauntedHeader from "./HauntedHeader";
import HauntedFooter from "./HauntedFooter";
import HeroSection from "./HeroSection";
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
  return (
    <main className="min-h-screen bg-[#090711] px-3 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0d0b14] shadow-[0_0_50px_rgba(88,28,135,0.12)]">
        <HauntedHeader />

        <div className="px-4 py-5 sm:px-7 sm:py-7">
          <div className="grid items-center gap-6 border-b border-purple-500/20 pb-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <HeroSection />

            <RepositoryScanner
              key={repoPath || "new-exhumation"}
              onScanComplete={onScanComplete}
              onReset={onReset}
              hasScanned={Boolean(repoPath)}
            />
          </div>

          <DeletedFilesList
            deletedFiles={deletedFiles}
            onFileSelect={onFileSelect}
          />

          {selectedFile && (
            <DeletedFileContentView
              key={`${repoPath}:${selectedFile.deletionCommit}:${selectedFile.filePath}`}
              file={selectedFile}
            />
          )}

          <HauntedFooter />
        </div>
      </div>
    </main>
  );
}
