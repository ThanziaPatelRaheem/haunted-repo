import { useRef, useState } from "react";
import HauntedWorkspace from "./components/HauntedWorkspace";
import { getDeletedFileContent } from "./services/repoApi";

function App() {
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [repoPath, setRepoPath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const requestIdRef = useRef(0);

  const handleScanComplete = (files, path) => {
    requestIdRef.current += 1;

    setDeletedFiles(files);
    setRepoPath(path);
    setSelectedFile(null);
  };
  const handleReset = () => {
    requestIdRef.current += 1;

    setDeletedFiles([]);
    setRepoPath("");
    setSelectedFile(null);
  };

  const handleFileSelect = async (filePath) => {
    // Each selection gets a unique request ID.
    const requestId = ++requestIdRef.current;

    setSelectedFile(null);

    try {
      const file = await getDeletedFileContent(repoPath, filePath);

      if (requestId !== requestIdRef.current) return;

      setSelectedFile(file);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      console.error("Failed to load deleted file:", error.message);
    }
  };

  return (
    <HauntedWorkspace
      deletedFiles={deletedFiles}
      repoPath={repoPath}
      selectedFile={selectedFile}
      onScanComplete={handleScanComplete}
      onFileSelect={handleFileSelect}
      onReset={handleReset}
    />
  );
}

export default App;
