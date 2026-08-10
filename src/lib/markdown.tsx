import React from "react";

// Minimal markdown renderer for Claude-generated guide articles.
// Deliberately dependency-free: covers exactly the subset the article
// prompt asks for (headings, paragraphs, bold, italic, inline code,
// links, bullet and numbered lists), which keeps published output
// predictable and avoids pulling in an unpinned package.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern =
    /(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  let last = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      const href = match[3];
      const external = /^https?:/i.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          className="text-[#4e7522] font-medium underline underline-offset-2 hover:text-[#3f5e1b]"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(<strong key={key}>{match[5]}</strong>);
    } else if (match[6]) {
      nodes.push(<em key={key}>{match[7]}</em>);
    } else if (match[8]) {
      nodes.push(
        <code key={key} className="bg-gray-100 rounded px-1 py-0.5 text-[0.9em]">
          {match[9]}
        </code>,
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushPara = () => {
    if (!para.length) return;
    const k = key++;
    blocks.push(
      <p key={k} className="mb-4">
        {renderInline(para.join(" "), `p${k}`)}
      </p>,
    );
    para = [];
  };

  const flushList = () => {
    if (!list) return;
    const k = key++;
    const items = list.items.map((item, j) => (
      <li key={j}>{renderInline(item, `li${k}-${j}`)}</li>
    ));
    blocks.push(
      list.ordered ? (
        <ol key={k} className="list-decimal pl-6 mb-4 space-y-1.5">
          {items}
        </ol>
      ) : (
        <ul key={k} className="list-disc pl-6 mb-4 space-y-1.5">
          {items}
        </ul>
      ),
    );
    list = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    // Table separator rows from any stray markdown table render as noise;
    // skip them and let the cell rows fall through as plain paragraphs.
    if (/^\|[\s\-|:]+\|$/.test(line)) continue;

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushPara();
      flushList();
      const k = key++;
      const content = renderInline(heading[2], `h${k}`);
      if (heading[1].length <= 2) {
        blocks.push(
          <h2 key={k} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            {content}
          </h2>,
        );
      } else {
        blocks.push(
          <h3 key={k} className="text-xl font-bold text-gray-900 mt-8 mb-3">
            {content}
          </h3>,
        );
      }
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushPara();
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(bullet ? bullet[1] : numbered![1]);
      continue;
    }

    if (line.startsWith(">")) {
      flushPara();
      flushList();
      const k = key++;
      blocks.push(
        <blockquote
          key={k}
          className="border-l-4 border-[#83b54b] pl-4 italic text-gray-600 my-5"
        >
          {renderInline(line.replace(/^>\s?/, ""), `q${k}`)}
        </blockquote>,
      );
      continue;
    }

    flushList();
    para.push(line);
  }
  flushPara();
  flushList();

  return <div className="text-gray-700 leading-relaxed">{blocks}</div>;
}
