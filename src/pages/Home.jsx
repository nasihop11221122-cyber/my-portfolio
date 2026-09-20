import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Mail, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Cut-corner "badge" shape used for the hero photo — distinct from the
   plain circle used in the About section. */
const OCTAGON_CLIP =
  "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)";

/* =============================================================
   STATIC CONTENT
============================================================= */

const MARQUEE_ITEMS = [
  "REACT",
  "NODE.JS",
  "EXPRESS",
  "MONGODB",
  "JAVASCRIPT",
  "TAILWIND",
  "GSAP",
  "REST APIS",
  "GRAPHQL",
  "DOCKER",
];

const STATS = [
  { count: 5, suffix: "+", label: "YEARS SHIPPING" },
  { count: 47, suffix: "", label: "PROJECTS SHIPPED" },
  { count: 99, suffix: ".9%", label: "UPTIME AVG", decimal: true },
  { count: 12, suffix: "k", label: "COMMITS / YR" },
];

const SKILL_GROUPS = [
  {
    title: "FRONTEND",
    skills: [
      { name: "React / Next.js", value: 92 },
      { name: "Animation (GSAP)", value: 88 },
      { name: "CSS Architecture", value: 90 },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node / Express", value: 85 },
      { name: "MongoDB / SQL", value: 80 },
      { name: "REST / GraphQL", value: 83 },
    ],
  },
  {
    title: "TOOLING",
    skills: [
      { name: "Git / CI-CD", value: 87 },
      { name: "Docker", value: 75 },
      { name: "Testing (Jest/RTL)", value: 78 },
    ],
  },
];

const TIMELINE = [
  {
    meta: "2026 — PRESENT",
    title: "Senior Full Stack Developer, Independent",
    body: "Taking on select full-stack builds for startups that need product velocity without cutting corners on architecture.",
  },
  {
    meta: "2023 — 2026",
    title: "Full Stack Engineer, Product Team",
    body: "Owned the frontend architecture for a growing SaaS product, cutting median load time by 40% and leading the migration to a component-driven design system.",
  },
  {
    meta: "2021 — 2023",
    title: "Backend Developer",
    body: "Built and maintained REST APIs serving over 200k monthly active users, with a focus on database performance and horizontal scaling.",
  },
  {
    meta: "2020 — 2021",
    title: "Junior Developer",
    body: "Cut my teeth on internal tooling — the unglamorous work that teaches you more about real-world constraints than any tutorial does.",
  },
];

const PROJECTS = [
  {
    idx: "ENTRY_01",
    title: "Realtime Dashboard",
    summary:
      "A live operations dashboard built for internal ops teams tracking system health across microservices.",
    details:
      "Built with React and WebSockets to stream live metrics without polling. Reduced incident detection time from ~8 minutes to under 30 seconds by surfacing anomalies directly in the UI instead of a separate alerting tool.",
    tags: ["React", "WebSockets", "D3.js", "Node"],
    // TODO: swap for a real screenshot of this project
    image: "https://picsum.photos/seed/realtime-dashboard/900/600",
    // TODO: swap for the real live URL
    link: "#",
  },
  {
    idx: "ENTRY_02",
    title: "Commerce API Layer",
    summary:
      "A headless commerce backend built to serve three different storefronts from one source of truth.",
    details:
      "Designed a GraphQL API on top of a normalized MongoDB schema, with Redis caching on hot product queries. Cut average response time by 60% under peak load during a seasonal traffic spike.",
    tags: ["GraphQL", "MongoDB", "Redis", "Express"],
    image: "https://picsum.photos/seed/commerce-api/900/600",
    link: "#",
  },
  {
    idx: "ENTRY_03",
    title: "Design System Migration",
    summary:
      "Led the migration of a legacy CSS codebase to a token-based, component-driven design system.",
    details:
      "Replaced roughly 30,000 lines of ad-hoc CSS with a shared component library, cutting new-feature styling time by half and eliminating an entire class of visual regressions across the product.",
    tags: ["React", "Storybook", "Tailwind", "Figma Tokens"],
    image: "https://picsum.photos/seed/design-system/900/600",
    link: "#",
  },
  {
    idx: "ENTRY_04",
    title: "Auth & Access Rebuild",
    summary:
      "Rebuilt an authentication system that had accumulated years of tech debt and security gaps.",
    details:
      "Replaced a homegrown session system with JWT-based auth, role-based access control, and audit logging — closing three outstanding security findings and making onboarding new permission types a config change instead of a deploy.",
    tags: ["Node", "JWT", "PostgreSQL", "RBAC"],
    image: "https://picsum.photos/seed/auth-rebuild/900/600",
    link: "#",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Scope",
    body: "Understand the real constraint before writing a line of code — usually it isn't the one first mentioned.",
  },
  {
    num: "02",
    title: "Architect",
    body: "Design the system boundaries first. Most bugs later are architecture decisions made too late.",
  },
  {
    num: "03",
    title: "Build",
    body: "Ship in small, reviewable increments. Big-bang releases are where confidence goes to die.",
  },
  {
    num: "04",
    title: "Refine",
    body: "The last 10% — performance, edge cases, polish — is usually where the actual craft lives.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "\u201cRK was the first engineer on our team who could move between frontend polish and backend architecture without a context switch. That's rarer than it should be.\u201d",
    name: "Maya Jensen",
    role: "Product Lead, Northbeam",
    initials: "MJ",
  },
  {
    quote:
      "\u201cWe came in needing a fast fix and left with a system that actually made sense. The documentation alone saved us weeks later.\u201d",
    name: "Daniel Cho",
    role: "CTO, Fieldwire Labs",
    initials: "DC",
  },
  {
    quote:
      "\u201cCommunicated trade-offs clearly at every step instead of just disappearing into the code. That made the whole project much lower-stress.\u201d",
    name: "Priya Nair",
    role: "Founder, Loomstack",
    initials: "PN",
  },
];

