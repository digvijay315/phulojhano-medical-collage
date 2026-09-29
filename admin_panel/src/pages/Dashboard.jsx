import { Users, Image as ImageIcon, FileText, Bell } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Visits', value: '12,450', icon: <Users size={24} className="text-blue-500" /> },
    { label: 'Gallery Images', value: '45', icon: <ImageIcon size={24} className="text-green-500" /> },
    { label: 'Active Notices', value: '3', icon: <Bell size={24} className="text-amber-500" /> },
    { label: 'Pages', value: '12', icon: <FileText size={24} className="text-purple-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back to the Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold font-serif mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <p className="font-medium text-sm">Updated Notice Ticker</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago by admin@gmail.com</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
