// src\MailForm.jsx

import { useState } from 'react';
import "../index.css"; 

function MailForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmissionStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            handleSendEmail();
        } else {
            setSubmissionStatus('Please fill out all fields.');
        }
    };

    const handleSendEmail = () => {
        const subject = encodeURIComponent('Contact Form Submission');
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Message: ${formData.message}`
        );

        window.location.href = `mailto:thiru2005v@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className='contact-us'>
            <h1>Contact Us</h1>
            <div className="contacts">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                {submissionStatus && <p>{submissionStatus}</p>}
            </div>

            {/* Contact Information Section */}
            <div className='info'>
                <div className='phone'>
                    <p>Call</p>
                    <h2>+91 1234567890</h2>
                </div>
                <div className='email'>
                    <p>E-mail</p>
                    <h2>mail@traverse.in</h2>
                </div>
            </div>
        </div>
    );
}

export default MailForm;
