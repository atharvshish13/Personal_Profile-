# Atharvshish Barwat — Personal Portfolio

<div align="center">

# ATHARVSHISH BARWAT
### Full Stack Developer & AI/ML Student
**Dream. Build. Create The Future.**

🌐 **Live Website:** [www.atharvshish.in](https://www.atharvshish.in) &bull; 💻 **GitHub:** [@atharvshish13](https://github.com/atharvshish13) &bull; 💼 **LinkedIn:** [Atharvshish Barwat](https://linkedin.com/in/atharvshishbarwat13022007) &bull; 📸 **Instagram:** [@atharvshish_7615_](https://www.instagram.com/atharvshish_7615_)

</div>

---

## 🌟 Overview
A world-class, cinematic, and responsive personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with an Apple-level minimalist developer aesthetic, glassmorphism, dynamic typing hero, and full light/dark mode support.

## 🚀 Key Sections & Features
- **Cinematic Hero Experience**: Photographic portrait with atmospheric cyan/blue lighting, canvas particle network, and animated roles.
- **About Me**: Interactive Bento Grid showcasing education (B.Tech in CSE - AI & ML), technical focus, and goals.
- **Technical Skills**: Animated bento grid spanning Python, Java, JavaScript, React.js, Node.js, Firebase, Google Cloud, and Android Studio.
- **Professional Experience**: Interactive vertical timeline detailing work as Full Stack Engineer & Technical Advisor at *Shri Multy Service*.
- **Featured Projects**:
  - **Shri Multy Service** (React.js, Node.js, Firebase, Android)
  - **Campus Nest** (Academic Guidance & Student Support Platform)
  - **Drishti Setu** (AI-Powered Landslide Detection System)
  - **MJ Assistant** (AI Personal Desktop Assistant)
- **Certifications Gallery**: Interactive searchable gallery with modal previews.
- **Achievements**: Eased real-time counter statistics.
- **Services**: Web Development, Android Apps, Full Stack, AI Solutions, API Integration, and Automation.
- **Building The Future with AI**: Dedicated AI/ML journey and future tech goals.
- **Contact Form & Location**: Server-delivered contact messages and visitor confirmations through Resend, Google Map of Amravati, and direct Instagram connection.

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/atharvshish13/Personal_Profile-.git

# Navigate to project folder
cd Personal_Profile-

# Install dependencies
npm install --legacy-peer-deps

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live website.

## ✉️ Contact Email Setup

The contact form uses a server-side Next.js route and Resend. Static export is disabled, so deploy to a server-capable Next.js host such as Vercel or a Node.js server.

1. Create a Resend API key and verify the domain used for the sender address.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
3. Add those same environment variables to your hosting provider. Keep the API key private; never use a `NEXT_PUBLIC_` prefix.

The form sends the inquiry to `CONTACT_TO_EMAIL` and sends a separate receipt to the visitor.

## 📦 Production Build

```bash
npm run build
```

The build produces a Next.js application that must run on a server-capable host for the contact form API to work.

---

## 📄 License
© 2026 Atharvshish Barwat. All Rights Reserved.
