# 📚 NEXUS Documentation Index

**Last Updated:** November 7, 2025  
**Version:** 2.0.0 - Productivity OS Core

---

## 🚀 Start Here (Essential Docs)

If you're new to the project, start with these files in order:

1. **`../THIS_WEEK.md`** - Your weekly focus and tasks (check every Monday)
2. **`../03_roadmap/PROJECT_STATUS.md`** - Master documentation with full project overview
3. **`../04_technical/DEPLOY.md`** - Quick database deployment guide (5 minutes)
4. **`../02_ai-prompts/AI_PROMPTS.md`** - How to write effective prompts for AI coding assistants
5. **`../QUICKSTART.md`** - Quick project setup (15 minutes)

---

## 📂 Documentation by Category

### Getting Started

- **`../README.md`** - Project overview, tech stack, roadmap
- **`../QUICKSTART.md`** - Quick setup guide (15 min)
- **`../THIS_WEEK.md`** - Weekly focus tracker
- **`../04_technical/SETUP.md`** - Detailed development environment setup

### Master Documentation

- **`../03_roadmap/PROJECT_STATUS.md`** ⭐ - Complete project status, roadmap, architecture
- **`../04_technical/DEPLOY.md`** ⭐ - Step-by-step database deployment
- **`../02_ai-prompts/AI_PROMPTS.md`** ⭐ - AI prompting best practices and templates

### Database & Architecture

- **`../04_technical/architecture/database-schema-v2-productivity.sql`** - Full schema reference (11 tables)
- **`../04_technical/architecture/migrations/002_productivity_core_schema.sql`** - Deployment script
- **`../04_technical/architecture/decisions.md`** - Tech stack decisions and rationale

### User Research

- **`../05_research/interview-script.md`** - User interview questions
- **`../05_research/user-personas.md`** - Target user profiles
- **`../05_research/success-metrics.md`** - KPIs and success criteria

### Archive

- **`archive/doanchatgiuatoivaclaude.md`** - Historical chat with Claude
- **`archive/doanchatgiuatoivachatgpt.md`** - Historical chat with ChatGPT

---

## 🔍 Quick Lookup

**How do I...?**

| Question                               | Documentation                                              |
| -------------------------------------- | ---------------------------------------------------------- |
| Understand the current project status? | `../03_roadmap/PROJECT_STATUS.md`                                        |
| Deploy the database?                   | `../04_technical/DEPLOY.md`                                       |
| Set up my dev environment?             | `../04_technical/SETUP.md` or `../QUICKSTART.md`                           |
| Write good AI prompts?                 | `../02_ai-prompts/AI_PROMPTS.md`                                            |
| Know what to work on this week?        | `../THIS_WEEK.md`                                          |
| Understand the database schema?        | `../04_technical/architecture/database-schema-v2-productivity.sql`         |
| Run database migrations safely?        | `../04_technical/architecture/migrations/002_productivity_core_schema.sql` |
| Learn about tech decisions?            | `../04_technical/architecture/decisions.md`                                |
| Conduct user interviews?               | `../05_research/interview-script.md`                             |

---

## 📁 File Structure

```
NEXUS/
├── THIS_WEEK.md                 ⭐ Weekly focus
├── README.md                    ⭐ Project overview
├── QUICKSTART.md                ⭐ Quick setup
│
├── docs/
│   ├── README.md               ← This file
│   ├── PROJECT_STATUS.md       ⭐ Master documentation
│   ├── DEPLOY_DATABASE.md      ⭐ Database deployment
│   ├── AI_PROMPTS.md           ⭐ AI prompting guide
│   ├── SETUP.md                 Detailed setup
│   │
│   ├── architecture/
│   │   ├── database-schema-v2-productivity.sql
│   │   ├── decisions.md
│   │   └── migrations/
│   │       └── 002_productivity_core_schema.sql
│   │
│   ├── research/
│   │   ├── interview-script.md
│   │   ├── user-personas.md
│   │   └── success-metrics.md
│   │
│   └── archive/
│       ├── doanchatgiuatoivaclaude.md
│       └── doanchatgiuatoivachatgpt.md
│
└── frontend/
    └── README.md                 Frontend documentation
```

---

## 🎯 Documentation Principles

### When to Create New Documentation

**✅ DO create documentation when:**

- Explaining complex architecture decisions
- Documenting deployment processes
- Creating reusable AI prompt templates
- Tracking weekly/project progress

**❌ DON'T create documentation for:**

- Things already documented in code comments
- Temporary workarounds or hacks
- Implementation details (use code comments instead)
- Duplicate information from other docs

### Keep Documentation Fresh

- Update `THIS_WEEK.md` every Monday
- Update `../03_roadmap/PROJECT_STATUS.md` after major changes
- Archive old documentation instead of deleting
- Remove documentation that's no longer relevant

---

## 🔄 Recently Removed Files (Cleanup on Nov 7, 2025)

These files were removed as they were outdated or duplicated information:

- ~~`QUICK_START.md`~~ (duplicate of `../04_technical/DEPLOY.md`)
- ~~`IMPLEMENTATION_CHECKLIST.md`~~ (merged into `../03_roadmap/PROJECT_STATUS.md`)
- ~~`RESTRUCTURE_SUMMARY.md`~~ (historical, no longer relevant)
- ~~`ROADMAP_CHECKLIST.md`~~ (merged into `../03_roadmap/PROJECT_STATUS.md`)
- ~~`TIPTAP_*.md` (6 files)~~ (Tiptap already integrated, prompts kept in `../02_ai-prompts/AI_PROMPTS.md`)
- ~~`LOGIN_*.md` (3 files)~~ (Auth setup complete, no longer needed)
- ~~Component READMEs~~ (too granular, info moved to main docs)

---

## 📞 Need Help?

1. **Check this index first** - Find the right documentation
2. **Read `../03_roadmap/PROJECT_STATUS.md`** - Comprehensive overview
3. **Google the error** - Often fastest solution
4. **Ask AI with context** - Use prompts from `../02_ai-prompts/AI_PROMPTS.md`

---

**Happy coding! 🚀**
