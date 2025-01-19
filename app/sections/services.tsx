import React from 'react';
import Image from "next/image";
import services from "@/public/data/servicesData.json";
const Services = () => {
    return (
        <section className="service">
            <h3 className="h3 article-title service-title">What Im Doing</h3>
            <ul className="service-list">
                {services.map((service, index) => (
                    <li key={index} className="service-item">
                        <div className="service-icon-box">
                            <Image src={service.image} width="40" height="40" alt="icon design"></Image>
                        </div>
                        <div className="service-content-box">
                            <h4 className="h4 service-item-title">{service.title}</h4>
                            <p className="service-item-text">
                                {service.description}
                            </p>
                        </div>
                    </li>
                ))}


            </ul>
        </section>
    );
};

export default Services;
