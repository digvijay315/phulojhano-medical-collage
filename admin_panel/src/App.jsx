import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ConfirmProvider } from './context/ConfirmContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageContent from './pages/ManageContent';
import Placeholder from './pages/Placeholder';
import PhotoGallery from './pages/PhotoGallery';
import VideoGallery from './pages/VideoGallery';
import Tenders from './pages/Tenders';
import StudentLists from './pages/StudentLists';
import Syllabus from './pages/Syllabus';
import Results from './pages/Results';
import AcademicCalendar from './pages/AcademicCalendar';
import HostelFacility from './pages/HostelFacility';
import Canteen from './pages/Canteen';
import StaffTeaching from './pages/StaffTeaching';
import StaffNonTeaching from './pages/StaffNonTeaching';
import ManageChatbot from './pages/ManageChatbot';
import ManageNotices from './pages/ManageNotices';
import ManageStipends from './pages/ManageStipends';

function App() {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="content" element={<ManageContent />} />
                <Route path="gallery/photos" element={<PhotoGallery />} />
                <Route path="gallery/videos" element={<VideoGallery />} />
                <Route path="notices/tenders" element={<Tenders />} />
                <Route path="notices/announcements" element={<ManageNotices />} />
                <Route path="chatbot" element={<ManageChatbot />} />
                <Route path="stipends" element={<ManageStipends />} />
                <Route path="students/lists" element={<StudentLists />} />
                <Route path="academic/calendar" element={<AcademicCalendar />} />
                <Route path="academic/syllabus" element={<Syllabus />} />
                <Route path="academic/results" element={<Results />} />
                <Route path="students/hostel" element={<HostelFacility />} />
                <Route path="students/canteen" element={<Canteen />} />
                <Route path="staff/teaching" element={<StaffTeaching />} />
                <Route path="staff/non-teaching" element={<StaffNonTeaching />} />
                
                {/* Catch-all for all other admin routes (Placeholder) */}
                <Route path="*" element={<Placeholder title="Module Under Construction" />} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;
