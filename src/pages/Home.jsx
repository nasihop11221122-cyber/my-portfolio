import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, ArrowUp, Mail, Terminal, } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

import * as THREE from "three";
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

const SKILLS = [
  {
    title: "Thumbnail Designing",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789926486/ffaabbbf-1ba5-4194-b751-e6c74690afd0.png",
  },
  {
    title: "Youtube Atomation",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789926396/5eaa007e-b880-45ee-90c2-5c42437efa13.png",
  },
  {
    title: "Backend Development",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789926419/1f216569-a38d-4683-aeb0-1e0d5cb32ac7.png",
  },
  {
    title: "Frontend Development",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789926462/27fd713c-a523-4348-b0b2-8013dd33d434.png",
  },
  {
    title: "video Editing",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789927141/594de0e8-5f8c-4872-8fc2-3d86d72fd1da.png",
  },
  {
    title: "content creation",
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789927466/26116ccd-19d6-40c0-bf15-3638dee5eb2d.png",
  },
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
    meta: "01 — MATRICULATION",
    title: "Educator Public High School, Kakki",
    body: "Scored 945/1100 marks in Matriculation.",
  },
  {
    meta: "02 — FSC",
    title: "Shahbudin Degree College, Bakakhel, Bannu",
    body: "Scored 1043/1200 marks in FSc.",
  },
  {
    meta: "03 — FRONTEND WEB DEVELOPMENT",
    title: "Sayed Software Institute, Bannu",
    body: "Completed a course in Frontend Web Development.",
  },
  {
    meta: "04 — BACKEND WEB DEVELOPMENT",
    title: "SSI, Bannu",
    body: "Completed a course in Backend Web Development.",
  },
  {
    meta: "05 — INTERNSHIP",
    title: "Full-Stack Web Developer, Sayed Tag Companies",
    body: "3-month internship — worked on full-stack web development.",
  },
  {
    meta: "06 — BS COMPUTER SCIENCE",
    title: "IMCB-H9, Islamabad",
    body: "Currently studying for a BS in Computer Science.",
  },
];

