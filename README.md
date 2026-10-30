# Gyaanify

Learn from scratch. Build real skills. Test your understanding.

- Live site (Firebase): https://gyaanify-web.web.app
- Live site (GitHub Pages): https://shierenk.github.io/gyaanify/

Gyaanify is a **static website**: plain HTML, CSS and JavaScript. There is no database and no framework, so it runs anywhere. Its graphite, lavender and lime design is shared across generated pages, with a light/dark mode toggle, a practice check after every lesson and a My learning progress dashboard.

---

## Run it on your computer

### Option 1: just open it (no setup)

1. Download or clone this repository.
2. Double-click `index.html` to open it in your browser.

Everything works this way, including search and lesson progress.

### Option 2: run a local web server (recommended)

A local server behaves exactly like the live site. Use **one** of these from inside the project folder.

**Python** (already installed on most Mac/Linux machines):

```bash
python -m http.server 8000
```

**Node.js:**

```bash
npx serve .
```

**Firebase CLI:**

```bash
firebase serve --only hosting
```

Then open http://localhost:8000 (or the address the command prints).

> **Windows tip:** if PowerShell says "running scripts is disabled", add `.cmd` to the command, for example `npx.cmd serve .` or `firebase.cmd serve --only hosting`.

---

## Project structure

```
gyaanify-website/
├── index.html              Home page
├── paths.html              Curriculum paths (topic filter and lesson search)
├── mylearning.html         My learning: progress dashboard saved on this device
├── path-*.html             One page per learning path (lessons)
├── build-hack.html         Project-building and hackathon hub
├── test.html               No-signup assessment catalog and test experience
├── azure.html              Azure certification roadmap
├── cert-*.html             Study material for each certification
├── resources.html          Free learning resources
├── 404.html                Page-not-found page
├── assets/
│   ├── style.css           Shared graphite, lavender and lime styles
│   └── app.js              Search, filters, progress, assessments and insights
├── favicon.svg             Browser-tab icon
├── src/                    Source used to generate the pages (not published)
│   ├── content.py          All lesson, certification and resource text
│   ├── checks.py           Practice-check question for each lesson
│   ├── build.py            Generates the HTML pages from content.py
│   ├── style.css           Source stylesheet
│   └── app_src.js          Source JavaScript
├── firebase.json           Firebase Hosting settings
└── .nojekyll               Tells GitHub Pages to publish files as they are
```

---

## Edit content

All text lives in `src/content.py`:

- `PATHS`: learning paths and their lessons
- `ASSESSMENTS`: assessment questions, answer keys and lesson references
- `CERTS`: Azure certifications and their study material
- `RESOURCES`: links on the Resources page

After editing, rebuild the pages (needs Python 3) from the project folder:

```bash
python src/build.py .
```

Then check the result locally (see above) before publishing. The learning paths catalog excludes the Hackathon Playbook, which remains available through the separate Build & Hack hub. The Test section currently contains multiple-choice assessments with browser-side scoring; it does not execute code or require an account.

---

## Publish changes

**Firebase Hosting:**

```bash
firebase deploy --only hosting
```

**GitHub (also updates GitHub Pages):**

```bash
git add .
git commit -m "Describe your change"
git push
```

---

## Contributing

Found a mistake or want to suggest a topic? Open an issue or a pull request on GitHub.
