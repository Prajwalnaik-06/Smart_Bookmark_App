"use client";

import { Bookmark } from "@/types/bookmark";
import toast from "react-hot-toast";

interface Props {
  bookmark: Bookmark;
  deleteBookmark: (id: string) => Promise<void>;
}

export default function BookmarkItem({
  bookmark,
  deleteBookmark,
}: Props) {

  const handleDelete = async () => {
    try {
      await deleteBookmark(bookmark.id);
      toast.success("Bookmark deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete bookmark.");
    }
  };

  return (
    <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-xl shadow hover:scale-[1.02] transition">
      <a
        href={bookmark.url}
        target="_blank"
        className="text-indigo-900 font-medium hover:underline"
      >
        {bookmark.title}
      </a>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  );
}
