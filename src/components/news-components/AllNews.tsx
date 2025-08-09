"use client";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

// Types
interface Author {
  profileImage?: string;
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
    { photo: '/blog-hero-1.webp', field: "Entertainment", title: "Independent filmmakers to watch", profile: "/person-f-2.webp", name: "Chantal Niyonsaba", date: "2022-07-01" },
    { photo: '/blog-hero-2.webp', field: "Politics", title: "Decentralization in modern governance", profile: "/person-m-2.webp", name: "Jean Murenzi", date: "2022-02-15" },
    { photo: '/blog-post-4.webp', field: "Sports", title: "Grassroots football academies in Rwanda", profile: "/person-f-3.webp", name: "Esther Uwase", date: "2022-07-15" },
    { photo: '/blog-post-5.webp', field: "Entertainment", title: "Behind the lens: Directing hit series", profile: "/person-f-8.webp", name: "Grace Mutesi", date: "2022-08-22" },
    { photo: '/blog-post-6.webp', field: "Politics", title: "Policy shifts across East Africa", profile: "/person-m-4.webp", name: "David Iradukunda", date: "2022-03-03" },
    { photo: '/blog-post-7.webp', field: "Sports", title: "The science of peak athletic performance", profile: "/person-m-9.webp", name: "Brian Gasana", date: "2022-04-05" },
    { photo: '/blog-post-3.webp', field: "Entertainment", title: "Exploring the global influence of K-pop", profile: "/person-f-5.webp", name: "Alice Ray", date: "2022-05-12" },
    { photo: '/blog-post-9.webp', field: "Politics", title: "International relations in a shifting world", profile: "/person-m-6.webp", name: "Jonathan Dee", date: "2021-11-04" },
    { photo: '/blog-post-10.webp', field: "Sports", title: "Historic moments from Tokyo 2022", profile: "/person-f-7.webp", name: "Sandra Kim", date: "2022-12-30" },
    { photo: '/blog-post-5.webp', field: "Entertainment", title: "From script to screen: Storytelling secrets", profile: "/person-f-11.webp", name: "Deborah Nkundwa", date: "2022-06-29" },
    { photo: '/blog-post-1.webp', field: "Politics", title: "Women in leadership across Africa", profile: "/person-f-12.webp", name: "Maria Wanjiku", date: "2022-01-11" },
    { photo: '/blog-post-3.webp', field: "Sports", title: "Top 10 athletes breaking records", profile: "/person-m-14.webp", name: "Eric Munyaneza", date: "2022-06-10" },
    { photo: '/blog-hero-1.webp', field: "Entertainment", title: "The evolution of African pop music", profile: "/person-f-6.webp", name: "Josiane Mbabazi", date: "2022-07-04" },
    { photo: '/blog-hero-2.webp', field: "Politics", title: "Tech policy: The next frontier", profile: "/person-m-10.webp", name: "Amos Nshimiyimana", date: "2022-02-25" },
    { photo: '/blog-post-4.webp', field: "Sports", title: "Street sports gaining recognition", profile: "/person-m-5.webp", name: "Claude Habimana", date: "2022-07-18" },
    { photo: '/blog-post-5.webp', field: "Entertainment", title: "Cultural diversity in modern cinema", profile: "/person-f-10.webp", name: "Linda Barya", date: "2022-08-29" },
    { photo: '/blog-post-6.webp', field: "Politics", title: "The role of youth in peacebuilding", profile: "/person-f-4.webp", name: "Aline Mugiraneza", date: "2022-03-08" },
    { photo: '/blog-post-7.webp', field: "Sports", title: "Inside a champion's daily routine", profile: "/person-m-13.webp", name: "Kevin Rukundo", date: "2022-04-10" },
    { photo: '/blog-post-3.webp', field: "Entertainment", title: "Documentaries shaping public opinion", profile: "/person-f-9.webp", name: "Angelique Hope", date: "2022-05-19" },
    { photo: '/blog-post-9.webp', field: "Politics", title: "Africa’s voice at the UN summit", profile: "/person-m-6.webp", name: "Jonathan Dee", date: "2022-11-01" },
    { photo: '/blog-post-10.webp', field: "Sports", title: "Africa’s rising stars in basketball", profile: "/person-f-7.webp", name: "Sandra Kim", date: "2022-12-31" },
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
    let profileImage = "/person-m-11.webp";
    
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
      date: item.date || item.createdAt || "2022-01-01"
    };
  };

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get("https://niceschool-be-2.onrender.com/api/news");
        
        if (Array.isArray(res.data) && res.data.length > 0) {
          setNews(res.data.map(mapApiToNewsItem));
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
    <div className="text-[#0a0a40] lg:px-30 px-4 w-full">
      <h1 className="text-4xl font-bold">Recent News</h1>
      <p className="mb-4">Stay updated with the latest news and stories</p>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          <option value="All">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
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
                      alt={`${blo.name}'s profile`} 
                      className="w-10 h-10 rounded-full" 
                      loading="lazy"
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