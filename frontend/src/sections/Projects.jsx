import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const projects = [
    {
        num: '01',
        title: 'Portfolio Website',
        year: '2026',
        desc: 'Personal portfolio built with React and Framer Motion showcasing skills, projects, and background.',
        tech: ['React', 'Framer Motion', 'CSS', 'JavaScript'],
        demo: 'https://jeelpatel-nine.vercel.app',
        code: 'https://github.com/jeelptl2005/jeelpatel',
    },
    {
        num: '02',
        title: 'Netflix EDA',
        year: '2026',
        desc: 'Exploratory data analysis on Netflix content to identify trends using visualization techniques.',
        tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Textblob'],
        demo: 'https://github.com/jeelptl2005/DATA-SCIENCE/blob/main/Netflix%20EDA/Netflix%20EDA.ipynb',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/Netflix%20EDA',
    },
    {
        num: '03',
        title: 'AI vs Human Text Detection',
        year: '2026',
        desc: 'ML model identifying AI-written vs human-written text using TF-IDF Vectorization.',
        tech: ['Python', 'Plotly', 'Pandas', 'Logistic Regression', 'TfidfVectorizer'],
        demo: 'https://github.com/jeelptl2005/DATA-SCIENCE/blob/main/AI%20vs%20Human%20Text%20Detection/AI%20vs%20Human.ipynb',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/AI%20vs%20Human%20Text%20Detection',
    },
    {
        num: '04',
        title: 'Titanic Survival Prediction',
        year: '2026',
        desc: 'ML model predicting survival based on age, gender, pclass, and fare.',
        tech: ['Python', 'Plotly', 'Pandas', 'Logistic Regression', 'Label Encoder'],
        demo: 'https://github.com/jeelptl2005/DATA-SCIENCE/blob/main/Titanic%20Survival%20Prediction/Titanic%20Survival%20Prediction.ipynb',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/Titanic%20Survival%20Prediction',
    },
    {
        num: '05',
        title: 'Customer Purchase & Sales Forecast',
        year: '2026',
        desc: 'ML-powered platform predicting purchase probability and forecasting sales to optimize marketing ROI.',
        tech: ['Python', 'Plotly', 'Seaborn', 'Linear Regression', 'Logistic Regression'],
        demo: 'https://github.com/jeelptl2005/DATA-SCIENCE/blob/main/Customer%20Purchase%20Prediction%20%26%20Sales%20Forecasting%20System%20for%20E-Commerce/Sales.ipynb',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/Customer%20Purchase%20Prediction%20%26%20Sales%20Forecasting%20System%20for%20E-Commerce',
    },
    {
        num: '06',
        title: 'BMI Calculator',
        year: '2026',
        desc: 'Simple and responsive BMI calculator built with React.',
        tech: ['React', 'CSS'],
        demo: 'https://bmi-calc-neon-nu.vercel.app/',
        code: 'https://github.com/jeelptl2005/bmicalculator',
    },
    {
        num: '07',
        title: 'Supply Chain Analytics',
        year: '2026',
        desc: 'End-to-end supply chain analysis on 172K+ orders — predicting late delivery risk using Random Forest.',
        tech: ['Pandas', 'Scikit-learn', 'SMOTE', 'Random Forest', 'Seaborn'],
        demo: 'https://github.com/jeelptl2005/DATA-SCIENCE/blob/main/Supply%20Chain%20Analysis/SupplyChain.ipynb',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/Supply%20Chain%20Analysis',
    },
    {
        num: '08',
        title: 'House Price Predictor',
        year: '2026',
        desc: 'ML-powered app predicting house sale prices from property features like quality, area, and garage capacity, with per-feature price impact breakdown.',
        tech: ['React', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'ElasticNet Regression'],
        demo: 'https://jp-housepricepredictor.vercel.app',
        code: 'https://github.com/jeelptl2005/DATA-SCIENCE/tree/main/HousePred',
    },
];

function ProjectCard({ project, index, isInView }) {
    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
            <div className="card-top">
                <span className="card-num">{project.num}</span>
                <span className="card-year">{project.year}</span>
            </div>
            <h3 className="card-title">{project.title}</h3>
            <p className="card-desc">{project.desc}</p>
            <div className="card-tech">
                {project.tech.slice(0, 4).map(t => (
                    <span className="tech-tag" key={t}>{t}</span>
                ))}
                {project.tech.length > 4 && (
                    <span className="tech-tag more">+{project.tech.length - 4}</span>
                )}
            </div>
            <div className="card-links">
                <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                    whileHover={{ gap: 10 }}
                >
                    <i className="fas fa-external-link-alt" /> Demo
                </motion.a>
                <motion.a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                    whileHover={{ gap: 10 }}
                >
                    <i className="fab fa-github" /> Code
                </motion.a>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.1, once: true });

    return (
        <section id="projects" className="section projects-section">
            <div className="section-header">
                <span className="section-number">02.</span>
                <h2 className="section-title">Featured Projects</h2>
                <div className="title-line" />
            </div>
            <div className="projects-grid" ref={ref}>
                {projects.map((p, i) => (
                    <ProjectCard key={p.num} project={p} index={i} isInView={isInView} />
                ))}
            </div>
        </section>
    );
}
