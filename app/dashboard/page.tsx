"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useBookmarks } from "@/hooks/useBookmarks";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ ALWAYS call hook (no condition)
  const { bookmarks, addBookmark, deleteBookmark } =
    useBookmarks(user?.id ?? null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
  <div className="flex justify-center items-start pt-16 px-4">
    <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
      <Navbar />
      <div className="mt-6">
        <BookmarkForm addBookmark={addBookmark} />
        <BookmarkList
          bookmarks={bookmarks}
          deleteBookmark={deleteBookmark}
        />
      </div>
    </div>
  </div>
);

}
