import React from 'react';

export const SamiAdminFirebaseUpdatePanel: React.FC<any> = (props) => {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-6 text-slate-100 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-amber-400">لوحة إدارة تحديثات Salim</h2>
          <p className="text-xs text-slate-400">إدارة إصدارات وتحديثات تطبيق Android وFirebase Storage</p>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
          <p className="text-sm font-medium text-slate-200">حالة توزيع التحديثات</p>
          <p className="mt-1 text-xs text-emerald-400">● النظام جاهز ومفعل للتحقق من التحديثات تلقائيًا</p>
        </div>
      </div>
    </div>
  );
};
