import React from 'react';

export interface ChannelMembersModalProps {
  channelId?: string;
  channelName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  [key: string]: any;
}

export const SamiChannelMembersModal: React.FC<ChannelMembersModalProps> = ({
  channelName,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <h3 className="mb-4 text-xl font-bold">أعضاء القناة: {channelName || ''}</h3>
        <p className="text-sm text-slate-400">إدارة ومتابعة أعضاء القناة</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-5 py-2 font-medium text-black transition hover:bg-amber-400"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
