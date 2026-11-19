import { useState, useEffect } from 'react';
import api from '../api';
import { Upload, Loader2, Trash2, Edit2, Image as ImageIcon, Search, Crown, X, Mail, GraduationCap, Building2, Hash } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

const DEPARTMENT_DATA = [
  { name: 'ANATOMY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'Anesthes-iology', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'BIOCHEMISTRY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'Blood Bank', posts: ['Assi. Prof.', 'Professor'] },
  { name: 'Dentistry', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'ENT', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'EYE', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'F.M.T.', posts: ['Assi. Prof.', 'Professor', 'Tutor'] },
  { name: 'MEDICINE', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'Microbiology', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'OBS & GYN', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'ORTHOPADIES', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'P.S.M.', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'PATHOLOGY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'PEADIATRICS', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'PHARMACOLOGY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'Physical Medicine and rehabilitation', posts: ['Assi. Prof.', 'Professor', 'SR'] },
  { name: 'PHYSIOLOGY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'PSYCHIATRY', posts: ['Assi. Prof.', 'Asso. Prof.', 'SR'] },
  { name: 'Radio Therapy', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'Tutor'] },
  { name: 'Radio-Diagnosis', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'Skin & Vd', posts: ['Assi. Prof.', 'Asso. Prof.', 'SR'] },
  { name: 'SURGERY', posts: ['Assi. Prof.', 'Asso. Prof.', 'Professor', 'SR'] },
  { name: 'T.B.&Chest', posts: ['Assi. Prof.', 'Professor', 'SR'] },
].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

const getAvailablePosts = (dept) => {
  if (!dept) return [];
  const clean = dept.trim().toLowerCase();
  const stripped = dept.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const found = DEPARTMENT_DATA.find(d => {
    const dClean = d.name.toLowerCase();
    const dStripped = d.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return dClean === clean || dStripped === stripped;
  });

  return found ? [...found.posts].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) : [];
};

