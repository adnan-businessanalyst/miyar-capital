/**
 * Accordion — Expandable FAQ-style list that opens one item at a time, with optional numbering and action links.
 *
 * Used by:
 * - views/Disclosures.tsx
 * - views/FATCA.tsx
 */

"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  body: string;
  action?: string;
  actionHref?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  numbered?: boolean;
}

export function Accordion({ items, numbered = false }: AccordionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc-item${isOpen ? " acc-item--open" : ""}`} key={i}>
            <button
              type="button"
              className="acc-head"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {numbered && (
                <span className="acc-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span className="acc-title">{item.title}</span>
              <span className="acc-toggle" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="acc-body">
                <p>{item.body}</p>
                {item.action && item.actionHref ? (
                  <a
                    className="acc-action"
                    href={item.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.action}
                  </a>
                ) : item.action ? (
                  <button type="button" className="acc-action">
                    {item.action}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
