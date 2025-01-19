import React from 'react'
import timelines from "@/public/data/timelineData.json";
export default function Timeline() {
    return (
        <section className="timeline">
            <div className="title-wrapper">
                <h3 className="h3 article-title">Experience</h3>
            </div>
            <ol className="timeline-list">
                {timelines.map((timeline, index) => (
                    <li key={index} className="timeline-item">
                        <h4 className="h4 timeline-item-title">{timeline.company}</h4>
                        <p className="timeline-text">{timeline.role}</p>
                        <span>{timeline.duration}</span>
                    </li>
                ))}
            </ol>
        </section>

    )
}
