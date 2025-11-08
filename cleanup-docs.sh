#!/bin/bash

################################################################################
# NEXUS Documentation Cleanup Script
# Purpose: Remove outdated files and create missing documentation
# Author: Senior Software Engineer
# Date: November 9, 2025
# 
# SAFETY: This script does NOT delete any content files.
#         It only removes ONE outdated template file and creates new files.
#
# Usage:
#   bash cleanup-docs.sh
#
# What it does:
#   1. Remove outdated .git-commit-template.md (lỗi thời)
#   2. Create LICENSE file (MIT)
#   3. Create CONTRIBUTING.md
#   4. Create GitHub issue templates
#   5. Print summary report
#
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project root (where this script is located)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   NEXUS Documentation Cleanup Script                     ║${NC}"
echo -e "${BLUE}║   Cleaning up outdated files and creating missing docs   ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

################################################################################
# STEP 1: Remove outdated file
################################################################################

echo -e "${YELLOW}[STEP 1/4]${NC} Removing outdated files..."

if [ -f ".git-commit-template.md" ]; then
    echo -e "  ${RED}✗${NC} Removing: .git-commit-template.md (outdated commit message, not a template)"
    rm ".git-commit-template.md"
    echo -e "  ${GREEN}✓${NC} Removed successfully"
else
    echo -e "  ${GREEN}✓${NC} .git-commit-template.md already removed"
fi

echo ""

################################################################################
# STEP 2: Create LICENSE file
################################################################################

echo -e "${YELLOW}[STEP 2/4]${NC} Creating LICENSE file..."

if [ -f "LICENSE" ]; then
    echo -e "  ${GREEN}✓${NC} LICENSE already exists (skipping)"
else
    cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 NEXUS - Productivity OS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
    echo -e "  ${GREEN}✓${NC} Created: LICENSE (MIT License)"
fi

echo ""

################################################################################
# STEP 3: Create CONTRIBUTING.md
################################################################################

echo -e "${YELLOW}[STEP 3/4]${NC} Creating CONTRIBUTING.md..."

if [ -f "CONTRIBUTING.md" ]; then
    echo -e "  ${GREEN}✓${NC} CONTRIBUTING.md already exists (skipping)"
else
    cat > CONTRIBUTING.md << 'EOF'
# 🤝 Contributing to NEXUS

Thank you for your interest in contributing to **NEXUS - Productivity OS**!

---

## 📌 Current Status

**Project Phase:** Week 0 - User Research (November 2025)  
**Accepting Contributions:** ⚠️ **Not yet** (early development stage)

We are currently in the **User Research** phase with a small team (2 people, part-time). We are not accepting external contributions at this time.

---

## 🎯 How You Can Help

### **1. User Feedback (Most Valuable!)**

We are looking for **early users** to provide feedback:

- **Who we need:**
  - SME project managers
  - Freelancers managing multiple clients
  - Team leads using Notion, ClickUp, or Asana
  - Anyone frustrated with current productivity tools

- **What you'll do:**
  - 30-minute interview about your productivity workflow
  - Try our early prototype (optional)
  - Share pain points and feature requests

- **How to participate:**
  - Email: [your-email@example.com]
  - Subject: "NEXUS User Interview"
  - We'll schedule a Zoom/Google Meet call

### **2. Star & Watch This Repo**

- ⭐ Star this repo to show support
- 👀 Watch for updates when we open contributions (Week 8+)

### **3. Share With Others**

Know someone who might benefit? Share this repo with:
- Project managers
- Productivity enthusiasts
- Developers interested in Next.js + Supabase

---

## 🔮 Future Contribution Opportunities

**When we open contributions (estimated Week 8+):**

### **Code Contributions**
- Frontend components (React/Next.js)
- UI/UX improvements
- Performance optimizations
- Bug fixes

### **Documentation**
- Tutorial videos
- Translation (Vietnamese, other languages)
- Code examples
- FAQ updates

### **Testing**
- Bug reports (with reproduction steps)
- Feature testing on different devices/browsers
- Performance testing

### **Design**
- UI mockups
- Icon designs
- Marketing materials

---

## 📋 Contribution Guidelines (For Future)

**When we open contributions, we'll require:**

### **1. Code Standards**
- TypeScript strict mode (no `any`)
- Follow existing code patterns (see `BRAIN_DUMP.md` for principles)
- Write meaningful commit messages (Conventional Commits)
- Include tests for new features

### **2. Pull Request Process**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Test thoroughly (manual + automated tests)
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request with description

### **3. Code Review**
- All PRs require review before merge
- Be open to feedback and iteration
- Maintain respectful, constructive communication

---

## 🐛 Bug Reports

**Currently:** Open an issue on GitHub  
**Include:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if UI-related)
- Browser/OS version
- Console errors (if any)

---

## 💡 Feature Requests

**Currently:** Open an issue on GitHub  
**Include:**
- Use case (why you need this feature)
- How it should work
- Examples from other tools (if applicable)
- Mockups/sketches (optional but helpful)

---

## 📞 Contact

