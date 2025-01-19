'use client'
import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from "react-icons/io5";

// Define the structure of a GitHub repository
interface Repo {
    id: number;
    name: string;
    html_url: string;
}

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]); // State to hold repos
    const specificProjects = ['nextjs-i18n', 'thirdweb-dev-js'];
    const placeholderImageUrl = 'https://github.blog/wp-content/uploads/2023/01/1200x640.png?resize=1200%2C640';

    useEffect(() => {
        const fetchGitHubRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/zahidshowrav/repos');
                const data: Repo[] = await response.json(); // Type the response as an array of Repo objects
                setRepos(data.filter(repo => specificProjects.includes(repo.name)));
            } catch (error) {
                console.error('Error fetching GitHub repositories:', error);
            }
        };
        fetchGitHubRepos();
    }, []);

    return (
        <section className="projects">
            <h3 className="h3 article-title">Newsworthy Projects</h3>
            <div className="filter-select-box">
                <button className="filter-select" data-select>
                    <div className="select-value" data-select-value>
                        Select category
                    </div>
                    <div className="select-icon">
                    </div>
                </button>
                <ul className="select-list"></ul>
            </div>
            <ul className="project-list" id="project-list">
                {repos.map((repo) => (
                    <li className="project-item active" data-category="web development" key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <figure className="project-img">
                                <div className="project-item-icon-box">
                                    <IoEyeOutline />
                                </div>
                                <img
                                    src={placeholderImageUrl}
                                    alt={repo.name}
                                    loading="lazy"
                                />
                            </figure>
                            <h3 className="project-title">{repo.name}</h3>
                            <p className="project-category">Web development</p>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Projects;
