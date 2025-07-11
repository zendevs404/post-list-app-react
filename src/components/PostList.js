import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css';
import dummyImage from '../assets/young-woman-working-laptop-isolated-white-background.jpg';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(localStorage.getItem('page') || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(localStorage.getItem('pageSize') || 10);  
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || '-published_at');

  const fetchPosts = async (pageNum) => {
    try {
      const response = await axios.get(`https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNum}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response);

      if (Array.isArray(response.data.data)) {
        setPosts(response.data.data);
      } else {
        setPosts([]);
      }

      setTotalItems(response.data.meta.total || 0);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, pageSize, sortOrder]);  // Menambahkan dependensi agar data dan pagination diperbarui

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));  // Memperbarui total halaman jika totalItems atau pageSize berubah
  }, [totalItems, pageSize]);

  useEffect(() => {
    localStorage.setItem('page', page);
    localStorage.setItem('pageSize', pageSize);
    localStorage.setItem('sortOrder', sortOrder);
  }, [page, pageSize, sortOrder]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: 'numeric', month: 'long' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };

    const formattedDate = date.toLocaleDateString('id-ID', optionsDate);
    const formattedTime = date.toLocaleTimeString('id-ID', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  };

  // Update localStorage setiap terjadi perubahan pada page, pageSize, atau sortOrder
  const calculateShowingRange = () => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);
    return `${start}-${end} of ${totalItems}`;
  };

  const getPageNumbers = () => {
    const maxPageNumbers = 5; // Menampilkan 5 halaman di pagination
    let startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2)); // Mulai dari halaman yang relevan
    let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages); // Tidak melebihi total halaman

    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="post-list">
      {/* Showing range */}
      <div className="showing-info">
        {calculateShowingRange()}
      </div>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="posts">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <img src={dummyImage} alt={post.title} className="post-thumbnail" />
              <p className="post-date">{formatDateTime(post.published_at)}</p>
              <h3>{post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters: Show per page and Sort by */}
      <div className="filters">
        <div className="show-per-page">
          <label>Show per page:</label>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="sort-by">
          <label>Sort by:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(1)} disabled={page === 1}>{"<<"}</button>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>{"<"}</button>
        {getPageNumbers().map((pageNumber) => (
          <button key={pageNumber} onClick={() => setPage(pageNumber)} className={page === pageNumber ? 'active' : ''}>
            {pageNumber}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>{">"}</button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>{">>"}</button>
      </div>
    </div>
  );
};

export default PostList;
