import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Jeel from '../assets/Jeel.jpg';

const navItems = [
    { id: 'home', icon: 'fas fa-home', label: 'Home' },
    { id: 'about', icon: 'fas fa-user', label: 'About' },
    { id: 'projects', icon: 'fas fa-briefcase', label: 'Projects' },
    { id: 'skills', icon: 'fas fa-code', label: 'Skills' },
    { id: 'resume', icon: 'fas fa-file-alt', label: 'Resume' },
    { id: 'contact', icon: 'fas fa-envelope', label: 'Contact Me' },
];

export default function Sidebar({ theme, toggleTheme, mobileOpen, closeMobile }) {
    const [active, setActive] = useState('home');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile && mobileOpen) {
                closeMobile();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileOpen, closeMobile]);

    useEffect(() => {
        const onScroll = () => {
            const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean);
            let current = 'home';
            sections.forEach(s => {
                if (window.pageYOffset >= s.offsetTop - 200) current = s.id;
            });
            setActive(current);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
            setActive(id);
            if (isMobile) closeMobile();
        }
    };

    // Helper to get image source
    const getImageSrc = () => {
        try {
            return Jeel;
        } catch {
            return "https://ui-avatars.com/api/?name=Jeel+Patel&background=3b82f6&color=fff&size=120";
        }
    };

    return (
        <nav className={`sidebar ${mobileOpen ? 'active' : ''}`}>
            <div className="sidebar-content">
                <div className="profile-image">
                    <div className="image-wrapper">
                        <img
                            src={getImageSrc()}
                            alt="Jeel Patel"
                            className="profile-img"
                        />
                        <div className="image-ring" />
                    </div>
                </div>

                <ul className="nav-links">
                    {navItems.map(({ id, icon, label }) => (
                        <li key={id}>
                            <button
                                className={`nav-link ${active === id ? 'active' : ''}`}
                                onClick={() => scrollTo(id)}
                            >
                                <i className={icon} />
                                <span>{label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="theme-toggle">
                    <button id="themeToggle" onClick={toggleTheme}>
                        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
                    </button>
                </div>

                <div className="social-links">
                    <a href="https://github.com/jeelptl2005" target="_blank" rel="noreferrer">
                        <i className="fab fa-github" />
                    </a>
                    <a href="https://linkedin.com/in/jeel1101" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin" />
                    </a>
                    <a href="https://www.instagram.com/jeelptl._11" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram" />
                    </a>
                </div>
            </div>
        </nav>
    );
}