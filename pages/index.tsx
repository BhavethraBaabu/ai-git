import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [commit, setCommit] = useState("");
  const [error, setError] = useState("");

  async function generateCommit() {
    setLoading(true);
    setError("");
    setCommit("");
    try {
      const res = await fetch("/api/generate-commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setCommit(data.commit);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Inter, sans-serif" }}>
      <h1>AI Git Commit Generator</h1>
      <p>Paste a diff or describe the code changes and get a Conventional Commit message.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste code diff or describe the change..."
        style={{ width: "100%", height: 240, fontFamily: 'monospace', fontSize: 14, padding: 12 }}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={generateCommit} disabled={loading || !input.trim()}>
          {loading ? "Generating…" : "Generate Commit Message"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {commit && (
        <div style={{ marginTop: 20, border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
          <h3>Suggested Commit</h3>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{commit}</pre>
        </div>
      )}

      <hr style={{ margin: "24px 0" }} />
      <p style={{ color: "#666" }}>
        Pro tip: keep prompts short but specific. For demo video, paste a small diff and show the generated Conventional Commit message.
      </p>
    </main>
  );
}