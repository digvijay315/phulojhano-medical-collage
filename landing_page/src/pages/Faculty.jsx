import { useState, useEffect } from "react";
import api from "../api";
import PageHeader from "../components/PageHeader";

export default function Faculty() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const pageSize = 12;

  // Debounce search query so API is not spammed on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => clearTimeout(handler);
  }, [query]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedDept, selectedPost]);

  // Server-side fetch
  useEffect(() => {
    let isCancelled = false;

    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          type: "teaching",
          page: String(page),
          limit: String(pageSize),
        });

        if (debouncedQuery.trim()) {
          params.append("search", debouncedQuery.trim());
        }
        if (selectedDept) {
          params.append("department", selectedDept);
        }
        if (selectedPost) {
          params.append("post", selectedPost);
        }

        const res = await api.get(`/staff?${params.toString()}`);
        if (!isCancelled && res.data && res.data.success) {
          setFaculty(res.data.items);
          setTotalPages(res.data.totalPages || 1);
          setTotalItems(res.data.totalItems || 0);
          if (res.data.departments && res.data.departments.length > 0) {
            setDepartments(res.data.departments);
          }
          if (res.data.posts && res.data.posts.length > 0) {
            setPosts(res.data.posts);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch faculty:", err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchFaculty();

    return () => {
      isCancelled = true;
    };
  }, [page, debouncedQuery, selectedDept, selectedPost]);

  const hasActiveFilters = Boolean(query || selectedDept || selectedPost);

  const resetFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setSelectedDept("");
    setSelectedPost("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <>
      <PageHeader
        eyebrow="Departments & Faculty"
        title="Faculty Directory"
        subtitle="Comprehensive directory of professors, doctors, medical faculty and residents across departments."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filters Header */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by doctor name, email..."
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Department Dropdown Filter */}
            <div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground"
              >
                <option value="">All Departments ({departments.length})</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Post / Designation Dropdown Filter */}
            <div>
              <select
                value={selectedPost}
                onChange={(e) => setSelectedPost(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground"
              >
                <option value="">All Designations / Posts ({posts.length})</option>
                {posts.map((post) => (
                  <option key={post} value={post}>
                    {post}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs text-muted-foreground">
            <div>
              Showing{" "}
              <span className="font-semibold text-foreground">
                {startItem}-{endItem}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {totalItems}
              </span>{" "}
              faculty members
            </div>

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

        {/* Directory Table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5 w-16">Photo</th>
                <th className="px-5 py-3.5">Name & Qualification</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Designation / Post</th>
                <th className="px-5 py-3.5">Email</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-muted-foreground"
                    colSpan={5}
                  >
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2 align-middle" />
                    Loading faculty directory...
                  </td>
                </tr>
              ) : faculty.length === 0 ? (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-muted-foreground"
                    colSpan={5}
                  >
                    No matching faculty profiles found.
                    {hasActiveFilters && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="text-primary hover:underline font-medium text-xs cursor-pointer"
                        >
                          Reset filters to show all
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                faculty.map((f) => (
                  <tr
                    key={f._id}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      {f.imageUrl ? (
                        <img
                          src={f.imageUrl}
                          alt={f.name}
                          className="w-11 h-11 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-sm">
                          {f.name ? f.name.replace(/^Dr\.\s*/i, "").charAt(0).toUpperCase() : "?"}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-foreground">
                        {f.name}
                      </div>
                      {f.qualification && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {f.qualification}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                        {f.department}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-primary font-medium">
                      {f.post}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground text-xs">
                      {f.email ? (
                        <a
                          href={`mailto:${f.email}`}
                          className="hover:text-primary transition-colors hover:underline"
                        >
                          {f.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/40">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-Side Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-card border border-border p-4 rounded-2xl shadow-sm">
            <span className="text-xs text-muted-foreground">
              Page <span className="font-semibold text-foreground">{page}</span> of{" "}
              <span className="font-semibold text-foreground">{totalPages}</span>{" "}
              (Server Paged)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3.5 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    return (
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - page) <= 2
                    );
                  })
                  .map((p, idx, arr) => {
                    const prevP = arr[idx - 1];
                    const hasGap = prevP && p - prevP > 1;
                    return (
                      <span key={p} className="flex items-center">
                        {hasGap && (
                          <span className="px-1 text-muted-foreground text-xs">
                            ...
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                            page === p
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-foreground hover:bg-muted border border-border"
                          }`}
                        >
                          {p}
                        </button>
                      </span>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3.5 py-1.5 border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
