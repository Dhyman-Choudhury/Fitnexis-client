import { motion } from 'framer-motion';
import aboutImg from '../../../assets/about/about.jpg'; // Replace with your actual image path

const About = () => {
    return (
        <section className="py-10 bg-[#1f2f4b] rounded-xl">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={aboutImg}
                        alt="About our fitness center"
                        className="rounded-xl shadow-lg"
                    />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
                        About <span className="text-sky-400">FitNexis</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                        FitNexis is more than just a gym — it's a wellness community dedicated to helping you achieve your health goals. With expert trainers, modern equipment, and a supportive environment, we ensure you get the best fitness experience.
                    </p>
                    <p className="text-gray-300">
                        From strength training and cardio classes to personalized nutrition plans and group motivation, FitNexis is here to transform your lifestyle — one rep at a time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
