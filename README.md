# 🚀 NEXUS

[![English](https://img.shields.io/badge/lang-English-blue?style=flat-square)](./README.md) [![Tiếng Việt](https://img.shields.io/badge/lang-Tiếng_Việt-red?style=flat-square)](./docs/archive/README.vn.md)

**Your Personal App Platform — Build productivity tools that actually fit your workflow**

Stop adapting to rigid tools. Build custom apps without code, arrange them on your dashboard, and share with the community.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Cloud-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![GitHub Stars](https://img.shields.io/github/stars/hey-im-edward/NEXUS?style=flat-square)](https://github.com/hey-im-edward/NEXUS/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hey-im-edward/NEXUS?style=flat-square)](https://github.com/hey-im-edward/NEXUS/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/hey-im-edward/NEXUS?style=flat-square)](https://github.com/hey-im-edward/NEXUS/issues)
[![License](https://img.shields.io/github/license/hey-im-edward/NEXUS?style=flat-square)](./LICENSE)

**Quick Links:** [Why NEXUS](#-why-nexus) • [What You Can Build](#-what-you-can-build) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Who Is This For](#-who-is-this-for)

---

## 💡 Why NEXUS?

**Ever feel like you're adapting to your tools instead of the other way around?**

Most productivity apps force you into _their_ workflow:

- 📝 **Todoist** is great for simple tasks — but what if you need a CRM?
- 📊 **Notion** is flexible — but building complex workflows takes hours
- ⚙️ **ClickUp** has every feature — but costs $10+/user and takes days to learn

**NEXUS is different.**

Instead of choosing between simple-but-limited or powerful-but-complex, you get:

✨ **Build custom apps** with drag-and-drop components (no coding required)  
🎨 **Arrange your workspace** exactly how you want (iPhone-style home screen)  
🏪 **Share & discover** apps built by the community (like an App Store)

### How It Works

```
1. Choose Your Layout          2. Build or Install Apps       3. Customize Everything
┌─────────────────┐           ┌─────────────────┐            ┌─────────────────┐
│  [App] [App]    │           │  • Drag Button  │            │  Change colors  │
│  [App] [App]    │    →      │  • Add Text     │     →      │  Edit layout    │
│  [App] [App]    │           │  • Connect DB   │            │  Your workflow  │
└─────────────────┘           └─────────────────┘            └─────────────────┘
```

---

## 🎯 What You Can Build

### Built-in Apps (Ready to Use)

- ✅ **Task Manager** - Track todos with priorities, due dates, and kanban boards
- ✅ **Quick Notes** - Jot down thoughts instantly (auto-saved to browser)
- ✅ **Pomodoro Timer** - Stay focused with 25-minute work sessions
- ✅ **Today's Tasks** - See what's due today across all your projects

### Custom Apps (Build Your Own)

With the **No-Code App Builder**, you can create:

- 📊 **Expense Tracker** - Budget planner with your own categories
- 👥 **Simple CRM** - Track clients without Salesforce complexity
- 📅 **Content Calendar** - Plan posts for Instagram, Twitter, LinkedIn
- 🎯 **Habit Tracker** - Build streaks and visualize your progress
- 💡 **Idea Board** - Capture and organize creative thoughts
- 📈 **Dashboard** - Combine widgets into your perfect workspace

### Coming Soon

- 🏪 **Community Marketplace** - Install apps built by others (like a mini App Store)
- 🧩 **Low-Code Mode** - Add conditional logic ("if task is urgent, send notification")
- 🔗 **Database Integration** - Connect to your own data sources
- 👥 **Team Sharing** - Collaborate with teammates on shared workspaces

---

## 🛠 Tech Stack

Built with modern, proven technologies:

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **UI:** Tailwind CSS + shadcn/ui components
- **Deployment:** Vercel (instant deploys, global CDN)

**Why these choices?**

- ⚡ **Fast development** - AI-friendly stack with great documentation
- 💰 **$0 hosting** for MVP (free tiers cover everything)
- 🔒 **Battle-tested** - Used by companies like Vercel, Supabase, Airbnb
- 📚 **Great docs** - Easy to learn, easy to contribute

> For developers: See [TECH_STACK.md](./docs/03-REFERENCE/TECH_STACK.md) for detailed technical documentation.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm/yarn
- **Supabase Account** ([sign up free](https://supabase.com))
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations (from supabase folder)
cd ../supabase
supabase db push

# Start development server
cd ../frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the `frontend` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your [Supabase Dashboard](https://app.supabase.com/) → Project Settings → API.

---

## 📚 Documentation

**For users:**

- 📖 [User Guide](./docs/USER_GUIDE.md) _(coming soon)_ - How to build your first app
- 💡 [Examples](./docs/EXAMPLES.md) _(coming soon)_ - Sample apps and use cases

**For developers:**

- 🗺️ [Roadmap](./docs/02-EXECUTION/ROADMAP.md) - What we're building (12-week plan)
- 🛠️ [Tech Stack](./docs/03-REFERENCE/TECH_STACK.md) - Architecture and technical decisions
- 📋 [Contributing](./CONTRIBUTING.md) | [Tiếng Việt](./CONTRIBUTING.vn.md) - How to contribute code

[![Contributing|English](https://img.shields.io/badge/Contributing-English-blue?style=flat-square)](./CONTRIBUTING.md) [![Contributing|Tiếng Việt](https://img.shields.io/badge/Contributing-Tiếng_Việt-red?style=flat-square)](./docs/archive/CONTRIBUTING.vn.md)

**Vision & Strategy:**

- 📘 [Whitepaper](./docs/01-STRATEGY/NEXUS_WHITEPAPER.md) - Comprehensive vision and strategy

---

## 🌟 Who Is This For?

### 💼 Freelancers & Solopreneurs

"I need a simple CRM, but Salesforce is $25/month and takes 2 hours to set up."

→ **Build a lightweight client tracker** in 10 minutes with NEXUS.

### 📝 Power Users

"I use Notion for notes, Todoist for tasks, and Sheets for budgets. Too many tabs!"

→ **Combine everything** in one customizable dashboard.

### 🎨 Content Creators

"I need a content calendar that tracks Instagram, Twitter, AND YouTube."

→ **Build your own** with exactly the columns you need.

### 👥 Small Teams (2-10 people)

"ClickUp has 100 features. We only need 5, but still pay $10/user."

→ **Create team workflows** without enterprise bloat.

---

## 🤝 Contributing

NEXUS is open source and we'd love your help!

- 🐛 **Found a bug?** [Open an issue](https://github.com/hey-im-edward/NEXUS/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/hey-im-edward/NEXUS/discussions)
- 💻 **Want to code?** See 

[![Contributing|English](https://img.shields.io/badge/Contributing-English-blue?style=flat-square)](./CONTRIBUTING.md) [![Contributing|Tiếng Việt](https://img.shields.io/badge/Contributing-Tiếng_Việt-red?style=flat-square)](./docs/archive/CONTRIBUTING.vn.md)

**For developers:** Check out [ROADMAP.md](./docs/02-EXECUTION/ROADMAP.md) to see what we're building next.

---

## 🙏 Acknowledgments

Inspired by world-class products:

- **[Notion](https://notion.so)** — All-in-one workspace flexibility
- **[Airtable](https://airtable.com)** — Database power for everyone
- **[Bubble.io](https://bubble.io)** — No-code application development
- **[Linear](https://linear.app)** — Beautifully designed project management
- **[Craft.js](https://craft.js.org)** — Initial inspiration for page builder (migrated to @dnd-kit for React 19)

---

## ⭐️ Support

If NEXUS helps you build better workflows, consider starring the repository.

[![Star History Chart](https://api.star-history.com/svg?repos=hey-im-edward/NEXUS&type=Date)](https://star-history.com/#hey-im-edward/NEXUS&Date)

---

## 📄 License

Released under the [MIT License](./LICENSE).

Copyright © 2025 NEXUS Contributors.
