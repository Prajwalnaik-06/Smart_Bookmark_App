import BookmarkItem from "./BookmarkItem";
import { Bookmark } from "@/types/bookmark";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  deleteBookmark: (id: string) => Promise<void>;
}

export default function BookmarkList({
  bookmarks,
  deleteBookmark,
}: BookmarkListProps) {
  if (!bookmarks || bookmarks.length === 0) {
    return <p className="text-gray-500">No bookmarks yet.</p>;
  }

  return (
    <div className="space-y-2">
      {bookmarks.map((b) => (
        <BookmarkItem
          key={b.id}
          bookmark={b}
          deleteBookmark={deleteBookmark}
        />
      ))}
    </div>
  );
}
