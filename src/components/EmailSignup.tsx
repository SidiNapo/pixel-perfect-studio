import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-5 py-3.5 w-full sm:w-72 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-200"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-3.5 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-200 whitespace-nowrap"
      >
        Join waitlist
      </motion.button>
    </form>
  );
}
