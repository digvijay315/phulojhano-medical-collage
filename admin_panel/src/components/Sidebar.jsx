import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Image, LogOut, 
  Bell, IndianRupee, Users, 
  GraduationCap, Building, Info, ChevronDown, ChevronRight, X
} from 'lucide-react';

const SidebarGroup = ({ title, icon, items, location, onCloseMobile }) => {
  const isAnyChildActive = items.some(item => location.pathname === item.path);
  const [isOpen, setIsOpen] = useState(isAnyChildActive);
  const isActive = isAnyChildActive;

  return (
    <div className="mb-2">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
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
              onClick={() => onCloseMobile?.()}
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

export default function Sidebar({ mobileOpen = false, onCloseMobile, desktopOpen = true }) {
  const location = useLocation();

  const navItems = [
    {
      type: 'link',
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={20} />
    },
    {
      type: 'link',
      name: 'Global Site Content',
      path: '/content',
      icon: <FileText size={20} />
    },
    {
      type: 'link',
      name: 'Chatbot Q&A',
      path: '/chatbot',
      icon: <Bell size={20} />
    },
    {
      type: 'group',
      title: 'About Us',
      icon: <Info size={20} />,
      items: [
        { name: 'About College', path: '/about/college' },
        { name: 'Affiliation', path: '/about/affiliation' },
        { name: 'Dean & Principal', path: '/about/leadership' },
      ]
    },
    {
      type: 'group',
      title: 'Academics',
      icon: <GraduationCap size={20} />,
      items: [
        { name: 'Academic Calendar', path: '/academic/calendar' },
        { name: 'Syllabus', path: '/academic/syllabus' },
        { name: 'Results', path: '/academic/results' },
      ]
    },
    {
      type: 'link',
      name: 'Department',
      path: '/department',
      altPaths: ['/staff/teaching'],
      icon: <Building size={20} />
    },
    {
      type: 'group',
      title: 'Students',
      icon: <Users size={20} />,
      items: [
        { name: 'Student Lists', path: '/students/lists' },
        { name: 'Hostel Facility', path: '/students/hostel' },
        { name: 'Canteen', path: '/students/canteen' },
      ]
    },
    {
      type: 'group',
      title: 'Notices & Tenders',
      icon: <Bell size={20} />,
      items: [
        { name: 'Announcements', path: '/notices/announcements' },
        { name: 'Tenders', path: '/notices/tenders' },
      ]
    },
    {
      type: 'group',
      title: 'Gallery Media',
      icon: <Image size={20} />,
      items: [
        { name: 'Photo Gallery', path: '/gallery/photos' },
        { name: 'Video Gallery', path: '/gallery/videos' },
      ]
    },
    {
      type: 'link',
      name: 'Stipends',
      path: '/stipends',
      icon: <IndianRupee size={20} />
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/login';
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-primary text-primary-foreground overflow-hidden transition-all duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full w-72'}
        md:sticky md:top-0 md:z-0
        ${desktopOpen ? 'md:translate-x-0 md:w-72' : 'md:-translate-x-full md:w-0 md:opacity-0 md:pointer-events-none'}
      `}
    >
      <div className="p-5 border-b border-primary-foreground/10 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 bg-white rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-xs">
            <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold font-serif whitespace-nowrap">PJMC Admin</h2>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 md:hidden cursor-pointer"
          title="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {navItems.map((item) => {
          if (item.type === 'group') {
            return (
              <SidebarGroup 
                key={item.title} 
                title={item.title} 
                icon={item.icon} 
                items={item.items} 
                location={location} 
                onCloseMobile={onCloseMobile}
              />
            );
          }
          
          const isItemActive = location.pathname === item.path || 
            (item.altPaths && item.altPaths.includes(location.pathname));

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => onCloseMobile?.()}
              className={`flex items-center gap-3 px-4 py-2.5 mb-2 rounded-lg transition-colors ${
                isItemActive
                  ? 'bg-accent text-accent-foreground font-medium' 
                  : 'hover:bg-primary-foreground/10 text-primary-foreground/90'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-foreground/10 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors text-left text-primary-foreground/80 cursor-pointer"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
