import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null);
    const [msg, setMsg] = useState('');

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Backend URL from env variable
            const API_URL = process.env.REACT_APP_API_URL
                ? `${process.env.REACT_APP_API_URL}/api/contact`
                : 'http://localhost:5000/api/contact';

            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMsg(data.message || 'Message sent successfully!');
                setForm({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
                setMsg(data.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('error');
            setMsg('Network error. Please try again later.');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };
    const formVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="section-header">
                <span className="section-number">05.</span>
                <h2 className="section-title">Get In Touch</h2>
                <div className="title-line" />
            </div>

            <motion.div
                className="contact-content"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
            >
                <motion.div variants={itemVariants} className="contact-info">
                    <p className="contact-intro">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        Feel free to reach out — I'd love to connect!
                    </p>
                    <div className="contact-details">
                        <motion.div className="contact-item" whileHover={{ x: 5 }}>
                            <div className="contact-icon"><i className="fas fa-envelope" /></div>
                            <div><h4>Email</h4><p>jeelptl2005@gmail.com</p></div>
                        </motion.div>
                        <motion.div className="contact-item" whileHover={{ x: 5 }}>
                            <div className="contact-icon"><i className="fas fa-phone" /></div>
                            <div><h4>Phone</h4><p>+91 9313464150</p></div>
                        </motion.div>
                        <motion.div className="contact-item" whileHover={{ x: 5 }}>
                            <div className="contact-icon"><i className="fas fa-map-marker-alt" /></div>
                            <div><h4>Location</h4><p>Gujarat, India</p></div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div variants={formVariants} className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} required disabled={status === 'loading'} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required disabled={status === 'loading'} />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                            style={{ width: '100%', justifyContent: 'center' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === 'loading' ? (
                                <><i className="fas fa-spinner fa-spin" /> Sending...</>
                            ) : (
                                <><span>Send Message</span><i className="fas fa-paper-plane" /></>
                            )}
                        </motion.button>
                    </form>

                    {status && status !== 'loading' && (
                        <motion.div
                            className={`form-message ${status}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <i className={`fas ${status === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} />
                            {msg}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}
