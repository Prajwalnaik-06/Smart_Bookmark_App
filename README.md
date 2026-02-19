

# 📌 Smart Bookmark App

A full-stack real-time bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users can securely log in using Google OAuth, add personal bookmarks, and see real-time updates across multiple tabs.

---

## 🚀 Live Demo

Deployed on: Vercel
👉 [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router)
* **Backend & Database:** Supabase
* **Authentication:** Supabase Google OAuth
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## ✨ Features

* 🔐 Google OAuth Login
* ➕ Add bookmarks
* 🗑 Delete bookmarks
* 🔒 User-specific private data (Row Level Security)
* ⚡ Real-time updates (auto refresh across tabs)
* 📱 Responsive UI

---

## 📂 Project Structure

```
smart-bookmark-app/
│
├── app/
│   ├── page.tsx
│   ├── dashboard/page.tsx
│   └── layout.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── BookmarkForm.tsx
│   ├── BookmarkList.tsx
│   └── BookmarkItem.tsx
│
├── hooks/
│   └── useBookmarks.ts
│
├── lib/
│   └── supabaseClient.ts
│
├── types/
│   └── bookmark.ts
│
└── .env.local
```

---

## 🗄 Database Schema

```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp default now()
);
```

### 🔐 Row Level Security (RLS)

```sql
alter table bookmarks enable row level security;

create policy "Users can view own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);
```

---

## 🔑 Authentication Flow

1. User clicks **Login with Google**
2. Redirected to Google OAuth
3. Supabase handles authentication
4. User session stored securely
5. Dashboard loads private bookmarks

---

## ⚡ Real-Time Implementation

Supabase Realtime is enabled on the `bookmarks` table.

The app subscribes to:

```ts
supabase.channel("realtime bookmarks")
  .on("postgres_changes", { event: "*", schema: "public", table: "bookmarks" }, fetchBookmarks)
  .subscribe();
```

This ensures instant updates when:

* A bookmark is added
* A bookmark is deleted

---

## ⚙️ Environment Variables

Create `.env.local` in root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Get these from:

Supabase → Settings → API

---

## 🧪 How To Run Locally

```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🚀 Deployment

1. Push project to GitHub
2. Import into Vercel
3. Add environment variables
4. Deploy

---

## 🛑 Problems Faced & Solutions

### 1️⃣ Google OAuth Redirect Error

**Problem:** redirect_uri_mismatch
**Solution:** Added correct Supabase callback URL in Google Cloud Console.

---

### 2️⃣ Row Level Security Blocking Queries

**Problem:** Data not visible after insert
**Solution:** Added proper RLS policies for select, insert, delete.

---

### 3️⃣ Realtime Not Working

**Problem:** Updates not reflecting
**Solution:** Enabled replication for bookmarks table in Supabase.

---


## 📈 Future Improvements

* ✏️ Edit bookmarks
* 🔍 Search functionality
* 🏷 Tag-based filtering
* 📊 Analytics dashboard
* 🌙 Dark mode
* 🧪 Unit testing

---

## 🎯 Assignment Requirements Checklist

| Requirement       | Status |
| ----------------- | ------ |
| Google OAuth only | ✅      |
| Add bookmark      | ✅      |
| Delete bookmark   | ✅      |
| Private per user  | ✅      |
| Real-time updates | ✅      |
| Hosted online     | ✅      |

---

## 👨‍💻 Author

**Prajwal Naik**
Built as part of a full-stack development assignment.

---


