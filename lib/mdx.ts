/**
 * lib/mdx.ts
 *
 * Server-side MDX loading utility. Reads files from /content/pages,
 * compiles via next-mdx-remote, returns the source for rendering.
 *
 * Authority: NYT pack Section 14.2.
 *
 * Approved MDX components are restricted to: Eyebrow, RuleGold, Button.
 * Arbitrary HTML and script tags are not permitted.
 */

import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RuleGold } from "@/components/ui/RuleGold";
import { Button } from "@/components/ui/Button";

const PAGES_DIR = join(process.cwd(), "content", "pages");

const APPROVED_COMPONENTS = {
  Eyebrow,
  RuleGold,
  Button,
};

export type CompiledMdx = {
  content: React.ReactElement;
};

export async function loadMdxPage(name: string): Promise<CompiledMdx> {
  const safe = name.replace(/[^a-z0-9-]/gi, "");
  if (safe !== name || !name) {
    throw new Error(`Invalid MDX page name: ${name}`);
  }
  const filePath = join(PAGES_DIR, `${safe}.mdx`);
  const source = await readFile(filePath, "utf8");

  const { content } = await compileMDX({
    source,
    components: APPROVED_COMPONENTS,
    options: {
      parseFrontmatter: false,
    },
  });

  return { content };
}
