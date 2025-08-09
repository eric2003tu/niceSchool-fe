"use client";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

// Types
interface Author {
  profileImage?: string | null;
  firstName?: string;
  lastName?: string;
}

interface ApiNewsItem {
  imageUrl?: string;
  category?: string;
  title: string;
  author?: Author | string;
  date?: string;
  createdAt?: string;
  publishedAt?: string;
}

interface NewsItem {
  photo: string;
  field: string;
  title: string;
  profile: string;
  name: string;
  date: string;
  id?: string | number;
}

// Utility to highlight matched text
function highlightText(text: string, keyword: string) {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="bg-yellow-300">
        {part}
      </span>
    ) : (
      part
    )
  );
}

// Custom hook for debouncing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AllNews: React.FC = () => {
  // Sample data moved outside component to prevent recreation on re-renders
  const sampleNews: NewsItem[] = [
    { photo: '/blog-post-5.webp', field: "Entertainment", title: "The future of cinema in the digital age", profile: "/person-f-10.webp", name: "Lana Brooks", date: "2022-06-22" },
    { photo: '/blog-post-1.webp', field: "Politics", title: "Empowering youth through policy change", profile: "/person-m-11.webp", name: "Daniel Owusu", date: "2022-01-01" },
    { photo: '/blog-post-3.webp', field: "Sports", title: "Rising stars in African athletics", profile: "/person-m-13.webp", name: "Tuyishime Eric", date: "2022-06-05" },
  ];

  const [news, setNews] = useState<NewsItem[]>(sampleNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const itemsPerPage = 9;

  // Map API response to NewsItem format
  const mapApiToNewsItem = (item: ApiNewsItem): NewsItem => {
    let authorName = "Unknown";
    let profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s";
    
    if (typeof item.author === 'string') {
      authorName = item.author;
    } else if (item.author) {
      authorName = `${item.author.firstName || ''} ${item.author.lastName || ''}`.trim() || 'Unknown';
      profileImage = item.author.profileImage || profileImage;
    }
    
    return {
      photo: item.imageUrl || "/blog-post-1.webp",
      field: item.category || "General",
      title: item.title,
      profile: profileImage,
      name: authorName,
      date: item.date || item.publishedAt || item.createdAt || "2022-01-01",
      id: (item as any).id // Add type assertion for the id property
    };
  };

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
setError("");
const res = await axios.get("https://niceschool-be-2.onrender.com/api/news");

if (res.data && Array.isArray(res.data.data)) {
  const mappedNews = res.data.data.map(mapApiToNewsItem);
  setNews(mappedNews.length > 0 ? mappedNews : sampleNews);
} else {
  setNews(sampleNews);
}

      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Showing sample data.");
        setNews(sampleNews);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  // Filtering and sorting
  const filteredBlogs = useMemo(() => {
    let result = [...news];

    // Search filtering
    if (debouncedSearchTerm) {
      const keyword = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(keyword) ||
          b.field.toLowerCase().includes(keyword) ||
          b.name.toLowerCase().includes(keyword)
      );
    }

    // Category filtering
    if (categoryFilter !== "All") {
      result = result.filter(b => b.field === categoryFilter);
    }

    // Sorting
    switch (sortOption) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "author-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "author-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date-asc":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "date-desc":
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return result;
  }, [debouncedSearchTerm, categoryFilter, sortOption, news]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate visible page numbers for pagination
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="text-[#0a0a40] lg:px-30 px-4 w-full justify-items-center">
      <h1 className="text-4xl font-bold">Recent News</h1>
      <p className="mb-4">Stay updated with the latest news and stories</p>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <input
          type="text"
          placeholder="Search by title, field, or author..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#0F9255] focus:outline-none"
          aria-label="Search news articles"
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#0F9255] focus:outline-none"
          aria-label="Filter by category"
        >
          <option value="All">All</option>
          <option value="general">General</option>
          <option value="entertainment">Entertainment</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#0F9255] focus:outline-none"
          aria-label="Sort options"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="author-asc">Author A-Z</option>
          <option value="author-desc">Author Z-A</option>
        </select>
      </div>

      {/* Status Messages */}
      {loading && (
        <div className="col-span-full text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F9255] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading news...</p>
        </div>
      )}

      {error && !loading && (
        <div className="col-span-full text-center py-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Blog Cards */}
      {!loading && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 w-full">
          {currentBlogs.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No news articles found matching your criteria.</p>
            </div>
          ) : (
            currentBlogs.map((blo, index) => (
              <article 
                key={blo.id || index} 
                className="w-full shadow-2xl group transition duration-700 transform hover:scale-[1.02] rounded-lg overflow-hidden"
                aria-labelledby={`news-title-${index}`}
              >
                <div
                  style={{ backgroundImage: `url(${blo.photo})` }}
                  className="w-full bg-cover bg-center bg-no-repeat rounded-t-lg h-64 p-2"
                  role="img"
                  aria-label={blo.title}
                >
                  <p className="w-fit bg-[#0F9255] text-white font-bold text-center px-4 p-2 rounded-full">
                    {highlightText(blo.field, debouncedSearchTerm)}
                  </p>
                </div>
                <div className="p-3 flex flex-col gap-3">
                  <h2 id={`news-title-${index}`} className="font-semibold text-lg">
                    {highlightText(blo.title, debouncedSearchTerm)}
                  </h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={blo.profile}
                      alt={blo.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{highlightText(blo.name, debouncedSearchTerm)}</p>
                      <time dateTime={blo.date} className="text-gray-500">
                        {new Date(blo.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
                <button 
                  className="bg-[#0F9255] text-white text-sm px-4 py-2 rounded-lg m-2 font-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0F9255] focus:ring-offset-2"
                  aria-label={`Read more about ${blo.title}`}
                >
                  View More
                </button>
              </article>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredBlogs.length > itemsPerPage && (
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-[#0F9255] text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0F9255]"
            aria-label="Go to first page"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-[#0F9255] text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0F9255]"
            aria-label="Go to previous page"
          >
            Previous
          </button>
          
          {getVisiblePages().map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-[#0a0a40]' : 'bg-[#0F9255]'} text-white focus:outline-none focus:ring-2 focus:ring-[#0F9255]`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-[#0F9255] text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0F9255]"
            aria-label="Go to next page"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-[#0F9255] text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0F9255]"
            aria-label="Go to last page"
          >
            Last
          </button>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="text-center mt-4 text-gray-600">
          Page {currentPage} of {totalPages} | Showing {currentBlogs.length} of {filteredBlogs.length} articles
        </div>
      )}
    </div>
  );
};

export default AllNews;