const FAQS = [
  {
    q: "What's your usual project timeline?",
    a: "Depends heavily on scope, but a typical mid-sized feature build runs 3–6 weeks from kickoff to ship, including a review buffer. Larger rebuilds get broken into phases so there's always something shippable.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Most of my work is exactly that. I usually spend the first few days just reading — understanding the existing constraints — before proposing changes.",
  },
  {
    q: "What if requirements change mid-project?",
    a: "They usually do. I build in short, reviewable cycles specifically so a shift in direction costs days, not months.",
  },
  {
    q: "Do you take on retainer work?",
    a: "Yes, for a limited number of clients at a time — reach out via the contact form and I'll let you know current availability.",
  },
];


/* =============================================================
   SMALL HELPERS
============================================================= */

function glitchReveal(el, finalHTML) {
  if (!el) return;
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const lines = finalHTML.split("<br>");
  let frame = 0;
  const totalFrames = 18;
  const interval = setInterval(() => {
    frame++;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.innerHTML = finalHTML;
      return;
    }
    const progress = frame / totalFrames;
    el.innerHTML = lines
      .map((line) =>
        line
          .split("")
          .map((c) => {
            if (c === " ") return " ";
            return Math.random() > progress
              ? chars[Math.floor(Math.random() * chars.length)]
              : c;
          })
          .join("")
      )
      .join("<br>");
  }, 45);
  return () => clearInterval(interval);
}

/* =============================================================
   MAIN COMPONENT
============================================================= */

