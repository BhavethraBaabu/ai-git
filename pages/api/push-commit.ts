/**
 * OPTIONAL: Example GitHub push route (commented).
 *
 * Pushing commits via the GitHub REST API requires:
 *  - GITHUB_TOKEN with repo permissions
 *  - Knowledge of the file(s) to modify and base commit SHA
 *
 * This example uses a simplified flow:
 *  1. Create a blob for new content
 *  2. Create a tree with the blob
 *  3. Create a commit with that tree
 *  4. Update the reference (branch) to point to the new commit
 *
 * NOTE: This code is illustrative and not fully robust for production use.
 */

import type { NextApiRequest, NextApiResponse } from "next";
// import { Octokit } from "@octokit/rest";

type Data = { ok?: boolean; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(501).json({ error: "This route is optional and not implemented by default. See README." });

  /*
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { repoOwner, repoName, branch, path, contentBase64, commitMessage } = req.body;
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: "GITHUB_TOKEN not configured" });

  const octokit = new Octokit({ auth: token });
  try {
    // Example: get ref
    const ref = await octokit.git.getRef({ owner: repoOwner, repo: repoName, ref: `heads/${branch}` });
    const baseSha = ref.data.object.sha;

    // Create blob
    const blob = await octokit.git.createBlob({ owner: repoOwner, repo: repoName, content: contentBase64, encoding: "base64" });
    // Create tree
    const tree = await octokit.git.createTree({ owner: repoOwner, repo: repoName, tree: [{ path, mode: "100644", type: "blob", sha: blob.data.sha }], base_tree: baseSha });
    // Create commit
    const commit = await octokit.git.createCommit({ owner: repoOwner, repo: repoName, message: commitMessage, tree: tree.data.sha, parents: [baseSha] });
    // Update ref
    await octokit.git.updateRef({ owner: repoOwner, repo: repoName, ref: `heads/${branch}`, sha: commit.data.sha });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: String(e.message || e) });
  }
  */
}