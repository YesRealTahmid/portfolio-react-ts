import React from 'react'
import GithubGraph from './githubGraph'

const About = () => {
    return (
        <section>
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>
            <section className="about-text">
                <p>
                    Passionate Software Developer in love with JavaScript. Proficient in
                    React, Vue, NodeJs, Tailwind, Docker. Interested in WP Dev. Love eating,
                    music, travelling.
                </p>
            </section>
            <GithubGraph></GithubGraph>
        </section>
    )
}

export default About