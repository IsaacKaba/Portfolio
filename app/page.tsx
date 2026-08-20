'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";

// --- Effet Machine à Écrire ---
function Typewriter({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 150);
    } else if (!isDeleting && displayText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, 80);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text]);

  return (
    <span className="inline-block text-emerald-900 font-extrabold">
      {displayText}
      <span className="animate-pulse text-emerald-600 ml-1">|</span>
    </span>
  );
}

// --- Fond interactif : Grandes formes pastel sur fond sable ---
function LargeShapesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // 8 très grandes formes géométriques douces
    const shapes = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 80 + 100,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.002,
      type: Math.floor(Math.random() * 3),
      color: [
        "rgba(167, 182, 162, 0.18)", // Vert sauge
        "rgba(212, 180, 150, 0.22)", // Sable chaud
        "rgba(180, 160, 140, 0.15)", // Taupe doux
        "rgba(143, 163, 148, 0.15)", // Mousse
      ][Math.floor(Math.random() * 4)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        if (s.x < -s.radius * 2) s.x = canvas.width + s.radius * 2;
        if (s.x > canvas.width + s.radius * 2) s.x = -s.radius * 2;
        if (s.y < -s.radius * 2) s.y = canvas.height + s.radius * 2;
        if (s.y > canvas.height + s.radius * 2) s.y = -s.radius * 2;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = s.color;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 3;

        if (s.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, s.radius * 1.2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.roundRect(-s.radius, -s.radius, s.radius * 2, s.radius * 2, 40);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

// --- Données des Projets ---
type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  reportUrl?: string; 
};

const PROJECTS: Project[] = [
  {
    id: "ocr-c-crossword",
    title: "OCR & Crossword Solver (C / GTK)",
    description:
      "A C-based Optical Character Recognition pipeline combined with an automated solver to resolve crossword puzzles. Features a custom neural network trained for character detection and a GTK graphical interface.",
    tags: ["C", "Neural Network", "GTK", "Image Processing", "Team Project"],
    image: "/ocr-image.webp",
    githubUrl: "https://github.com/bedcheck/OCR-Crosswords",
    reportUrl: "/technical-report-ocr-(french).pdf",
  },
  {
    id: "ml-stock-predictor",
    title: "ML Stock Market Predictor & Backtester",
    description:
      "Developed an end-to-end Machine Learning pipeline using Python and XGBoost to predict stock market directional trends. Integrated real-time financial data collection via yfinance, feature engineering with technical indicators, custom backtesting suite. Solo Project",
    tags: ["Feature Engineering", "Python", "XGBoost", "yfinance", "Backtesting"],
    image: "/results.webp",
    githubUrl: "https://github.com/IsaacKaba/ML-Stock-Prediction",
  },
  {
    id: "samurai-soul",
    title: "Samourai Soul (C# / Unity)",
    description:
      "A 2D action game developed in C# with Unity. Embark as a legendary samurai fighting dark forces featuring Solo/Co-op modes, a Save System, Leaderboard, Boss Fights, and Pixel Art graphics across 3 distinct levels.",
    tags: ["C#", "Unity", "2D Game Dev", "Pixel Art", "Game Design"],
    image: "/samourai-image.jpg",
    githubUrl: "https://github.com/raon2006/Samourai-soul",
  },
];

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "in-groupe",
    role: "Software Engineer Intern",
    company: "IN Groupe",
    period: "Jun 2025 - Aug 2025 · 3 mos",
    location: "Île-de-France, France · On-site",
    bullets: [
      "Developed automated test scripts using Python.",
      "Improved testing efficiency by reducing manual workload.",
      "Led a testing campaign to ensure the software functions correctly prior to delivery.",
    ],
    tags: ["Python", "Jira", "Test Automation", "QA Testing", "Agile"],
  },
  {
    id: "bafa-animator",
    role: "Youth Counselor & Animator (Ages 3–11)",
    company: "Local Youth Centers & Leisure Camps",
    period: "BAFA Certified",
    bullets: [
      "Supervised, animated, and managed daily groups of children aged 3 to 11 years old.",
      "Designed fun, educational activities while ensuring the physical and emotional safety of the children.",
      "Developed a strong sense of responsibility, stress management, and teamwork.",
    ],
    tags: ["BAFA", "Leadership", "Group Management", "Communication", "Pedagogy"],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#EFECE6] text-stone-800 antialiased scroll-smooth">
      {/* Arrière-plan grandes formes */}
      <LargeShapesBackground />

      {/* Navigation haut à droite */}
      <header className="fixed top-0 right-0 p-6 z-50 flex gap-3">
        <a
          href="#"
          className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 bg-[#E5E1D8]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-300/80 hover:border-stone-400 transition duration-300 shadow-sm"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 bg-[#E5E1D8]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-300/80 hover:border-stone-400 transition duration-300 shadow-sm"
        >
          About me
        </a>
        <a
          href="#experience"
          className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 bg-[#E5E1D8]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-300/80 hover:border-stone-400 transition duration-300 shadow-sm"
        >
          Experience
        </a>
        <a
          href="#projects"
          className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 bg-[#E5E1D8]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-300/80 hover:border-stone-400 transition duration-300 shadow-sm"
        >
          Projects
        </a>
        {/* Bouton Contact Email dans la nav */}
        <a
          href="mailto:isaackaba09@gmail.com"
          className="text-sm font-medium tracking-wide text-emerald-900 hover:text-emerald-950 bg-emerald-200/80 hover:bg-emerald-300/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-emerald-300/80 transition duration-300 shadow-sm flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Contact
        </a>
      </header>

      {/* Section Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900">
            Hello, I am <Typewriter text="Isaac Kaba." />
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-emerald-800">
            Computer Engineering Student @ EPITA
          </p>

          <p className="text-stone-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-normal">
            Passionate about Tech & Finance.{" "}
            <a
              href="#about"
              className="text-emerald-800 font-medium underline underline-offset-4 hover:text-emerald-950 transition"
            >
              Learn more about me
            </a>
          </p>
          {/* Réseaux sociaux & Email */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <a
              href="mailto:ton.email@epita.fr"
              className="text-stone-600 hover:text-emerald-800 transition transform hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/isaac-kaba-7616332b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-emerald-800 transition transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a
              href="https://github.com/IsaacKaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-emerald-800 transition transform hover:scale-110"
              aria-label="GitHub"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section About Me */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-stone-900 border-b border-stone-300/60 pb-4">
            About Me
          </h2>

          <div className="p-8 rounded-2xl bg-[#E2DEC8]/60 backdrop-blur-md border border-stone-300/80 shadow-sm space-y-6 text-stone-700 leading-relaxed">
            <p className="text-base sm:text-lg">
              I’m a <strong className="text-stone-900 font-semibold">Computer Engineering student at EPITA</strong> (currently in my 3rd year of a 5-year program) passionate about the intersection of technology and finance. I focus on turning complex technical challenges into clean, efficient solutions .
            </p>

            <p className="text-base sm:text-lg">
              Outside of software engineering, my experience as a certified youth counselor (<strong className="text-stone-900 font-semibold">BAFA</strong>) taught me clear communication, team adaptability, and how to stay composed under pressure.
            </p>

            <p className="text-base sm:text-lg">
              When I’m not coding, I stay active. I’m big on sports, regularly playing basketball, hitting the gym, and running (currently training for the <strong className="text-stone-900 font-semibold">Paris 10K</strong>).
            </p>

            {/* Badges / Quick Highlights */}
            <div className="pt-4 flex flex-wrap gap-3 border-t border-stone-300/60">
              <span className="text-xs font-mono font-medium bg-[#D8D2C2] text-stone-800 px-3 py-1.5 rounded-lg border border-stone-300/80">
                📍 France
              </span>
              <span className="text-xs font-mono font-medium bg-[#D8D2C2] text-stone-800 px-3 py-1.5 rounded-lg border border-stone-300/80">
                🎓 EPITA (3rd Year / 5-Year Program)
              </span>
              <span className="text-xs font-mono font-medium bg-[#D8D2C2] text-stone-800 px-3 py-1.5 rounded-lg border border-stone-300/80">
                🏃‍♂️ Paris 10K Prep
              </span>
              <span className="text-xs font-mono font-medium bg-[#D8D2C2] text-stone-800 px-3 py-1.5 rounded-lg border border-stone-300/80">
                🏀 Basketball & Gym
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Expériences */}
      <section id="experience" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-stone-900 border-b border-stone-300/60 pb-4">
            Experience
          </h2>

          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <article
                key={exp.id}
                className="p-6 rounded-2xl bg-[#E2DEC8]/60 backdrop-blur-md border border-stone-300/80 hover:border-emerald-700/40 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-semibold text-xl text-stone-900">
                    {exp.role} <span className="text-emerald-800 font-normal">· {exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-stone-500 bg-[#D8D2C2] px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>

                {exp.location && (
                  <p className="text-xs text-stone-500 mt-1 font-medium">{exp.location}</p>
                )}

                <ul className="mt-4 space-y-2 text-sm text-stone-700 list-disc list-inside">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="text-stone-700">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-5 text-xs font-mono">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#D8D2C2] text-stone-800 font-medium px-2.5 py-1 rounded-md border border-stone-300/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-stone-900 border-b border-stone-300/60 pb-4">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl bg-[#E2DEC8]/60 backdrop-blur-md border border-stone-300/80 hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                {project.image && (
                  <div className="relative w-full h-48 bg-stone-200/50 overflow-hidden border-b border-stone-300/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-stone-900 group-hover:text-emerald-900 transition">
                        {project.title}
                      </h3>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-stone-900 transition ml-2"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Zone de la Tech Stack + Bouton Technical Report compact à côté */}
                  <div className="flex flex-wrap items-center gap-2 mt-6 text-xs font-mono">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#D8D2C2] text-stone-800 font-medium px-2.5 py-1 rounded-md border border-stone-300/80"
                      >
                        {tag}
                      </span>
                    ))}

                    {/* Bouton Technical Report PDF compact */}
                    {project.reportUrl && (
                      <a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-900 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200/90 px-2.5 py-1 rounded-md border border-emerald-300/80 transition duration-200"
                      >
                        📄 Technical Report (PDF)
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}