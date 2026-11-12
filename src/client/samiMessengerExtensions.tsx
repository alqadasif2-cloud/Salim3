import React from 'react';

export const SAMI_EMOJIS = ['👍', '❤️', '🔥', '🚀', '👏', '🎯', '📉', '📈'];

export const SamiEmojiBar: React.FC<any> = ({ onSelect }) => {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/95 p-1.5 shadow-lg backdrop-blur">
      {SAMI_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect && onSelect(emoji)}
          className="rounded-full p-1 text-lg transition hover:scale-125"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export const SamiMessageReactions: React.FC<any> = ({ reactions, onToggle }) => {
  if (!reactions || Object.keys(reactions).length === 0) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {Object.entries(reactions).map(([emoji, count]: [string, any]) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onToggle && onToggle(emoji)}
          className="flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-800/70 px-2 py-0.5 text-xs text-slate-300"
        >
          <span>{emoji}</span>
          <span className="font-mono text-[10px]">{count}</span>
        </button>
      ))}
    </div>
  );
};

export const SamiPinButton: React.FC<any> = ({ isPinned, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded p-1 text-xs transition ${
        isPinned ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
      }`}
      title={isPinned ? 'إلغاء التثبيت' : 'تثبيت الرسالة'}
    >
      📌
    </button>
  );
};

export const SamiPinnedBanner: React.FC<any> = ({ message, onUnpin }) => {
  if (!message) return null;
  return (
    <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-300">
      <div className="flex items-center gap-2 overflow-hidden">
        <span>📌 رسالة مثبتة:</span>
        <span className="truncate">{message.text || message.content || ''}</span>
      </div>
      {onUnpin && (
        <button type="button" onClick={onUnpin} className="text-amber-400 hover:text-amber-200">
          ✕
        </button>
      )}
    </div>
  );
};

export function toggleMessageReaction(message: any, emoji: string, userId: number): any {
  const reactions = { ...(message.reactions || {}) };
  reactions[emoji] = (reactions[emoji] || 0) + 1;
  return { ...message, reactions };
}

export function toggleMessagePin(message: any): any {
  return { ...message, isPinned: !message.isPinned };
}
