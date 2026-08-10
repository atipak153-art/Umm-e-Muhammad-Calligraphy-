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
    <footer className="border-t border-[#D9CBA8] py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo className="w-4 h-4 text-[#7C2D2D]" />
          <span className="font-serif-display text-lg text-[#17181A]">{SITE.schoolName}</span>
        </div>
        <p className="font-sans text-xs text-[#3A3733]">© 2026 {SITE.footerNote}</p>
      </div>
    </footer>
  );
}

/* ------------------------------ ONBOARD MODAL ------------------------------ */

function OnboardModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("english");

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSave({ name, email, track, joined: new Date().toISOString() });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#17181A]/60 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-[#F6EFDD] border border-[#D9CBA8] rounded-sm max-w-md w-full p-8 relative">
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-[#3A3733] hover:text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
          <X className="w-5 h-5" />
        </button>
        <Sparkles className="w-6 h-6 text-[#A8801C] mb-3" />
        <h2 className="font-serif-display text-2xl text-[#17181A] mb-1">Create Your Profile</h2>
        <p className="font-serif-body text-sm text-[#3A3733] mb-6">Set up a free profile to enroll in courses and track your lesson progress.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="ob-name" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Your Name</label>
            <input id="ob-name" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]" />
          </div>
          <div>
            <label htmlFor="ob-email" className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Email</label>
            <input id="ob-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm font-serif-body text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]" />
          </div>
          <div>
            <span className="block font-sans text-xs tracking-wide uppercase text-[#3A3733] mb-1.5">Which script interests you most?</span>
            <div className="flex gap-2">
              {["english", "urdu", "both"].map((t) => (
                <button type="button" key={t} onClick={() => setTrack(t)}
                  className={`flex-1 py-2.5 rounded-sm border font-sans text-sm capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] ${track === t ? "bg-[#17181A] text-[#F6EFDD] border-[#17181A]" : "border-[#D9CBA8] text-[#3A3733]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-[#7C2D2D] text-[#F6EFDD] font-sans text-sm tracking-wide rounded-sm hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------ COURSE DETAIL ------------------------------ */

function CourseDetail({ course, enrolled, completed, onEnroll, onToggleLesson, onClose, videoLinks, onSetVideoLink }) {
  const [activeLesson, setActiveLesson] = useState(course.lessons[0].id);
  const [editingVideo, setEditingVideo] = useState(false);
  const [videoInput, setVideoInput] = useState("");
  const lesson = course.lessons.find((l) => l.id === activeLesson);
  const isUrdu = course.track === "urdu";
  const doneCount = completed.length;
  const pct = Math.round((doneCount / course.lessons.length) * 100);
  const currentVideoUrl = lesson.videoUrl || videoLinks[lesson.id];
  const embedUrl = toEmbedUrl(currentVideoUrl);

  useEffect(() => {
    setEditingVideo(false);
    setVideoInput(currentVideoUrl || "");
  }, [activeLesson]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 bg-[#17181A]/70 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <div className="bg-[#F6EFDD] rounded-sm max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between p-6 border-b border-[#D9CBA8]">
          <div>
            <p className="font-sans text-[11px] tracking-wide uppercase text-[#7C2D2D] mb-1">{course.level} · {course.weeks} weeks</p>
            <h2 className="font-serif-display text-2xl text-[#17181A]">{course.titleEn}</h2>
            {isUrdu && <p dir="rtl" className="font-urdu text-xl text-[#3A3733] mt-0.5">{course.titleUr}</p>}
          </div>
          <button onClick={onClose} aria-label="Close course" className="text-[#3A3733] hover:text-[#17181A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!enrolled ? (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
            <p className="font-serif-body text-[#3A3733] max-w-sm mb-5">{course.blurb}</p>
            {course.paymentLink ? (
              <a href={course.paymentLink} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 bg-[#7C2D2D] text-[#F6EFDD] font-sans text-sm tracking-wide rounded-sm hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
                Enroll — ${course.price}
              </a>
            ) : (
              <>
                <button onClick={onEnroll} className="px-7 py-3 bg-[#7C2D2D] text-[#F6EFDD] font-sans text-sm tracking-wide rounded-sm hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
                  Enroll — ${course.price} (demo)
                </button>
                <p className="font-sans text-[11px] text-[#3A3733] mt-3 max-w-xs">No payment link connected yet for this course — enrolling here is free for testing. See README.md to connect Stripe.</p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
            <div className="sm:w-64 border-b sm:border-b-0 sm:border-r border-[#D9CBA8] overflow-y-auto">
              <div className="px-5 py-4">
                <div className="flex items-center justify-between font-sans text-xs text-[#3A3733] mb-1.5">
                  <span>Progress</span><span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#EAE0C4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7C2D2D] transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <ul>
                {course.lessons.map((l, idx) => {
                  const done = completed.includes(l.id);
                  return (
                    <li key={l.id}>
                      <button onClick={() => setActiveLesson(l.id)}
                        className={`w-full text-left px-5 py-3 flex items-start gap-2.5 border-l-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] ${activeLesson === l.id ? "border-[#7C2D2D] bg-[#EAE0C4]" : "border-transparent hover:bg-[#EAE0C4]/60"}`}>
                        <span className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${done ? "bg-[#7C2D2D] border-[#7C2D2D]" : "border-[#A8801C]"}`}>
                          {done && <Check className="w-2.5 h-2.5 text-[#F6EFDD]" />}
                        </span>
                        <span>
                          <span className="block font-sans text-xs text-[#3A3733]">Lesson {idx + 1}</span>
                          <span className="block font-serif-body text-sm text-[#17181A]">{l.title}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {embedUrl && !editingVideo ? (
                <div className="relative mb-3 group">
                  <div className="aspect-video rounded-sm overflow-hidden">
                    <iframe
                      key={embedUrl}
                      src={embedUrl}
                      title={lesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <button onClick={() => setEditingVideo(true)}
                    className="absolute top-2 right-2 text-[11px] font-sans px-2.5 py-1 rounded-sm bg-[#17181A]/80 text-[#F6EFDD] opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]">
                    Change video
                  </button>
                </div>
              ) : (
                <div className="aspect-video bg-[#17181A] rounded-sm flex flex-col items-center justify-center mb-3 text-center px-6">
                  <PenLine className="w-8 h-8 text-[#A8801C] mb-2" strokeWidth={1.25} />
                  <p className="font-sans text-xs tracking-wide text-[#D9CBA8] mb-3">
                    {editingVideo ? "Paste a YouTube or Vimeo link for this lesson" : "No video added for this lesson yet"}
                  </p>
                  {editingVideo && (
                    <div className="flex gap-2 w-full max-w-sm">
                      <input
                        value={videoInput}
                        onChange={(e) => setVideoInput(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="flex-1 px-3 py-2 rounded-sm bg-[#F6EFDD] text-[#17181A] font-sans text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]"
                      />
                      <button
                        onClick={() => { onSetVideoLink(lesson.id, videoInput); setEditingVideo(false); }}
                        className="px-3 py-2 rounded-sm bg-[#7C2D2D] text-[#F6EFDD] font-sans text-xs shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              )}
              {!editingVideo && (
                <button onClick={() => setEditingVideo(true)} className="font-sans text-xs text-[#7C2D2D] hover:underline mb-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C] rounded-sm">
                  {embedUrl ? "Replace this video" : "+ Add a video link for this lesson"}
                </button>
              )}
              {lesson.titleUr && <p dir="rtl" className="font-urdu text-2xl text-[#17181A] mb-1">{lesson.titleUr}</p>}
              <h3 className="font-serif-display text-2xl text-[#17181A] mb-1">{lesson.title}</h3>
              <p className="font-sans text-xs text-[#3A3733] mb-4 flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{lesson.duration}</p>
              <p className="font-serif-body text-[#3A3733] leading-relaxed mb-6">{lesson.desc}</p>
              <button onClick={() => onToggleLesson(lesson.id)}
                className={`px-5 py-2.5 rounded-sm font-sans text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C] ${completed.includes(lesson.id) ? "border border-[#17181A] text-[#17181A]" : "bg-[#17181A] text-[#F6EFDD] hover:bg-black"}`}>
                {completed.includes(lesson.id) ? "Mark as Not Complete" : "Mark Lesson Complete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- DASHBOARD --------------------------------- */

function Dashboard({ profile, enrollments, onOpenCourse, setPage }) {
  const enrolledCourses = COURSES.filter((c) => enrollments[c.id]);
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#7C2D2D] mb-2">Welcome back</p>
      <h1 className="font-serif-display text-3xl sm:text-4xl text-[#17181A] mb-10">{profile.name.split(" ")[0]}'s Dashboard</h1>

      {enrolledCourses.length === 0 ? (
        <div className="bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm p-10 text-center">
          <BookOpen className="w-8 h-8 text-[#A8801C] mx-auto mb-3" />
          <p className="font-serif-body text-[#3A3733] mb-5">You haven't enrolled in a course yet.</p>
          <button onClick={() => setPage("courses")} className="px-6 py-2.5 bg-[#7C2D2D] text-[#F6EFDD] font-sans text-sm rounded-sm hover:bg-[#661F1F] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8801C]">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {enrolledCourses.map((c) => {
            const completed = enrollments[c.id]?.completed || [];
            const pct = Math.round((completed.length / c.lessons.length) * 100);
            return (
              <button key={c.id} onClick={() => onOpenCourse(c.id)} className="text-left bg-[#FBF7EC] border border-[#D9CBA8] rounded-sm p-6 hover:border-[#A8801C] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8801C]">
                <h3 className="font-serif-display text-xl text-[#17181A] mb-3">{c.titleEn}</h3>
                <div className="flex items-center justify-between font-sans text-xs text-[#3A3733] mb-1.5">
                  <span>{completed.length} / {c.lessons.length} lessons</span><span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#EAE0C4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7C2D2D]" style={{ width: `${pct}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div>
        <h2 className="font-serif-display text-xl text-[#17181A] mb-5">More Courses</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {COURSES.filter((c) => !enrollments[c.id]).map((c) => (
            <CourseCard key={c.id} course={c} enrolled={false} onOpen={onOpenCourse} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- APP ------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);
  const [openCourseId, setOpenCourseId] = useState(null);
  const { profile, saveProfile, clearProfile, enrollments, saveEnrollments, loaded } = useProfile();
  const { links: videoLinks, setLink: setVideoLink } = useVideoLinks();

  useEffect(() => { setMenuOpen(false); }, [page]);

  // Handles the redirect back from a Stripe Payment Link (?enrolled=<courseId>)
  // and unlocks that course once payment succeeds.
  useEffect(() => {
    if (!loaded) return;
    const params = new URLSearchParams(window.location.search);
    const paidCourseId = params.get("enrolled");
    if (!paidCourseId || !COURSES.some((c) => c.id === paidCourseId)) return;

    if (profile) {
      setEnrollmentsAfterPayment(paidCourseId);
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      try { localStorage.setItem("qalam_pending_enrollment", paidCourseId); } catch (e) { /* ignore */ }
      setShowOnboard(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, profile]);

  const setEnrollmentsAfterPayment = async (courseId) => {
    const next = { ...enrollments, [courseId]: enrollments[courseId] || { completed: [] } };
    await saveEnrollments(next);
  };

  const handleOpenCourse = (id) => {
    if (!profile) { setShowOnboard(true); return; }
    setOpenCourseId(id);
  };

  const handleEnroll = async () => {
    const next = { ...enrollments, [openCourseId]: { completed: [] } };
    await saveEnrollments(next);
  };

  const handleToggleLesson = async (lessonId) => {
    const cur = enrollments[openCourseId] || { completed: [] };
    const has = cur.completed.includes(lessonId);
    const nextCompleted = has ? cur.completed.filter((x) => x !== lessonId) : [...cur.completed, lessonId];
    const next = { ...enrollments, [openCourseId]: { ...cur, completed: nextCompleted } };
    await saveEnrollments(next);
  };

  const openCourse = COURSES.find((c) => c.id === openCourseId);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#F6EFDD] flex items-center justify-center">
        <PenLine className="w-6 h-6 text-[#A8801C] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6EFDD]">
      <Header page={page} setPage={setPage} profile={profile} onOpenOnboard={() => setShowOnboard(true)} onLogout={clearProfile} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {page === "home" && (
        <>
          <Hero setPage={setPage} onOpenOnboard={() => setShowOnboard(true)} />
          <StatsBar />
          <About />
          <Courses enrollments={enrollments} onOpen={handleOpenCourse} />
          <Testimonials />
          <Contact />
        </>
      )}

      {page === "courses" && (
        <div className="pt-6">
          <Courses enrollments={enrollments} onOpen={handleOpenCourse} />
        </div>
      )}

      {page === "about" && <div className="pt-6"><About /></div>}
      {page === "contact" && <div className="pt-6"><Contact /></div>}

      {page === "dashboard" && profile && (
        <Dashboard profile={profile} enrollments={enrollments} onOpenCourse={handleOpenCourse} setPage={setPage} />
      )}

      <Footer />

      {showOnboard && (
        <OnboardModal
          onClose={() => setShowOnboard(false)}
          onSave={async (p) => {
            await saveProfile(p);
            setShowOnboard(false);
            try {
              const pending = localStorage.getItem("qalam_pending_enrollment");
              if (pending) {
                await setEnrollmentsAfterPayment(pending);
                localStorage.removeItem("qalam_pending_enrollment");
                window.history.replaceState({}, "", window.location.pathname);
              }
            } catch (e) { /* ignore */ }
            setPage("dashboard");
          }}
        />
      )}

      {openCourse && (
        <CourseDetail
          course={openCourse}
          enrolled={!!enrollments[openCourse.id]}
          completed={enrollments[openCourse.id]?.completed || []}
          onEnroll={handleEnroll}
          onToggleLesson={handleToggleLesson}
          onClose={() => setOpenCourseId(null)}
          videoLinks={videoLinks}
          onSetVideoLink={setVideoLink}
        />
      )}
    </div>
  );
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

/* --------------------------------- INK SVG --
