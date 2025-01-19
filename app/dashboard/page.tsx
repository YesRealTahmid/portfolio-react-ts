'use client'; 
import React, { useState, useEffect } from 'react';

interface Topic {
    id: string;
    title: string;
}

interface TopicsResponse {
    topics: Topic[];
}

const fetchTopics = async (): Promise<TopicsResponse> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
            cache: 'no-cache',
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching topics:', error);
        return { topics: [] }; 
    }
};

const Page: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        const loadTopics = async () => {
            const data = await fetchTopics();
            setTopics(data?.topics || []); 
        };

        loadTopics();
    }, []);

    return (
        <main className="text-white main-content">
            <section className="w-full ml-16">
                <div>
                    <h1 className="text-5xl font-bold text-white">Dashboard</h1>
                    <p className="text-sm text-gray-400">Welcome to your dashboard</p>
                </div>

                <div className="mt-14">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-[#1e1e1f] p-8 rounded-2xl border-[#383838] border-1">
                            Total Blogs: {topics.length}
                        </div>
                        <div className="bg-[#1e1e1f] p-8 rounded-2xl border-[#383838] border-1">Projects: {}</div>
                        <div className="bg-[#1e1e1f] p-8 rounded-2xl border-[#383838] border-1">Testimonials: {}</div>
                        <div className="bg-[#1e1e1f] p-8 rounded-2xl border-[#383838] border-1">Total Blogs: {}</div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
