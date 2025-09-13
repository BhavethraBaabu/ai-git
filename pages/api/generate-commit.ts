import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = { commit?: string; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing 'text' in request body" });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured. See README." });
  }

  // Prompt engineering: ask model to produce a Conventional Commit message
  const prompt = `
You are an expert developer assistant. Given a code diff or a description of code changes, produce one concise Conventional Commit message.
Rules:
- Follow Conventional Commits: type(scope?): short description
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Keep subject <= 72 characters.
- If applicable include a scope in parentheses.
- Output only the commit message, no explanation.

Input:
"""${text}
"""

`;

  try {
    const resp = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini", // change model as you prefer
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80,
      temperature: 0.2
    }, {
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 15000
    });

    const msg = resp?.data?.choices?.[0]?.message?.content;
    if (!msg) return res.status(500).json({ error: "No response from OpenAI" });
    // Cleanup: trim and take first line
    const commit = msg.trim().split("\n")[0];
    return res.status(200).json({ commit });
  } catch (err: any) {
    console.error("OpenAI error:", err?.response?.data || err.message);
    const message = err?.response?.data?.error?.message || err.message || "OpenAI request failed";
    return res.status(500).json({ error: message });
  }
}