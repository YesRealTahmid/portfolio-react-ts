import React, { JSX } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

// Define types for the data returned from the API
interface Topic {
  _id: string;
  title: string;
  description: string;
}

interface UpdateBlogProps {
  params: { id: string };
}

interface FormData {
  title: string;
  description: string;
}

// New type for EditBlog props
interface EditBlogProps {
  id: string;
  title: string;
  description: string;
}

const getTopicById = async (id: string): Promise<{ topic: Topic } | null> => {
  try {
    const res = await fetch(`/api/topics/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch topic with id ${id}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
};

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

  const { title, description } = data.topic;

  return (
    <main className="main-content box w-full">
      <EditBlog id={id} title={title} description={description} />
    </main>
  );
}

function EditBlog({ id, title, description }: EditBlogProps) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { title, description },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to update the blog.');
      }

      toast.success('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update the blog.');
    }
  };



  return (
    <form className="w-[80%] mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="h3 article-title mt-10 mb-10">Edit Blog</h3>

      {/* Title Field */}
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
        <input
          id="title"
          {...register('title')}
          className="w-full p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
          type="text"
        />
      </div>

      {/* Description Field (Removed Editor, now just a simple input) */}
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
        <input 
          id="description"
          {...register('description')}
          className="w-full p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
          type="text"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="button text-white mt-14"
      >
        Submit
      </button>
    </form>
  );
}
