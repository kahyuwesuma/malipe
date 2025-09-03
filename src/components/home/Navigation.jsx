"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAutoTranslate } from "../translate/useAutoTranslate";

const stats = [
  {
    value: 8414,
    suffix: " Kali",
    title: "Penyu Betina Bertelur",
    desc: "Malipé membantu para penyu betina bertelur agar populasi mereka terus bertambah",
  },
  {
    value: 513230,
    suffix: "",
    title: "Melepas Tukik",
    desc: "Malipé telah melepaskan tukik ke habitatnya agar mereka bisa berkembang biak secara alami",
  },
  {
    value: 2392,
    suffix: "",
    title: "Mengedukasi Peserta",
    desc: "Malipé telah memberikan edukasi penyu kepada para peserta",
  },
];

// Komponen CountUp sederhana (JSX versi)
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor((duration * 1000) / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration * 60));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Navigation = () => {
  return (
    <section className="px-6 sm:px-10 lg:px-20 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-14"
        >
          {useAutoTranslate("Hingga Saat Ini")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0, 102, 255, 0.15)",
              }}
              className="p-8 bg-white rounded-2xl shadow-md border border-zinc-100 flex flex-col items-center text-center transition-all"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
                <CountUp end={item.value} suffix={item.suffix} />
              </span>
              <h3 className="text-lg sm:text-xl font-semibold mt-4 text-zinc-800">
                {useAutoTranslate(item.title)}
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 mt-3">
                {useAutoTranslate(item.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navigation;
