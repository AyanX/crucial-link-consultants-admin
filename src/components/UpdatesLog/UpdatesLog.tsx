import React from 'react';
import { History } from 'lucide-react';
import type { LogEntry } from '../../types';
import './UpdatesLog.scss';

interface UpdatesLogProps {
  entries: LogEntry[];
}

const UpdatesLog: React.FC<UpdatesLogProps> = ({ entries }) => (
  <div className="updates-log">
    <div className="updates-log__header">
      <div className="log-icon">
        <History size={16} />
      </div>
      <span className="updates-log__title">Recent Updates Log</span>
    </div>

    {entries.map(entry => (
      <div key={entry.id} className="log-entry">
        <div className={`log-dot ${entry.isRecent ? 'log-dot--green' : 'log-dot--gray'}`} />
        <div className="log-text">
          <p className="log-message">{entry.message}</p>
          <p className="log-meta">{entry.author} • {entry.time}</p>
        </div>
      </div>
    ))}
  </div>
);

export default UpdatesLog;
