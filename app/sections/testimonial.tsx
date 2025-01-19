'use client'
import React, { useState } from 'react';
import testimonials from "@/public/data/testimonialData.json";
import Image from 'next/image';

// Define the shape of a testimonial object
interface Testimonial {
  avatar: string;
  name: string;
  testimonial: string;
  date: string;
}

export default function Testimonial() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const handleOpenModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <section className="testimonials">
      <h3 className="h3 article-title testimonials-title">Testimonials</h3>
      <ul className="testimonials-list has-scrollbar">
        {testimonials.map((testimonial, index) => (
          <li key={index} className="testimonials-item">
            <div
              className="content-card"
              data-testimonials-item=""
              onClick={() => handleOpenModal(testimonial)}
            >
              <figure className="testimonials-avatar-box">
                <Image
                  src={testimonial.avatar}
                  alt="avatar"
                  width={80}
                  height={80}
                />
              </figure>
              <h4 className="h4 testimonials-item-title" data-testimonials-title="">
                {testimonial.name}
              </h4>
              <div className="testimonials-text" data-testimonials-text="">
                <p>{testimonial.testimonial}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedTestimonial && (
        <div className={`modal-container ${selectedTestimonial ? 'active' : ''}`} data-modal-container>
          <div className="overlay active" data-overlay onClick={handleCloseModal}></div>
          <section className="testimonials-modal">
            <button
              className="modal-close-btn"
              data-modal-close-btn
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="modal-img-wrapper">
              <figure className="modal-avatar-box">
                <Image
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  width={80}
                  height={80}
                  data-modal-img
                />
              </figure>
              <Image
                src="/images/icon-quote.svg"
                alt="quote icon"
                width={32}
                height={32}
              />
            </div>
            <div className="modal-content">
              <h4 className="h3 modal-title" data-modal-title>
                {selectedTestimonial.name}
              </h4>
              <time dateTime={selectedTestimonial.date}>
                {selectedTestimonial.date}
              </time>
              <div data-modal-text>
                <p>{selectedTestimonial.testimonial}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