const PROJECTS = [
  {
    idx: "ENTRY_01",
    title: "SSI bannu.com",
    summary:
      "A modern academy management software designed to manage students, courses, instructors, admissions, classes, and academic activities through a centralized and easy-to-use platform..",
    details:
      "Built with React and tailwind css . Reduced incident detection time from ~8 minutes to under 30 seconds by surfacing anomalies directly in the UI instead of a separate alerting tool.",
    tags: ["react", "MongoDB", "Node.js","tailwind css", "Express","framer motion"],
    // TODO: swap for a real screenshot of this project
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789913366/da8c373e-012e-4cf2-960b-cfaa3bae392d.png",
    // TODO: swap for the real live URL
    link: "https://www.ssibannu.com/ ",
  },
  {
    idx: "ENTRY_02",
    title: "Education finder system",
    summary:
      "A headless commerce backend built to serve three different storefronts from one source of truth.",
    details:
      "Designed a GraphQL API on top of a normalized MongoDB schema, with Redis caching on hot product queries. Cut average response time by 60% under peak load during a seasonal traffic spike.",
    tags: ["react", "MongoDB", "Node.js","tailwind css", "Express","framer motion"],
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789913993/4f712c70-40d8-40c3-afa4-2ad72df5ccac.png",
    link: "#",
  },
  {
    idx: "ENTRY_03",
    title: "Advanced attandance system",
    summary:
      "Led the migration of a legacy CSS codebase to a token-based, component-driven design system.",
    details:
      "Replaced roughly 30,000 lines of ad-hoc CSS with a shared component library, cutting new-feature styling time by half and eliminating an entire class of visual regressions across the product.",
    tags: ["react", "MongoDB", "Node.js","tailwind css", "Express","framer motion"],
    image: "https://res.cloudinary.com/gp4dzet9/image/upload/v1789922637/d7a12d0a-e181-4d07-83ea-b097165776b3_1.png",
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
      "\u201cRahim is the best developer I have worked with. He builds clean websites and always delivers on time.\u201d",
    name: "Ahmed Raza",
    role: "Business Owner, Bannu",
    initials: "AR",
  },
  {
    quote:
      "\u201cHe is not just a developer, he is also a great content creator. His thumbnail designs and video editing are top class.\u201d",
    name: "Usman Khan",
    role: "YouTuber, Islamabad",
    initials: "UK",
  },
  {
    quote:
      "\u201cVery professional and hardworking. He understood our project needs quickly and made a perfect website for our academy.\u201d",
    name: "Sana Malik",
    role: "Academy Owner, Peshawar",
    initials: "SM",
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
  const [showLaunchPopup, setShowLaunchPopup] = useState(false);
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const cursorDotRef = useRef(null);
  const headlineRef = useRef(null);
  const coinContainerRef = useRef(null);

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
          canvasCtx.fillStyle = "rgba(28,111,209,0.35)";
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
              canvasCtx.strokeStyle = `rgba(28,111,209,${0.06 * (1 - dist / 110)})`;
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
            glitchReveal(headlineRef.current, "RAHIM KHAN")
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
   /* -----------------------------------------------------------
     GOLD COIN — 3D scroll-driven background (Three.js)
  ----------------------------------------------------------- */
  useEffect(() => {
    const container = coinContainerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ---- Lighting (warm gold tones) ---- */
    scene.add(new THREE.AmbientLight(0xfff3d0, 0.55));
    const key = new THREE.DirectionalLight(0xffe9b0, 1.5);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd166, 0.9);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    /* ---- Canvas texture for RK face ---- */
    function makeFaceTexture(mirror) {
      const size = 512;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");

      ctx.translate(size / 2, size / 2);
      ctx.rotate(Math.PI / 2);
      if (mirror) {
        ctx.scale(-1, -1);
      }
      ctx.translate(-size / 2, -size / 2);

      const grad = ctx.createRadialGradient(
        size * 0.35, size * 0.35, size * 0.05,
        size * 0.5, size * 0.5, size * 0.5
      );
      grad.addColorStop(0, "#fff6d8");
      grad.addColorStop(0.35, "#f2c94c");
      grad.addColorStop(0.7, "#d4a017");
      grad.addColorStop(1, "#8a6a12");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = "bold 170px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(90,60,10,0.85)";
      ctx.fillText("RK", size / 2 + 4, size / 2 + 8);
      ctx.fillStyle = "rgba(255,240,190,0.9)";
      ctx.fillText("RK", size / 2, size / 2);

      return new THREE.CanvasTexture(c);
    }

    const faceTextureA = makeFaceTexture(true);
    const faceTextureB = makeFaceTexture(false);

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 1,
      roughness: 0.35,
    });
    const faceMaterialA = new THREE.MeshStandardMaterial({
      map: faceTextureA,
      metalness: 0.9,
      roughness: 0.3,
    });
    const faceMaterialB = new THREE.MeshStandardMaterial({
      map: faceTextureB,
      metalness: 0.9,
      roughness: 0.3,
    });

    const geometry = new THREE.CylinderGeometry(2, 2, 0.35, 128);
    const coin = new THREE.Mesh(geometry, [
      edgeMaterial,
      faceMaterialA,
      faceMaterialB,
    ]);
    coin.rotation.x = Math.PI / 2;
    scene.add(coin);

    let rafId;
    function renderLoop() {
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    /* ---- Scroll-driven rotation ---- */
     function handleScroll() {
      if (reduceMotion) return;
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const fraction = window.scrollY / max;
      coin.rotation.x = Math.PI / 2 + fraction * Math.PI * 6;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    function handleResize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      geometry.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
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
  const [menuOpen, setMenuOpen] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus("");
  if (!validate()) return;

  setSubmitting(true);

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setFormStatus("Message received — I'll reply within 24h.");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("EmailJS error:", error);
    setFormStatus("Something went wrong. Please email me directly.");
  } finally {
    setSubmitting(false);
  }
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
      className="relative min-h-screen w-full overflow-x-hidden bg-[#ffffff] text-[#0f172a]"
      style={{ opacity: 0 }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50"
      />
      <div
  ref={coinContainerRef}
  className="gold-coin-bg pointer-events-none fixed left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
  aria-hidden="true"
/>
      <div
        className="scanlines pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      />
   


      <main className="relative z-[3]">
      
        



{/* ================= NAV ================= */}
<nav className="nav-bar fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-[rgba(28,111,209,0.25)] bg-[#ffffff]/80 px-4 py-2 font-mono text-sm font-black tracking-wide text-[#334155] backdrop-blur-md sm:px-8 sm:text-base">
  <a href="#" className="flex items-center flex-shrink-0" aria-label="RK Home">
    <svg
      width="46"
      height="46"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sm:w-[54px] sm:h-[54px]"
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="10" stroke="#3aa0ff" strokeWidth="2" fill="rgba(58,160,255,0.08)" />
      <path d="M13 33V15h7.8c3.4 0 5.9 2.2 5.9 5.4 0 2.3-1.3 4.1-3.4 4.9L27 33h-4l-3.6-7.4h-2.6V33h-3.8z" fill="#3aa0ff" />
      <path d="M16.8 18.2v4.6h3.6c1.6 0 2.7-1 2.7-2.3s-1.1-2.3-2.7-2.3h-3.6z" fill="#ffffff" />
      <path d="M28.5 33V15h3.8v7.6l6.3-7.6h4.5l-7 8.2L43.3 33h-4.6l-5.1-7.3-1.3 1.5V33h-3.8z" fill="#8b6bff" />
    </svg>
  </a>

  {/* Desktop links */}
  <div className="hidden items-center justify-center gap-6 text-base font-black md:flex lg:gap-9 lg:text-lg">
    <a href="#" className="nav-link-electric font-black">Home</a>
    <a href="#about" className="nav-link-electric font-black">About</a>
    <a href="#skills" className="nav-link-electric font-black">Skills</a>
    <a href="#projects" className="nav-link-electric font-black">Projects</a>
    <a href="#contact" className="nav-link-electric font-black">Contact</a>
  </div>

  {/* Desktop CTA */}
  
   <a href="#timeline"
    className="hidden md:flex items-center gap-1.5 rounded-full border-[1px] border-[#1c6fd1] px-6 py-2.5 font-mono text-sm font-black text-[#1c6fd1] transition-colors hover:bg-[rgba(28,111,209,0.08)] lg:text-base"
  >
    MY JOURNEY
  </a>

  {/* Mobile hamburger toggle */}
  <button
    onClick={() => setMenuOpen((prev) => !prev)}
    className="flex md:hidden items-center justify-center rounded-md p-2 text-[#1c6fd1]"
    aria-label="Toggle menu"
    aria-expanded={menuOpen}
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {menuOpen ? (
        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 6h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M4 18h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  </button>

  {/* Mobile dropdown menu */}
  {menuOpen && (
    <div className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b-2 border-[rgba(28,111,209,0.25)] bg-white/95 px-5 py-5 text-lg font-black backdrop-blur-md md:hidden">
      <a href="#" onClick={() => setMenuOpen(false)} className="nav-link-electric py-2.5 font-black">Home</a>
      <a href="#about" onClick={() => setMenuOpen(false)} className="nav-link-electric py-2.5 font-black">About</a>
      <a href="#skills" onClick={() => setMenuOpen(false)} className="nav-link-electric py-2.5 font-black">Skills</a>
      <a href="#projects" onClick={() => setMenuOpen(false)} className="nav-link-electric py-2.5 font-black">Projects</a>
      <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-link-electric py-2.5 font-black">Contact</a>

      
      <a  href="#timeline"
        onClick={() => setMenuOpen(false)}
        className="mt-3 flex w-fit items-center gap-1.5 rounded-full border-[3px] border-[#1c6fd1] px-6 py-2.5 font-mono text-sm font-black text-[#1c6fd1]"
      >
        MY JOURNEY
      </a>
    </div>
  )}
</nav>

        {/* ================= HERO ================= */}
       <section className="flex min-h-screen flex-col justify-center px-5 pt-24 sm:px-8 sm:pt-28 md:px-10">
  <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[1fr_300px] lg:items-center lg:gap-16">
    <div className="w-full max-w-[980px] text-center lg:text-left">

      <h1
        ref={headlineRef}
        className="mb-6 min-h-[1.1em] font-mono text-[15vw] font-extrabold leading-[0.98] tracking-tight sm:mb-8 sm:text-[11vw] md:text-[8vw] lg:text-[5.6rem]"
        style={{ textShadow: "0 0 24px rgba(58,160,255,0.08)" }}
      >
        RAHIM KHAN
      </h1>

      <p className="lede mx-auto mb-9 max-w-xl text-sm leading-7 text-[#4b5563] sm:mb-11 sm:text-base md:text-lg md:leading-8 lg:mx-0">
        I build modern digital products with code, motion and carefully
        engineered interfaces — from frontend experiences to backend
        systems.
      </p>

      <div className="cta-row flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        
         <a href="#about"
          ref={(el) => setMagneticRef(el, 0)}
          className="flex items-center gap-2 rounded-[3px] border border-[#3aa0ff] bg-[#3aa0ff] px-5 py-3.5 font-mono text-xs font-semibold text-[#050a14] transition-colors hover:bg-[#6cc0ff] sm:px-6"
        >
          ABOUT ME
          <ArrowUpRight size={14} />
        </a>
        
         <a href="#contact"
          ref={(el) => setMagneticRef(el, 1)}
          className="flex items-center gap-2 rounded-[3px] border border-[#1c6fd1] px-5 py-3.5 font-mono text-xs font-semibold text-[#1c6fd1] transition-colors hover:bg-[rgba(28,111,209,0.08)] sm:px-6"
        >
          CONTACT ME
          <Mail size={14} />
        </a>
      </div>

    </div>

    <div className="hero-photo-frame relative mx-auto h-64 w-48 flex-shrink-0 xs:h-72 xs:w-56 sm:h-96 sm:w-72 lg:mx-0 lg:ml-auto lg:h-[26rem] lg:w-80">
      <div
        className="hero-photo-glow absolute inset-0"
        style={{ clipPath: OCTAGON_CLIP }}
      />
      <div
        className="profile-photo-wrap absolute inset-[5px] overflow-hidden"
        style={{ clipPath: OCTAGON_CLIP }}
      >
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

  <div className="mx-auto mt-10 flex w-full max-w-[1180px] items-center justify-center gap-2 font-mono text-[9px] tracking-wide text-[#94a3b8] sm:mt-14 lg:justify-start">
    <Terminal size={12} />
    SCROLL TO EXPLORE
  </div>
</section>

      
  {/* ================= MARQUEE ================= */}
<div className="overflow-hidden border-y border-[rgba(28,111,209,0.15)] py-4 sm:py-5">
  <div
    className="flex w-max gap-6 sm:gap-8 md:gap-12"
    style={{ animation: "marquee 28s linear infinite" }}
  >
    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
      <span
        key={i}
        className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-black text-[#94a3b8] sm:gap-3 sm:text-sm"
      >
        {item} <span className="text-[#1c6fd1]">◆</span>
      </span>
    ))}
  </div>
</div>

        {/* ================= ABOUT ================= */}
           <section id="about" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36">
  {/* ---- Ambient glow blobs ---- */}
  <div
    className="pointer-events-none absolute -left-40 top-10 h-[280px] w-[280px] rounded-full opacity-20 blur-[90px] sm:h-[420px] sm:w-[420px] sm:blur-[110px]"
    style={{ background: "radial-gradient(circle, rgba(58,160,255,0.18), transparent 70%)" }}
    aria-hidden="true"
  />
  <div
    className="pointer-events-none absolute -right-32 bottom-0 h-[260px] w-[260px] rounded-full opacity-15 blur-[90px] sm:h-[380px] sm:w-[380px] sm:blur-[110px]"
    style={{ background: "radial-gradient(circle, rgba(139,107,255,0.18), transparent 70%)" }}
    aria-hidden="true"
  />

  <div className="relative z-10 mx-auto max-w-[1200px]">
    <div className="reveal-block grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center md:gap-20">
      {/* ================= LEFT — CONTENT ================= */}
      <div className="text-center md:text-left">
        <span className="about-typewriter mb-5 inline-block font-mono text-sm font-semibold tracking-[0.25em] text-[#1c6fd1] sm:text-base">
          ABOUT ME
        </span>
        <h2 className="mb-6 text-[7vw] font-bold leading-[1.15] text-[#0f172a] xs:text-3xl sm:text-4xl md:text-[2.75rem]">
          Turning Ideas Into{" "}
          <span className="bg-gradient-to-r from-[#3aa0ff] to-[#8b6bff] bg-clip-text text-transparent">
            Digital Experiences.
          </span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-[#4b5563] sm:text-base sm:leading-8 md:mx-0">
          I'm a passionate Web Developer focused on building modern,
          responsive, and high-quality web experiences. I enjoy
          turning ideas into clean, interactive, and user-friendly
          digital products.
        </p>

        
        <a  href="#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-[#3aa0ff] bg-[#3aa0ff] px-6 py-3.5 font-mono text-xs font-semibold text-[#050a14] transition-all duration-300 hover:gap-3 hover:bg-[#6cc0ff]"
        >
          VIEW MY WORK
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* ================= RIGHT — VISUAL ================= */}
      <div className="relative mx-auto h-[320px] w-full max-w-[380px] sm:h-[440px] sm:max-w-[440px]">
        {/* Glass code-editor card */}
        <div className="about-glass-card absolute inset-0 m-auto flex h-[210px] w-[260px] flex-col overflow-hidden rounded-2xl border border-[rgba(28,111,209,0.22)] bg-[rgba(245,246,248,0.75)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:h-[270px] sm:w-[330px]">
          <div className="flex items-center gap-1.5 border-b border-[rgba(28,111,209,0.15)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5d5d]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3aa0ff]/70" />
            <span className="ml-3 font-mono text-[10px] text-[#6b7280]">dev.tsx</span>
          </div>
          <div className="flex-1 px-5 py-4 font-mono text-[10px] leading-6 text-[#334155] sm:text-xs">
            <div><span className="text-[#8b6bff]">const</span> <span className="text-[#3aa0ff]">build</span> = () =&gt; {"{"}</div>
            <div className="pl-4 text-[#6b7280]">// crafting clean UI</div>
            <div className="pl-4"><span className="text-[#3aa0ff]">return</span> &lt;<span className="text-[#8b6bff]">Experience</span> /&gt;;</div>
            <div>{"}"}</div>
            <div className="mt-2 inline-block h-4 w-1.5 animate-pulse bg-[#3aa0ff]" />
          </div>
        </div>

        {/* Floating tech badges — pulled inward on mobile, spread out from sm: */}
        <span className="about-badge absolute left-4 top-2 rounded-full border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#1c6fd1] shadow-md backdrop-blur-sm sm:left-2 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
          React
        </span>
        <span className="about-badge about-badge-delay-1 absolute right-2 top-12 rounded-full border border-[rgba(139,107,255,0.28)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#8b6bff] shadow-md backdrop-blur-sm sm:right-0 sm:top-14 sm:px-3 sm:py-1.5 sm:text-[10px]">
          Node.js
        </span>
        <span className="about-badge about-badge-delay-2 absolute left-1 bottom-16 rounded-full border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#1c6fd1] shadow-md backdrop-blur-sm sm:-left-4 sm:bottom-20 sm:px-3 sm:py-1.5 sm:text-[10px]">
          MongoDB
        </span>
        <span className="about-badge about-badge-delay-3 absolute right-4 bottom-4 rounded-full border border-[rgba(139,107,255,0.28)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#8b6bff] shadow-md backdrop-blur-sm sm:right-2 sm:bottom-6 sm:px-3 sm:py-1.5 sm:text-[10px]">
          Tailwind CSS
        </span>
        <span className="about-badge about-badge-delay-4 absolute left-14 top-0 rounded-full border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#1c6fd1] shadow-md backdrop-blur-sm sm:left-10 sm:-top-2 sm:px-3 sm:py-1.5 sm:text-[10px]">
          JavaScript
        </span>
        <span className="about-badge about-badge-delay-2 absolute right-0 top-1/2 rounded-full border border-[rgba(139,107,255,0.28)] bg-[#f5f6f8]/95 px-2.5 py-1 font-mono text-[9px] font-semibold text-[#8b6bff] shadow-md backdrop-blur-sm sm:-right-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
          Framer Motion
        </span>
      </div>
    </div>
  </div>
</section>

        <hr className="border-t border-[rgba(28,111,209,0.15)]" />

        
        
{/* ================= SKILLS ================= */}
<section id="skills" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36">
  <div className="mx-auto max-w-[1100px]">
    <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
      // 02 — CAPABILITIES
    </span>
    <h2 className="mb-6 max-w-lg text-[8vw] font-bold leading-tight xs:text-3xl sm:text-4xl md:text-5xl">
      What I'm Actually Good At.
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-7 text-[#4b5563] sm:mb-16 sm:text-base">
      A quick visual look at the skills I bring to every project.
    </p>

    <div className="reveal-block grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((skill, i) => (
        <div
          key={skill.title}
          className="electric-card relative rounded-md bg-[#f5f6f8] p-4 sm:p-5"
        >
          <div className="project-image-wrap relative mb-4 aspect-[4/3] overflow-hidden rounded-[4px]">
            <img
              src={skill.image}
              alt={skill.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="project-image-overlay" />
          </div>

          <span className="mb-2 block font-mono text-[10px] text-[#1c6fd1]">
            SKILL_0{i + 1}
          </span>
          <h3 className="text-base font-semibold text-[#0f172a] sm:text-lg">
            {skill.title}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>
        <hr className="border-t border-[rgba(28,111,209,0.15)]" />

        {/* ================= TIMELINE ================= */}
       <section id="timeline" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36">
  <div className="mx-auto max-w-[1100px]">
    <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
      // 03 — My Journey
    </span>
    <h2 className="mb-6 max-w-lg text-[8vw] font-bold leading-tight xs:text-3xl sm:text-4xl md:text-5xl">
      My Education Journey
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-7 text-[#4b5563] sm:mb-16 sm:text-base">
      The short version of my academic path — the degrees, the courses,
      and the milestones that shaped where I am today.
    </p>

    <div className="relative reveal-block pl-6 sm:pl-7">
      <div className="absolute bottom-1.5 left-1 top-1.5 w-px bg-[rgba(28,111,209,0.25)]" />
      {TIMELINE.map((item, i) => (
        <div
          key={item.title}
          className={`reveal relative ${i === TIMELINE.length - 1 ? "" : "pb-12 sm:pb-16"}`}
        >
          <span
            className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-[#3aa0ff] sm:-left-7"
            style={{
              boxShadow:
                "0 0 0 4px #ffffff, 0 0 0 5px rgba(58,160,255,0.22)",
            }}
          />
          <div className="mb-2 font-mono text-[11px] text-[#1c6fd1]">
            {item.meta}
          </div>
          <h4 className="mb-2 text-base font-semibold text-[#0f172a] sm:text-lg">
            {item.title}
          </h4>
          <p className="max-w-xl text-sm leading-7 text-[#4b5563]">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

        <hr className="border-t border-[rgba(28,111,209,0.15)]" />

        {/* ================= PROJECTS ================= */}
  <section id="projects" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36">
  <div className="mx-auto max-w-[1100px]">
    <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
      // 04 — SYSTEM LOG
    </span>
    <h2 className="mb-6 max-w-lg text-[8vw] font-bold leading-tight xs:text-3xl sm:text-4xl md:text-5xl">
      My Projects
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-7 text-[#4b5563] sm:mb-16 sm:text-base">
      Hover a project to preview it — stack and scope at a glance.
    </p>

    <div className="reveal-block grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project) => (
        <div
          key={project.idx}
          className="electric-card relative rounded-md bg-[#f5f6f8] p-4 sm:p-5"
        >
          <div className="project-image-wrap relative mb-4 aspect-[4/3] overflow-hidden rounded-[4px]">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="project-image-overlay" />

            
            {project.idx === "ENTRY_01" ? (
  <a  href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="go-live-btn absolute left-1/2 top-1/2 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#3aa0ff] bg-[#050a14]/85 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#3aa0ff] backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px]"
  >
    GO LIVE
    <ArrowUpRight size={12} />
  </a>
) : (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      setShowLaunchPopup(true);
    }}
    className="go-live-btn absolute left-1/2 top-1/2 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#3aa0ff] bg-[#050a14]/85 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#3aa0ff] backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2 sm:text-[11px]"
  >
    GO LIVE
    <ArrowUpRight size={12} />
  </button>
)}
          </div>

          <span className="mb-2 block font-mono text-[10px] text-[#1c6fd1]">
            {project.idx}
          </span>
          <h3 className="mb-3 text-base font-semibold text-[#0f172a] sm:text-lg">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(28,111,209,0.25)] px-2 py-0.5 font-mono text-[9px] text-[#4b5563]"
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

     

      <hr className="border-t border-[rgba(28,111,209,0.15)]" />

      {/* ================= TESTIMONIALS ================= */}
      <section
  id="testimonials"
  className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36"
>
  <div className="mx-auto max-w-[1100px]">
    <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
      // 06 — SIGNAL FROM OTHERS
    </span>
    <h2 className="mb-8 max-w-lg text-[8vw] font-bold leading-tight xs:text-3xl sm:mb-14 sm:text-4xl md:text-5xl">
      What it's like working together.
    </h2>

    <div className="reveal-block min-h-[260px] border border-[rgba(28,111,209,0.15)] bg-[#f5f6f8] p-5 sm:min-h-[220px] sm:p-10 md:p-12">
      <p className="mb-7 max-w-2xl text-base leading-7 text-[#0f172a] sm:text-lg">
        {TESTIMONIALS[testiIndex].quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1c6fd1] to-[#3aa0ff] font-mono text-sm font-bold text-[#ffffff]">
          {TESTIMONIALS[testiIndex].initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-[#0f172a]">
            {TESTIMONIALS[testiIndex].name}
          </div>
          <div className="font-mono text-[11px] text-[#4b5563]">
            {TESTIMONIALS[testiIndex].role}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestiIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-all ${
                  i === testiIndex
                    ? "scale-125 bg-[#3aa0ff]"
                    : "bg-[#cbd5e1]"
                }`}
              />
            </button>
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(28,111,209,0.25)] font-mono transition-colors hover:border-[#1c6fd1] hover:text-[#1c6fd1]"
          >
            ←
          </button>
          <button
            onClick={() =>
              setTestiIndex((testiIndex + 1) % TESTIMONIALS.length)
            }
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(28,111,209,0.25)] font-mono transition-colors hover:border-[#1c6fd1] hover:text-[#1c6fd1]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

     

      <hr className="border-t border-[rgba(28,111,209,0.15)]" />

      {/* ================= CONTACT ================= */}
    <section id="contact" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-36">
  <div className="mx-auto max-w-[1100px]">
    <span className="mb-4 block font-mono text-[11px] tracking-wide text-[#1c6fd1]">
      CONTACT ME
    </span>
    <h2 className="mb-6 max-w-lg text-[8vw] font-bold leading-tight xs:text-3xl sm:text-4xl md:text-5xl">
      Tell me what you're building.
    </h2>
    <p className="mb-10 max-w-lg text-sm leading-7 text-[#4b5563] sm:mb-16 sm:text-base">
      A few sentences on the problem is plenty to start — I'll follow up
      with the right questions.
    </p>

    <div className="reveal-block grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
      <div>
        <p className="mb-6 text-sm leading-7 text-[#4b5563]">
          Based remotely, working across time zones. Usual response time
          is under 24 hours on weekdays.
        </p>
        <div className="mb-3 flex items-start gap-2.5 font-mono text-[13px] text-[#0f172a]">
          <span className="w-14 flex-shrink-0 pt-px text-[#1c6fd1] sm:w-16">EMAIL</span>
          <span className="min-w-0 break-all">rahim.dev132008@gmail.com</span>
        </div>
        <div className="mb-3 flex items-center gap-2.5 font-mono text-[13px] text-[#0f172a]">
          <span className="w-14 flex-shrink-0 text-[#1c6fd1] sm:w-16">STATUS</span>
          Accepting new work
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[13px] text-[#0f172a]">
          <span className="w-14 flex-shrink-0 text-[#1c6fd1] sm:w-16">REPLY</span>
          &lt; 24h, weekdays
        </div>

        <div className="mt-9 flex gap-3">
  
   
  <a href="https://www.youtube.com/channel/UCPSvLDpVXuoGF7A4316n79A"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="YouTube"
  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(28,111,209,0.25)] text-[#4b5563] transition-colors hover:border-[#3aa0ff] hover:text-[#3aa0ff]"
>
  <FaYoutube size={18} />
</a>
  
    <a href="https://wa.me/923338974835"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(28,111,209,0.25)] text-[#4b5563] transition-colors hover:border-[#3aa0ff] hover:text-[#3aa0ff]"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.876.52 3.63 1.42 5.13L2 22l4.99-1.396A9.94 9.94 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.09a8.06 8.06 0 01-4.343-1.264l-.312-.185-3.033.848.833-2.955-.202-.31A8.05 8.05 0 013.91 12c0-4.463 3.63-8.09 8.091-8.09 4.462 0 8.09 3.627 8.09 8.09 0 4.462-3.628 8.09-8.09 8.09z" />
    </svg>
  </a>
</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className="font-mono text-[11px] text-[#4b5563]">
            NAME
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-[3px] border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8] px-3.5 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#3aa0ff]"
          />
          <span className="min-h-[14px] font-mono text-[11px] text-[#dc2626]">
            {formErrors.name}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="font-mono text-[11px] text-[#4b5563]">
            EMAIL
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-[3px] border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8] px-3.5 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#3aa0ff]"
          />
          <span className="min-h-[14px] font-mono text-[11px] text-[#dc2626]">
            {formErrors.email}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="c-message" className="font-mono text-[11px] text-[#4b5563]">
            MESSAGE
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full resize-y rounded-[3px] border border-[rgba(28,111,209,0.25)] bg-[#f5f6f8] px-3.5 py-3 text-sm text-[#0f172a] outline-none transition-colors focus:border-[#3aa0ff]"
          />
          <span className="min-h-[14px] font-mono text-[11px] text-[#dc2626]">
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
  className="border-t border-[rgba(28,111,209,0.15)] px-5 py-20 text-center sm:px-8 sm:py-24 md:px-10 md:py-32"
>
  <h2 className="reveal mb-6 font-mono text-[10vw] font-extrabold tracking-tight xs:text-4xl sm:text-6xl md:text-7xl">
    END TRANSMISSION
  </h2>
  <p className="reveal mx-auto mb-10 max-w-md text-sm leading-7 text-[#4b5563] sm:text-base">
    If you've got something worth building, that's the whole pitch.
  </p>
  <div className="reveal flex justify-center px-2">
    
     <a href="mailto:hello@example.com"
      ref={(el) => setMagneticRef(el, 3)}
      className="max-w-full break-all rounded-[3px] border border-[#3aa0ff] bg-[#3aa0ff] px-5 py-4 text-center font-mono text-[11px] font-semibold text-[#050a14] transition-colors hover:bg-[#6cc0ff] sm:px-7 sm:text-xs"
    >
      rahim.dev132008@gmail.com
    </a>
  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col items-center gap-3 border-t border-[rgba(28,111,209,0.15)] px-5 py-6 text-center font-mono text-[11px] text-[#4b5563] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left md:px-10">
  <span>RK © 2026</span>
  <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
    <a href="#about" className="transition-colors hover:text-[#1c6fd1]">
      About
    </a>
    <a href="#projects" className="transition-colors hover:text-[#1c6fd1]">
      Projects
    </a>
    <a href="#contact" className="transition-colors hover:text-[#1c6fd1]">
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
  className="fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-[#3aa0ff] text-[#050a14] shadow-lg transition-all duration-300 sm:bottom-6 sm:right-6"
  style={{
    opacity: showBackToTop ? 1 : 0,
    pointerEvents: showBackToTop ? "auto" : "none",
  }}
>
  <ArrowUp size={18} />
</button>
{showLaunchPopup && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6"
    onClick={() => setShowLaunchPopup(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[280px] max-h-[90vh] overflow-y-auto rounded-lg border border-[#3aa0ff] bg-[#ffffff] p-5 text-center shadow-xl xs:max-w-xs sm:max-w-sm sm:p-8"
    >
      <h3 className="mb-2 font-mono text-base font-bold text-[#0f172a] sm:text-lg">
        Launching Soon
      </h3>
      <p className="mb-6 text-sm leading-6 text-[#4b5563]">
        This project isn't live yet — check back soon.
      </p>
      <button
        onClick={() => setShowLaunchPopup(false)}
        className="w-full rounded-full border border-[#3aa0ff] bg-[#3aa0ff] px-5 py-2.5 font-mono text-xs font-semibold text-[#050a14] transition-colors hover:bg-[#6cc0ff] sm:w-auto"
      >
        CLOSE
      </button>
    </div>
  </div>
)}

      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #ffffff; }
        ::selection { background: #3aa0ff; color: #0f172a; }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.05) 0px,
            rgba(0,0,0,0.05) 1px,
            transparent 1px,
            transparent 3px
          );
          mix-blend-mode: multiply;
          opacity: 0.6;
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
          filter: drop-shadow(0 0 5px rgba(58,160,255,0.4));
          transition: transform 0.3s ease;
        }
        .nav-link-electric:hover {
          color: #1c6fd1;
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
          0%, 100% { opacity: 1; text-shadow: 0 0 8px rgba(58,160,255,0.4); }
          45% { opacity: 0.9; text-shadow: 0 0 4px rgba(58,160,255,0.3); }
          50% { opacity: 1; text-shadow: 0 0 10px rgba(58,160,255,0.45); }
          70% { opacity: 0.85; text-shadow: 0 0 3px rgba(58,160,255,0.25); }
        }

        /* ---------------- Electric project cards ---------------- */
        @property --card-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .electric-card {
          isolation: isolate;
          box-shadow: 0 0 0 1px rgba(28,111,209,0.15);
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
          box-shadow: 0 0 14px rgba(58,160,255,0.15), 0 0 1px rgba(58,160,255,0.25);
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
          0%, 100% { box-shadow: 0 0 12px rgba(58,160,255,0.12), 0 0 1px rgba(58,160,255,0.2); }
          48% { box-shadow: 0 0 8px rgba(58,160,255,0.08), 0 0 1px rgba(58,160,255,0.12); }
          52% { box-shadow: 0 0 18px rgba(58,160,255,0.18), 0 0 2px rgba(58,160,255,0.28); }
        }

        /* ---------------- Project image hover reveal ---------------- */
        .project-image-wrap {
          background: #f5f6f8;
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
            rgba(58, 160, 255, 0.3),
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

/* Mobile: no hover, so always show the button, with transparent background */
@media (max-width: 639px) {
  .go-live-btn {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    background: transparent;
    backdrop-filter: none;
  }
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

                /* ---------------- Gold coin 3D background ---------------- */
        .gold-coin-bg {
          width: 260px;
          height: 260px;
          opacity: 0;
          
        }
        @media (min-width: 768px) {
          .gold-coin-bg { width: 380px; height: 380px; }
        }
        .gold-coin-bg canvas {
          display: block;
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
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .hero-photo-frame:hover .hero-photo-glow {
          opacity: 0.7;
          filter: brightness(1.2);
        }
        .hero-photo-frame:hover {
          filter: drop-shadow(0 0 22px rgba(58,160,255,0.18));
        }
        .profile-photo-wrap {
          background: #f5f6f8;
          box-shadow: 0 0 0 1px rgba(58,160,255,0.15);
          transition: box-shadow 0.35s ease;
        }
        .profile-photo-wrap:hover {
          box-shadow: 0 0 0 1px rgba(58,160,255,0.4), 0 0 14px rgba(58,160,255,0.18);
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
            rgba(58,160,255,0.08) 0px,
            rgba(58,160,255,0.08) 1px,
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