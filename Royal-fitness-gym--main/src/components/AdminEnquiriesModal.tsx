import React, { useEffect, useState } from 'react';
import { X, Mail, Phone, RefreshCw, Inbox, Calendar, MessageSquare, User, ShieldCheck } from 'lucide-react';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  createdAt?: string;
}

interface AdminEnquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEnquiriesModal: React.FC<AdminEnquiriesModalProps> = ({ isOpen, onClose }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
      } else {
        setError(data.error || 'Failed to fetch enquiries');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[30px] max-w-2xl w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl my-8 cursor-default max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold uppercase tracking-tight">Gym Enquiries Inbox</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Live
                </span>
              </div>
              <p className="text-xs text-neutral-400">All member inquiries submitted via web form</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEnquiries}
              title="Refresh messages"
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-900 hover:bg-red-600/90 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-400 mx-auto" />
              <p className="text-xs text-neutral-400 font-mono">Loading enquiries from Cloud SQL...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs text-center">
              {error}
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-neutral-900/50 rounded-2xl border border-neutral-800/80 p-6">
              <Inbox className="w-10 h-10 text-neutral-600 mx-auto" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300">No Enquiries Yet</h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                When visitors submit an inquiry using the &quot;Contact&quot; modal on the website, their message will appear here in real-time.
              </p>
            </div>
          ) : (
            enquiries.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-purple-500/50 rounded-2xl p-4 space-y-3 transition-colors shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-bold text-sm text-white">{item.name}</span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60">
                      {item.service}
                    </span>
                  </div>
                  {item.createdAt && (
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800/60">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <a href={`mailto:${item.email}`} className="hover:underline truncate">{item.email}</a>
                  </div>
                  {item.phone && (
                    <div className="flex items-center gap-2 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800/60">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <a href={`tel:${item.phone}`} className="hover:underline truncate">{item.phone}</a>
                    </div>
                  )}
                </div>

                <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800/50 text-xs text-neutral-300 leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    <MessageSquare className="w-3 h-3 text-purple-400" /> Message
                  </div>
                  <p className="whitespace-pre-wrap">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 shrink-0">
          <span>WhatsApp / Phone Direct: <strong className="text-white font-mono">+91 73680 24982</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
