import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '', block = false }) => {
  // Parse text that might have $...$ or $$...$$ or pure LaTeX
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    try {
      // If block flag is forced or starts/ends with $$
      if (block || (content.startsWith('$$') && content.endsWith('$$'))) {
        const formula = content.replace(/^\$\$|\$\$$/g, '').trim();
        return katex.renderToString(formula, {
          displayMode: true,
          throwOnError: false
        });
      }

      // If it has math delimiters ($...$ or $$...$$)
      if (content.includes('$')) {
        // Regex to match $$block$$ and $inline$
        const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]*?\$)/g;
        return content.replace(regex, (match) => {
          const isDisplay = match.startsWith('$$');
          const math = isDisplay ? match.slice(2, -2).trim() : match.slice(1, -1).trim();
          try {
            return katex.renderToString(math, {
              displayMode: isDisplay,
              throwOnError: false
            });
          } catch {
            return match;
          }
        }).replace(/\n/g, '<br/>');
      }

      // Plain text with linebreaks
      return content.replace(/\n/g, '<br/>');
    } catch {
      return content;
    }
  }, [content, block]);

  return (
    <div
      className={`math-rendered-view leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
