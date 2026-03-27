import React from "react";
import { motion } from "framer-motion";

const categories = [
  { title: "Web", items: ["React", "TypeScript", "JavaScript"] },
  { title: "Mobile", items: ["Android (Java,Kotlin)", "iOS", "React Native"] },
  { title: "Backend", items: ["Ruby on Rails", "Scala"] },
  {
    title: "DevOps & Testing",
    items: ["Jenkins", "CI/CD Pipelines", "Cypress"],
  },
  {
    title: "AI & Developer Tools",
    items: ["GitHub Copilot", "ChatGPT", "Claude AI", "Cursor"],
  },
  { title: "Concepts", items: ["Microservices", "REST APIs"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6"
        >
          Skills
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-4 rounded-lg"
            >
              <div className="font-semibold mb-2">{cat.title}</div>
              <div className="flex flex-col gap-2">
                {cat.items.map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>{i}</div>
                    <div className="w-24 h-2 bg-white/6 rounded-md overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{
                          width: Math.floor(60 + Math.random() * 35) + "%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