export default function Home() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const cursorDotRef = useRef(null);
  const headlineRef = useRef(null);

  const [openProject, setOpenProject] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [statValues, setStatValues] = useState(STATS.map(() => 0));
  const [skillFills, setSkillFills] = useState(
    SKILL_GROUPS.map((g) => g.skills.map(() => 0))
  );

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const magneticRefs = useRef([]);

  /* -----------------------------------------------------------
     PARTICLE FIELD + CURSOR + INTRO + SCROLL REVEALS
  ----------------------------------------------------------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;

      /* ---------- Particle canvas ---------- */
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      let w, h, particles = [];
      const mouse = { x: -9999, y: -9999 };
      let rafId;

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener("resize", resize);

      function seed() {
        particles = [];
        const count = Math.min(
          90,
          Math.floor((window.innerWidth * window.innerHeight) / 14000)
        );
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.6 + 0.4,
          });
        }
      }
      seed();

      function tick() {
        canvasCtx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 1.4;
            p.y += (dy / dist) * force * 1.4;
          }

          canvasCtx.beginPath();
          canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          canvasCtx.fillStyle = "rgba(58,160,255,0.75)";
          canvasCtx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              canvasCtx.beginPath();
              canvasCtx.moveTo(a.x, a.y);
              canvasCtx.lineTo(b.x, b.y);
              canvasCtx.strokeStyle = `rgba(58,160,255,${0.12 * (1 - dist / 110)})`;
              canvasCtx.lineWidth = 0.6;
              canvasCtx.stroke();
            }
          }
        }
        rafId = requestAnimationFrame(tick);
      }
      tick();


      /* ---------- Magnetic buttons (no glow, no custom cursor) ---------- */
      let cleanupPointer = () => { };
      if (isFinePointer) {
        const magnetics = magneticRefs.current.filter(Boolean);
        const magneticCleanups = magnetics.map((el) => {
          const mx = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
          const my = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });

          const move = (e) => {
            const r = el.getBoundingClientRect();
            mx((e.clientX - r.left - r.width / 2) * 0.35);
            my((e.clientY - r.top - r.height / 2) * 0.35);
          };
          const leave = () => {
            mx(0);
            my(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });

        cleanupPointer = () => {
          magneticCleanups.forEach((fn) => fn());
        };
      }

      /* ---------- Intro timeline ---------- */
      if (reduceMotion) {
        gsap.set(root, { opacity: 1 });
      } else {
        gsap.set(root, { opacity: 1 });
        gsap.set(".nav-bar", { y: -30, opacity: 0 });
        gsap.set(".terminal-line", { opacity: 0 });
        gsap.set(".lede, .cta-row, .metrics-strip", { y: 20, opacity: 0 });

        const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        introTl
          .to(".nav-bar", { y: 0, opacity: 1, duration: 0.7 })
          .to(".terminal-line", { opacity: 1, duration: 0.3 }, "-=0.2")
          .add(() =>
            glitchReveal(headlineRef.current, "RHIM KHAN")
          )
          .to(".lede", { y: 0, opacity: 1, duration: 0.6 }, "+=0.5")
          .to(".cta-row", { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
          .to(".metrics-strip", { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
      }

      /* ---------- Scroll reveals ---------- */
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.utils
        .toArray(".reveal-block")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });

      /* ---------- Stat counters ---------- */
      STATS.forEach((stat, i) => {
        ScrollTrigger.create({
          trigger: `.stat-cell-${i}`,
          start: "top 90%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.count,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                setStatValues((prev) => {
                  const next = [...prev];
                  next[i] = stat.decimal ? obj.val.toFixed(1) : Math.floor(obj.val);
                  return next;
                });
              },
            });
          },
        });
      });

      /* ---------- Skill bars ---------- */
      SKILL_GROUPS.forEach((group, gi) => {
        group.skills.forEach((skill, si) => {
          ScrollTrigger.create({
            trigger: `.skill-row-${gi}-${si}`,
            start: "top 92%",
            once: true,
            onEnter: () => {
              setSkillFills((prev) => {
                const next = prev.map((arr) => [...arr]);
                next[gi][si] = skill.value;
                return next;
              });
            },
          });
        });
      });

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(rafId);
        cleanupPointer();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* -----------------------------------------------------------
     BACK TO TOP VISIBILITY
  ----------------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  /* -----------------------------------------------------------
     FORM HANDLING
  ----------------------------------------------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = "Please enter your name.";

    if (!formData.email.trim()) {
      errors.email = "Please enter an email address.";
    } else if (!emailPattern.test(formData.email.trim())) {
      errors.email = "That email doesn't look right.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("");
    if (!validate()) return;

    setSubmitting(true);
    // Simulated async submit — wire this up to a real endpoint when ready.
    setTimeout(() => {
      setSubmitting(false);
      setFormStatus("Message received — I'll reply within 24h.");
      setFormData({ name: "", email: "", message: "" });
    }, 1400);
  };

  const setMagneticRef = (el, index) => {
    magneticRefs.current[index] = el;
  };

  /* =============================================================
     RENDER
  ============================================================= */

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#050a14] text-[#eaf1fb]"
      style={{ opacity: 0 }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50"
      />
      <div
        className="scanlines pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
      />


      <main className="relative z-[3]">
        {/* ================= NAV ================= */}
        <nav className="nav-bar fixed left-0 right-0 top-0 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[rgba(58,160,255,0.14)] bg-[#050a14]/70 px-5 py-3 font-mono text-[11px] tracking-wide text-[#eaf1fb]/55 backdrop-blur-md sm:px-8 sm:text-xs">
          <a href="#" className="flex items-center flex-shrink-0" aria-label="RK Home">
            <svg width="46" height="46" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="45" height="45" rx="10" stroke="#3aa0ff" strokeWidth="1.5" fill="rgba(58,160,255,0.06)" />
              <path d="M13 33V15h7.8c3.4 0 5.9 2.2 5.9 5.4 0 2.3-1.3 4.1-3.4 4.9L27 33h-4l-3.6-7.4h-2.6V33h-3.8z" fill="#3aa0ff" />
              <path d="M16.8 18.2v4.6h3.6c1.6 0 2.7-1 2.7-2.3s-1.1-2.3-2.7-2.3h-3.6z" fill="#050a14" />
              <path d="M28.5 33V15h3.8v7.6l6.3-7.6h4.5l-7 8.2L43.3 33h-4.6l-5.1-7.3-1.3 1.5V33h-3.8z" fill="#8b6bff" />
            </svg>
          </a>

         <div className="hidden items-center justify-center gap-7 md:flex">
  <a href="#" className="nav-link-electric">
    Home
  </a>
  <a href="#about" className="nav-link-electric">
    About
  </a>
  <a href="#skills" className="nav-link-electric">
    Skills
  </a>
  <a href="#projects" className="nav-link-electric">
    Projects
  </a>
  <a href="#contact" className="nav-link-electric">
    Contact
  </a>
</div>
           <a href="#timeline"
            className="justify-self-end flex items-center gap-1.5 rounded-full border border-[#3aa0ff] px-4 py-2 font-mono text-[11px] font-semibold text-[#3aa0ff] transition-colors hover:bg-[rgba(58,160,255,0.1)]"
          >
            MY JOURNEY
          </a>


        </nav>

        {/* ================= HERO ================= */}
        <section className="flex min-h-screen flex-col justify-center px-5 pt-28 sm:px-8 md:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[1fr_300px] lg:items-center lg:gap-16">
            <div className="w-full max-w-[980px]">


              <h1
                ref={headlineRef}
                className="mb-6 min-h-[1.1em] font-mono text-[13vw] font-extrabold leading-[0.98] tracking-tight sm:mb-8 sm:text-[11vw] md:text-[8vw] lg:text-[5.6rem]"
                style={{ textShadow: "0 0 24px rgba(58,160,255,0.15)" }}
              >
                RHIM KHAN
              </h1>

              <p className="lede mb-9 max-w-xl text-sm leading-7 text-[#eaf1fb]/55 sm:mb-11 sm:text-base md:text-lg md:leading-8">
                I build modern digital products with code, motion and carefully
                engineered interfaces — from frontend experiences to backend
                systems.
              </p>

              <div className="cta-row flex flex-wrap items-center gap-3">
                <a
                  href="#about"
                  ref={(el) => setMagneticRef(el, 0)}
                  className="flex items-center gap-2 rounded-[3px] border border-[#3aa0ff] bg-[#3aa0ff] px-5 py-3.5 font-mono text-xs font-semibold text-[#050a14] transition-colors hover:bg-[#6cc0ff] sm:px-6"
                >
                  ABOUT ME
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="#contact"
                  ref={(el) => setMagneticRef(el, 1)}
                  className="flex items-center gap-2 rounded-[3px] border border-[#3aa0ff] px-5 py-3.5 font-mono text-xs font-semibold text-[#3aa0ff] transition-colors hover:bg-[rgba(58,160,255,0.08)] sm:px-6"
                >
                  CONTACT ME
                  <Mail size={14} />
                </a>
              </div>


            </div>

            <div className="hero-photo-frame relative mx-auto h-80 w-60 flex-shrink-0 sm:h-96 sm:w-72 lg:mx-0 lg:ml-auto lg:h-[26rem] lg:w-80">
              <div
                className="hero-photo-glow absolute inset-0"
                style={{ clipPath: OCTAGON_CLIP }}
              />
              <div
                className="profile-photo-wrap absolute inset-[5px] overflow-hidden"
                style={{ clipPath: OCTAGON_CLIP }}
              >
                {/* TODO: swap for a real photo */}
                <img
                  src="https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto/IMG_0578"
                  alt="RK"
                  className="profile-img relative z-[3] h-full w-full object-cover"
                />
                <img
                  src="https://i.pravatar.cc/400?img=13"
                  alt=""
                  aria-hidden="true"
                  className="profile-img-r pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover"
                />
                <img
                  src="https://i.pravatar.cc/400?img=13"
                  alt=""
                  aria-hidden="true"
                  className="profile-img-b pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
                />
                <div className="profile-scan pointer-events-none absolute inset-0 z-[4]" />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-[1180px] items-center gap-2 font-mono text-[9px] tracking-wide text-[#eaf1fb]/25 sm:mt-14">
            <Terminal size={12} />
            SCROLL TO EXPLORE
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="overflow-hidden border-y border-[rgba(58,160,255,0.14)] py-5">
          <div
            className="flex w-max gap-8 sm:gap-12"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap font-mono text-xs text-[#eaf1fb]/30 sm:text-sm"
              >
                {item} <span className="text-[#1c6fd1]">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ================= ABOUT ================= */}
                <section id="about" className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-10 md:py-36">
          {/* ---- Ambient glow blobs ---- */}
          <div
            className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full opacity-40 blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(58,160,255,0.35), transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-30 blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(139,107,255,0.35), transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="reveal-block grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-20">
              {/* ================= LEFT — CONTENT ================= */}
              <div>
                <span className="about-typewriter mb-5 inline-block font-mono text-sm font-semibold tracking-[0.25em] text-[#1c6fd1] sm:text-base">
   ABOUT ME
</span>
                <h2 className="mb-6 text-3xl font-bold leading-[1.15] text-[#eaf1fb] sm:text-4xl md:text-[2.75rem]">
                  Turning Ideas Into{" "}
                  <span className="bg-gradient-to-r from-[#3aa0ff] to-[#8b6bff] bg-clip-text text-transparent">
                    Digital Experiences.
                  </span>
                </h2>
                <p className="mb-10 max-w-md text-sm leading-7 text-[#eaf1fb]/55 sm:text-base sm:leading-8">
                  I'm a passionate Web Developer focused on building modern,
                  responsive, and high-quality web experiences. I enjoy
                  turning ideas into clean, interactive, and user-friendly
                  digital products.
                </p>
                
                 <a href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#3aa0ff] bg-[#3aa0ff] px-6 py-3.5 font-mono text-xs font-semibold text-[#050a14] transition-all duration-300 hover:gap-3 hover:bg-[#6cc0ff]"
                >
                  VIEW MY WORK
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* ================= RIGHT — VISUAL ================= */}
              <div className="relative mx-auto h-[380px] w-full max-w-[440px] sm:h-[440px]">
                {/* Glass code-editor card */}
                <div className="about-glass-card absolute inset-0 m-auto flex h-[240px] w-[300px] flex-col overflow-hidden rounded-2xl border border-[rgba(58,160,255,0.25)] bg-[rgba(10,18,36,0.55)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:h-[270px] sm:w-[330px]">
                  <div className="flex items-center gap-1.5 border-b border-[rgba(58,160,255,0.15)] px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5d5d]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3aa0ff]/70" />
                    <span className="ml-3 font-mono text-[10px] text-[#eaf1fb]/40">dev.tsx</span>
                  </div>
                  <div className="flex-1 px-5 py-4 font-mono text-[11px] leading-6 text-[#eaf1fb]/70 sm:text-xs">
                    <div><span className="text-[#8b6bff]">const</span> <span className="text-[#3aa0ff]">build</span> = () =&gt; {"{"}</div>
                    <div className="pl-4 text-[#eaf1fb]/45">// crafting clean UI</div>
                    <div className="pl-4"><span className="text-[#3aa0ff]">return</span> &lt;<span className="text-[#8b6bff]">Experience</span> /&gt;;</div>
                    <div>{"}"}</div>
                    <div className="mt-2 inline-block h-4 w-1.5 animate-pulse bg-[#3aa0ff]" />
                  </div>
                </div>

                {/* Floating tech badges */}
                <span className="about-badge absolute left-2 top-4 rounded-full border border-[rgba(58,160,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#3aa0ff] shadow-lg backdrop-blur-sm">
                  React
                </span>
                <span className="about-badge about-badge-delay-1 absolute right-0 top-14 rounded-full border border-[rgba(139,107,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#8b6bff] shadow-lg backdrop-blur-sm">
                  Node.js
                </span>
                <span className="about-badge about-badge-delay-2 absolute -left-4 bottom-20 rounded-full border border-[rgba(58,160,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#3aa0ff] shadow-lg backdrop-blur-sm">
                  MongoDB
                </span>
                <span className="about-badge about-badge-delay-3 absolute right-2 bottom-6 rounded-full border border-[rgba(139,107,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#8b6bff] shadow-lg backdrop-blur-sm">
                  Tailwind CSS
                </span>
                <span className="about-badge about-badge-delay-4 absolute left-10 -top-2 rounded-full border border-[rgba(58,160,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#3aa0ff] shadow-lg backdrop-blur-sm">
                  JavaScript
                </span>
                <span className="about-badge about-badge-delay-2 absolute -right-3 top-1/2 rounded-full border border-[rgba(139,107,255,0.3)] bg-[#0a1224]/90 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#8b6bff] shadow-lg backdrop-blur-sm">
                  Framer Motion
                </span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(58,160,255,0.14)]" />

        {/* ================= SKILLS ================= */}
        <section id="skills" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1100px]">
            <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 02 — CAPABILITIES
            </span>
            <h2 className="mb-6 max-w-lg text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              What I'm Actually Good At.
            </h2>
            <p className="mb-12 max-w-lg text-sm leading-7 text-[#eaf1fb]/55 sm:mb-16 sm:text-base">
              Skills are only useful in relation to what they build — here's the
              honest breakdown, not the resume-inflated one.
            </p>

            <div className="reveal-block grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-11">
              {SKILL_GROUPS.map((group, gi) => (
                <div key={group.title}>
                  <h4 className="mb-5 font-mono text-xs tracking-wide text-[#1c6fd1]">
                    {group.title}
                  </h4>
                  {group.skills.map((skill, si) => (
                    <div key={skill.name} className={`skill-row-${gi}-${si} mb-4`}>
                      <div className="mb-2 flex justify-between text-sm text-[#eaf1fb]/55">
                        <span>{skill.name}</span>
                        <span className="font-mono text-xs text-[#eaf1fb]">
                          {skillFills[gi][si]}%
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-[rgba(58,160,255,0.1)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1c6fd1] to-[#3aa0ff] transition-[width] duration-[1400ms] ease-out"
                          style={{ width: `${skillFills[gi][si]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TIMELINE ================= */}
        <section id="timeline" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1100px]">
            <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 03 — TRAJECTORY
            </span>
            <h2 className="mb-6 max-w-lg text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              My Education Journey
            </h2>
            <p className="mb-12 max-w-lg text-sm leading-7 text-[#eaf1fb]/55 sm:mb-16 sm:text-base">
              The short version of my academic path — the degrees, the courses,
               and the milestones that shaped where I am today.
            </p>

            <div className="relative reveal-block pl-7">
              <div className="absolute bottom-1.5 left-1 top-1.5 w-px bg-[rgba(58,160,255,0.28)]" />
              {TIMELINE.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal relative ${i === TIMELINE.length - 1 ? "" : "pb-10 sm:pb-11"
                    }`}
                >
                  <span
                    className="absolute -left-7 top-1 h-2.5 w-2.5 rounded-full bg-[#3aa0ff]"
                    style={{
                      boxShadow:
                        "0 0 0 4px #050a14, 0 0 0 5px rgba(58,160,255,0.28)",
                    }}
                  />
                  <div className="mb-2 font-mono text-[11px] text-[#1c6fd1]">
                    {item.meta}
                  </div>
                  <h4 className="mb-2 text-base font-semibold text-[#eaf1fb] sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="max-w-xl text-sm leading-7 text-[#eaf1fb]/55">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(58,160,255,0.14)]" />

        {/* ================= PROJECTS ================= */}
                <section id="projects" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1100px]">
            <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 04 — SYSTEM LOG
            </span>
            <h2 className="mb-6 max-w-lg text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              My Projects
            </h2>
            <p className="mb-12 max-w-lg text-sm leading-7 text-[#eaf1fb]/55 sm:mb-16 sm:text-base">
              Hover a project to preview it — stack and scope at a glance.
            </p>

            <div className="reveal-block grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <div
                  key={project.idx}
                  className="electric-card relative rounded-md bg-[#0a1224] p-4 sm:p-5"
                >
                  <div className="project-image-wrap relative mb-4 aspect-[4/3] overflow-hidden rounded-[4px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="project-image-overlay" />
                    
                     <a href={project.link}
                      onClick={(e) => e.stopPropagation()}
                      className="go-live-btn absolute left-1/2 top-1/2 z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-[#3aa0ff] bg-[#050a14]/85 px-4 py-2 font-mono text-[11px] font-semibold text-[#3aa0ff] backdrop-blur-sm"
                    >
                      GO LIVE
                      <ArrowUpRight size={12} />
                    </a>
                  </div>

                  <span className="mb-2 block font-mono text-[10px] text-[#1c6fd1]">
                    {project.idx}
                  </span>
                  <h3 className="mb-3 text-base font-semibold text-[#eaf1fb] sm:text-lg">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(58,160,255,0.28)] px-2 py-0.5 font-mono text-[9px] text-[#eaf1fb]/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1100px]">
          <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 05 — HOW I WORK
          </span>
          <h2 className="mb-6 max-w-lg text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Four steps, no shortcuts.
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-7 text-[#eaf1fb]/55 sm:mb-16 sm:text-base">
            The process doesn't change much between a small feature and a full
            rebuild — just the scale of each step.
          </p>

          <div className="grid grid-cols-1 gap-px border border-[rgba(58,160,255,0.14)] bg-[rgba(58,160,255,0.14)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="reveal bg-[#0a1224] p-6 sm:p-7">
                <div className="mb-4 font-mono text-xl text-[#1c3f66]">
                  {step.num}
                </div>
                <h4 className="mb-2 text-base font-semibold">{step.title}</h4>
                <p className="text-sm leading-6 text-[#eaf1fb]/55">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[rgba(58,160,255,0.14)]" />

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="px-5 py-24 sm:px-8 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1100px]">
          <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 06 — SIGNAL FROM OTHERS
          </span>
          <h2 className="mb-10 max-w-lg text-3xl font-bold leading-tight sm:mb-14 sm:text-4xl md:text-5xl">
            What it's like working together.
          </h2>

          <div className="reveal-block min-h-[220px] border border-[rgba(58,160,255,0.14)] bg-[#0a1224] p-6 sm:p-10 md:p-12">
            <p className="mb-7 max-w-2xl text-base leading-7 text-[#eaf1fb] sm:text-lg">
              {TESTIMONIALS[testiIndex].quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1c6fd1] to-[#3aa0ff] font-mono text-sm font-bold text-[#050a14]">
                {TESTIMONIALS[testiIndex].initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#eaf1fb]">
                  {TESTIMONIALS[testiIndex].name}
                </div>
                <div className="font-mono text-[11px] text-[#eaf1fb]/55">
                  {TESTIMONIALS[testiIndex].role}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setTestiIndex(i)}
                    className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-all ${i === testiIndex
                        ? "scale-125 bg-[#3aa0ff]"
                        : "bg-[#eaf1fb]/30"
                      }`}
                  />
                ))}
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() =>
                    setTestiIndex(
                      (testiIndex - 1 + TESTIMONIALS.length) %
                      TESTIMONIALS.length
                    )
                  }
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(58,160,255,0.28)] font-mono transition-colors hover:border-[#3aa0ff] hover:text-[#3aa0ff]"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setTestiIndex((testiIndex + 1) % TESTIMONIALS.length)
                  }
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(58,160,255,0.28)] font-mono transition-colors hover:border-[#3aa0ff] hover:text-[#3aa0ff]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1100px]">
          <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
              // 07 — FAQ
          </span>
          <h2 className="mb-10 max-w-lg text-3xl font-bold leading-tight sm:mb-14 sm:text-4xl md:text-5xl">
            Questions worth answering up front.
          </h2>

          <div className="reveal-block border-t border-[rgba(58,160,255,0.14)]">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="border-b border-[rgba(58,160,255,0.14)]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium sm:text-base"
                  >
                    <span>{item.q}</span>
                    <span
                      className="flex-shrink-0 font-mono text-lg text-[#3aa0ff] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-400 ease-out"
                    style={{ maxHeight: isOpen ? "220px" : "0px" }}
                  >
                    <p className="max-w-xl pb-6 text-sm leading-7 text-[#eaf1fb]/55">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="border-t border-[rgba(58,160,255,0.14)]" />

      {/* ================= CONTACT ================= */}
      <section id="contact" className="px-5 py-24 sm:px-8 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1100px]">
          <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
            CONTACT ME
          </span>
          <h2 className="mb-6 max-w-lg text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Tell me what you're building.
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-7 text-[#eaf1fb]/55 sm:mb-16 sm:text-base">
            A few sentences on the problem is plenty to start — I'll follow up
            with the right questions.
          </p>

          <div className="reveal-block grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            <div>
              <p className="mb-6 text-sm leading-7 text-[#eaf1fb]/55">
                Based remotely, working across time zones. Usual response time
                is under 24 hours on weekdays.
              </p>
              <div className="mb-3 flex items-center gap-2.5 font-mono text-[13px] text-[#eaf1fb]">
                <span className="w-16 flex-shrink-0 text-[#1c6fd1]">EMAIL</span>
                hello@example.com
              </div>
              <div className="mb-3 flex items-center gap-2.5 font-mono text-[13px] text-[#eaf1fb]">
                <span className="w-16 flex-shrink-0 text-[#1c6fd1]">STATUS</span>
                Accepting new work
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[13px] text-[#eaf1fb]">
                <span className="w-16 flex-shrink-0 text-[#1c6fd1]">REPLY</span>
                &lt; 24h, weekdays
              </div>

              <div className="mt-9 flex gap-3">
                <span className="rounded-full border border-[rgba(58,160,255,0.28)] px-4 py-2 font-mono text-xs text-[#eaf1fb]/55">
                  GH
                </span>
                <span className="rounded-full border border-[rgba(58,160,255,0.28)] px-4 py-2 font-mono text-xs text-[#eaf1fb]/55">
                  IN
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-name" className="font-mono text-[11px] text-[#eaf1fb]/55">
                  NAME
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-[3px] border border-[rgba(58,160,255,0.28)] bg-[#0a1224] px-3.5 py-3 text-sm text-[#eaf1fb] outline-none transition-colors focus:border-[#3aa0ff]"
                />
                <span className="min-h-[14px] font-mono text-[11px] text-[#ff5d5d]">
                  {formErrors.name}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className="font-mono text-[11px] text-[#eaf1fb]/55">
                  EMAIL
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-[3px] border border-[rgba(58,160,255,0.28)] bg-[#0a1224] px-3.5 py-3 text-sm text-[#eaf1fb] outline-none transition-colors focus:border-[#3aa0ff]"
                />
                <span className="min-h-[14px] font-mono text-[11px] text-[#ff5d5d]">
                  {formErrors.email}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-message" className="font-mono text-[11px] text-[#eaf1fb]/55">
                  MESSAGE
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-y rounded-[3px] border border-[rgba(58,160,255,0.28)] bg-[#0a1224] px-3.5 py-3 text-sm text-[#eaf1fb] outline-none transition-colors focus:border-[#3aa0ff]"
                />
                <span className="min-h-[14px] font-mono text-[11px] text-[#ff5d5d]">
                  {formErrors.message}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  ref={(el) => setMagneticRef(el, 2)}
                  className="flex items-center gap-2.5 rounded-[3px] border border-[#3aa0ff] bg-[#3aa0ff] px-6 py-3.5 font-mono text-xs font-semibold text-[#050a14] transition-opacity hover:bg-[#6cc0ff] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                  {submitting && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[rgba(58,160,255,0.25)] border-t-[#050a14]" />
                  )}
                </button>
                {formStatus && (
                  <span className="font-mono text-xs text-[#8b6bff]">
                    {formStatus}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= SIGNOFF ================= */}
      <section
        id="signoff"
        className="border-t border-[rgba(58,160,255,0.14)] px-5 py-24 text-center sm:px-8 md:px-10 md:py-32"
      >
        <h2 className="reveal mb-6 font-mono text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          END TRANSMISSION
        </h2>
        <p className="reveal mx-auto mb-10 max-w-md text-sm leading-7 text-[#eaf1fb]/55 sm:text-base">
          If you've got something worth building, that's the whole pitch.
        </p>
        <div className="reveal flex justify-center">
          <a
            href="mailto:hello@example.com"
            ref={(el) => setMagneticRef(el, 3)}
            className="rounded-[3px] border border-[#3aa0ff] bg-[#3aa0ff] px-7 py-4 font-mono text-xs font-semibold text-[#050a14] transition-colors hover:bg-[#6cc0ff]"
          >
            hello@example.com
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col gap-3 border-t border-[rgba(58,160,255,0.14)] px-5 py-6 font-mono text-[11px] text-[#eaf1fb]/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-10">
        <span>RK © 2026</span>
        <div className="flex gap-5">
          <a href="#about" className="transition-colors hover:text-[#3aa0ff]">
            About
          </a>
          <a href="#projects" className="transition-colors hover:text-[#3aa0ff]">
            Projects
          </a>
          <a href="#contact" className="transition-colors hover:text-[#3aa0ff]">
            Contact
          </a>
        </div>
        <span>NO TRACKING / NO NOISE</span>
      </footer>
    </main>

      {/* ================= BACK TO TOP ================= */ }
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-[#3aa0ff] text-[#050a14] shadow-lg transition-all duration-300"
        style={{
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
      >
        <ArrowUp size={18} />
      </button>

      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050a14; }
        ::selection { background: #3aa0ff; color: #050a14; }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.12) 0px,
            rgba(0,0,0,0.12) 1px,
            transparent 1px,
            transparent 3px
          );
          mix-blend-mode: multiply;
          opacity: 0.45;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

                /* ---------------- About: glass card + floating badges ---------------- */
        .about-glass-card {
          animation: about-card-float 6s ease-in-out infinite;
        }
        @keyframes about-card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .about-badge {
          animation: about-badge-float 4.5s ease-in-out infinite;
        }
        .about-badge-delay-1 { animation-delay: 0.6s; }
        .about-badge-delay-2 { animation-delay: 1.2s; }
        .about-badge-delay-3 { animation-delay: 1.8s; }
        .about-badge-delay-4 { animation-delay: 2.4s; }
        @keyframes about-badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ---------------- Electric nav links ---------------- */
        .nav-link-electric {
          position: relative;
          color: inherit;
          transition: color 0.2s ease;
        }
        .nav-link-electric::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -5px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3aa0ff, #8b6bff, #3aa0ff, transparent);
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: center;
          filter: drop-shadow(0 0 5px rgba(58,160,255,0.8));
          transition: transform 0.3s ease;
        }
        .nav-link-electric:hover {
          color: #3aa0ff;
          animation: electric-flicker 0.6s steps(2) infinite;
        }
        .nav-link-electric:hover::after {
          transform: scaleX(1);
          animation: electric-sweep 0.7s linear infinite;
        }
        @keyframes electric-sweep {
          from { background-position: 0% 0; }
          to { background-position: 200% 0; }
        }
        @keyframes electric-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 8px rgba(58,160,255,0.85); }
          45% { opacity: 0.9; text-shadow: 0 0 4px rgba(58,160,255,0.6); }
          50% { opacity: 1; text-shadow: 0 0 10px rgba(58,160,255,0.9); }
          70% { opacity: 0.85; text-shadow: 0 0 3px rgba(58,160,255,0.5); }
        }

        /* ---------------- Electric project cards ---------------- */
        @property --card-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .electric-card {
          isolation: isolate;
          box-shadow: 0 0 0 1px rgba(58,160,255,0.14);
          transition: box-shadow 0.3s ease;
        }
        .electric-card::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(
            from var(--card-angle),
            transparent 0%,
            #3aa0ff 12%,
            transparent 28%,
            transparent 68%,
            #8b6bff 84%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-card-border 3.2s linear infinite;
          opacity: 0.55;
          transition: opacity 0.3s ease;
          z-index: -1;
          pointer-events: none;
        }
        .electric-card:hover,
        .electric-card.is-open {
          box-shadow: 0 0 24px rgba(58,160,255,0.22), 0 0 2px rgba(58,160,255,0.4);
          animation: card-flicker 2.2s ease-in-out infinite;
        }
        .electric-card:hover::before,
        .electric-card.is-open::before {
          opacity: 1;
        }
        @keyframes rotate-card-border {
          to { --card-angle: 360deg; }
        }
        @keyframes card-flicker {
          0%, 100% { box-shadow: 0 0 20px rgba(58,160,255,0.2), 0 0 2px rgba(58,160,255,0.35); }
          48% { box-shadow: 0 0 14px rgba(58,160,255,0.12), 0 0 1px rgba(58,160,255,0.2); }
          52% { box-shadow: 0 0 30px rgba(58,160,255,0.32), 0 0 3px rgba(58,160,255,0.5); }
        }

        /* ---------------- Project image hover reveal ---------------- */
        .project-image-wrap {
          background: #0a1224;
        }
        .project-image-wrap img {
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
          transform: scale(1) rotate(0deg);
          filter: saturate(1) brightness(0.9);
        }
        .project-image-wrap:hover img {
          transform: scale(1.12) rotate(-1deg);
          filter: saturate(1.25) brightness(0.6);
        }
        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 10, 20, 0.92) 0%,
            rgba(5, 10, 20, 0.25) 55%,
            transparent 100%
          );
          opacity: 0.35;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .project-image-wrap:hover .project-image-overlay {
          opacity: 1;
        }
        .project-image-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          left: -60%;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(58, 160, 255, 0.45),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 5;
        }
        .project-image-wrap:hover::after {
          animation: image-sweep 0.9s ease forwards;
        }
        @keyframes image-sweep {
          from { left: -60%; }
          to { left: 130%; }
        }
      .go-live-btn {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-image-wrap:hover .go-live-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

        /* ---------------- Profile photo glitch hover ---------------- */
        @property --profile-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .profile-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2.5px;
          background: conic-gradient(
            from var(--profile-angle),
            transparent 0%,
            #3aa0ff 15%,
            transparent 30%,
            transparent 70%,
            #8b6bff 85%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-profile-ring 4s linear infinite;
          opacity: 0.75;
          transition: opacity 0.3s ease;
        }
        .profile-ring:hover::before {
          opacity: 1;
        }
        @keyframes rotate-profile-ring {
          to { --profile-angle: 360deg; }
        }

        /* ---------------- Hero photo — octagon badge frame ---------------- */
        .hero-photo-frame {
          transition: filter 0.35s ease;
        }
        .hero-photo-glow {
          background: conic-gradient(
            from var(--profile-angle),
            transparent 0%,
            #3aa0ff 15%,
            transparent 30%,
            transparent 70%,
            #8b6bff 85%,
            transparent 100%
          );
          animation: rotate-profile-ring 4s linear infinite;
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        .hero-photo-frame:hover .hero-photo-glow {
          opacity: 1;
          filter: brightness(1.2);
        }
        .hero-photo-frame:hover {
          filter: drop-shadow(0 0 22px rgba(58,160,255,0.35));
        }
        .profile-photo-wrap {
          background: #0a1224;
          box-shadow: 0 0 0 1px rgba(58,160,255,0.2);
          transition: box-shadow 0.35s ease;
        }
        .profile-photo-wrap:hover {
          box-shadow: 0 0 0 1px rgba(58,160,255,0.5), 0 0 26px rgba(58,160,255,0.35);
        }
        .profile-img {
          filter: grayscale(0.15) contrast(1.05);
          transition: filter 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .profile-photo-wrap:hover .profile-img {
          transform: scale(1.04);
        }
        .profile-img-r,
        .profile-img-b {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .profile-img-r {
          mix-blend-mode: screen;
          filter: sepia(1) saturate(8) hue-rotate(-40deg) brightness(1.1);
        }
        .profile-img-b {
          mix-blend-mode: screen;
          filter: sepia(1) saturate(8) hue-rotate(150deg) brightness(1.1);
        }
        .profile-photo-wrap:hover .profile-img-r {
          opacity: 0.55;
          animation: glitch-shift-r 0.35s steps(2) infinite;
        }
        .profile-photo-wrap:hover .profile-img-b {
          opacity: 0.55;
          animation: glitch-shift-b 0.35s steps(2) infinite;
        }
        @keyframes glitch-shift-r {
          0% { transform: translate(-3px, 0); }
          50% { transform: translate(-1px, 1px); }
          100% { transform: translate(-4px, -1px); }
        }
        @keyframes glitch-shift-b {
          0% { transform: translate(3px, 0); }
          50% { transform: translate(1px, -1px); }
          100% { transform: translate(4px, 1px); }
        }
        .profile-scan {
          background: repeating-linear-gradient(
            0deg,
            rgba(58,160,255,0.12) 0px,
            rgba(58,160,255,0.12) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .profile-photo-wrap:hover .profile-scan {
          opacity: 1;
          animation: profile-flicker 0.9s steps(3) infinite;
        }
        @keyframes profile-flicker {
          0%, 100% { opacity: 1; }
          40% { opacity: 0.5; }
          60% { opacity: 0.85; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div >
  );
}