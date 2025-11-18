import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`text-sm text-purple-800 ${className}`}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0 text-purple-900">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0 text-purple-900">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold mb-2 mt-3 first:mt-0 text-purple-900">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 ml-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 ml-2">{children}</ol>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => <pre className="bg-purple-900 text-purple-50 p-3 rounded-lg overflow-x-auto mb-3 text-xs"><code>{children}</code></pre>,
          strong: ({ children }) => <strong className="font-semibold text-purple-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => <a href={href} className="text-purple-700 underline hover:text-purple-900 transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-300 pl-4 italic my-3 text-purple-700">{children}</blockquote>,
          hr: () => <hr className="my-4 border-purple-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

