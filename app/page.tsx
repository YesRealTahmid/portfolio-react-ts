import Blogs from "./blog/page";
import About from "./sections/about";
import Clients from "./sections/clients";
import Projects from "./sections/project";
import Services from "./sections/services";
import Testimonial from "./sections/testimonial";
import Timeline from "./sections/timeline";

export default function Home() {
  return (
    <main className="main-content">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a className="navbar-link" href="#" target="_blank">
              Available for Hire
            </a>
          </li>
          <li className="navbar-item">
            <a className="navbar-link" href="https://calendly.com/" target="_blank">
              Free Consultant
            </a>
          </li>
        </ul>
      </nav>

      <article className="about active" data-page="about">
                {/* ABOUT  */}
                <About></About>

                <Clients></Clients>
                {/* SERVICES  */}
                <Services></Services>
                {/* TIMELINE */}
                <Timeline></Timeline>
                {/* PROJECTS */}
                <Projects></Projects>
                {/* ARTICLE  */}
                <Blogs></Blogs>
                {/* TESTIMONIALS  */}
                <Testimonial></Testimonial>

            </article>



    </main>
  );
}
