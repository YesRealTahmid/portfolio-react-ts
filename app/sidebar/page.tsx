'use client'

import Image from "next/image";
import React from "react";
import myAvatar from "@/public/images/my-avatar.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { LuCodeXml } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    // Check if the current path starts with '/dashboard'
    const isDashboardPage = pathname.startsWith("/dashboard");

    return (
        <aside className="sidebar w-full" data-sidebar="">
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <Image src={myAvatar} alt="Avatar" />
                </figure>
                <div className="info-content">
                    <h1 className="name" title="Zahid Showrav">
                        Zahid Showrav
                    </h1>
                    <p className="title">Full-Stack JavaScript Developer</p>
                </div>
                <button className="info_more-btn" data-sidebar-btn="">
                    <span>Show Contacts</span>
                </button>
            </div>
            <div className="sidebar-info_more">
                <div className="separator" />
                {isDashboardPage ? (
                    <ul className="navigation-list text-white leading-10">
                        <li className="navigation-item">
                            <a href="/" className="navigation-link">
                                Home
                            </a>
                            <a href="/dashboard" className="navigation-link">
                                Dashboard
                            </a>
                            <a href="/dashboard/editBlog" className="navigation-link">
                                Blogs
                            </a>
                        </li>
                    </ul>
                ) : (
                    <ul className="contacts-list">
                        <li className="contact-item">
                            <div className="contact-info">
                                <p className="contact-title">Email</p>
                                <a href="mailto:hello@zahidshowrav.me" className="contact-link">
                                    hello@zahidshowrav.me
                                </a>
                            </div>
                        </li>
                        <li className="contact-item">
                            <div className="contact-info">
                                <p className="contact-title">Location</p>
                                <address>Mirpur, Dhaka, Bangladesh</address>
                            </div>
                        </li>
                    </ul>
                )}
                <div className="separator" />

                {isDashboardPage ? (
                    <></>
                ) : (
                    <ul className="social-list">
                        <li className="social-item">
                            <a
                                href="https://github.com/zahidshowrav"
                                className="social-link"
                                target="_blank"
                            >
                                <FaGithub />
                            </a>
                        </li>
                        <li className="social-item">
                            <a
                                href="linkedin.com/in/zahidshowrav/"
                                className="social-link"
                                target="_blank"
                            >
                                <FaLinkedin />
                            </a>
                        </li>
                        <li className="social-item">
                            <a
                                href="https://dev.to/zahidshowrav"
                                className="social-link"
                                target="_blank"
                            >
                                <LuCodeXml />
                            </a>
                        </li>
                    </ul>
                )}

            </div>
        </aside>
    );
}

export default Sidebar;
