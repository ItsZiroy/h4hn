/**
 * Check if a URL is external
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the URL is external
 */
function isExternalLink(url) {
  if (!url) return false;

  // Check for absolute URLs (http://, https://, //)
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    return true;
  }

  // Check for other protocols (ftp, mailto, etc.)
  if (url.includes("://")) {
    return true;
  }

  // mailto: links
  if (url.startsWith("mailto:")) {
    return true;
  }

  // Relative links, anchors, and query strings are internal
  return false;
}

/**
 * Post-process HTML to add external link attributes
 * @param {string} html - The HTML string from micromark
 * @returns {string} - HTML with external link attributes added
 */
export function processExternalLinks(html) {
  return html.replace(/<a\s+href="([^"]*)"([^>]*)>/g, (match, url, rest) => {
    if (isExternalLink(url) && !rest.includes("target=")) {
      return `<a href="${url}"${rest} target="_blank" rel="noopener noreferrer">`;
    }
    return match;
  });
}
