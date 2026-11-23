import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

import {
  ArrowUpRight,
  ArrowUp,
  Terminal,
  Download,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Video,
  Sparkles,
  Zap,
} from "lucide-react";

import {
  fadeUp,
  scaleIn,
  staggerContainer,
  cardHover,
  buttonHover,
  buttonTap,
} from "../lib/motion.js";
import { Reveal, StaggerContainer } from "../components/Reveal.jsx";

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
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789926486/ffaabbbf-1ba5-4194-b751-e6c74690afd0.png",
  },
  {
    title: "Youtube Atomation",
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789926396/5eaa007e-b880-45ee-90c2-5c42437efa13.png",
  },
  {
    title: "Backend Development",
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789926419/1f216569-a38d-4683-aeb0-1e0d5cb32ac7.png",
  },
  {
    title: "Frontend Development",
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789926462/27fd713c-a523-4348-b0b2-8013dd33d434.png",
  },
  {
    title: "video Editing",
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789927141/594de0e8-5f8c-4872-8fc2-3d86d72fd1da.png",
  },
  {
    title: "content creation",
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_500/v1789927466/26116ccd-19d6-40c0-bf15-3638dee5eb2d.png",
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
    meta: "01 — BS COMPUTER SCIENCE",
    title: "IMCB-H9, Islamabad",
    body: "Currently studying for a BS in Computer Science.",
  },
  {
    meta: "02 — INTERNSHIP",
    title: "Full-Stack Web Developer, Sayed Tag Companies",
    body: "1-year internship — worked on full-stack web development.",
  },
  {
    meta: "02 — FRONTEND WEB DEVELOPMENT",
    title: "Sayed Software Institute, Bannu",
    body: "Completed a course in Frontend Web Development.",
  },
  {
    meta: "03 — BACKEND WEB DEVELOPMENT",
    title: "SSI, Bannu",
    body: "Completed a course in Backend Web Development.",
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
    tags: ["react", "MongoDB", "Node.js", "tailwind css", "Express", "framer motion"],
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_700/v1789913366/da8c373e-012e-4cf2-960b-cfaa3bae392d.png",
    link: "https://www.ssibannu.com/ ",
  },
  {
    idx: "ENTRY_02",
    title: "Education finder system",
    summary:
      "A headless commerce backend built to serve three different storefronts from one source of truth.",
    details:
      "Designed a GraphQL API on top of a normalized MongoDB schema, with Redis caching on hot product queries. Cut average response time by 60% under peak load during a seasonal traffic spike.",
    tags: ["react", "MongoDB", "Node.js", "tailwind css", "Express", "framer motion"],
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_700/v1789913993/4f712c70-40d8-40c3-afa4-2ad72df5ccac.png",
    link: "#",
  },
  {
    idx: "ENTRY_03",
    title: "Advanced attandance system",
    summary:
      "Led the migration of a legacy CSS codebase to a token-based, component-driven design system.",
    details:
      "Replaced roughly 30,000 lines of ad-hoc CSS with a shared component library, cutting new-feature styling time by half and eliminating an entire class of visual regressions across the product.",
    tags: ["react", "MongoDB", "Node.js", "tailwind css", "Express", "framer motion"],
    image:
      "https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_700/v1789922637/d7a12d0a-e181-4d07-83ea-b097165776b3_1.png",
    link: "https://smart-attandance01.vercel.app/",
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
   MAIN COMPONENT
============================================================= */

export default function Home() {
  const [showLaunchPopup, setShowLaunchPopup] = useState(false);
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const coinContainerRef = useRef(null);
  const timelineContainerRef = useRef(null);

  /* Scroll-linked dynamic electric wire extension for My Journey timeline */
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 65%", "end 75%"],
  });
  const timelineWireScale = useSpring(timelineProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const sparkTipTop = useTransform(
    timelineWireScale,
    (val) => `${Math.min(Math.max(val, 0) * 100, 100)}%`
  );
  const sparkTipOpacity = useTransform(timelineWireScale, (val) =>
    val > 0.03 && val < 0.99 ? 1 : 0
  );

  const [openProject, setOpenProject] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [statValues, setStatValues] = useState(STATS.map(() => 0));
  const [skillFills, setSkillFills] = useState(
    SKILL_GROUPS.map((g) => g.skills.map(() => 0))
  );

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const sparkCanvasRef = useRef(null);

  /* -----------------------------------------------------------
     ELECTRIC LIGHTNING SPARKS ON PHOTO HOVER
  ----------------------------------------------------------- */
  useEffect(() => {
    if (!isPhotoHovered) {
      const canvas = sparkCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = sparkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;

    const pad = 28;
    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);

    const pw = w - pad * 2;
    const ph = h - pad * 2;
    const verts = [
      { x: pad + 0.22 * pw, y: pad },
      { x: pad + 0.78 * pw, y: pad },
      { x: pad + pw, y: pad + 0.22 * ph },
      { x: pad + pw, y: pad + 0.78 * ph },
      { x: pad + 0.78 * pw, y: pad + ph },
      { x: pad + 0.22 * pw, y: pad + ph },
      { x: pad, y: pad + 0.78 * ph },
      { x: pad, y: pad + 0.22 * ph },
    ];

    const sparks = [];

    function drawBranch(x1, y1, x2, y2, displace, depth = 0) {
      if (depth > 3 || displace < 3) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return;
      }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
      drawBranch(x1, y1, midX, midY, displace * 0.55, depth + 1);
      drawBranch(midX, midY, x2, y2, displace * 0.55, depth + 1);
    }

    function render() {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 10;

      const boltCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < boltCount; i++) {
        const edgeIdx = Math.floor(Math.random() * 8);
        const p1 = verts[edgeIdx];
        const p2 = verts[(edgeIdx + 1) % 8];
        const t = Math.random();
        const startX = p1.x + (p2.x - p1.x) * t;
        const startY = p1.y + (p2.y - p1.y) * t;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const boltLen = Math.random() * 22 + 10;
        const endX = startX + nx * boltLen + (Math.random() - 0.5) * 14;
        const endY = startY + ny * boltLen + (Math.random() - 0.5) * 14;

        drawBranch(startX, startY, endX, endY, 10);

        if (sparks.length < 30) {
          sparks.push({
            x: startX,
            y: startY,
            vx: nx * (Math.random() * 3 + 1.2) + (Math.random() - 0.5) * 2,
            vy: ny * (Math.random() * 3 + 1.2) + (Math.random() - 0.5) * 2,
            alpha: 1,
            size: Math.random() * 2.2 + 0.8,
          });
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.055;
        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(0, 240, 255, ${sp.alpha})`;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, w, h);
    };
  }, [isPhotoHovered]);

  /* -----------------------------------------------------------
     PARTICLE FIELD (Calm 2D canvas background)
  ----------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
        60,
        Math.floor((window.innerWidth * window.innerHeight) / 16000)
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.4,
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
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        canvasCtx.beginPath();
        canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        canvasCtx.fillStyle = "rgba(8, 126, 156, 0.2)";
        canvasCtx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(a.x, a.y);
            canvasCtx.lineTo(b.y, b.y);
            canvasCtx.strokeStyle = `rgba(8, 126, 156, ${0.05 * (1 - dist / 100)})`;
            canvasCtx.lineWidth = 0.5;
            canvasCtx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* -----------------------------------------------------------
     BACK TO TOP VISIBILITY
  ----------------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  /* -----------------------------------------------------------
     GOLD COIN — 3D scroll-driven background (Three.js)
     UNTOUCHED: Exactly matches original 3D implementation.
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
     FORM HANDLING (Unchanged business logic)
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

  /* =============================================================
     RENDER
  ============================================================= */

  return (
    <div
      ref={rootRef}
      className="home-page relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-light)] text-[var(--text-primary)]"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      />

      {/* 3D Gold Coin (UNTOUCHED - Rule 6) */}
      <div
        ref={coinContainerRef}
        className="gold-coin-bg pointer-events-none fixed left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div
        className="soft-streak pointer-events-none fixed inset-0 z-[1]"
        aria-hidden="true"
      />

      <main className="relative z-[3]">
        {/* ================= NAV ================= */}
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/85 px-4 py-3 backdrop-blur-md transition-all sm:px-8">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
            <a href="#" className="flex flex-shrink-0 items-center gap-2.5" aria-label="RK Home">
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 hover:scale-105"
              >
                <rect
                  x="2"
                  y="2"
                  width="44"
                  height="44"
                  rx="12"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  fill="var(--accent-light)"
                />
                <path
                  d="M13 33V15h7.8c3.4 0 5.9 2.2 5.9 5.4 0 2.3-1.3 4.1-3.4 4.9L27 33h-4l-3.6-7.4h-2.6V33h-3.8z"
                  fill="var(--accent)"
                />
                <path
                  d="M16.8 18.2v4.6h3.6c1.6 0 2.7-1 2.7-2.3s-1.1-2.3-2.7-2.3h-3.6z"
                  fill="var(--bg-surface)"
                />
                <path
                  d="M28.5 33V15h3.8v7.6l6.3-7.6h4.5l-7 8.2L43.3 33h-4.6l-5.1-7.3-1.3 1.5V33h-3.8z"
                  fill="var(--primary-dark)"
                />
              </svg>
              <span className="hidden font-mono text-xs font-bold tracking-wider text-[var(--text-primary)] sm:inline-block">
                RAHIM.DEV
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-[var(--text-secondary)] md:flex lg:gap-9">
              <a href="#" className="transition-colors hover:text-[var(--accent)]">
                Home
              </a>
              <a href="#about" className="transition-colors hover:text-[var(--accent)]">
                About
              </a>
              <a href="#skills" className="transition-colors hover:text-[var(--accent)]">
                Skills
              </a>
              <a href="#projects" className="transition-colors hover:text-[var(--accent)]">
                Projects
              </a>
              <a href="#contact" className="transition-colors hover:text-[var(--accent)]">
                Contact
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="#timeline"
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="flex items-center gap-1.5 rounded-full border border-[var(--accent)] bg-transparent px-5 py-2 font-mono text-xs font-semibold text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                MY JOURNEY
              </motion.a>
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-lg p-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--accent)] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 px-6 py-5 shadow-xl backdrop-blur-md md:hidden"
              >
                <a
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg py-2.5 text-base font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  Contact
                </a>
                <a
                  href="#timeline"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--accent)] bg-[var(--accent-light)] px-5 py-2 font-mono text-xs font-semibold text-[var(--accent)]"
                >
                  MY JOURNEY
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ================= HERO (Load Animation via Framer Motion) ================= */}
        <section className="flex min-h-[92vh] flex-col justify-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32 md:px-10 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.1, 0.1)}
              className="w-full text-center lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--accent)] shadow-sm"
              >
                <Sparkles size={13} className="text-[var(--accent)]" />
                <span>FULL-STACK DEVELOPER & CREATOR</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl lg:text-[5.2rem] lg:leading-[1.05]"
              >
                RAHIM KHAN
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:mb-10 sm:text-lg md:text-xl lg:mx-0"
              >
                I build modern digital products with code, motion and carefully
                engineered interfaces — from frontend experiences to backend
                systems.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
              >
                <motion.a
                  href="#about"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-7"
                >
                  ABOUT ME
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>

                <motion.a
                  href="/rahim-cv.pdf"
                  download="rahim-cv.pdf"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-3.5 font-mono text-xs font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-7"
                >
                  DOWNLOAD CV
                  <Download
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Hero photo frame with distinct electric current border & hover spark effects */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
              className="relative mx-auto h-72 w-56 flex-shrink-0 cursor-pointer xs:h-80 xs:w-64 sm:h-96 sm:w-72 lg:mx-0 lg:ml-auto lg:h-[26rem] lg:w-80 select-none group"
              style={{
                filter: isPhotoHovered
                  ? "drop-shadow(0 0 28px rgba(0, 240, 255, 0.55))"
                  : "drop-shadow(0 0 16px rgba(8, 126, 156, 0.3))",
                transition: "filter 0.3s ease",
              }}
            >
              {/* Electric spark canvas leaping outside the border on hover */}
              <canvas
                ref={sparkCanvasRef}
                className="pointer-events-none absolute -inset-7 z-20 h-[calc(100%+56px)] w-[calc(100%+56px)]"
              />

              <div
                className="relative h-full w-full p-[3.5px] transition-all duration-300"
                style={{
                  clipPath: OCTAGON_CLIP,
                  WebkitClipPath: OCTAGON_CLIP,
                  backgroundColor: "rgba(8, 126, 156, 0.25)",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  willChange: "transform, clip-path",
                }}
              >
                {/* Flowing electric current arc (White lightning core + electric cyan aura) */}
                <motion.div
                  animate={{
                    rotate: 360,
                    opacity: isPhotoHovered
                      ? [1, 0.85, 1, 0.9, 1]
                      : [0.92, 1, 0.95, 1, 0.92],
                  }}
                  transition={{
                    rotate: {
                      duration: isPhotoHovered ? 1.4 : 2.6,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="pointer-events-none absolute -inset-[100%] m-auto h-[300%] w-[300%]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(8,126,156,0.15) 70%, rgba(0,240,255,0.45) 78%, #00d8ff 86%, #38bdf8 92%, #ffffff 96%, #ffffff 98.5%, transparent 100%)",
                    filter: isPhotoHovered
                      ? "drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 14px #00f0ff) drop-shadow(0 0 28px rgba(0,240,255,0.95))"
                      : "drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 8px #00f0ff) drop-shadow(0 0 18px rgba(8,126,156,0.85))",
                  }}
                />

                {/* Inner Octagon container with photo */}
                <div
                  className="profile-photo-wrap relative h-full w-full bg-[var(--bg-surface)]"
                  style={{
                    clipPath: OCTAGON_CLIP,
                    WebkitClipPath: OCTAGON_CLIP,
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    willChange: "transform, clip-path",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/gp4dzet9/image/upload/f_auto,q_auto,w_400/IMG_0578"
                    alt="RK"
                    className="profile-img relative z-[3] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  />
                  {isFinePointer && (
                    <>
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
                    </>
                  )}
                  <div className="profile-scan pointer-events-none absolute inset-0 z-[4]" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mt-12 flex w-full max-w-[1200px] items-center justify-center gap-2 font-mono text-[11px] font-medium tracking-wider text-[var(--text-muted)] sm:mt-16 lg:justify-start"
          >
            <Terminal size={14} className="text-[var(--accent)]" />
            <span>SCROLL TO EXPLORE</span>
          </motion.div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-4 sm:py-5 shadow-sm">
          <div className="home-marquee-track flex w-max gap-8 sm:gap-12">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] sm:text-sm"
              >
                {item}
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
            ))}
          </div>
        </div>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
        >
          {/* Ambient subtle glow blobs */}
          <div
            className="pointer-events-none absolute -left-40 top-10 h-[320px] w-[320px] rounded-full opacity-30 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, var(--accent-glow), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-0 h-[300px] w-[300px] rounded-full opacity-25 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, var(--accent-glow), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16 lg:gap-20">
              {/* LEFT — CONTENT */}
              <div className="text-center md:text-left">
                <Reveal variants={fadeUp}>
                  <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                    ABOUT ME
                  </span>
                </Reveal>

                <Reveal variants={fadeUp} delay={0.08}>
                  <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                    Turning Ideas Into{" "}
                    <span className="text-[var(--accent)]">
                      Digital Experiences.
                    </span>
                  </h2>
                </Reveal>

                <Reveal variants={fadeUp} delay={0.16}>
                  <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-[var(--text-muted)] sm:text-lg md:mx-0">
                    I'm a passionate Web Developer focused on building modern,
                    responsive, and high-quality web experiences. I enjoy
                    turning ideas into clean, interactive, and user-friendly
                    digital products.
                  </p>
                </Reveal>

                <Reveal variants={fadeUp} delay={0.24}>
                  <motion.a
                    href="#projects"
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    VIEW MY WORK
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.a>
                </Reveal>
              </div>

              {/* RIGHT — VISUAL */}
              <Reveal variants={scaleIn}>
                <div className="relative mx-auto h-[320px] w-full max-w-[380px] sm:h-[420px] sm:max-w-[440px]">
                  {/* Clean rounded-2xl glass code-editor card */}
                  <div className="about-glass-card absolute inset-0 m-auto flex h-[210px] w-[270px] flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 shadow-[var(--shadow-md)] backdrop-blur-xl sm:h-[260px] sm:w-[330px]">
                    <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      <span className="ml-3 font-mono text-[11px] text-[var(--text-muted)]">
                        dev.tsx
                      </span>
                    </div>
                    <div className="flex-1 px-5 py-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
                      <div>
                        <span className="text-[var(--accent)]">const</span>{" "}
                        <span className="text-[var(--text-primary)] font-semibold">
                          build
                        </span>{" "}
                        = () =&gt; {"{"}
                      </div>
                      <div className="pl-4 text-[var(--text-muted)]">
                        // crafting clean UI
                      </div>
                      <div className="pl-4">
                        <span className="text-[var(--accent)]">return</span>{" "}
                        &lt;
                        <span className="text-[var(--text-primary)] font-semibold">
                          Experience
                        </span>{" "}
                        /&gt;;
                      </div>
                      <div>{"}"}</div>
                      <div className="mt-2 inline-block h-4 w-1.5 animate-pulse bg-[var(--accent)]" />
                    </div>
                  </div>

                  {/* Floating tech badges */}
                  <span className="about-badge absolute left-4 top-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--accent)] shadow-sm backdrop-blur-sm sm:left-2 sm:top-4">
                    React
                  </span>
                  <span className="about-badge about-badge-delay-1 absolute right-2 top-12 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-sm sm:right-0 sm:top-14">
                    Node.js
                  </span>
                  <span className="about-badge about-badge-delay-2 absolute left-1 bottom-16 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--accent)] shadow-sm backdrop-blur-sm sm:-left-4 sm:bottom-20">
                    MongoDB
                  </span>
                  <span className="about-badge about-badge-delay-3 absolute right-4 bottom-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-sm sm:right-2 sm:bottom-6">
                    Tailwind CSS
                  </span>
                  <span className="about-badge about-badge-delay-4 absolute left-14 top-0 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-sm sm:left-10 sm:-top-2">
                    JavaScript
                  </span>
                  <span className="about-badge about-badge-delay-2 absolute right-0 top-1/2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--accent)] shadow-sm backdrop-blur-sm sm:-right-3">
                    Framer Motion
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        {/* ================= SKILLS ================= */}
        <section id="skills" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <Reveal variants={fadeUp}>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                // 02 — CAPABILITIES
              </span>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.08}>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                What I'm Actually Good At.
              </h2>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.16}>
              <p className="mb-12 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mb-16">
                A quick visual look at the skills I bring to every project.
              </p>
            </Reveal>

            <StaggerContainer
              staggerChildren={0.08}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  variants={fadeUp}
                  whileHover={cardHover}
                  className="electric-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] p-5"
                >
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--bg-surface-elevated)]">
                    <img
                      src={skill.image}
                      alt={skill.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <span className="mb-1 block font-mono text-xs font-semibold text-[var(--accent)]">
                    SKILL_0{i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)] sm:text-lg">
                    {skill.title}
                  </h3>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        {/* ================= TIMELINE ================= */}
        <section id="timeline" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <Reveal variants={fadeUp}>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                // 03 — MY JOURNEY
              </span>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.08}>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                My Education Journey
              </h2>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.16}>
              <p className="mb-12 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mb-16">
                The short version of my academic path — the degrees, the courses,
                and the milestones that shaped where I am today.
              </p>
            </Reveal>

            <div ref={timelineContainerRef} className="relative max-w-3xl pl-10 sm:pl-14">
              {/* Background Guide Wire Base Track */}
              <div className="absolute bottom-4 left-[18px] top-4 z-0 w-[2px] -translate-x-1/2 rounded-full bg-[var(--border-subtle)] opacity-40 sm:left-[24px]" />

              {/* 1. Atmospheric Electric Glow Aura extending along with scroll */}
              <motion.div
                style={{
                  scaleY: timelineWireScale,
                  transformOrigin: "top",
                  boxShadow:
                    "0 0 8px rgba(0, 216, 255, 0.7), 0 0 18px rgba(8, 126, 156, 0.4)",
                }}
                className="pointer-events-none absolute bottom-4 left-[18px] top-4 z-0 w-[3px] -translate-x-1/2 rounded-full sm:left-[24px]"
              />

              {/* 2. Physical Live High-Voltage Cable extending downwards on scroll */}
              <motion.div
                style={{ scaleY: timelineWireScale, transformOrigin: "top" }}
                className="absolute bottom-4 left-[18px] top-4 z-0 w-[3px] -translate-x-1/2 overflow-hidden rounded-full sm:left-[24px]"
              >
                {/* Static Cyan/Deep-Teal Electric Conductor Base */}
                <div className="absolute inset-0 w-full bg-gradient-to-b from-[#087e9c] via-[#00d8ff] to-[#087e9c] opacity-90" />

                {/* Central White-Hot Filament Wire */}
                <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-white/95 shadow-[0_0_3px_#ffffff]" />

                {/* Primary Travelling High-Voltage Lightning Bolt */}
                <motion.div
                  animate={{ y: ["-100%", "360%"] }}
                  transition={{
                    duration: 2.1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-32 left-0 h-52 w-full bg-gradient-to-b from-transparent via-[#ffffff] to-transparent shadow-[0_0_8px_#ffffff,0_0_16px_#00f0ff]"
                />

                {/* Secondary Fast Cyan Tracer Surge */}
                <motion.div
                  animate={{ y: ["-100%", "360%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: 0.75,
                    ease: "linear",
                  }}
                  className="absolute -top-20 left-0 h-28 w-full bg-gradient-to-b from-transparent via-[#00f0ff] to-transparent opacity-95 shadow-[0_0_7px_#00f0ff]"
                />

                {/* Tertiary Micro Electric Spark Beads */}
                <motion.div
                  animate={{ y: ["-100%", "360%"] }}
                  transition={{
                    duration: 0.95,
                    repeat: Infinity,
                    delay: 1.3,
                    ease: "linear",
                  }}
                  className="absolute -top-12 left-0 h-16 w-full bg-gradient-to-b from-transparent via-white to-transparent opacity-90 shadow-[0_0_6px_#ffffff]"
                />
              </motion.div>

              {/* 3. Leading Electric Spark Head riding the extending wire tip */}
              <motion.div
                style={{
                  top: sparkTipTop,
                  opacity: sparkTipOpacity,
                }}
                className="pointer-events-none absolute left-[18px] z-20 -translate-x-1/2 -translate-y-1/2 sm:left-[24px]"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative flex items-center justify-center text-white"
                >
                  <Zap size={16} className="fill-white text-[#00f0ff] drop-shadow-[0_0_6px_#ffffff,0_0_12px_#00f0ff]" />
                </motion.div>
                <div className="absolute -inset-1 rounded-full bg-[#00f0ff]/45 blur-[2px]" />
              </motion.div>

              {/* 4. Sequential Milestones Revealing Point-by-Point on Scroll (whileInView) */}
              <div className="flex flex-col">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35, margin: "-30px 0px" }}
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className={`relative ${i === TIMELINE.length - 1 ? "" : "pb-12 sm:pb-16"}`}
                  >
                    {/* Horizontal Electric Power Feeder Bridge (Connecting Wire to Card) */}
                    <motion.div
                      variants={{
                        hidden: { scaleX: 0, opacity: 0 },
                        visible: {
                          scaleX: 1,
                          opacity: 1,
                          transition: {
                            duration: 0.45,
                            delay: 0.15,
                            ease: "easeOut",
                          },
                        },
                      }}
                      style={{ transformOrigin: "left" }}
                      className="pointer-events-none absolute -left-[22px] top-7 z-10 h-[2px] w-[22px] overflow-hidden bg-gradient-to-r from-[#00d8ff] via-[#38bdf8] to-[rgba(0,216,255,0.35)] shadow-[0_0_5px_#00f0ff] sm:-left-[32px] sm:w-[32px]"
                    >
                      {/* Horizontal travelling electric pulse shooting directly into the card */}
                      <motion.div
                        animate={{ x: ["-100%", "150%"] }}
                        transition={{
                          duration: 1.3,
                          repeat: Infinity,
                          delay: i * 0.32,
                          ease: "linear",
                        }}
                        className="h-full w-4 bg-white shadow-[0_0_6px_#ffffff]"
                      />
                    </motion.div>

                    {/* Electric Terminal Junction Node */}
                    <motion.div
                      variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            type: "spring",
                            stiffness: 280,
                            damping: 18,
                          },
                        },
                      }}
                      className="pointer-events-none absolute -left-[22px] top-7 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:-left-[32px]"
                    >
                      {/* Pulsing Electric Halo Shockwave */}
                      <motion.span
                        animate={{
                          scale: [1, 2.1, 1],
                          opacity: [0.55, 0, 0.55],
                        }}
                        transition={{
                          duration: 1.9,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: "easeOut",
                        }}
                        className="absolute -inset-2 rounded-full border border-[#00f0ff] bg-[#00f0ff]/20 blur-[1px]"
                      />

                      {/* Outer Terminal Metal & Neon Ring */}
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#00f0ff] bg-[#0a1e2b] shadow-[0_0_8px_#00f0ff,inset_0_0_4px_#00d8ff]">
                        {/* White-Hot Electric Core Spark */}
                        <motion.span
                          animate={{
                            scale: [0.85, 1.3, 0.85],
                            opacity: [0.85, 1, 0.85],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.25,
                            ease: "easeInOut",
                          }}
                          className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_#ffffff,0_0_10px_#00f0ff]"
                        />
                      </span>

                      {/* Crackling Electric Micro-Sparks around Terminal */}
                      <motion.span
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                          scale: [0.7, 1.15, 0.75, 1.2, 0.7],
                          opacity: [0.25, 0.95, 0.2, 1, 0.25],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: i * 0.38,
                          ease: "linear",
                        }}
                        className="pointer-events-none absolute -inset-1.5 flex items-center justify-center text-[#00f0ff]"
                      >
                        <Zap size={14} className="fill-[#00f0ff] drop-shadow-[0_0_6px_#00f0ff]" />
                      </motion.span>
                    </motion.div>

                    {/* Milestone Card with Electric Border */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 25 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.55,
                            delay: 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="electric-card rounded-2xl border border-[var(--border-subtle)] p-5 sm:p-6"
                    >
                      <div className="mb-2 font-mono text-xs font-semibold text-[var(--accent)]">
                        {item.meta}
                      </div>
                      <h4 className="mb-2 text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.body}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        {/* ================= PROJECTS ================= */}
        <section id="projects" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <Reveal variants={fadeUp}>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                // 04 — SYSTEM LOG
              </span>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.08}>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                My Projects
              </h2>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.16}>
              <p className="mb-12 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mb-16">
                Hover a project to preview it — stack and scope at a glance.
              </p>
            </Reveal>

            <StaggerContainer
              staggerChildren={0.1}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.idx}
                  variants={fadeUp}
                  whileHover={cardHover}
                  className="electric-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] p-5"
                >
                  <div>
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--bg-surface-elevated)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Go Live Button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--primary-dark)]/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        {["ENTRY_01", "ENTRY_03"].includes(project.idx) ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-xs font-semibold text-[var(--primary-dark)] shadow-lg transition-transform duration-200 hover:scale-105"
                          >
                            GO LIVE
                            <ArrowUpRight size={13} className="text-[var(--accent)]" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLaunchPopup(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-xs font-semibold text-[var(--primary-dark)] shadow-lg transition-transform duration-200 hover:scale-105"
                          >
                            GO LIVE
                            <ArrowUpRight size={13} className="text-[var(--accent)]" />
                          </button>
                        )}
                      </div>
                    </div>

                    <span className="mb-1 block font-mono text-xs font-semibold text-[var(--accent)]">
                      {project.idx}
                    </span>
                    <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        {/* ================= TESTIMONIALS ================= */}
        <section
          id="testimonials"
          className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal variants={fadeUp}>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                // 06 — SIGNAL FROM OTHERS
              </span>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.08}>
              <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:mb-12 sm:text-4xl md:text-5xl">
                What it's like working together.
              </h2>
            </Reveal>

            <Reveal variants={scaleIn}>
              <div className="electric-card relative min-h-[260px] rounded-2xl border border-[var(--border-subtle)] p-6 sm:min-h-[220px] sm:p-10 md:p-12">
                <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--text-primary)] sm:text-lg">
                  {TESTIMONIALS[testiIndex].quote}
                </p>

                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-dark)] to-[var(--accent)] font-mono text-sm font-bold text-white shadow-sm">
                    {TESTIMONIALS[testiIndex].initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {TESTIMONIALS[testiIndex].name}
                    </div>
                    <div className="font-mono text-xs text-[var(--text-muted)]">
                      {TESTIMONIALS[testiIndex].role}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6">
                  <div className="flex gap-1.5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestiIndex(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className="flex h-6 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 ${
                            i === testiIndex
                              ? "w-6 bg-[var(--accent)]"
                              : "w-2 bg-[var(--border-strong)]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setTestiIndex(
                          (testiIndex - 1 + TESTIMONIALS.length) %
                            TESTIMONIALS.length
                        )
                      }
                      aria-label="Previous testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <ChevronLeft size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setTestiIndex((testiIndex + 1) % TESTIMONIALS.length)
                      }
                      aria-label="Next testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <hr className="border-t border-[var(--border-subtle)]" />
        </div>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <Reveal variants={fadeUp}>
              <span className="mb-3 inline-block rounded-full bg-[var(--accent-light)] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
                CONTACT ME
              </span>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.08}>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                Tell me what you're building.
              </h2>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.16}>
              <p className="mb-12 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mb-16">
                A few sentences on the problem is plenty to start — I'll follow up
                with the right questions.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
              {/* Left Column info */}
              <Reveal variants={fadeUp}>
                <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                  Based remotely, working across time zones. Usual response time
                  is under 24 hours on weekdays.
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    <span className="w-16 flex-shrink-0 font-semibold text-[var(--accent)]">
                      EMAIL
                    </span>
                    <span className="min-w-0 break-all font-sans font-medium">
                      rahim.dev132008@gmail.com
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    <span className="w-16 flex-shrink-0 font-semibold text-[var(--accent)]">
                      STATUS
                    </span>
                    <span className="font-sans font-medium">
                      Accepting new work
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    <span className="w-16 flex-shrink-0 font-semibold text-[var(--accent)]">
                      REPLY
                    </span>
                    <span className="font-sans font-medium">
                      &lt; 24h, weekdays
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <motion.a
                    href="https://www.youtube.com/channel/UCPSvLDpVXuoGF7A4316n79A"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <Video size={18} />
                  </motion.a>

                  <motion.a
                    href="https://wa.me/923338974835"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-muted)] shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <MessageCircle size={18} />
                  </motion.a>
                </div>
              </Reveal>

              {/* Right Column Form */}
              <Reveal variants={fadeUp} delay={0.1}>
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8"
                  noValidate
                >
                  <div className="mb-5 flex flex-col gap-1.5">
                    <label
                      htmlFor="c-name"
                      className="font-mono text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      NAME
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-light)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    <span className="min-h-[16px] font-mono text-[11px] text-rose-500">
                      {formErrors.name}
                    </span>
                  </div>

                  <div className="mb-5 flex flex-col gap-1.5">
                    <label
                      htmlFor="c-email"
                      className="font-mono text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      EMAIL
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-light)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    <span className="min-h-[16px] font-mono text-[11px] text-rose-500">
                      {formErrors.email}
                    </span>
                  </div>

                  <div className="mb-5 flex flex-col gap-1.5">
                    <label
                      htmlFor="c-message"
                      className="font-mono text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--bg-light)] px-4 py-3 text-sm text-[var(--text-primary)] transition-all placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    <span className="min-h-[16px] font-mono text-[11px] text-rose-500">
                      {formErrors.message}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      {submitting ? "SENDING..." : "SEND MESSAGE"}
                      {submitting && (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      )}
                    </motion.button>
                    {formStatus && (
                      <span className="font-mono text-xs font-medium text-[var(--accent)]">
                        {formStatus}
                      </span>
                    )}
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= SIGNOFF (Primary Dark Section #0f2a38) ================= */}
        <section
          id="signoff"
          className="mx-4 my-12 overflow-hidden rounded-3xl bg-[var(--primary-dark)] px-6 py-20 text-center text-white shadow-[var(--shadow-lg)] sm:mx-8 sm:py-24 md:mx-10 md:py-28"
        >
          <Reveal variants={fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              END TRANSMISSION
            </h2>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
              If you've got something worth building, that's the whole pitch.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <motion.a
              href="mailto:hello@example.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex max-w-full break-all rounded-full bg-white px-8 py-4 font-mono text-xs font-semibold text-[var(--primary-dark)] shadow-md transition-all hover:bg-[var(--accent-light)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
            >
              rahim.dev132008@gmail.com
            </motion.a>
          </Reveal>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] px-5 py-8 font-mono text-xs text-[var(--text-muted)] sm:flex-row sm:px-8">
          <span>RK © 2026</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="#about"
              className="transition-colors hover:text-[var(--accent)]"
            >
              About
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-[var(--accent)]"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-[var(--accent)]"
            >
              Contact
            </a>
          </div>
          <span className="font-medium text-[var(--text-muted)]">
            NO TRACKING / NO NOISE
          </span>
        </footer>
      </main>

      {/* ================= BACK TO TOP ================= */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-all hover:bg-[var(--accent-hover)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        style={{
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
      >
        <ArrowUp size={18} />
      </motion.button>

      {/* Launching Soon Modal */}
      <AnimatePresence>
        {showLaunchPopup && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--primary-dark)]/50 px-4 py-6 backdrop-blur-sm"
            onClick={() => setShowLaunchPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[320px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center shadow-2xl sm:max-w-sm sm:p-8"
            >
              <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">
                Launching Soon
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                This project isn't live yet — check back soon.
              </p>
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => setShowLaunchPopup(false)}
                className="w-full rounded-full bg-[var(--accent)] px-6 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] sm:w-auto"
              >
                CLOSE
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; background: var(--bg-light); }

        .soft-streak {
          background: linear-gradient(
            135deg,
            transparent 0%,
            var(--accent-glow) 40%,
            transparent 55%
          );
        }

        /* ---------------- About: glass card + floating badges ---------------- */
        .about-glass-card {
          animation: about-card-float 6s ease-in-out infinite;
        }
        @keyframes about-card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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
          50% { transform: translateY(-6px); }
        }

        /* ---------------- Gold coin 3D background (UNTOUCHED) ---------------- */
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

        /* ---------------- Hero photo ---------------- */
        .hero-photo-frame {
          transition: filter 0.35s ease, transform 0.35s ease;
        }
        .hero-photo-frame:hover {
          filter: drop-shadow(0 0 32px rgba(8, 126, 156, 0.45));
        }
        .profile-img {
          filter: grayscale(0.08) contrast(1.04);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-photo-frame:hover .profile-img {
          transform: scale(1.05);
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
        .hero-photo-frame:hover .profile-img-r {
          opacity: 0.55;
          animation: glitch-shift-r 0.35s steps(2) infinite;
        }
        .hero-photo-frame:hover .profile-img-b {
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
            var(--accent-glow) 0px,
            var(--accent-glow) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hero-photo-frame:hover .profile-scan {
          opacity: 0.85;
          animation: profile-flicker 0.9s steps(3) infinite;
        }
        @keyframes profile-flicker {
          0%, 100% { opacity: 0.85; }
          40% { opacity: 0.45; }
          60% { opacity: 0.7; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
