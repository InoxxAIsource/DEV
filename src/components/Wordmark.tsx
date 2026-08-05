/*
  wwwdot wordmark. "www" in ink, "dot" in accent — the same split the brand
  uses everywhere. Inherits colour from the parent so it can invert over light
  project worlds without a second variant.
*/
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-label="wwwdot.dev"
      className={`select-none font-semibold tracking-[-0.045em] ${className}`}
    >
      www<span className="text-accent">dot</span>
    </span>
  )
}
