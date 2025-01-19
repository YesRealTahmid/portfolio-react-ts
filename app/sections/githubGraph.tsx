import React from 'react';

const GithubGraph: React.FC = () => {
    // Define the contribution level type based on the gitGraph value
    const getContributionLevel = (gitGraph: number): 'low' | 'medium' | 'high' | 'very-high' => {
        return gitGraph <= 30
            ? 'low'
            : gitGraph <= 50
            ? 'medium'
            : gitGraph <= 70
            ? 'high'
            : 'very-high';
    };

    // Define the createDayDiv function with type annotations
    const createDayDiv = (_: unknown, index: number): JSX.Element => {
        const gitGraph = Math.floor(Math.random() * 90) + 10; // Generate random contributions between 10 and 99
        return (
            <div
                key={index}
                className="day"
                data-contributions={getContributionLevel(gitGraph)}
                title={`${gitGraph} contributions`}
            ></div>
        );
    };

    return (
        <section>
            <div className="graph-container" id="contribution-grid">
                {/* Generate 132 day divs (4 * 33 days) */}
                {Array.from({ length: 4 * 33 }, createDayDiv)}
            </div>
        </section>
    );
};

export default GithubGraph;
