import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring'; // Import React Spring

const founders = [
{
name: 'Dian Pramudya',
photo: 'https://randomuser.me/api/portraits/men/32.jpg', // Replace with actual custom photo URL or local import
title: 'Co-Founder & CEO',
bio: 'Visionary leader passionate about mental health and technology.',
},
{
name: 'Maya Putri',
photo: 'https://randomuser.me/api/portraits/women/44.jpg',
title: 'Co-Founder & CTO',
bio: 'Technical expert driving innovation and user experience.',
},
{
name: 'Andi Wijaya',
photo: 'https://randomuser.me/api/portraits/men/56.jpg',
title: 'Co-Founder & Product Lead',
bio: 'Focused on crafting intuitive journaling tools and features.',
},
{
name: 'Dian Pramudya',
photo: 'https://randomuser.me/api/portraits/men/32.jpg', // Replace with actual custom photo URL or local import
title: 'Co-Founder & CEO',
bio: 'Visionary leader passionate about mental health and technology.',
},
{
name: 'Maya Putri',
photo: 'https://randomuser.me/api/portraits/women/44.jpg',
title: 'Co-Founder & CTO',
bio: 'Technical expert driving innovation and user experience.',
},
{
name: 'Andi Wijaya',
photo: 'https://randomuser.me/api/portraits/men/56.jpg',
title: 'Co-Founder & Product Lead',
bio: 'Focused on crafting intuitive journaling tools and features.',
},
];

const AboutUs = () => {
return (
<div className="flex flex-col min-h-screen">
    <Navbar />

    <main className="flex-1 bg-white text-gray-700">
    <div className="mt-20 max-w-[1200px] mx-auto px-6 pt-16 pb-20">
        {/* Hero Section */}
        <motion.section
        className="mb-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto">About Us</h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-500">We are dedicated to providing powerful and elegant tools to help you track your mood and journal your daily experiences with ease.</p>
        </motion.section>

        {/* Our Mission */}
        <motion.section
        className="mb-20 bg-white rounded-3xl shadow-md p-10 max-w-4xl mx-auto"
        whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.3 }}
        >
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-base leading-relaxed text-gray-600">
            Our mission is to empower individuals to improve their mental well-being and self-awareness through intuitive and thoughtfully designed journaling tools. We want to create a safe and inspiring space for personal growth.
        </p>
        </motion.section>

        {/* What We Offer */}
        <motion.section
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        >
        <motion.div
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 stroke-current text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true" role="img">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-2-8h2m-8 8H7m2-4H7" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Mood Tracking</h3>
            <p className="text-gray-600">Quickly log your mood with simple emojis and get a visual history of your emotional journey.</p>
        </motion.div>

        <motion.div
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 stroke-current text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true" role="img">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7h-4a4 4 0 00-4 4v4h12v-4a4 4 0 00-4-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v5m4-5v5M8 15v5" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Daily Journals</h3>
            <p className="text-gray-600">Write freely about your thoughts and feelings with our clean and distraction-free journal interface.</p>
        </motion.div>

        <motion.div
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center"
            whileHover={{ scale: 1.1, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 stroke-current text-gray-900" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true" role="img">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16h10M7 12h10M7 8h10M5 20h14a2 2 0 002-2v-8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Insightful History</h3>
            <p className="text-gray-600">Review your past journal entries and mood ratings to better understand your emotional patterns.</p>
        </motion.div>
        </motion.section>

        {/* Founders Section */}
        <motion.section
        className="mb-20 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Meet the Founders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} />
            ))}
        </div>
        </motion.section>
    </div>
    </main>

    <Footer />
</div>
);
};

const FounderCard = ({ founder }) => {
const [hovered, setHovered] = React.useState(false);

const springProps = useSpring({
scale: hovered ? 1.1 : 1,
shadow: hovered ? "0px 5px 20px rgba(0, 0, 0, 0.3)" : "0px 2px 5px rgba(0, 0, 0, 0.1)",
config: { mass: 1, tension: 280, friction: 60 }, // Adjust for different spring effect
});

return (
<animated.div
    className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center"
    style={springProps}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
>
    <img src={founder.photo} alt={founder.name} className="w-36 h-36 rounded-full object-cover mb-6 shadow-md" loading="lazy" />
    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{founder.name}</h3>
    <p className="text-blue-900 font-medium mb-3">{founder.title}</p>
    <p className="text-gray-600 max-w-xs mx-auto">{founder.bio}</p>
</animated.div>
);
};

export default AboutUs;
