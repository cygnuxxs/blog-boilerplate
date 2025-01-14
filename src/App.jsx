import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchPosts(), []);

  const addPost = (post) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((newPost) => setPosts([...posts, newPost]));
  };

  const deletePost = (_id) => {
    fetch(`http://localhost:3000/posts/${_id}`, {
      method: "DELETE",
    }).then(() => setPosts(posts.filter((post) => post._id !== _id)));
  };

  const updatePost = (post) => {
    fetch(`http://localhost:3000/posts/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((updatedPost) =>
        setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)))
      );
    setCurrentPost(null);
  };

  return (
    <div>
      <PostForm
        addPost={addPost}
        updatePost={updatePost}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
      />
      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          post={post}
          deletePost={deletePost}
          setCurrentPost={setCurrentPost}
        />
      ))}
    </div>
  );
};

export default App;