**Developer:** Edward  
**GitHub:** [@hey-im-edward](https://github.com/hey-im-edward)  
**Email:** [your-email@example.com]  
**Project:** [NEXUS](https://github.com/hey-im-edward/NEXUS)

---

## 🎓 Development Philosophy

**AI-Driven Development:**
- We use ChatGPT, Claude, and GitHub Copilot extensively
- Prompts are documented in `docs/02_ai-prompts/AI_PROMPTS.md`
- Code quality is maintained through testing and review

**User-Centric:**
- Features driven by user interviews and feedback
- Prioritize usability over feature complexity
- Mobile-first design

**Ship Fast, Iterate:**
- Weekly releases (when in active development)
- Continuous user feedback loop
- Fail fast, learn quickly

**Read More:**
- `BRAIN_DUMP.md` - Full development principles and decisions
- `docs/03_roadmap/PROJECT_STATUS.md` - Current project state
- `docs/04_technical/architecture/decisions.md` - Architecture decisions

---

**Thank you for your interest in NEXUS! 🚀**

We'll update this document when we're ready to accept contributions (Week 8+).  
In the meantime, the best way to help is to **sign up for user interviews**.

---

**Last Updated:** November 9, 2025  
**Next Update:** When contributions open (Week 8+)
EOF
    echo -e "  ${GREEN}✓${NC} Created: CONTRIBUTING.md"
fi

echo ""

################################################################################
# STEP 4: Create GitHub Issue Templates
################################################################################

echo -e "${YELLOW}[STEP 4/4]${NC} Creating GitHub issue templates..."

# Create .github directory
mkdir -p .github/ISSUE_TEMPLATE

# Bug Report Template
if [ -f ".github/ISSUE_TEMPLATE/bug_report.md" ]; then
    echo -e "  ${GREEN}✓${NC} Bug report template already exists (skipping)"
else
    cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Report a bug to help us improve NEXUS
title: '[BUG] '
labels: bug
assignees: ''
---

## 🐛 Bug Description

<!-- A clear and concise description of the bug -->

## 📋 Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## ✅ Expected Behavior

<!-- What you expected to happen -->

## ❌ Actual Behavior

<!-- What actually happened -->

## 📸 Screenshots

<!-- If applicable, add screenshots to help explain the problem -->

## 💻 Environment

- **OS:** [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- **Browser:** [e.g., Chrome 120, Firefox 121, Safari 17]
- **Device:** [e.g., Desktop, iPhone 15, iPad Pro]
- **Screen Size:** [e.g., 1920x1080, Mobile]

## 🔍 Console Errors

<!-- If there are errors in the browser console, paste them here -->

```
Paste console errors here
```

## 📝 Additional Context

<!-- Any other information that might be helpful -->

## 🔗 Related Issues

<!-- Link to related issues if any -->
EOF
    echo -e "  ${GREEN}✓${NC} Created: .github/ISSUE_TEMPLATE/bug_report.md"
fi

# Feature Request Template
if [ -f ".github/ISSUE_TEMPLATE/feature_request.md" ]; then
    echo -e "  ${GREEN}✓${NC} Feature request template already exists (skipping)"
else
    cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Suggest a new feature for NEXUS
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

## 💡 Feature Description

<!-- A clear and concise description of the feature you want -->

## 🎯 Problem / Use Case

<!-- What problem does this feature solve? When would you use it? -->

## 📋 Proposed Solution

<!-- How should this feature work? -->

## 🎨 Design / Mockups

<!-- Optional: Add mockups, sketches, or examples from other apps -->

## 🔄 Alternatives Considered

<!-- What alternatives did you consider? Why is this approach better? -->

## 📊 Priority

<!-- How important is this feature to you? -->

- [ ] Critical (can't use the app without it)
- [ ] High (would significantly improve my workflow)
- [ ] Medium (nice to have)
- [ ] Low (just an idea)

## 👥 Who Benefits?

<!-- Who would benefit from this feature? -->

- [ ] Individual users
- [ ] Team collaboration
- [ ] Project managers
- [ ] Developers
- [ ] Other: _____

## 📝 Additional Context

<!-- Any other information that might be helpful -->

## 🔗 Related Issues

<!-- Link to related feature requests if any -->
EOF
    echo -e "  ${GREEN}✓${NC} Created: .github/ISSUE_TEMPLATE/feature_request.md"
fi

echo ""

################################################################################
# STEP 5: Summary Report
################################################################################

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   CLEANUP COMPLETE ✓                                      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}Summary of changes:${NC}"
echo ""
echo -e "  ${RED}✗${NC} Removed:"
echo "    - .git-commit-template.md (outdated)"
echo ""
echo -e "  ${GREEN}✓${NC} Created:"
echo "    - LICENSE (MIT License)"
echo "    - CONTRIBUTING.md"
echo "    - .github/ISSUE_TEMPLATE/bug_report.md"
echo "    - .github/ISSUE_TEMPLATE/feature_request.md"
echo ""

echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review the created files"
echo "  2. Update CONTRIBUTING.md with your email"
echo "  3. Commit changes:"
echo "     ${BLUE}git add .${NC}"
echo "     ${BLUE}git commit -m 'docs: cleanup documentation and add missing files'${NC}"
echo ""

echo -e "${GREEN}Documentation structure is now clean and complete! ✨${NC}"
echo ""

################################################################################
# END OF SCRIPT
################################################################################