export default function Department() {
  const [deletingId, setDeletingId] = useState(null);
  const [viewingStaff, setViewingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    post: '',
    qualification: '',
    email: '',
    order: '',
    isHod: false
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [fetching, setFetching] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterPost, setFilterPost] = useState('');
  const [deptList, setDeptList] = useState([]);
  const [postList, setPostList] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const staffType = 'teaching';
  
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const availablePosts = getAvailablePosts(formData.department);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterDept, filterPost]);

  const fetchItems = async (currentPage = page) => {
    setFetching(true);
    try {
      const params = new URLSearchParams({
        type: staffType,
        page: String(currentPage),
        limit: '12',
      });
      if (debouncedSearch.trim()) params.append('search', debouncedSearch.trim());
      if (filterDept) params.append('department', filterDept);
      if (filterPost) params.append('post', filterPost);

      const res = await api.get(`/staff?${params.toString()}`);
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.currentPage || 1);
        setTotalItems(res.data.totalItems || 0);
        if (res.data.departments?.length) setDeptList(res.data.departments);
        if (res.data.posts?.length) setPostList(res.data.posts);
      }
    } catch (error) {
      console.error("Failed to fetch staff", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page, debouncedSearch, filterDept, filterPost]);

  const hasActiveFilters = Boolean(searchQuery || filterDept || filterPost);

  const resetFilters = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    setFilterDept('');
    setFilterPost('');
    setPage(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    const posts = getAvailablePosts(selectedDept);
    setFormData(prev => ({
      ...prev,
      department: selectedDept,
      post: posts.includes(prev.post) ? prev.post : ''
    }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department || !formData.post) {
      addToast('Name, Department, and Post are required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      
      if (file) {
        const uploadData = new FormData();
        uploadData.append('files', file);

        const uploadRes = await api.post('/upload/upload-files', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.urls[0];
        } else {
          throw new Error('Upload failed');
        }
      }

      const orderNumber = formData.order !== '' ? Number(formData.order) : 0;
      const payload = {
        ...formData,
        order: isNaN(orderNumber) ? 0 : orderNumber,
        isHod: Boolean(formData.isHod),
        type: staffType
      };
      if (imageUrl) payload.imageUrl = imageUrl;

      if (editingId) {
        await api.put(`/staff/${editingId}`, payload);
        addToast('Staff profile updated successfully!', 'success');
      } else {
        await api.post('/staff', payload);
        addToast('Staff profile added successfully!', 'success');
      }

      setFormData({ name: '', department: '', post: '', qualification: '', email: '', order: '', isHod: false });
      setFile(null);
      setEditingId(null);
      fetchItems(page);
      
    } catch (error) {
      console.error(error);
      addToast('Failed to process request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHod = async (id, newHodStatus, doctorName) => {
    try {
      const res = await api.put(`/staff/${id}`, { isHod: newHodStatus });
      if (res.data.success) {
        addToast(
          newHodStatus
            ? `HOD enabled for ${doctorName || 'staff member'}!`
            : `HOD disabled for ${doctorName || 'staff member'}.`,
          'success'
        );
        fetchItems(page);
      }
    } catch (err) {
      console.error("Failed to toggle HOD", err);
      addToast('Failed to update HOD status.', 'error');
    }
  };

  const handleQuickOrderUpdate = async (id, newOrderStr, currentOrder) => {
    const trimmed = String(newOrderStr || '').trim();
    const newOrder = trimmed === '' ? 0 : parseInt(trimmed, 10);
    if (isNaN(newOrder)) return;
    const currentOrderVal = currentOrder ? Number(currentOrder) : 0;
    if (newOrder === currentOrderVal) return;

    try {
      const res = await api.put(`/staff/${id}`, { order: newOrder });
      if (res.data.success) {
        addToast(`Position set to #${newOrder > 0 ? newOrder : 'Default'}!`, 'success');
        fetchItems(page);
      }
    } catch (err) {
      console.error("Failed to update position", err);
      addToast('Failed to update position.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm(
      "Delete Staff Member",
      "Are you sure you want to remove this staff member? This action cannot be undone."
    );
    
    if (!isConfirmed) return;
    setDeletingId(id);
    
    try {
      await api.delete(`/staff/${id}`);
      addToast('Staff member deleted successfully.', 'success');
      fetchItems(page);
      setDeletingId(null);
    } catch (error) {
      setDeletingId(null);
      console.error("Delete failed", error);
      addToast('Failed to delete staff member.', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || '',
      department: item.department || '',
      post: item.post || '',
      qualification: item.qualification || '',
      email: item.email || '',
      order: item.order ? String(item.order) : '',
      isHod: Boolean(item.isHod)
    });
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', department: '', post: '', qualification: '', email: '', order: '', isHod: false });
    setFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif">Department (Teaching Staff)</h1>
        <p className="text-muted-foreground mt-1">Manage department faculty, professors, and academic instructors.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">{editingId ? 'Edit Profile' : 'Add New Member'}</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. Dr. Rajesh Kumar"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department *</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleDepartmentChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-800"
                required
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENT_DATA.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                {formData.department && !DEPARTMENT_DATA.some(d => d.name === formData.department) && (
                  <option value={formData.department}>{formData.department}</option>
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Designation / Post *</label>
              <select 
                name="post"
                value={formData.post}
                onChange={handleChange}
                disabled={!formData.department}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                required
              >
                <option value="">
                  {formData.department ? '-- Select Designation / Post --' : '-- Select Department First --'}
                </option>
                {availablePosts.map(post => (
                  <option key={post} value={post}>{post}</option>
                ))}
                {formData.post && !availablePosts.includes(formData.post) && (
                  <option value={formData.post}>{formData.post}</option>
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                <span>Position / List Sequence</span>
                <span className="text-xs text-muted-foreground font-normal">e.g. 1 for Top/HOD</span>
              </label>
              <input 
                type="number" 
                name="order"
                min="1"
                value={formData.order}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. 1 (Top), 2 (2nd)..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Qualification (Optional)</label>
              <input 
                type="text" 
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. MBBS, MD (Anatomy)"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Email ID (Optional)</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g. dr.rajesh@phulojhanomc.edu.in"
              />
            </div>

            <div className="flex items-center gap-2 md:col-span-2 pt-1">
              <input
                type="checkbox"
                id="isHod"
                name="isHod"
                checked={Boolean(formData.isHod)}
                onChange={(e) => setFormData({ ...formData, isHod: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
              />
              <label htmlFor="isHod" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2">
                <span>Mark as Head of Department (HOD)</span>
                <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Displays as &quot;Designation (HOD)&quot;
                </span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors bg-gray-50">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                    <span>{file ? file.name : 'Click to browse image'}</span>
                    <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              {loading ? 'Saving...' : (editingId ? 'Update Profile' : 'Save Profile')}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Teaching Staff Directory</h2>
          <span className="text-sm text-gray-500">
            Total: <strong className="text-gray-800">{totalItems}</strong> members
          </span>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, qualification..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm bg-white text-gray-800"
              >
                <option value="">All Departments ({deptList.length || DEPARTMENT_DATA.length})</option>
                {(deptList.length ? deptList : DEPARTMENT_DATA.map(d => d.name)).map(dept => (
                  <option key={dept} value={dept}>{dept.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Post Filter */}
            <div>
              <select
                value={filterPost}
                onChange={(e) => setFilterPost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm bg-white text-gray-800"
              >
                <option value="">All Designations ({postList.length})</option>
                {postList.map(post => (
                  <option key={post} value={post}>{post}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>
              Showing {items.length} of <strong className="text-gray-800">{totalItems}</strong> matching staff member{totalItems === 1 ? '' : 's'}
              {filterDept && <span> in <strong className="text-primary">{filterDept.toUpperCase()}</strong></span>}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-primary hover:underline font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
        
        {fetching ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
        ) : items.length === 0 ? (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            No staff members found matching the selected filters.
            {hasActiveFilters && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-primary hover:underline font-medium text-xs cursor-pointer"
                >
                  Clear filters to show all
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-600">
                  <th className="p-4 font-semibold text-center w-24" title="Sequence position in directory list">
                    Pos #
                  </th>
                  <th className="p-4 font-semibold">Photo</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Department</th>
                  <th className="p-4 font-semibold">Designation</th>
                  <th className="p-4 font-semibold">Qualification</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {items.map(item => (
                  <tr 
                    key={item._id} 
                    onClick={() => setViewingStaff(item)}
                    className="hover:bg-primary/5 transition-colors cursor-pointer group"
                    title="Click row to view full doctor profile"
                  >
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        min="1"
                        key={item._id + '-' + (item.order || 0)}
                        defaultValue={item.order > 0 ? item.order : ''}
                        onBlur={(e) => handleQuickOrderUpdate(item._id, e.target.value, item.order)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') e.target.blur();
                        }}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm font-semibold bg-white"
                        placeholder="-"
                        title="Enter position number (1 for top). Press Enter to save."
                      />
                    </td>
                    <td className="p-4">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 group-hover:ring-2 group-hover:ring-primary/20 transition-all" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-lg">
                          {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800 group-hover:text-primary transition-colors">{item.name}</td>
                    <td className="p-4 text-gray-700 font-medium uppercase text-xs">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-full">
                        {item.department}
                      </span>
                    </td>
                    <td className="p-4 text-primary font-medium">
                      <span>{item.post}</span>
                      {item.isHod && (
                        <span className="ml-1.5 inline-block font-bold text-amber-700 bg-amber-50 border border-amber-300 px-1.5 py-0.5 rounded text-xs">
                          (HOD)
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{item.qualification || '-'}</td>
                    <td className="p-4 text-gray-600 text-sm">{item.email || '-'}</td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleHod(item._id, !item.isHod, item.name)}
                          className={`p-1.5 rounded-lg transition-all border cursor-pointer ${
                            item.isHod
                              ? 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 shadow-xs'
                              : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200'
                          }`}
                          title={item.isHod ? 'HOD Active (Click to disable HOD)' : 'Click to Enable HOD'}
                        >
                          <Crown size={16} className={item.isHod ? 'fill-amber-500 text-amber-600' : ''} />
                        </button>
                        <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-200" title="Edit"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-200" title="Delete">{deletingId === item._id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!fetching && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-600">
              Page <span className="font-medium text-gray-900">{page}</span> of <span className="font-medium text-gray-900">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex gap-1 hidden sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === p 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Premium Profile View Modal (Balanced & Compact) */}
      {viewingStaff && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setViewingStaff(null)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full overflow-hidden border border-gray-100 relative my-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setViewingStaff(null)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 flex items-center justify-center shadow transition-all cursor-pointer border border-gray-200"
              title="Close Profile"
            >
              <X size={18} />
            </button>

            {/* Decorative Top Banner */}
            <div className="h-28 sm:h-32 bg-gradient-to-r from-primary via-teal-800 to-primary/95 relative overflow-hidden flex items-start justify-between p-4 sm:p-5">
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-white/90 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Building2 size={14} />
                <span>{viewingStaff.department?.toUpperCase()}</span>
              </div>
              {viewingStaff.isHod && (
                <div className="bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-full shadow flex items-center gap-1 mr-8">
                  <Crown size={13} className="fill-amber-950" />
                  <span>Head of Department</span>
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="px-5 sm:px-6 pb-6 pt-0 relative">
              {/* Centered Large Profile Picture */}
              <div className="-mt-14 sm:-mt-16 flex justify-center">
                <div className="relative">
                  {viewingStaff.imageUrl ? (
                    <img 
                      src={viewingStaff.imageUrl} 
                      alt={viewingStaff.name} 
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary/10 border-4 border-white shadow-xl flex items-center justify-center text-primary font-bold text-3xl sm:text-4xl bg-white">
                      {viewingStaff.name ? viewingStaff.name.replace(/^Dr\.\s*/i, '').charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  {viewingStaff.isHod && (
                    <div 
                      className="absolute bottom-1 right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white"
                      title="Head of Department"
                    >
                      <Crown size={15} className="fill-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Name & Designation */}
              <div className="text-center mt-3 space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 leading-snug">
                  {viewingStaff.name}
                </h3>
                <p className="text-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-1.5">
                  <span>{viewingStaff.post}</span>
                  {viewingStaff.isHod && (
                    <span className="font-bold text-amber-700 bg-amber-50 border border-amber-300 px-1.5 py-0.5 rounded text-[11px]">
                      (HOD)
                    </span>
                  )}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800 uppercase tracking-wide">
                    {viewingStaff.department}
                  </span>
                  {viewingStaff.order > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                      <Hash size={11} />
                      Position #{viewingStaff.order}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-200">
                      Default Position
                    </span>
                  )}
                </div>
              </div>

              {/* Information Cards Grid (2 columns on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                {/* Qualification Card */}
                <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100 text-left">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-primary flex items-center justify-center shrink-0 border border-teal-100 mt-0.5">
                    <GraduationCap size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-gray-500 font-medium">Qualification</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 break-words">
                      {viewingStaff.qualification || 'Not Specified'}
                    </div>
                  </div>
                </div>

                {/* Email Address Card */}
                <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100 text-left">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-gray-500 font-medium">Email Address</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 truncate">
                      {viewingStaff.email ? (
                        <a 
                          href={`mailto:${viewingStaff.email}`} 
                          className="text-primary hover:underline"
                        >
                          {viewingStaff.email}
                        </a>
                      ) : (
                        <span className="text-gray-400 font-normal">Not Provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Department Info Card */}
                <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100 text-left">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 mt-0.5">
                    <Building2 size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-gray-500 font-medium">Department</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 uppercase tracking-wide">
                      {viewingStaff.department}
                    </div>
                  </div>
                </div>

                {/* Directory Position Card */}
                <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100 text-left">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                    <Hash size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-gray-500 font-medium">Directory Position</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5">
                      {viewingStaff.order > 0 ? `#${viewingStaff.order} in directory` : 'Default Sequence'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex gap-2.5 mt-5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    const toEdit = viewingStaff;
                    setViewingStaff(null);
                    handleEdit(toEdit);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                >
                  <Edit2 size={15} />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingStaff(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
