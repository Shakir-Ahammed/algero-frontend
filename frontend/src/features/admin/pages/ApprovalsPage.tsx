import { useEffect, useState } from "react";
import { adminApi } from "../../../lib/admin-api";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface ApprovalItem {
  id: number;
  title: string;
  name?: string;
  status: string;
}

interface ApprovalsData {
  blogs: ApprovalItem[];
  team_members: ApprovalItem[];
  projects: ApprovalItem[];
}

export function ApprovalsPage() {
  const [data, setData] = useState<ApprovalsData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const result = await adminApi.get<ApprovalsData>("/admin/approvals");
      setData(result);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (type: string, id: number) => {
    try {
      await adminApi.post(`/admin/approve/${type}/${id}`);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Approve failed");
    }
  };

  const handleReject = async (type: string, id: number) => {
    try {
      await adminApi.post(`/admin/reject/${type}/${id}`);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Reject failed");
    }
  };

  const renderSection = (title: string, type: string, items: ApprovalItem[]) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">No pending items</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div>
                <span className="text-white">{item.title || item.name}</span>
                <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                  pending
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(type, item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                >
                  <CheckCircle size={14} /> Approve
                </button>
                <button
                  onClick={() => handleReject(type, item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Approvals</h1>
        <button onClick={load} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : data ? (
        <>
          {renderSection("Blogs", "blogs", data.blogs)}
          {renderSection("Team Members", "team-members", data.team_members)}
          {renderSection("Projects", "projects", data.projects)}
        </>
      ) : null}
    </div>
  );
}
