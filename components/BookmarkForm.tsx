"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";


interface BookmarkFormProps {
  addBookmark: (title: string, url: string) => Promise<void>;
}

export default function BookmarkForm({ addBookmark }: BookmarkFormProps) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ prevent page reload

    if (!title.trim() || !url.trim()) return;

    try {
      await addBookmark(title.trim(), url.trim());
      toast.success("Bookmark added successfully!");

      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col md:flex-row gap-4 mb-6"
>
  <input
    type="text"
    placeholder="Bookmark title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <input
    type="url"
    placeholder="https://example.com"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <button
    type="submit"
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg transition"
  >
    Add
  </button>
</form>

  );
}
