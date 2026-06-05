import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Resume.css';

export default function Resume() {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.1, once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    // Handle PDF download
    const handleDownload = () => {
        const pdfUrl = '/JeelResume.pdf'; // Put PDF in public folder, not assets
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Jeel_Patel_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="resume" className="section resume-section">
            <div className="section-header">
                <span className="section-number">04.</span>
                <h2 className="section-title">Resume</h2>
                <div className="title-line" />
            </div>

            <motion.div
                className="resume-content"
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Experience */}
                <motion.div variants={itemVariants} className="resume-column">
                    <h3 className="resume-column-title">
                        <i className="fas fa-briefcase" /> Experience
                    </h3>
                    <motion.div
                        className="resume-item"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="resume-year">2026 – Present</div>
                        <h4 className="resume-title">Data Science Intern</h4>
                        <p className="resume-company">CodVeda Technologies</p>
                        <p className="resume-description">
                            Currently applying analytical skills and Python expertise to real-world data challenges.
                            Working on data cleaning, exploratory data analysis, and building predictive models.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Education */}
                <motion.div variants={itemVariants} className="resume-column">
                    <h3 className="resume-column-title">
                        <i className="fas fa-graduation-cap" /> Education
                    </h3>
                    <motion.div
                        className="resume-item"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="resume-year">2024 – 2028</div>
                        <h4 className="resume-title">B.Tech in Computer Science and Engineering</h4>
                        <p className="resume-company">Parul University</p>
                        <p className="resume-description">
                            Focused on software engineering, data analytics, machine learning, and database management.
                            Current CGPA: 8.5/10
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="resume-download"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <motion.button
                    onClick={handleDownload}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <i className="fas fa-download" />
                    <span>Download CV</span>
                </motion.button>
            </motion.div>
        </section>
    );
}