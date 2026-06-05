import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const skillCategories = [
    {
        icon: 'fas fa-chart-line',
        title: 'Data Analysis Libraries',
        skills: [
            { name: 'Pandas & Numpy', level: 95 },
            { name: 'Matplotlib', level: 90 },
            { name: 'Seaborn', level: 92 },
            { name: 'Plotly', level: 85 },
        ],
    },
    {
        icon: 'fas fa-code',
        title: 'Programming Languages',
        skills: [
            { name: 'Python', level: 92 },
            { name: 'JavaScript', level: 85 },
            { name: 'SQL', level: 88 },
            { name: 'HTML/CSS', level: 90 },
        ],
    },
    {
        icon: 'fas fa-database',
        title: 'Databases',
        skills: [
            { name: 'PostgreSQL', level: 85 },
            { name: 'MySQL', level: 88 },
            { name: 'MongoDB', level: 75 },
            { name: 'Redis', level: 65 },
        ],
    },
    {
        icon: 'fas fa-square-root-alt',
        title: 'Mathematics & Statistics',
        skills: [
            { name: 'Statistics', level: 88 },
            { name: 'Probability', level: 90 },
            { name: 'Linear Algebra', level: 82 },
            { name: 'Calculus', level: 80 },
        ],
    },
    {
        icon: 'fas fa-tools',
        title: 'Tools & DevOps',
        skills: [
            { name: 'Git & GitHub', level: 90 },
            { name: 'Docker', level: 75 },
            { name: 'Jupyter Notebook', level: 95 },
            { name: 'VS Code', level: 92 },
        ],
    },
    {
        icon: 'fas fa-brain',
        title: 'Machine Learning',
        skills: [
            { name: 'Scikit-learn', level: 80 },
            { name: 'Supervised Learning', level: 82 },
            { name: 'Feature Engineering', level: 78 },
            { name: 'Model Evaluation', level: 85 },
        ],
    },
];

function SkillBar({ name, level, started }) {
    return (
        <div className="skill-item">
            <div className="skill-info">
                <span className="skill-name">{name}</span>
                <span className="skill-level">{level}%</span>
            </div>
            <div className="skill-bar">
                <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: started ? `${level}%` : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

function SkillCategory({ cat, started, index }) {
    return (
        <motion.div
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ borderColor: 'var(--accent-primary)', transition: { duration: 0.2 } }}
        >
            <h3 className="category-title">
                <i className={cat.icon} /> {cat.title}
            </h3>
            <div className="skills-list">
                {cat.skills.map((s, i) => (
                    <SkillBar key={i} name={s.name} level={s.level} started={started} />
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const [started, setStarted] = useState(false);
    const isInView = useInView(ref, { threshold: 0.2, once: true });

    useEffect(() => {
        if (isInView) setStarted(true);
    }, [isInView]);

    return (
        <section id="skills" className="section skills-section">
            <div className="section-header">
                <span className="section-number">03.</span>
                <h2 className="section-title">Skills & Technologies</h2>
                <div className="title-line" />
            </div>
            <div className="skills-content" ref={ref}>
                {skillCategories.map((cat, i) => (
                    <SkillCategory key={i} cat={cat} started={started} index={i} />
                ))}
            </div>
        </section>
    );
}