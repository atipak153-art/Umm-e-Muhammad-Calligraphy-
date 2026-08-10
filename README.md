# Qalam — Online Calligraphy School

A React + Vite + Tailwind site for teaching English and Urdu calligraphy online.

## Run it locally first (optional but recommended)
```bash
npm install
npm run dev
```
Open the local URL it prints — click through the whole site before deploying.

## Deploy it live (free, ~10 minutes)

**Step 1 — Put the code on GitHub**
1. Create a free account at github.com if you don't have one.
2. Create a new repository (e.g. `qalam-calligraphy-school`).
3. Upload this whole folder to it (drag-and-drop on github.com works, or use `git push` if you're comfortable with Git).

**Step 2 — Deploy with Vercel (recommended) or Netlify**
1. Go to vercel.com → sign up with your GitHub account (also free).
2. Click "Add New Project" → select your `qalam-calligraphy-school` repo.
3. Vercel auto-detects Vite. Leave the defaults and click **Deploy**.
4. In ~1 minute you'll get a live URL like `qalam-calligraphy-school.vercel.app`.

(Netlify works the same way: netlify.com → "Add new site" → "Import from GitHub".)

**Step 3 — Add your own domain (optional)**
1. Buy a domain (e.g. from Namecheap, Google Domains, or GoDaddy) — something like `qalamcalligraphy.com`.
2. In your Vercel/Netlify project settings, go to "Domains" and add it.
3. Follow the on-screen instructions to point your domain's DNS to Vercel/Netlify (usually just adding one or two records at your domain registrar).
4. Within a few hours it'll be live at your own domain.

## Setting up payments (Stripe Payment Links — no backend needed)

This site takes real payments using **Stripe Payment Links**, which need zero server code — Stripe hosts the secure checkout page for you.

1. Create a free account at stripe.com and finish activating it (needed to accept real charges).
2. In the Stripe Dashboard, go to **Product catalog** → **Add product**. Create one product per course (e.g. "Modern Brush Lettering Foundations", $49).
3. On that product, click **Create payment link**.
4. Under the payment link's settings, set **"After payment"** → **"Redirect to a website"**, and use:
   ```
   https://yoursite.com/?enrolled=en-brush
   ```
   Replace `yoursite.com` with your real deployed domain, and `en-brush` with that course's `id` from `src/App.jsx` (e.g. `en-brush`, `en-copperplate`, `ur-nastaliq`, `ur-naskh`).
5. Copy the generated payment link URL (looks like `https://buy.stripe.com/xxxxxxxx`).
6. In `src/App.jsx`, find that course in the `COURSES` array and add:
   ```js
   paymentLink: "https://buy.stripe.com/xxxxxxxx",
   ```
7. Redeploy (Vercel/Netlify redeploy automatically when you push to GitHub).

Once set up: a student clicks **Enroll**, pays on Stripe's secure page, and is redirected back to your site already enrolled with progress tracking unlocked. Courses without a `paymentLink` still show a free "(demo)" enroll button, so you can add courses one at a time.

**Note on refunds/disputes/taxes:** those are handled through your Stripe Dashboard directly — nothing extra to build for that.

## What's already working
- Real payments via Stripe Payment Links (see setup steps above) — no server required
- Full site: home, courses, about, contact
- English & Urdu course tracks with real lesson content, RTL Urdu text
- Student profile creation, course enrollment, and lesson-progress tracking (saved in the visitor's browser via `localStorage`)
- Real video embeds per lesson (YouTube/Vimeo — see "videoUrl" note in `src/App.jsx`)
- Contact / free-trial booking form

## Known limits to plan for next
- **Storage is per-browser**, not a real account system — a student's progress (and any video links added through the UI rather than in code) won't follow them to a different device. Fixing this means adding a real backend (e.g. Supabase or Firebase) for shared accounts.
- **The contact form doesn't send an email** — it just confirms on-screen. Needs a form backend (e.g. Formspree) or a real email service.
- **No admin dashboard** — enrollments, video links, and course info are edited directly in `src/App.jsx` and redeployed, rather than through a UI.
