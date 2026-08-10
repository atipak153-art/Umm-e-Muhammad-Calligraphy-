/* ============================================================================
   EDIT THIS FILE TO UPDATE YOUR SITE'S CONTENT
   ----------------------------------------------------------------------------
   This is the only file you should need to touch for day-to-day changes:
   course info, prices, video links, payment links, and testimonials.
   After editing, save the file and redeploy (Vercel/Netlify redeploy
   automatically when you push the change to GitHub).

   You do NOT need to understand React to edit this file — it's just a list
   of text, numbers, and links in a structured format. Keep the punctuation
   (commas, quotes, curly braces) exactly as it is; only change the text
   between quotes, or numbers.
============================================================================ */

export const COURSES = [
  {
    id: "en-brush", // used internally — don't change once a payment link uses it
    track: "english", // "english" or "urdu"
    titleEn: "Modern Brush Lettering Foundations",
    level: "Beginner", // Beginner / Intermediate / Advanced
    weeks: 4,
    price: 49, // in dollars

    // VIDEO: to attach a real video for ALL visitors, add a line like this
    // inside a lesson below:  videoUrl: "https://youtube.com/watch?v=XXXXXXXX"

    // PAYMENTS: to make this course purchasable, uncomment the line below
    // and paste your Stripe Payment Link (see README.md "Setting up payments").
    // Until then, this course shows a free "(demo)" enroll button.
    // paymentLink: "https://buy.stripe.com/xxxxxxxxxxxx",

    blurb: "Build confident, flowing brush-pen letterforms from your very first stroke.",
    lessons: [
      { id: "l1", title: "Holding the Brush & Basic Strokes", duration: "18 min", desc: "Grip, pressure control, and the up-stroke/down-stroke foundation every letter is built from." },
      { id: "l2", title: "Lowercase Alphabet Drills", duration: "26 min", desc: "Form all 26 lowercase letters with consistent slant and rhythm." },
      { id: "l3", title: "Uppercase & Connecting Letters", duration: "24 min", desc: "Capitals, and the joins that make words feel like one continuous line." },
      { id: "l4", title: "Words & Spacing", duration: "20 min", desc: "Letter spacing, word spacing, and keeping a baseline steady by eye." },
      { id: "l5", title: "Composing a Quote Piece", duration: "30 min", desc: "Lay out and letter a short quote, from thumbnail sketch to final ink." },
      { id: "l6", title: "Final Project Review", duration: "15 min", desc: "Self-critique checklist and where to go after this course." },
    ],
  },
  {
    id: "en-copperplate",
    track: "english",
    titleEn: "Classic Copperplate Calligraphy",
    level: "Intermediate",
    weeks: 6,
    price: 79,
    // paymentLink: "https://buy.stripe.com/xxxxxxxxxxxx",
    blurb: "The pointed-pen script behind wedding invitations and formal correspondence.",
    lessons: [
      { id: "l1", title: "Pointed Pen Setup & Ink Flow", duration: "22 min", desc: "Choosing a nib, flexing pressure, and troubleshooting scratchy lines." },
      { id: "l2", title: "Basic Strokes & Ovals", duration: "20 min", desc: "Hairlines, shades, and the oval drill that trains your hand." },
      { id: "l3", title: "Lowercase Letterforms I", duration: "28 min", desc: "The first thirteen lowercase letters, grouped by shared movement." },
      { id: "l4", title: "Lowercase Letterforms II", duration: "28 min", desc: "The remaining letters, including the trickier ascenders and descenders." },
      { id: "l5", title: "Uppercase Majuscules", duration: "26 min", desc: "Ornamental capitals and how to keep them legible, not just decorative." },
      { id: "l6", title: "Flourishing Basics", duration: "24 min", desc: "Adding swashes and loops without overwhelming the letterform." },
      { id: "l7", title: "Envelope Addressing", duration: "18 min", desc: "Laying out an envelope so it reads at a glance and photographs well." },
      { id: "l8", title: "Wedding Invitation Project", duration: "35 min", desc: "A full formal piece from pencil guideline to finished ink." },
    ],
  },
  {
    id: "ur-nastaliq",
    track: "urdu",
    titleEn: "Nastaliq Foundations",
    titleUr: "نستعلیق کی بنیاد",
    level: "Beginner",
    weeks: 5,
    price: 59,
    // paymentLink: "https://buy.stripe.com/xxxxxxxxxxxx",
    blurb: "The flowing, cascading script used for Urdu poetry, from qalam to first couplet.",
    lessons: [
      { id: "l1", title: "Intro to Qalam & Ink", titleUr: "قلم اور دوات کا تعارف", duration: "20 min", desc: "Cutting a reed pen, mixing ink, and the seated posture Nastaliq is written from." },
      { id: "l2", title: "Basic Letters: Alif to Ha", titleUr: "بنیادی حروف: الف تا ح", duration: "25 min", desc: "The first group of letters and their isolated forms." },
      { id: "l3", title: "Joins & Proportion", titleUr: "جوڑ اور نسبت", duration: "27 min", desc: "How letters lean into each other and the diagonal rhythm of the script." },
      { id: "l4", title: "The Full Alphabet", titleUr: "مکمل حروف تہجی", duration: "30 min", desc: "Completing the alphabet with initial, medial, and final forms." },
      { id: "l5", title: "Word Practice", titleUr: "الفاظ کی مشق", duration: "22 min", desc: "Common words and the sitting/rising rhythm between letters." },
      { id: "l6", title: "Writing a Couplet", titleUr: "ایک شعر کی کتابت", duration: "32 min", desc: "Composing a full she'r with correct spacing and diacritics." },
    ],
  },
  {
    id: "ur-naskh",
    track: "urdu",
    titleEn: "Naskh Script Mastery",
    titleUr: "خط نسخ",
    level: "Intermediate",
    weeks: 6,
    price: 89,
    // paymentLink: "https://buy.stripe.com/xxxxxxxxxxxx",
    blurb: "The clear, upright script used for print, Qur'anic text, and formal Urdu prose.",
    lessons: [
      { id: "l1", title: "Intro to Naskh", titleUr: "نسخ کا تعارف", duration: "18 min", desc: "How Naskh differs from Nastaliq, and why it's used for long-form text." },
      { id: "l2", title: "Letterforms", titleUr: "حروف کی بناوٹ", duration: "26 min", desc: "Building each letter's isolated and joined shapes with even weight." },
      { id: "l3", title: "Diacritics & Dots", titleUr: "اعراب اور نقطے", duration: "20 min", desc: "Placing i'raab and nuqta precisely without cluttering the line." },
      { id: "l4", title: "Writing a Verse", titleUr: "آیت کی کتابت", duration: "28 min", desc: "A guided line-by-line piece with correct letter proportion." },
      { id: "l5", title: "Page Layout Basics", titleUr: "صفحہ آرائی", duration: "24 min", desc: "Margins, line spacing, and simple illumination borders." },
      { id: "l6", title: "Practice & Review", titleUr: "مشق اور نظرثانی", duration: "20 min", desc: "Common mistakes and how to self-correct them." },
      { id: "l7", title: "Final Piece", titleUr: "حتمی منصوبہ", duration: "34 min", desc: "A complete finished Naskh composition, ready to frame." },
    ],
  },
  // To add a new course, copy one of the blocks above (from the opening { to
  // the closing },) and paste it here, then change every field to match.
];

