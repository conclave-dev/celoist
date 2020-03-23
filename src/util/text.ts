const stripHTML = html => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';

export { stripHTML };
