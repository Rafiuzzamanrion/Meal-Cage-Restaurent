import { Helmet } from "react-helmet-async";
import { FaPhone } from "react-icons/fa";
import { FaBug, FaNewspaper } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const message = messageRef.current.value.trim();

        if (!name || !email || !message) {
            toast.warning('All fields are required!', { theme: "dark" });
            return;
        }

        setSending(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contact`, { name, email, message });
            toast.success("Message sent successfully!", { theme: "dark" });
            e.target.reset();
        } catch (err) {
            toast.error(err.message || 'Something went wrong!', { theme: "dark" });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 pt-24 pb-12 rounded-t-xl transition-all">
            <Helmet>
                <title>MealCage | Contact</title>
            </Helmet>
            <div className="container mx-auto px-4 lg:px-12">

                <section className="mb-20">

                    <div className="flex justify-center mb-16"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="800">
                        <div className="text-center w-full max-w-2xl bg-dark-800/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-widest uppercase text-light mb-4">
                                Get In <span className="text-primary italic">Touch</span>
                            </h2>
                            <p className="font-sans text-light/70 text-sm md:text-base tracking-wide leading-relaxed">
                                We'd love to hear from you. Whether you have a question about our menu, reservations, or anything else, our team is ready to answer all your questions.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-20 justify-center">

                        {/* Form Section */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full lg:w-5/12 bg-dark-800 p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl shadow-black/50"
                            data-aos="fade-right"
                            data-aos-easing="linear"
                            data-aos-duration="800">

                            <h3 className="text-3xl font-serif text-light mb-8 border-b border-white/10 pb-4">Send Message</h3>

                            <div className="mb-6 w-full">
                                <label className="block font-sans tracking-wide mb-2 text-light/80 text-sm" htmlFor="contact-name">
                                    Your Name
                                </label>
                                <input ref={nameRef} type="text" className="w-full bg-dark-900/50 border border-white/10 rounded-md px-4 py-3 text-light outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" id="contact-name" placeholder="John Doe" required />
                            </div>

                            <div className="mb-6 w-full">
                                <label className="block font-sans tracking-wide mb-2 text-light/80 text-sm" htmlFor="contact-email">
                                    Email Address
                                </label>
                                <input ref={emailRef} type="email" className="w-full bg-dark-900/50 border border-white/10 rounded-md px-4 py-3 text-light outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans" id="contact-email"
                                    placeholder="john@example.com" required />
                            </div>

                            <div className="mb-8 w-full">
                                <label className="block font-sans tracking-wide mb-2 text-light/80 text-sm" htmlFor="contact-message">
                                    Message
                                </label>
                                <textarea ref={messageRef} className="w-full bg-dark-900/50 border border-white/10 rounded-md px-4 py-3 text-light outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans h-32 resize-none" id="contact-message" placeholder="How can we help you?" required></textarea>
                            </div>

                            <button type="submit" disabled={sending}
                                className="w-full btn btn-outline rounded-none border-primary text-primary hover:bg-primary hover:text-dark-900 font-sans tracking-widest transition-all duration-300 py-3 uppercase">
                                {sending ? <span className="loading loading-spinner loading-sm" /> : 'Send Inquiry'}
                            </button>

                        </form>

                        {/* Contact Info Section */}
                        <div className="w-full lg:w-6/12 flex flex-col justify-center"
                            data-aos="fade-left"
                            data-aos-easing="linear"
                            data-aos-duration="800">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="group">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dark-800 border border-white/5 text-primary shadow-lg group-hover:bg-primary group-hover:text-dark-900 transition-colors duration-300">
                                                <FaPhone size={22} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow pt-1">
                                            <p className="mb-2 font-serif text-xl text-light tracking-wide">Reservations</p>
                                            <p className="text-light/60 font-sans text-sm tracking-wide mb-1">bookings@mealcage.com</p>
                                            <p className="text-primary font-sans tracking-widest font-bold">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dark-800 border border-white/5 text-primary shadow-lg group-hover:bg-primary group-hover:text-dark-900 transition-colors duration-300">
                                                <RiCustomerServiceFill size={24} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow pt-1">
                                            <p className="mb-2 font-serif text-xl text-light tracking-wide">Private Events</p>
                                            <p className="text-light/60 font-sans text-sm tracking-wide mb-1">events@mealcage.com</p>
                                            <p className="text-primary font-sans tracking-widest font-bold">+1 (555) 987-6543</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dark-800 border border-white/5 text-primary shadow-lg group-hover:bg-primary group-hover:text-dark-900 transition-colors duration-300">
                                                <FaNewspaper size={22} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow pt-1">
                                            <p className="mb-2 font-serif text-xl text-light tracking-wide">Press & Media</p>
                                            <p className="text-light/60 font-sans text-sm tracking-wide mb-1">pr@mealcage.com</p>
                                            <p className="text-primary font-sans tracking-widest font-bold">+1 (555) 246-8135</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dark-800 border border-white/5 text-primary shadow-lg group-hover:bg-primary group-hover:text-dark-900 transition-colors duration-300">
                                                <FaBug size={22} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow pt-1">
                                            <p className="mb-2 font-serif text-xl text-light tracking-wide">Tech Support</p>
                                            <p className="text-light/60 font-sans text-sm tracking-wide mb-1">support@mealcage.com</p>
                                            <p className="text-primary font-sans tracking-widest font-bold">Online Only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;