export const TESTIMONIALS = [
  { name: "Amelia R.", track: "English · Copperplate", quote: "I went from shaky cursive to lettering my own wedding invitations in six weeks. The stroke-by-stroke pacing made all the difference." },
  { name: "Hassan A.", track: "Urdu · Nastaliq", quote: "میں نے کبھی سوچا نہیں تھا کہ آن لائن نستعلیق سیکھ سکوں گا۔ ہر سبق واضح اور صبر سے سکھایا گیا ہے۔" },
  { name: "Priya K.", track: "English · Brush Lettering", quote: "The lesson-by-lesson checklist kept me honest. Ten weeks in and I'm lettering gifts for the whole family." },
  // Add more testimonials the same way — copy a line, change the text.
];

export const SITE = {
  schoolName: "Umm e Muhammad",
  heroHeadline: "Learn the Art of\nBeautiful Writing",
  heroHeadlineUrdu: "خطاطی کا فن سیکھیں",
  heroSubtext: "Live-taught, video-guided lessons in English calligraphy and hand lettering, and Urdu Nastaliq & Naskh — for absolute beginners through to advanced hands.",
  stats: [
    { n: "500+", l: "Students Taught" },
    { n: "2", l: "Scripts, English & Urdu" },
    { n: "4", l: "Structured Courses" },
    { n: "4.9★", l: "Average Rating" },
  ],
  aboutHeadline: "Trained in two scripts, taught in one classroom",
  aboutBody: "Every course here is built around small, gradable strokes — the same way both English copperplate and Urdu Nastaliq are traditionally taught: one letter, one join, one line at a time. Classes are self-paced with recorded lessons, plus live monthly critique sessions where you can share your practice pages.",
  footerNote: "Umm e Muhammad Calligraphy School. Taught with ink, patience, and practice.",
};
