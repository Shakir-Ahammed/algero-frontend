import { useEffect, useState } from "react";
import { adminApi } from "../../../lib/admin-api";
import { Trash2, RefreshCw, Eye } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.get<{ data: Lead[] }>("/admin/leads");
      setItems(data.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await adminApi.delete(`/admin/leads/${id}`);
      setItems((prev) => prev.filter((l) => l.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Leads</h1>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#0a0f1a] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-gray-400">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No leads found</td></tr>
                ) : items.map((l) => (
                  <tr key={l.id} className={`border-b border-white/5 hover:bg-white/5 cursor-pointer ${selected?.id === l.id ? "bg-white/10" : ""}`} onClick={() => setSelected(l)}>
                    <td className="px-4 py-3 text-white">{l.name}</td>
                    <td className="px-4 py-3 text-gray-400">{l.email}</td>
                    <td className="px-4 py-3 text-gray-400 truncate max-w-[200px]">{l.subject}</td>
                    <td className="px-4 py-3 text-gray-500">{l.created_at ? new Date(l.created_at).toLocaleDateString() : "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(l.id); }} className="text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0a0f1a] border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Lead Detail</h2>
          {selected ? (
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Name:</span> <span className="text-white">{selected.name}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="text-white">{selected.email}</span></div>
              {selected.phone && <div><span className="text-gray-500">Phone:</span> <span className="text-white">{selected.phone}</span></div>}
              <div><span className="text-gray-500">Subject:</span> <span className="text-white">{selected.subject}</span></div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-gray-500">Message:</span>
                <p className="text-gray-300 mt-1 whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
              <Eye size={16} className="mr-2" /> Select a lead to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
