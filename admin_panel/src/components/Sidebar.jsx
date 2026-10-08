import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Image, LogOut, 
  Briefcase, Bell, IndianRupee, Users, 
  GraduationCap, Building, Info, ChevronDown, ChevronRight
} from 'lucide-react';

const SidebarGroup = ({ title, icon, items, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = items.some(item => location.pathname === item.path);

  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
          isActive && !isOpen ? 'bg-primary-foreground/5 text-primary-foreground' : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
        }`}
      >
        <div className="flex items-center gap-3 font-medium">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {isOpen && (
        <div className="ml-11 flex flex-col gap-1 mt-1">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                location.pathname === item.path 
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const location = useLocation();

  const groups = [
    {
      title: 'About Us',
      icon: <Info size={20} />,
      items: [
        { name: 'About College', path: '/about/college' },
        { name: 'Affiliation', path: '/about/affiliation' },
        { name: 'Dean & Principal', path: '/about/leadership' },
      ]
    },
    {
      title: 'Academics',
      icon: <GraduationCap size={20} />,
      items: [
        { name: 'Academic Calendar', path: '/academic/calendar' },
        { name: 'Syllabus', path: '/academic/syllabus' },
        { name: 'Results', path: '/academic/results' },
      ]
    },
    {
      title: 'Staff Section',
      icon: <Users size={20} />,
      items: [
        { name: 'Teaching Staff', path: '/staff/teaching' },
        { name: 'Non-Teaching Staff', path: '/staff/non-teaching' },
      ]
    },
    {
      title: 'Students',
      icon: <Users size={20} />,
      items: [
        { name: 'Student Lists', path: '/students/lists' },
        { name: 'Hostel Facility', path: '/students/hostel' },
        { name: 'Canteen', path: '/students/canteen' },
      ]
    },
    {
      title: 'Notices & Tenders',
      icon: <Bell size={20} />,
      items: [
        { name: 'Announcements', path: '/notices/announcements' },
        { name: 'Tenders', path: '/notices/tenders' },
      ]
    },
    {
      title: 'Gallery Media',
      icon: <Image size={20} />,
      items: [
        { name: 'Photo Gallery', path: '/gallery/photos' },
        { name: 'Video Gallery', path: '/gallery/videos' },
      ]
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/login';
  };

  return (
    <aside className="w-72 bg-primary text-primary-foreground flex flex-col h-screen sticky top-0 overflow-hidden">
      <div className="p-6 border-b border-primary-foreground/10 shrink-0 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 bg-white rounded-full overflow-hidden flex items-center justify-center p-0.5">
          <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-xl font-bold font-serif">PJMC Admin</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
            location.pathname === '/' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        
        <Link
          to="/content"
          className={`flex items-center gap-3 px-4 py-3 mb-4 rounded-lg transition-colors ${
            location.pathname === '/content' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
          }`}
        >
          <FileText size={20} />
          <span className="font-medium">Global Site Content</span>
        </Link>
        
        <Link
          to="/chatbot"
          className={`flex items-center gap-3 px-4 py-3 mb-4 rounded-lg transition-colors ${
            location.pathname === '/chatbot' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
          }`}
        >
          <Bell size={20} />
          <span className="font-medium">Chatbot Q&A</span>
        </Link>
        
        {groups.map((group) => (
          <SidebarGroup 
            key={group.title} 
            title={group.title} 
            icon={group.icon} 
            items={group.items} 
            location={location} 
          />
        ))}

        <Link
          to="/stipends"
          className={`flex items-center gap-3 px-4 py-3 mt-2 rounded-lg transition-colors ${
            location.pathname === '/stipends' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
          }`}
        >
          <IndianRupee size={20} />
          <span className="font-medium">Stipends</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-primary-foreground/10 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors text-left text-primary-foreground/80"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
