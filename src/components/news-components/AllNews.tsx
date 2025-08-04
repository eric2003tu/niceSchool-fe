"use client";
import React, { useMemo, useState } from "react";

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

const AllNews = () => {
  const blog = [
    { photo: 'blog-post-5.webp', field: "Entertainment", title: "Possimus soluta ut id suscipit ea ut in quo quia et soluta", profile: "person-f-10.webp", name: "Mark Dower", date: "2022-06-22" },
    { photo: 'blog-post-1.webp', field: "Politics", title: "Dolorum optio tempore voluptas dignissimos", profile: "person-m-11.webp", name: "Maria Doe", date: "2022-01-01" },
    { photo: 'blog-post-3.webp', field: "Sports", title: "Nisi magni odit consequatur autem nulla dolorem", profile: "person-m-13.webp", name: "Eric Tuyishime", date: "2022-06-05" },
    { photo: 'blog-hero-1.webp', field: "Entertainment", title: "New movies dropping this month", profile: "person-f-2.webp", name: "Mark Dower", date: "2022-07-01" },
    { photo: 'blog-hero-2.webp', field: "Politics", title: "The rise of local elections", profile: "person-m-2.webp", name: "Maria Doe", date: "2022-02-15" },
    { photo: 'blog-post-4.webp', field: "Sports", title: "The biggest football transfers", profile: "person-f-3.webp", name: "Eric Tuyishime", date: "2022-07-15" },
    { photo: 'blog-post-5.webp', field: "Entertainment", title: "Behind the scenes of your favorite show", profile: "person-f-10.webp", name: "Mark Dower", date: "2022-08-22" },
    { photo: 'blog-post-6.webp', field: "Politics", title: "How laws are changing globally", profile: "person-m-11.webp", name: "Maria Doe", date: "2022-03-03" },
    { photo: 'blog-post-7.webp', field: "Sports", title: "Training routines of top athletes", profile: "person-m-13.webp", name: "Eric Tuyishime", date: "2022-04-05" },
    { photo: 'blog-post-3.webp', field: "Entertainment", title: "Rising stars in the music industry", profile: "person-f-5.webp", name: "Alice Ray", date: "2022-05-12" },
    { photo: 'blog-post-9.webp', field: "Politics", title: "Leaders on the global stage", profile: "person-m-6.webp", name: "Jonathan Dee", date: "2021-11-04" },
    { photo: 'blog-post-10.webp', field: "Sports", title: "2022 Olympics highlights", profile: "person-f-7.webp", name: "Sandra Kim", date: "2022-12-30" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Filtering
  const filteredBlogs = useMemo(() => {
    let result = [...blog];

    if (searchTerm) {
      const keyword = searchTerm.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(keyword) ||
          b.field.toLowerCase().includes(keyword) ||
          b.name.toLowerCase().includes(keyword)
      );
    }

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
  }, [searchTerm, categoryFilter, sortOption]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="text-[#0a0a40] lg:px-30 px-4 w-full">
      <h1 className="text-4xl font-bold">Recent News</h1>
      <p className="mb-4">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>

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
          className="w-full md:w-1/3 border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#0F9255]"
        />

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded"
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
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="author-asc">Author A-Z</option>
          <option value="author-desc">Author Z-A</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {currentBlogs.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center">No blog posts found.</p>
        ) : (
          currentBlogs.map((blo, index) => (
            <div key={index} className="w-full shadow-2xl group group transition duration-300 transform hover:scale-[1.02] rounded-lg ">
              <div
                style={{ backgroundImage: `url(${blo.photo})` }}
                className="w-full bg-cover bg-no-repeat rounded-t-lg h-64 p-2"
              >
                <p className="w-fit bg-[#0F9255] text-white font-bold text-center px-4 p-2 rounded-full">
                  {highlightText(blo.field, searchTerm)}
                </p>
              </div>
              <div className="p-3 flex flex-col gap-3">
                <h1 className="font-semibold">{highlightText(blo.title, searchTerm)}</h1>
                <div className="flex items-center gap-4">
                  <img src={blo.profile} alt={blo.title} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold">{highlightText(blo.name, searchTerm)}</p>
                    <span className="text-gray-500">{new Date(blo.date).toDateString()}</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#0F9255] text-white text-sm px-4 py-1 rounded-lg m-2 font-bold hover:opacity-90">
                View More
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredBlogs.length > itemsPerPage && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 rounded bg-[#0F9255] text-white disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-bold text-lg">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 rounded bg-[#0F9255] text-white disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllNews;
