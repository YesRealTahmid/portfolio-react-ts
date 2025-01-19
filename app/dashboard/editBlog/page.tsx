"use client"; 

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import RemoveBtn from "@/components/RemoveBtn";

interface Topic {
  _id: string;
  title: string;
  category: string;
  date: string;
  image?: string;
}

const fetchTopics = async (): Promise<{ topics: Topic[] }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
      cache: "no-cache",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching topics:", error);
    return { topics: [] };
  }
};

const Page: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true); // Start loading
      const data = await fetchTopics();
      setTopics(data?.topics || []);
      setLoading(false); // Stop loading once data is fetched
    };

    loadTopics();
  }, []);

  return (
    <main className="w-[90%] text-white main-content">
      <table className="min-w-full mt-0 table">
        <tbody>
          <tr>
            <td className="px-11">
              <Link href="/dashboard/editBlog/addBlog">
                <div className="flex gap-5 items-center mb-10 mt-10">
                  <div className="w-[208px] h-[128px] bg-[#121212] rounded-2xl flex items-center justify-center">
                    <IoMdAdd className="text-2xl" />
                  </div>
                  <div>Add Blog</div>
                </div>
              </Link>
            </td>
          </tr>

          {loading ? ( // Loader state
            <tr>
              <td colSpan={2} className="text-center py-4">
                <div className="loader">Loading...</div> {/* You can replace this with any loader */}
              </td>
            </tr>
          ) : topics.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4">
                No topics available at the moment.
              </td>
            </tr>
          ) : (
            topics.map((topic) => (
              <tr key={topic._id}>
                <td className="px-11">
                  <Link href={`/blog/${topic._id}`}>
                    <div className="flex gap-5 items-center mb-10">
                      <Image
                        className="w-52 h-32 object-cover rounded-xl"
                        src={topic.image || "/default-image.jpg"}
                        width={300}
                        height={300}
                        quality={100}
                        alt={topic.title || "Blog image"}
                        unoptimized
                      />
                      <div>
                        {topic.title || "Untitled"}
                        <div className="blog-meta">
                          <p className="blog-category">{topic.category || "Uncategorized"}</p>
                          <span className="dot" />
                          <time dateTime={topic.date || ""}>
                            {new Date(topic.date).toLocaleDateString() || "Unknown Date"}
                          </time>
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="text-center">
                  <div className="flex justify-center space-x-4">
                    {/* <Link href={`/dashboard/editBlog/updateBlog/${topic._id}`}>
                      <button className="bg-[#1e1e1f] text-white px-4 py-4 rounded">
                        <AiOutlineEdit />
                      </button>
                    </Link> */}

                    <RemoveBtn id={topic._id}></RemoveBtn>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Page;
