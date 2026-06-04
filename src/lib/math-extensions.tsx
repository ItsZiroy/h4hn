"use client";

import { Node, Mark, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Node as PMNode } from "@tiptap/pm/model";
import katex from "katex";
import { useEffect, useRef } from "react";

import "katex/dist/katex.min.css";

// Block Math Node View - Read Only
interface BlockMathNodeViewProps {
  node: PMNode;
}

function BlockMathNodeView({ node }: BlockMathNodeViewProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const latexValue = node.attrs.latex || "";

  useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(latexValue || "\\text{...}", mathRef.current, {
          throwOnError: false,
          displayMode: true,
        });
      } catch {
        if (mathRef.current) {
          mathRef.current.textContent = latexValue || "...";
        }
      }
    }
  }, [latexValue]);

  return (
    <NodeViewWrapper className="block-math-node">
      <div ref={mathRef} className="block-math-render" />
    </NodeViewWrapper>
  );
}

// Inline Math Node View - Read Only
interface InlineMathNodeViewProps {
  node: PMNode;
}

function InlineMathNodeView({ node }: InlineMathNodeViewProps) {
  const mathRef = useRef<HTMLSpan>(null);
  const latexValue = node.attrs.latex || "";

  useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(latexValue || "x", mathRef.current, {
          throwOnError: false,
          displayMode: false,
        });
      } catch {
        if (mathRef.current) {
          mathRef.current.textContent = latexValue || "x";
        }
      }
    }
  }, [latexValue]);

  return (
    <NodeViewWrapper as="span" className="inline-math-node">
      <span ref={mathRef} className="inline-math-render" />
    </NodeViewWrapper>
  );
}

// Block Math Extension
export const BlockMathExtension = Node.create({
  name: "blockMath",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      latex: {
        default: "",
        parseHTML: (element) => element.getAttribute("latex") || "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="block-math"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "block-math" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockMathNodeView);
  },
});

// Inline Math Extension
export const InlineMathExtension = Mark.create({
  name: "inlineMath",

  addAttributes() {
    return {
      latex: {
        default: "",
        parseHTML: (element) => element.getAttribute("latex") || "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="inline-math"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-type": "inline-math" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineMathNodeView);
  },
});
