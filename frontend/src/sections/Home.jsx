import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
    const contentRef = useRef(null);

    // Typing effect states
    const roles = ["Data Analyst", "Data Scientist", "ML Engineer", "AI Engineer"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentRole = roles[currentRoleIndex];

            if (isDeleting) {
                setCurrentText(currentRole.substring(0, currentText.length - 1));
                setTypingSpeed(50);
            } else {
                setCurrentText(currentRole.substring(0, currentText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && currentText === currentRole) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                setTypingSpeed(150);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.pageYOffset;
            if (contentRef.current && scrolled < window.innerHeight) {
                contentRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
                contentRef.current.style.opacity = Math.max(0, 1 - scrolled / 800);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="home" className="section home-section">
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="gradient-sphere sphere1" />
                <div className="gradient-sphere sphere2" />
                <div className="gradient-sphere sphere3" />
                <div className="gradient-sphere sphere4" />
                <div className="grid-overlay" />
                <div className="particles">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${4 + Math.random() * 6}s`,
                            width: `${1 + Math.random() * 3}px`,
                            height: `${1 + Math.random() * 3}px`,
                            opacity: 0.3 + Math.random() * 0.4,
                        }} />
                    ))}
                </div>
                <div className="floating-elements">
                    <div className="floating-icon icon1"><i className="fas fa-chart-line" /></div>
                    <div className="floating-icon icon2"><i className="fas fa-database" /></div>
                    <div className="floating-icon icon3"><i className="fas fa-brain" /></div>
                    <div className="floating-icon icon4"><i className="fas fa-code" /></div>
                    <div className="floating-icon icon5"><i className="fas fa-chart-pie" /></div>
                </div>
            </div>

            <motion.div
                className="home-content"
                ref={contentRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="greeting">
                    <span className="wave">👋</span> Hello, I'm
                </motion.div>

                <motion.h1 variants={itemVariants} className="name">
                    <span className="first-name">Jeel Patel</span>
                </motion.h1>

                <motion.div variants={itemVariants} className="title-wrapper">
                    <h2 className="title">
                        <span className="aspiring-text">Aspiring</span>
                        <span className="typing-text">
                            {currentText}
                            <span className="typing-cursor">|</span>
                        </span>
                    </h2>
                </motion.div>

                <motion.p variants={itemVariants} className="description">
                    Turning data into insights, and insights into impact.
                    Passionate about solving real-world problems using data-driven approaches.
                </motion.p>

                <motion.div variants={itemVariants} className="cta-buttons">
                    <motion.a
                        href="#projects"
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span>View My Work</span>
                        <i className="fas fa-arrow-right" />
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span>Get In Touch</span>
                        <i className="fas fa-paper-plane" />
                    </motion.a>
                </motion.div>

                <motion.div variants={itemVariants} className="tech-stack-badge">
                    <div className="tech-icons">
                        <span>Tech Stack:</span>
                        <i className="fab fa-python" />
                        <i className="fas fa-database" />
                        <i className="fab fa-js" />
                        <i className="fab fa-react" />
                        <i className="fas fa-chart-line" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <span>Scroll Down</span>
                <div className="scroll-line" />
            </motion.div>
        </section>
    );
}