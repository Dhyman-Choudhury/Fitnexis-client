import { Dumbbell, HeartPulse, Users } from 'lucide-react'; // You can use Lucide or HeroIcons
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Personal Training',
    description: 'Get 1-on-1 coaching from certified professionals who guide your workouts and track your progress.',
    icon: <Dumbbell className="w-10 h-10 text-sky-500" />,
  },
  {
    title: 'Community Support',
    description: 'Join a supportive fitness community. Attend group classes, compete in challenges, and stay motivated.',
    icon: <Users className="w-10 h-10 text-sky-500" />,
  },
  {
    title: 'Health Monitoring',
    description: 'Track your heart rate, calories, and steps with our integrated monitoring system for better insights.',
    icon: <HeartPulse className="w-10 h-10 text-sky-500" />,
  },
  // 🔽 Add these 3 below
  {
    title: 'Diet & Nutrition Plans',
    description: 'Personalized meal plans and guidance from certified dietitians to help you stay on track with your goals.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v10m-6 0h12" /></svg>,
  },
  {
    title: 'Flexible Schedules',
    description: 'Train at your own pace with a variety of class timings and flexible membership options tailored to your routine.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" /></svg>,
  },
  {
    title: 'Mobile App Integration',
    description: 'Access workouts, progress, schedules, and support all through our powerful mobile app.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16h10M7 8h10M7 12h4m5 8H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>,
  },
];


const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-200">
      <h2 className='text-4xl font-bold text-center mb-10'>Featured Section</h2>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why <span className="text-sky-400">Choose</span> Us?
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover the key features that make FitNexis your go-to destination for fitness, wellness, and community.
        </motion.p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
