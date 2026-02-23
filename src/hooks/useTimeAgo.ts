const MINUTE = 60;
const HOUR   = MINUTE * 60;
const DAY    = HOUR   * 24;

export const timeAgo = (isoString: string): string => {
  const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);

  if (diffSec < MINUTE)            return `${diffSec}s ago`;
  if (diffSec < HOUR)              return `${Math.floor(diffSec / MINUTE)} mins ago`;
  if (diffSec < DAY)               return `${Math.floor(diffSec / HOUR)} hours ago`;
  if (diffSec < DAY * 2)           return 'Yesterday';
  if (diffSec < DAY * 7)           return `${Math.floor(diffSec / DAY)} days ago`;
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

export const formatDateTime = (isoString: string): string =>
  new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
    hour:  'numeric',
    minute: '2-digit',
    hour12: true,
  });

export default timeAgo;
