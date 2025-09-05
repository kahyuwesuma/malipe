"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    value: 8414,
    label: "Penyu Betina Bertelur",
    desc: "Malipé membantu para penyu betina bertelur agar populasi mereka terus bertambah",
  },
  {
    value: 513230,
    label: "Melepas Tukik",
    desc: "Malipé telah melepaskan tukik ke habitatnya agar mereka bisa berkembang biak secara alami",
  },
  {
    value: 2392,
    label: "Mengedukasi Peserta",
    desc: "Malipé telah memberikan edukasi penyu kepada para peserta",
  },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime;
    const duration = 2000; // durasi animasi 2 detik

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-bold text-blue-600">
      {count.toLocaleString()}
    </span>
  );
};


const Navigation = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold mb-12"
        >
          Hingga Saat Ini
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300"
            >
              <Counter target={item.value} />
              <h3 className="mt-2 text-lg font-semibold">{item.label}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navigation;
