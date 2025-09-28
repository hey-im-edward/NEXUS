#!/usr/bin/env node

/**
 * Cleanup old sessions from active-context.md
 * Archives sessions older than 2 weeks
 */

const fs = require('fs');
const path = require('path');

const MEMORY_BANK_PATH = path.join(__dirname, '../../memory-bank');
const SESSIONS_THRESHOLD_DAYS = 14;

class SessionCleanup {
  constructor() {
    this.currentDate = new Date();
  }

  // Parse date from session header
  parseSessionDate(sessionLine) {
    const dateMatch = sessionLine.match(/### (\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) return null;

    return new Date(dateMatch[1]);
  }

  // Check if session is too old
  isSessionTooOld(sessionDate) {
    const daysDiff = Math.floor((this.currentDate - sessionDate) / (1000 * 60 * 60 * 24));
    return daysDiff > SESSIONS_THRESHOLD_DAYS;
  }

  // Archive old sessions
  archiveOldSessions() {
    const filePath = path.join(MEMORY_BANK_PATH, 'active-context.md');
    if (!fs.existsSync(filePath)) {
      console.log('❌ active-context.md not found');
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let newContent = [];
    let currentSession = [];
    let inSession = false;
    let sessionsArchived = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Start of a session
      if (line.startsWith('### ')) {
        // Process previous session if exists
        if (currentSession.length > 0) {
          const sessionStartLine = currentSession[0];
          const sessionDate = this.parseSessionDate(sessionStartLine);

          if (sessionDate && this.isSessionTooOld(sessionDate)) {
            // Archive this session
            sessionsArchived++;
            console.log(`📦 Archiving session: ${sessionStartLine.trim()}`);
            // Don't include in new content
          } else {
            // Keep this session
            newContent.push(...currentSession);
          }
        }

        // Start new session
        currentSession = [line];
        inSession = true;
      } else if (inSession) {
        currentSession.push(line);

        // End of session (next ### or end of Recent Sessions section)
        if (line.trim() === '' && i + 1 < lines.length && lines[i + 1].startsWith('## ')) {
          inSession = false;
        }
      } else {
        // Outside sessions, keep as is
        newContent.push(line);
      }
    }

    // Handle last session
    if (currentSession.length > 0) {
      const sessionStartLine = currentSession[0];
      const sessionDate = this.parseSessionDate(sessionStartLine);

      if (sessionDate && this.isSessionTooOld(sessionDate)) {
        sessionsArchived++;
        console.log(`📦 Archiving session: ${sessionStartLine.trim()}`);
      } else {
        newContent.push(...currentSession);
      }
    }

    // Write back to file
    try {
      fs.writeFileSync(filePath, newContent.join('\n'));
      console.log(`✅ Archived ${sessionsArchived} old sessions (>${SESSIONS_THRESHOLD_DAYS} days)`);
      return true;
    } catch (error) {
      console.error('❌ Failed to write cleaned content:', error.message);
      return false;
    }
  }

  // Main execution
  run() {
    console.log(`🧹 Cleaning up sessions older than ${SESSIONS_THRESHOLD_DAYS} days...`);

    const success = this.archiveOldSessions();

    if (success) {
      console.log('✅ Session cleanup completed');
    } else {
      console.log('❌ Session cleanup failed');
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const cleanup = new SessionCleanup();
  cleanup.run();
}

module.exports = SessionCleanup;
