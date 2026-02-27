const MINUTE = 60;
const HOUR   = MINUTE * 60;
const DAY    = HOUR   * 24;

const EAT_OFFSET = 3 * HOUR * 1000; // +3 hours in ms

export const timeAgo = (isoString: string): string => {
  // Convert both times to EAT
  const nowEAT = Date.now() + EAT_OFFSET;
  const createdEAT = new Date(isoString).getTime();

  const diffSec = Math.max(
    0,
    Math.floor((nowEAT - createdEAT) / 1000)
  );

  if (diffSec < MINUTE)  return `${diffSec}s ago`;
  if (diffSec < HOUR)    return `${Math.floor(diffSec / MINUTE)} mins ago`;
  if (diffSec < DAY)     return `${Math.floor(diffSec / HOUR)} hours ago`;
  if (diffSec < DAY * 2) return 'Yesterday';
  if (diffSec < DAY * 7) return `${Math.floor(diffSec / DAY)} days ago`;

  return new Date(createdEAT).toLocaleDateString('en-KE', {
    timeZone: 'Africa/Nairobi',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (isoString: string): string =>
  new Date(isoString).toLocaleString('en-KE', {
    timeZone: 'Africa/Nairobi',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export default timeAgo;