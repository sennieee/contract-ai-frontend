import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/analyze_contract", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.analysis);
    } catch (err) {
      console.error(err);
      setResult("Er ging iets mis met de analyse.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Contract Analyse Tool</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Analyseren..." : "Upload & Analyseer"}
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        <h2>Resultaat:</h2>
        {result || "Nog niets geanalyseerd."}
      </div>
    </div>
  );
}

export default App;
