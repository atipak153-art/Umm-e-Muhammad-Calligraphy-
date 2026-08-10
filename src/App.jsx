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

/* --------------------------------- INK SVG --
