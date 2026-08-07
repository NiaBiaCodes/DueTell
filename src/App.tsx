import SyllabusResults from "./SyllabusResults";
import { useRef, useState, type ChangeEvent } from "react";
import { extractPdfText } from "./utils/extractPdfText";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setError("");
    setExtractedText("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please upload a PDF syllabus.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);
  }

  async function handleAnalyze() {
    if (!selectedFile) {
      setError("Select a syllabus before analyzing.");
      return;
    }

    try {
      setError("");
      setIsAnalyzing(true);
      setExtractedText("");

      const text = await extractPdfText(selectedFile);

      if (!text.trim()) {
        throw new Error(
          "No readable text was found. The PDF may be a scanned image.",
        );
      }

      setExtractedText(text);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "The syllabus could not be analyzed.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleReset() {
    setSelectedFile(null);
    setExtractedText("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="app-shell">
      <header className="navbar">
        <a className="brand" href="/">
          DueTell
        </a>

        <span className="nav-label">What's due? DueTell.</span>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Your semester, simplified</span>

          <h1>Understand your syllabus in seconds.</h1>

          <p>
            Upload a course syllabus and DueTell will read the PDF and extract
            its course information, deadlines, grading details, and policies.
          </p>
        </div>

        <div className="upload-card">
          <div className="upload-heading">
            <span className="step-number">1</span>

            <div>
              <h2>Upload your syllabus</h2>
              <p>PDF files are supported for this version.</p>
            </div>
          </div>

          <label className="file-drop">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <span className="upload-icon">↑</span>

            <strong>
              {selectedFile ? selectedFile.name : "Choose a syllabus PDF"}
            </strong>

            <span>
              {selectedFile
                ? "Your file is ready to analyze."
                : "Click here to select a PDF from your computer."}
            </span>
          </label>

          {error && <p className="error-message">{error}</p>}

          <button
            className="analyze-button"
            type="button"
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? "Reading syllabus..." : "Analyze syllabus"}
          </button>
        </div>
      </section>

      {extractedText && (
        <section className="text-preview">
          <div className="section-heading">

            <div>
            
              <span className="eyebrow">PDF extraction successful</span>
              <span className="step-number">2</span>
              <h2>View Analysis</h2>
            </div>

            <button
              className="secondary-button"
              type="button"
              onClick={handleReset}
            >
              Analyze another
            </button>
          
          
              
            </div>
          <SyllabusResults text={extractedText} />
        </section>
      )}
    </main>
  );
}

export default App;