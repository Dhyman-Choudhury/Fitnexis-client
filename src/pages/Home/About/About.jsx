import { motion } from 'framer-motion';
import aboutImg from '../../../assets/about/about.jpg'; // Replace with your actual image path

const About = () => {
    return (
        <section className="py-10 my-10 bg-[#1f2f4b] rounded-xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-100 text-center">
                About <span className="text-sky-400">FitNexis</span>
            </h2>
            <div className=" mx-auto px-4 grid md:grid-cols-2 gap-5 md:gap-10 items-center">

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

                    <p className="text-gray-300 text-lg mb-4 leading-relaxed text-justify">
                        FitNexis is more than just a gym — it's a wellness community dedicated<br />
                        to helping you achieve your health goals. With expert trainers, modern<br />
                        equipment, and a supportive environment, we ensure you get the best<br />
                        fitness experience. Whether you're starting your journey or pushing past<br />
                        plateaus, our team provides the guidance you need to grow stronger<br />
                        every day. We believe fitness is not just about workouts — it's about<br />
                        building confidence, discipline, and lifelong habits.
                    </p>
                    <p className="text-gray-300 text-justify">
                        From strength training and cardio classes to personalized nutrition plans<br />
                        and group motivation, FitNexis is here to transform your lifestyle — one<br />
                        rep at a time. Stay inspired, stay focused, and become the best version<br />
                        of yourself with a community that supports every step.
                    </p>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
