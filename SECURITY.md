# 🔒 Security Policy

## 📋 Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.x.x   | ✅ Active |

---

## 🚨 Reporting a Vulnerability

**Please DO NOT open a public issue for security vulnerabilities.**

### Report via GitHub (Recommended)

1. Go to [Security Advisories](https://github.com/hey-im-edward/NEXUS/security/advisories/new)
2. Click "Report a vulnerability"
3. Fill in the details

### Or Email Us

Send to: **security@nexus-app.dev** _(update with your email)_

---

## 📝 What to Include

- **Type:** SQL injection, XSS, auth bypass, etc.
- **Location:** File path or URL
- **Steps to reproduce:** Detailed walkthrough
- **Impact:** What could an attacker do?
- **Fix suggestion:** (if you have one)

---

## ⏱️ Response Timeline

| Severity    | Response Time |
| ----------- | ------------- |
| 🔴 Critical | 1-7 days      |
| 🟠 High     | 7-30 days     |
| 🟡 Medium   | 30-90 days    |
| 🟢 Low      | Best effort   |

- **Initial response:** Within 48 hours
- **Status updates:** Every 7 days
- **Disclosure:** Coordinated with you

---

## 🛡️ Security Best Practices

### For Self-Hosting

**1. Keep dependencies updated**

```bash
npm audit
npm update
```

**2. Protect secrets**

- Never commit `.env.local`
- Rotate API keys regularly

**3. Enable Supabase RLS**

- All tables have Row Level Security
- Check `supabase/migrations/`

**4. Use HTTPS**

- SSL/TLS certificates required
- Enable HSTS headers

**5. Backup regularly**

- Database backups weekly
- Store securely off-site

---

## 🔐 Architecture

**Current Security**

- ✅ Supabase Auth (OAuth, MFA)
- ✅ PostgreSQL Row Level Security
- ✅ Server-side validation
- ✅ CSP headers

**Coming Soon**

- ⏳ Rate limiting
- ⏳ CSRF protection
- ⏳ Input sanitization
- ⏳ Audit logging

---

## 📢 Stay Updated

Subscribe to security updates:

- [Security Advisories](https://github.com/hey-im-edward/NEXUS/security/advisories)
- [Releases](https://github.com/hey-im-edward/NEXUS/releases)

---

## 💬 Questions?

Not a vulnerability? Ask here:

- [GitHub Discussions](https://github.com/hey-im-edward/NEXUS/discussions)
- Email: **contact@nexus-app.dev** _(update with your email)_

---

**Thank you for keeping NEXUS secure!** 🙏
