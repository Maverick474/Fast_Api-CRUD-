import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Please fill out all fields");
      return;
    }

    const data = {
      title,
      description: desc,
    };

    const res = await axios.post("http://localhost:8000/api/todo", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      alert("Task successfully created");
      setTitle("");
      setDesc("");
    } else {
      alert("An error occured");
    }
  };
  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-center text-4xl mt-3">Add Task</h1>
      <form
        className="flex flex-col w-2/4 mx-auto mt-6"
        onSubmit={handleSubmit}
      >
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
          className="border p-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
        />

        <label className="mt-3">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="h-32 p-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        ></textarea>

        <button
          className="bg-indigo-500 rounded-md text-white mt-4 p-3 w-40"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
