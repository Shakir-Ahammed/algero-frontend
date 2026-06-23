import { useEffect, useState } from "react";
import { adminApi } from "../../../lib/admin-api";
import { Trash2, RefreshCw } from "lucide-react";

interface TeamItem {
  id: number;
  name: string;
  role: string;
  status: string;
  created_at: string;
}

export function TeamPage() {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.get<{ data: TeamItem[] }>("/admin/team-members");
      setItems(data.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await adminApi.delete(`/admin/team-members/${id}`);
      setItems((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="bg-[#0a0f1a] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-gray-400">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No team members found</td></tr>
            ) : items.map((m) => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-white">{m.name}</td>
                <td className="px-4 py-3 text-gray-400">{m.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    m.status === "approved" ? "bg-green-500/10 text-green-400" :
                    m.status === "rejected" ? "bg-red-500/10 text-red-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>{m.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(m.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
