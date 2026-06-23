import { useEffect, useState } from "react";
import { adminApi } from "../../../lib/admin-api";
import { FileText, Users, Briefcase, FolderOpen, Mail, TrendingUp } from "lucide-react";

interface DashboardStats {
  blogs: number;
  team_members: number;
  services: number;
  projects: number;
  subscribers: number;
  pending_approvals: number;
  total_users: number;
}

const statCards: { key: keyof DashboardStats; label: string; icon: typeof FileText; color: string }[] = [
  { key: "blogs", label: "Blogs", icon: FileText, color: "text-blue-400" },
  { key: "team_members", label: "Team Members", icon: Users, color: "text-purple-400" },
  { key: "services", label: "Services", icon: Briefcase, color: "text-green-400" },
  { key: "projects", label: "Projects", icon: FolderOpen, color: "text-orange-400" },
  { key: "subscribers", label: "Subscribers", icon: Mail, color: "text-cyan-400" },
  { key: "pending_approvals", label: "Pending Approvals", icon: TrendingUp, color: "text-yellow-400" },
  { key: "total_users", label: "Total Users", icon: Users, color: "text-pink-400" },
];

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .get<DashboardStats>("/admin/dashboard")
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-[#0a0f1a] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg bg-white/5 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats[key] ?? 0}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
