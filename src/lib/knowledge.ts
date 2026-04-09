import fs from "fs";
import path from "path";

interface KnowledgeEntry {
  title: string;
  keywords: string[];
  alwaysInclude: boolean;
  content: string;
}

type Locale = "en" | "zh";

// Parse frontmatter from markdown file
function parseFrontmatter(raw: string): {
  meta: { title: string; keywords: string; alwaysInclude: boolean };
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: { title: "", keywords: "", alwaysInclude: false }, content: raw };

  const frontmatter = match[1];
  const content = match[2].trim();

  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const keywords = frontmatter.match(/^keywords:\s*(.+)$/m)?.[1]?.trim() ?? "";
  const alwaysInclude = frontmatter.match(/^alwaysInclude:\s*(.+)$/m)?.[1]?.trim() === "true";

  return { meta: { title, keywords, alwaysInclude }, content };
}

// Load all knowledge files for a locale at module init time
function loadKnowledgeBase(): Record<Locale, KnowledgeEntry[]> {
  const base: Record<Locale, KnowledgeEntry[]> = { en: [], zh: [] };

  for (const locale of ["en", "zh"] as Locale[]) {
    const dir = path.join(process.cwd(), "src", "knowledge", locale);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { meta, content } = parseFrontmatter(raw);
      base[locale].push({
        title: meta.title,
        keywords: meta.keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean),
        alwaysInclude: meta.alwaysInclude,
        content,
      });
    }
  }

  return base;
}

// Cache knowledge base in module scope (reused across requests in same serverless instance)
let cachedKB: Record<Locale, KnowledgeEntry[]> | null = null;

function getKB(): Record<Locale, KnowledgeEntry[]> {
  if (!cachedKB) {
    cachedKB = loadKnowledgeBase();
  }
  return cachedKB;
}

// Detect if message is Chinese
function isChinese(text: string): boolean {
  const cjk = text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
  return (cjk?.length ?? 0) > text.length * 0.1;
}

/**
 * Get relevant knowledge sections based on user message content.
 * Returns concatenated knowledge text to inject into system prompt.
 */
export function getRelevantKnowledge(userMessage: string): string {
  const kb = getKB();
  const locale: Locale = isChinese(userMessage) ? "zh" : "en";
  const entries = kb[locale];

  if (entries.length === 0) return "";

  const messageLower = userMessage.toLowerCase();

  const matched: KnowledgeEntry[] = [];

  for (const entry of entries) {
    if (entry.alwaysInclude) {
      matched.push(entry);
      continue;
    }

    // Check if any keyword appears in the user message
    const isRelevant = entry.keywords.some((kw) => messageLower.includes(kw));
    if (isRelevant) {
      matched.push(entry);
    }
  }

  if (matched.length === 0) {
    // If no keyword match, return only alwaysInclude entries
    return entries
      .filter((e) => e.alwaysInclude)
      .map((e) => `## ${e.title}\n${e.content}`)
      .join("\n\n");
  }

  return matched.map((e) => `## ${e.title}\n${e.content}`).join("\n\n");
}
