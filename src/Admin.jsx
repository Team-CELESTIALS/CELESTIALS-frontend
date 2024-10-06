import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Stories from './components/Stories';

const Admin = () => {
  const [posts, setPosts] = useState([1]);
  const [title, setTitle] = useState('Welcome to MUltiverse');
  const [content, setContent] = useState('Hello from Multiverse !');
  const [author, setAuthor] = useState('Padip Bhatt');
  const [image, setImage] = useState('https://www.pradipbhatt.com.np/medias/parry.jpg');
  const [link, setLink] = useState('https://pradipbhatt.com.npp');
  const [description, setDescription] = useState('We are on the Milky way !');
  const [tags, setTags] = useState('#Multiverse, #Best');
  const [currentId, setCurrentId] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://teamcelestials.vercel.app/api/post');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create or Update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, author, image, link, description, tags: tags.split(',') };
    try {
      if (currentId) {
        await axios.put(`https://teamcelestials.vercel.app/api/post/${currentId}`, postData);
      } else {
        await axios.post('https://teamcelestials.vercel.app/api/post', postData);
      }
      clearForm();
      fetchPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  // Clear form
  const clearForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setImage('');
    setLink('');
    setDescription('');
    setTags('');
    setCurrentId(null);
  };

  // Edit post
  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setImage(post.image);
    setLink(post.link);
    setDescription(post.description);
    setTags(post.tags.join(','));
    setCurrentId(post._id);
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://teamcelestials.vercel.app/api/post/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen flex items-center justify-center relative p-4">
        {/* Background Animation */}
        <div className="bg-animation absolute inset-0">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg z-10 w-full max-w-2xl mt-10">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Panel</h1>
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block w-full p-2 mb-2 border rounded text-black"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {currentId ? 'Update Post' : 'Create Post'}
            </button>
          </form>

          <h2 className="text-xl font-bold text-white mb-2">Posts</h2>
          <ul className="list-none">
            {posts.map((post) => (
              <li key={post._id} className="flex justify-between items-center bg-gray-700 p-4 mb-2 rounded">
                <div>
                  <h3 className="font-semibold text-white">{post.title}</h3>
                  <p className="text-white">{post.description}</p>
                  <p className="text-sm text-gray-300">By {post.author}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Stories/>
    </>
  );
};

export default Admin;
