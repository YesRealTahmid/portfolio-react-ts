import EditBlog from '@/components/EditBlog';
import { JSX } from 'react';

interface Topic {
  id: string;
  title: string;
  description: string;
}

interface TopicResponse {
  topic: Topic;
}

const getTopicById = async (id: string): Promise<TopicResponse | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch topic with id ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
};

interface UpdateBlogProps {
  params: {
    id: string;
  };
}

export default async function UpdateBlog({ params }: UpdateBlogProps): Promise<JSX.Element> {
  const { id } = params;
  const data = await getTopicById(id);

  if (!data || !data.topic) {
    return (
      <main className="main-content box w-full">
        <p>Error: Unable to load the topic. Please check the ID or try again later.</p>
      </main>
    );
  }

  const { topic } = data;
  const { title, description } = topic;

  return (
    <main className="main-content box w-full">
      <EditBlog id={id} title={title} description={description} />
    </main>
  );
}
