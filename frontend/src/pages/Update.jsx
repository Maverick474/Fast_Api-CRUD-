import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = () => {
  const [items, setItems] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/api/todo');
    setItems(response.data);
  };

  const handleDelete = async (title) => {
    await axios.delete(`http://localhost:8000/api/todo/${title}`);
    setItems(items.filter((item) => item.title !== title));
  };

  const handleUpdate = (item) => {
    setUpdateItem(item);
    setTitle(item.title);
    setDesc(item.description);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    axios.patch(`http://localhost:8000/api/todo/${title}`,
      { 
        headers: { 'Content-Type': 'application/json' },
    
      }
    );
    

    setItems(
      items.map((item) =>
        item.title === updateItem.title ? { ...item, title, description: desc } : item
      )
    );

    setUpdateItem(null);
    setTitle('');
    setDesc('');
  };

  const handleCancel = () => {
    setUpdateItem(null);
    setTitle('');
    setDesc('');
  };

  return (
    <div className='min-h-screen'>
      {items.map((item) => (
        <div
          key={item.title}
          className='border mx-3 p-4 my-5 w-2/3 rounded-md bg-indigo-200 text-black font-bold'
        >
          <p>{item.title}</p>
          <p>{item.description}</p>
          <button
            onClick={() => handleUpdate(item)}
            className='bg-blue-500 mr-2 px-6 py-2 rounded mt-3 text-white'
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(item.title)}
            className='bg-red-500 px-6 py-2 rounded mt-3 text-white'
          >
            Delete
          </button>
        </div>
      ))}

      {updateItem && (
        <div className='min-h-screen'>
          <h1 className='font-bold text-center text-4xl mt-3'>Update Task</h1>
          <form
            className='flex flex-col w-2/4 mx-auto mt-6'
            onSubmit={handleUpdateSubmit}
          >
            <label>Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter a title'
              className='border p-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
            />

            <label className='mt-3'>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='h-32 p-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter description'
            ></textarea>

            <div className='flex mt-4'>
              <button
                className='bg-indigo-500 rounded-md text-white p-3 w-40 mr-2'
                type='submit'
              >
                Update Task
              </button>
              <button
                className='bg-gray-500 rounded-md text-white p-3 w-40'
                type='button'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
