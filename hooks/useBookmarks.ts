"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";

export function useBookmarks(userId: string | null) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      return;
    }

    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error.message);
        return;
      }

      setBookmarks(data ?? []);
    };

    fetchBookmarks();
  }, [userId]);

  const addBookmark = async (
  title: string,
  url: string
): Promise<void> => {
  if (!userId) return;

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user_id: userId }])
    .select()
    .single();

  if (error || !data) {
    console.error("Insert error:", error?.message);
    return;
  }

  // ✅ Add to state instantly
  setBookmarks((prev) => [data, ...prev]);
};


  const deleteBookmark = async (id: string): Promise<void> => {
  if (!userId) return;

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Delete error:", error.message);
    return;
  }

  // ✅ Update UI immediately
  setBookmarks((prev) => prev.filter((b) => b.id !== id));
};


  return { bookmarks, addBookmark, deleteBookmark };
}
