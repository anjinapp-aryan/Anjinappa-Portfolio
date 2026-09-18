/**
 * Shared page container: centralizes max width + horizontal padding so
 * these aren't repeated as arbitrary px-4/px-6/px-8/max-w-* values across
 * every section. Uses the Phase 2 `max-w-container` token (72rem).
 */
export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`w-full max-w-container mx-auto px-6 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
