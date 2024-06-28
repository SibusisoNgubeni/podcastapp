import React, { useState, useEffect } from 'react';

export default function FetchRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => {
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

const handleClick = (item) => {setselectedItem(item)}
  return (
    <div>
      {loading && <p>Loading...</p>} 
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && data && (
        <>
          <h1>Posts</h1>
          <div></div><ul style={{ listStyleType: 'none', padding: 0 }}>
            {data.map((post, index) => (
              <li key={post.id} style={{ marginBottom: '1em' }} onClick={() => handleClick(post)}>
                <h2>{index + 1}. {post.title}</h2>
                {post.image && <img src={post.image} alt={post.title} />}
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          {selectedItem && (
            <div>
              <h2>{selectedItem.title}</h2>
              {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.title} />}
              <p>{selectedItem.body}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}





















