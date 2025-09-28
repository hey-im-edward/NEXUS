# 📝 Memory Bank Prompt Templates

Dưới đây là các prompt templates để maintain memory bank một cách hiệu quả. Copy-paste vào Cursor để sử dụng.

## 🔄 Daily Maintenance

### **Update Active Context**
```
update memory bank với recent session và next steps

Current session: [mô tả những gì đã làm hôm nay]
Next steps: [liệt kê tasks tiếp theo]
Open questions: [nếu có]
```

### **Update Progress**
```
update progress.md với status changes

Items to update:
- [task]: [status mới] - [notes]
- [task]: [status mới] - [notes]

Risks to add/update:
- [risk description]
```

### **Record New Decision**
```
thêm decision mới vào decisions/recent.md

Decision: [decision description]
Date: [YYYY-MM-DD]
Status: Active
Reason: [short explanation]
```

## 📊 Weekly Maintenance

### **Light Update**
```
light update memory bank

1. Update active-context.md với recent session
2. Update progress.md với current status
3. Add any new decisions to recent.md
4. Run automation check: npm run check
```

### **Index Update**
```
update index.md với latest changes

Files changed:
- [file]: [what was updated]
- [file]: [what was updated]

New last_updated: [YYYY-MM-DD]
```

## 🏗️ Major Changes

### **Full Memory Bank Audit**
```
update memory bank - full audit

Trigger: [architectural change/new dependency/feature complete]

1. Review all memory bank files
2. Flag outdated sections with TODO
3. Move stable decisions → ADR format
4. Update index.md
5. Run automation scripts
```

### **New ADR Creation**
```
tạo ADR mới cho architectural decision

Title: ADR-00X: [Decision Name]
Context: [problem/requirement]
Decision: [what was decided]
Rationale: [why this approach]
Consequences: [positive/negative/risks]
Alternatives: [what was considered]
Related: [related ADRs/decisions]
```

### **New Tech Addition**
```
update tech-context.md với new dependency

New technology:
- Name: [tech name]
- Version: [version]
- Purpose: [why added]
- Setup: [installation/setup notes]
- Constraints: [any limitations]

Update decisions/recent.md với reason.
```

## 🔧 Technical Tasks

### **Code Architecture Update**
```
update system-patterns.md với new pattern

Pattern: [pattern name]
Description: [what it does]
Implementation: [how to use]
Integration: [how it fits with existing]
```

### **Setup New Environment**
```
update tech-context.md với environment setup

Environment: [dev/staging/prod]
Setup steps:
1. [step 1]
2. [step 2]
3. [step 3]

Variables needed:
- [VAR_NAME]: [description]
```

## 📈 Project Management

### **Status Update**
```
update progress.md và active-context.md

Current focus: [what working on now]
Progress update: [completed items]
Next milestone: [upcoming deadline]
Blockers: [if any]
```

### **Risk Assessment**
```
update progress.md với new risks

Risk: [risk description]
Impact: [high/medium/low]
Mitigation: [how to address]
Owner: [who responsible]
```

## 🤖 Automation

### **Run Daily Checks**
```
run memory bank automation

Commands:
- npm run check (validate files)
- npm run update-index (refresh summaries)
- npm run cleanup-sessions (archive old sessions)
```

### **Generate Reports**
```
create memory bank status report

Include:
- File completeness check
- Format validation
- Size warnings
- Update recommendations
```

## 📚 Documentation

### **Add to Glossary**
```
update glossary.md với new terms

Terms to add:
- [Term]: [Definition] - [Notes/Context]
- [Term]: [Definition] - [Notes/Context]
```

### **Update Project Brief**
```
update project-brief.md với scope changes

Changes:
- [what changed in scope]
- [new objectives]
- [updated success metrics]

Non-goals: [confirm still relevant]
```

## 🎯 Quick Reference

### **Most Common Prompts**

**Daily Standup:**
```
update memory bank

Recent session: [what did today]
Next steps: [todo list]
Progress: [status updates]
```

**Feature Complete:**
```
light update memory bank

Completed: [feature name]
Impact: [what it enables]
Next: [follow-up tasks]
```

**New Decision:**
```
thêm decision vào recent.md

Decision: [what decided]
Status: Active
Reason: [why]
```

**Technical Issue:**
```
update progress.md với blocker

Blocker: [issue description]
Impact: [how affects timeline]
Solution: [proposed fix]
ETA: [when resolved]
```

## 🚨 Emergency Prompts

### **Critical Issue**
```
update progress.md với critical blocker

Issue: [description]
Severity: Critical
Impact: [project delay/quality/security]
Action needed: [immediate steps]
Owner: [responsible person]
```

### **Architecture Change**
```
update memory bank - architecture change

Old pattern: [what changing from]
New pattern: [what changing to]
Rationale: [why change]
Migration plan: [how to implement]
```

## 📋 Session Checklist

Trước khi kết thúc session:
```
memory bank session cleanup

1. Update active-context.md với today session
2. Update progress.md với any status changes
3. Add new decisions to recent.md nếu có
4. Run npm run check để validate
5. Update index.md nếu có major changes
```

---

💡 **Tip**: Luôn bắt đầu bằng "update memory bank" để trigger automation và follow specification workflow.
