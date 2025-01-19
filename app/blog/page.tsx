import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Topic {
    _id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    image?: string;
}

const getTopics = async (): Promise<{ topics: Topic[] } | undefined> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
            cache: "no-cache",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching topics:", error);
    }
};

export default async function Blogs() {
    const dd = await getTopics();
    const topics = dd?.topics || [];

    return (
        <section className="blog-posts">
            <h3 className="h3 article-title">Article</h3>
            <ul className="blog-posts-list" id="blog-posts-list">
                {topics.length === 0 ? (
                    <p>No articles available at the moment.</p>
                ) : (
                    topics.map((topic) => (
                        <li key={topic._id} className="blog-post-item">
                            <Link href={`/blog/${topic._id}`} id={topic.title}>
                                <figure className="blog-banner-box">
                                    <Image
                                        src={topic.image || "/default-image.jpg"}
                                        width={300}
                                        height={200}
                                        quality={100}
                                        alt={topic.title || "Blog image"}
                                        unoptimized
                                    />
                                </figure>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <p className="blog-category">{topic.category || "Uncategorized"}</p>
                                        <span className="dot" />
                                        <time dateTime={topic.date || ""}>
                                            {new Date(topic.date).toLocaleDateString() || "Unknown Date"}
                                        </time>
                                    </div>
                                    <h3 className="h3 blog-item-title">{topic.title || "Untitled"}</h3>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}
