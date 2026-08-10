import { useState, useEffect, useRef, useCallback } from "react";
import { PenLine, BookOpen, Check, X, Menu, Star, Clock, Layers, ChevronRight, ChevronLeft, Mail, User as UserIcon, LogOut, Sparkles } from "lucide-react";
import { COURSES, TESTIMONIALS, SITE } from "./content.js";

/* ---------------------------------- DATA ---------------------------------- */
/* Course, testimonial, and site-text content now lives in src/content.js —
   edit that file for day-to-day changes. */

/* ------------------------------- STORAGE HOOK ------------------------------ */

function useProfile() {
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("qalam_profile");
      if (p) setProfile(JSON.parse(p));
    } catch (e) { /* no profile yet */ }
    try {
      const e = localStorage.getItem("qalam_enrollments");
      if (e) setEnrollments(JSON.parse(e));
    } catch (e) { /* none yet */ }
    setLoaded(true);
  }, []);

  const saveProfile = useCallback(async (p) => {
    setProfile(p);
    try { localStorage.setItem("qalam_profile", JSON.stringify(p)); } catch (e) { console.error(e); }
  }, []);

  const clearProfile = useCallback(async () => {
    setProfile(null);
    try { localStorage.removeItem("qalam_profile"); } catch (e) { /* ignore */ }
  }, []);

  const saveEnrollments = useCallback(async (next) => {
    setEnrollments(next);
    try { localStorage.setItem("qalam_enrollments", JSON.stringify(next)); } catch (e) { console.error(e); }
  }, []);

  return { profile, saveProfile, clearProfile, enrollments, saveEnrollments, loaded };
}

/* ------------------------------- VIDEO LINKS -------------------------------- */

// Converts a normal YouTube / Vimeo share link into an embeddable URL.
function toEmbedUrl(raw) {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) return url.toString();
      const id = url.searchParams.get("v") || url.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.hostname.includes("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url.toString();
  } catch (e) {
    return null;
  }
}

function useVideoLinks() {
  const [links, setLinks] = useState({});
  useEffect(() => {
    try {
      const stored = localStorage.getItem("qalam_videos");
      if (stored) setLinks(JSON.parse(stored));
    } catch (e) { /* none yet */ }
  }, []);
  const setLink = useCallback((lessonId, url) => {
    setLinks((prev) => {
      const next = { ...prev, [lessonId]: url };
      try { localStorage.setItem("qalam_videos", JSON.stringify(next)); } catch (e) { console.error(e); }
      return next;
    });
  }, []);
  return { links, setLink };
}

/* --------------------------------- INK SVG --------------------------------- */

function InkStroke({ className = "", width = 260, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} className={className} width={width} height="22" viewBox="0 0 260 22" fill="none" aria-hidden="true">
      <path
        d="M4 14 C 40 4, 70 20, 108 10 S 180 2, 210 12 S 245 18, 256 8"
        stroke="#A8801C"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="1"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: visible ? 0 : 1,
          transition: `stroke-dashoffset 1.1s cubic-bezier(.65,.05,.36,1) ${delay}s`,
        }}
      />
    </svg>
  );
}

/* --------------------------------- HEADER ---------------------------------- */

/* ------------------------------------ LOGO ---------------------------------- */
/* A custom nib mark instead of a generic icon — the split line and ink point
   echo a calligraphy pen nib, in keeping with both English and Urdu scripts. */
function Logo({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 4 C 29 9, 29 31, 20 36 C 11 31, 11 9, 20 4 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="20" y1="13" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="17.5" r="1.4" fill="#A8801C" />
    </svg>
  );
}

