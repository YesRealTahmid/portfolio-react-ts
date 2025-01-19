import Image from "next/image";
import React from "react";

interface Blog {
  _id: string;
  title: string;
  category: string;
  image?: string;
  content?: string;
}

interface BlogPageProps {
  params: {
    id: string;
  };
}

async function fetchBlog(id: string): Promise<Blog | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch blog data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  console.log(id);

  const blog = await fetchBlog(id);

  if (!blog) {
    return <div>Blog not found. Please check the URL.</div>;
  }

  return (
    <main className="main-content w-[90%] text-white single-blog">
      <div className="w-[90%] ml-4">
        <h3 className="h2 article-title">{blog?.topic?.title}</h3>
        <div className="flex gap-3 mb-4">
          <p className="text-white">{blog?.topic?.category} |</p>
          <time dateTime={blog?.topic?.date} className="text-white">
            {blog?.topic?.date}
          </time>
        </div>
        <div>
          <Image
            className="rounded-2xl"
            src={blog?.topic?.image || "/default-image.jpg"}
            alt={blog.title || "Default Title"}
            width={800}
            height={200}
          />
        </div>
        <p className="mt-12 leading-10"> {blog?.topic?.description || "No content available."}</p>
      </div>
    </main>
  );
}
