import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const filtered = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search posts by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(post => (
            <Card key={post.id} title={post.title}>
              <p>{post.body}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</Button>
        <span className="px-4 py-2">Page {page}</span>
        <Button onClick={() => setPage(p => p + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default ApiData;
