"use client";

import React, { JSX, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

type FormData = {
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
};

function Page(): JSX.Element {
  //   const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Hey, the title is not long enough!" })
      .max(100, { message: "Hey, the title is too long!" }),
    category: z.string().nonempty({ message: "Category is required." }),
    date: z.string().nonempty({ message: "Date is required." }),
    image: z.string().nonempty({ message: "Image URL is required." }),
    description: z
      .string()
      .min(10, {
        message: "Description should be at least 10 characters long.",
      })
  });

  const { handleSubmit, control, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      date: "",
      image: "",
    },
  });

  
  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    setValue(
      "date",
      selectedDate ? selectedDate.toISOString().split("T")[0] : ""
    );
  };

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0] || null;
  //     if (file) {
  //       const imageUrl = URL.createObjectURL(file);
  //       setImageFile(file);
  //       setValue("image", imageUrl);
  //     }
  //   };

  const onSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        toast.success("Blog added successfully!");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        toast.error("Failed to add blog. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add blog. Please try again.");
    }
  };

  return (
    <main className="main-content box">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80%] py-10">
        <h3 className="h3 article-title mt-10 mb-10">Add Blog</h3>

        <div className="flex-grow">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  id="title"
                  className="w-full p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
                  type="text"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="flex gap-5 mt-10 w-full items-center mb-10">
          <div className="flex-grow">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-white"
            >
              Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    id="category"
                    className="w-full p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
                    type="text"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-white"
            >
              Date
            </label>
            <Controller
              name="date"
              control={control}
              render={({ fieldState }) => (
                <>
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    className="w-[] p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex-grow">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-white"
          >
            Image URL
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  id="image"
                  className="w-full p-9 py-4 outline-none bg-[#121212] text-white rounded-2xl text-[14px]"
                  type="url"
                  placeholder="Enter image URL"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="flex-grow mt-14">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <textarea
                  {...field}
                  id="description"
                  className="w-full p-9 pt-8 outline-none bg-[#121212] text-white rounded-2xl text-[14px] resize-none"
                  rows={5}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <button type="submit" className="button text-white mt-14">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Page;