function Header({ page, setPage, profile, onOpenOnboard, onLogout, menuOpen, setMenuOpen }) {
  const nav = [
    { key: "home", label: "Home" },
    { key: "courses", label: "Courses" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-[#F6EFDD]/95 backdrop-blur border-b border-[#D9CBA8]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button onClick={() => setPage("home")} className="flex items-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
          <Logo className="w-5 h-5 text-[#7C2D2D]" />
          <span className="font-serif-display text-xl tracking-wide text-[#17181A]">{SITE.schoolName}</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => setPage(n.key)}
              className={`font-sans text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm ${page === n.key ? "text-[#7C2D2D]" : "text-[#3A3733] hover:text-[#17181A]"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {profile ? (
            <>
              <button onClick={() => setPage("dashboard")} className="text-sm font-sans px-4 py-2 rounded-sm border border-[#17181A] text-[#17181A] hover:bg-[#17181A] hover:text-[#F6EFDD] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]">
                My Dashboard
              </button>
              <button onClick={onLogout} aria-label="Sign out" className="p-2 text-[#3A3733] hover:text-[#7C2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button onClick={onOpenOnboard} className="text-sm font-sans px-4 py-2 rounded-sm bg-[#7C2D2D] text-[#F6EFDD] hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
              Get Started
            </button>
          )}
        </div>

        <button className="md:hidden p-2 text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#D9CBA8] bg-[#F6EFDD] px-5 py-4 flex flex-col gap-3">
          {nav.map((n) => (
            <button key={n.key} onClick={() => { setPage(n.key); setMenuOpen(false); }} className="text-left font-sans text-sm text-[#3A3733] py-1">
              {n.label}
            </button>
          ))}
          {profile ? (
            <button onClick={() => { setPage("dashboard"); setMenuOpen(false); }} className="text-left font-sans text-sm text-[#7C2D2D] py-1">My Dashboard</button>
          ) : (
            <button onClick={() => { onOpenOnboard(); setMenuOpen(false); }} className="text-left font-sans text-sm text-[#7C2D2D] py-1">Get Started</button>
          )}
        </div>
      )}
    </header>
  );
}

/* --------------------------------- SECTIONS --------------------------------- */

function Hero({ setPage, onOpenOnboard }) {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#7C2D2D] mb-5">Online Calligraphy School</p>
      <h1 className="font-serif-display text-[2.6rem] leading-[1.05] sm:text-6xl text-[#17181A] mb-3 whitespace-pre-line">
        {SITE.heroHeadline}
      </h1>
      <p dir="rtl" className="font-urdu text-3xl sm:text-4xl text-[#17181A] mb-2 leading-relaxed">{SITE.heroHeadlineUrdu}</p>
      <div className="flex justify-center my-5">
        <InkStroke />
      </div>
      <p className="font-serif-body text-[#3A3733] max-w-xl mx-auto text-lg mb-9">
        {SITE.heroSubtext}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={() => setPage("courses")} className="px-7 py-3 bg-[#17181A] text-[#F6EFDD] font-sans text-sm tracking-wide rounded-sm hover:bg-[#000] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
          Explore Courses
        </button>
        <button onClick={onOpenOnboard} className="px-7 py-3 border border-[#17181A] text-[#17181A] font-sans text-sm tracking-wide rounded-sm hover:bg-[#17181A] hover:text-[#F6EFDD] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
          Book a Free Trial Class
        </button>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-[#D9CBA8] bg-[#F0E7D0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {SITE.stats.map((s) => (
          <div key={s.l}>
            <div className="font-serif-display text-3xl text-[#7C2D2D]">{s.n}</div>
            <div className="font-sans text-xs tracking-wide text-[#3A3733] mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-[1fr_1.3fr] gap-10 items-center">
      <div className="aspect-[4/5] rounded-sm bg-[#EAE0C4] border border-[#D9CBA8] flex items-center justify-center">
        <PenLine className="w-16 h-16 text-[#A8801C]" strokeWidth={1} />
      </div>
      <div>
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#7C2D2D] mb-3">Your Instructor</p>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#17181A] mb-4">{SITE.aboutHeadline}</h2>
        <p className="font-serif-body text-[#3A3733] mb-4 leading-relaxed">
          {SITE.aboutBody}
        </p>
        <ul className="font-sans text-sm text-[#3A3733] space-y-2">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C2D2D]" /> Beginner-friendly, no prior art background needed</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C2D2D]" /> Downloadable practice sheets for every lesson</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C2D2D]" /> Lifetime access to enrolled courses</li>
        </ul>
      </div>
    </section>
  );
}

function CourseCard({ course, enrolled, onOpen }) {
  const isUrdu = course.track === "urdu";
  return (
    <button onClick={() => onOpen(course.id)} className="text-left bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm p-6 hover:border-[#A8801C] transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]">
      <div className="flex items-center justify-between mb-4">
        <span className="font-sans text-[11px] tracking-wide uppercase px-2 py-1 bg-[#F0E7D0] text-[#7C2D2D] rounded-sm">{course.level}</span>
        {enrolled && <span className="font-sans text-[11px] tracking-wide uppercase px-2 py-1 bg-[#7C2D2D] text-[#F6EFDD] rounded-sm">Enrolled</span>}
      </div>
      <h3 className="font-serif-display text-2xl text-[#17181A] mb-1 group-hover:text-[#7C2D2D] transition-colors">{course.titleEn}</h3>
      {isUrdu && <p dir="rtl" className="font-urdu text-xl text-[#3A3733] mb-2">{course.titleUr}</p>}
      <p className="font-serif-body text-sm text-[#3A3733] mb-4 leading-relaxed">{course.blurb}</p>
      <div className="flex items-center gap-4 font-sans text-xs text-[#3A3733]">
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.weeks} weeks</span>
        <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{course.lessons.length} lessons</span>
        <span className="ml-auto font-serif-display text-lg text-[#17181A]">${course.price}</span>
      </div>
    </button>
  );
}

function Courses({ enrollments, onOpen }) {
  const english = COURSES.filter((c) => c.track === "english");
  const urdu = COURSES.filter((c) => c.track === "urdu");
  return (
    <section id="courses" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#7C2D2D] mb-3">Two Scripts, One School</p>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#17181A]">Choose Your Track</h2>
      </div>

      <div className="mb-14">
        <h3 className="font-serif-display text-xl text-[#17181A] mb-5 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#A8801C]" /> English Calligraphy &amp; Lettering</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {english.map((c) => <CourseCard key={c.id} course={c} enrolled={!!enrollments[c.id]} onOpen={onOpen} />)}
        </div>
      </div>

      <div>
        <h3 className="font-serif-display text-xl text-[#17181A] mb-5 flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#A8801C]" /> Urdu Calligraphy — <span dir="rtl" className="font-urdu text-2xl">خطاطی</span></h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {urdu.map((c) => <CourseCard key={c.id} course={c} enrolled={!!enrollments[c.id]} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const isUrdu = /[\u0600-\u06FF]/.test(t.quote);
  return (
    <section className="bg-[#17181A] py-20">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#A8801C] mb-8">Student Voices</p>
        <p className={`text-[#F6EFDD] mb-6 leading-relaxed ${isUrdu ? "font-urdu text-2xl" : "font-serif-body italic text-xl"}`} dir={isUrdu ? "rtl" : "ltr"}>
          {isUrdu ? t.quote : `"${t.quote}"`}
        </p>
        <p className="font-sans text-sm text-[#D9CBA8]">{t.name} · {t.track}</p>
        <div className="flex justify-center gap-3 mt-8">
          <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-2 text-[#D9CBA8] hover:text-[#F6EFDD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % TESTIMONIALS.length)} className="p-2 text-[#D9CBA8] hover:text-[#F6EFDD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: "English Calligraphy", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-5 sm:px-8 py-20">
      <div className="text-center mb-10">
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#7C2D2D] mb-3">Get In Touch</p>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#17181A]">Book a Free Trial Class</h2>
      </div>

      {submitted ? (
        <div className="bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm p-8 text-center">
          <Check className="w-8 h-8 text-[#7C2D2D] mx-auto mb-3" />
          <p className="font-serif-display text-xl text-[#17181A] mb-1">Thanks, {form.name.split(" ")[0]}.</p>
          <p className="font-serif-body text-sm text-[#3A3733]">Your request has been noted. We'll reach out at {form.email} to schedule your free trial class.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Name</label>
            <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]" />
          </div>
          <div>
            <label htmlFor="email" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Email</label>
            <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]" />
          </div>
          <div>
            <label htmlFor="interest" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">I'm interested in</label>
            <select id="interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]">
              <option>English Calligraphy</option>
              <option>Urdu Calligraphy</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Message (optional)</label>
            <textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]" />
          </div>
          <button type="submit" className="w-full py-3 bg-[#7C2D2D] text-[#F6EFDD] font-sans text-sm tracking-wide rounded-sm hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
            Send Request
          </button>
        </form>
      )}
    </section>
  );
}

function Footer() {
  return (
   
