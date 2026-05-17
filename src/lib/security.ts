/**
 * Basic client-side security deterrents.
 * Note: These are deterrents against average users, not bulletproof security.
 * Experienced developers can still bypass these, but it prevents casual inspection.
 */
export function initSecurity() {
  if (import.meta.env.DEV) return; // Don't run in development

  // Disable right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Disable common devtools keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I / Cmd+Option+I
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
    }
    // Ctrl+Shift+J / Cmd+Option+J
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
    }
    // Ctrl+Shift+C / Cmd+Option+C
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
    }
    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
    }
  });

  // Basic DevTools open detection loop is disabled
}
