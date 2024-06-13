import React, { useState, useEffect } from 'react';

const PostForm = ({ addPost, updatePost, currentPost }) => {
  const [formData, setFormData] = useState({
    title: currentPost?.title || '',
    content: currentPost?.content || '',
    imageUrl: currentPost?.imageUrl || '',
  });

  useEffect(() => {
    setFormData({
      title: currentPost?.title || '',
      content: currentPost?.content || '',
      imageUrl: currentPost?.imageUrl || '',
    });
  }, [currentPost]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPost) {
      updatePost({ ...formData }); // Destructure directly from formData
    } else {
      addPost(formData);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', imageUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        placeholder='Content'
        name='content'
        value={formData.content}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type='text'
        placeholder='Image URL'
        name='imageUrl'
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <button type='submit'>{currentPost ? 'Update Post' : 'Add Post'}</button>
      {currentPost && <button type='button' onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default PostForm;
