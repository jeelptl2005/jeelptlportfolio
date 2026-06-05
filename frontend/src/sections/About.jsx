import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const expertise = [
    {
        icon: 'fa-solid fa-chart-line',
        title: 'Data Analysis',
        desc: 'Analyzing structured and unstructured data to identify trends, patterns, and insights that support data-driven decisions.',
    },
    {
        icon: 'fa-solid fa-microchip',
        title: 'Machine Learning',
        desc: 'Building predictive models using supervised and unsupervised learning techniques to extract insights from data.',
    },
    {
        icon: 'fas fa-database',
        title: 'Database Design',
        desc: 'Creating efficient database schemas and optimizing queries for peak performance.',
    },
    {
        icon: 'fa-solid fa-chart-pie',
        title: 'Data Visualization',
        desc: 'Creating compelling visual representations of data to communicate insights and support informed decisions.',
    },
];

function Counter({ target, started }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let cur = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
            cur += inc;
            if (cur >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(cur));
            }
        }, 30);
        return () => clearInterval(timer);
    }, [started, target]);
    return <>{count}</>;
}

export default function About() {
    const ref = useRef(null);
    const [started, setStarted] = useState(false);
    const isInView = useInView(ref, { threshold: 0.2, once: true });

    useEffect(() => {
        if (isInView) setStarted(true);
    }, [isInView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="about" className="section about-section">
            <div className="section-header">
                <span className="section-number">01.</span>
                <h2 className="section-title">About Me</h2>
                <div className="title-line" />
            </div>

            <motion.div
                className="about-content"
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div variants={itemVariants} className="intro-paragraph">
                    <p className="highlight-text">
                        I am currently pursuing a Bachelor of Technology (B.Tech) in Computer Science and Engineering at Parul University.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="about-details">
                    <p>
                        I am passionate about data analytics because I believe numbers tell stories that transform how businesses operate.
                        I've been building my skills with Python, SQL, and Excel to analyze datasets and present findings clearly.
                        My approach combines growing technical abilities with natural curiosity to ask the right questions.
                    </p>
                    <p>
                        What excites me most is the problem-solving aspect — every dataset presents a unique challenge. I enjoy cleaning data,
                        identifying patterns, and creating visualizations that tell a compelling story. I'm committed to continuously learning
                        new techniques and staying updated with industry trends.
                    </p>
                </motion.div>

                {/* Expertise Grid */}
                <motion.div variants={itemVariants} className="expertise-grid">
                    {expertise.map((item, i) => (
                        <motion.div
                            className="expertise-item"
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="expertise-icon">
                                <i className={item.icon} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">
                            <Counter target={7} started={started} />+
                        </div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">
                            <Counter target={2} started={started} />
                        </div>
                        <div className="stat-label">Internships</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">
                            <Counter target={500} started={started} />+
                        </div>
                        <div className="stat-label">Hours of Coding</div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}