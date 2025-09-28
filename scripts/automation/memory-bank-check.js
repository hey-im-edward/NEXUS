#!/usr/bin/env node

/**
 * Memory Bank Automation Script
 * Daily check và validation cho memory bank files
 */

const fs = require('fs');
const path = require('path');

const MEMORY_BANK_PATH = path.join(__dirname, '../../memory-bank');
const REQUIRED_FILES = [
  'project-brief.md',
  'product-context.md',
  'system-patterns.md',
  'tech-context.md',
  'active-context.md',
  'progress.md',
  'decisions/recent.md',
  'index.md'
];

class MemoryBankChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
  }

  // Check if all required files exist
  checkRequiredFiles() {
    console.log('🔍 Checking required files...');

    REQUIRED_FILES.forEach(file => {
      const filePath = path.join(MEMORY_BANK_PATH, file);
      if (!fs.existsSync(filePath)) {
        this.issues.push(`Missing required file: ${file}`);
      } else {
        console.log(`✅ ${file}`);
      }
    });
  }

  // Check active-context.md format
  checkActiveContextFormat() {
    console.log('🔍 Checking active-context.md format...');

    const filePath = path.join(MEMORY_BANK_PATH, 'active-context.md');
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');

    // Check required sections
    const requiredSections = [
      '## Current Focus',
      '## Recent Sessions',
      '## Immediate Next Steps',
      '## Open Questions',
      '## Temporary Experiments'
    ];

    requiredSections.forEach(section => {
      if (!content.includes(section)) {
        this.issues.push(`Missing section in active-context.md: ${section}`);
      }
    });

    // Check session format (should have dates)
    const sessionMatches = content.match(/### \d{4}-\d{2}-\d{2}/g);
    if (!sessionMatches || sessionMatches.length === 0) {
      this.warnings.push('No recent sessions found in active-context.md');
    }

    console.log(`✅ Found ${sessionMatches?.length || 0} sessions`);
  }

  // Check progress.md format
  checkProgressFormat() {
    console.log('🔍 Checking progress.md format...');

    const filePath = path.join(MEMORY_BANK_PATH, 'progress.md');
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');

    // Should have table format
    if (!content.includes('| Status |') || !content.includes('|------|')) {
      this.issues.push('progress.md missing table format');
    } else {
      console.log('✅ Progress table format correct');
    }
  }

  // Check decisions format
  checkDecisionsFormat() {
    console.log('🔍 Checking decisions/recent.md format...');

    const filePath = path.join(MEMORY_BANK_PATH, 'decisions/recent.md');
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');

    // Should have reverse chronological format
    const decisionMatches = content.match(/- \d{4}-\d{2}-\d{2}:/g);
    if (!decisionMatches || decisionMatches.length === 0) {
      this.warnings.push('No recent decisions found');
    } else {
      console.log(`✅ Found ${decisionMatches.length} recent decisions`);
    }
  }

  // Check file sizes
  checkFileSizes() {
    console.log('🔍 Checking file sizes...');

    const files = fs.readdirSync(MEMORY_BANK_PATH, { recursive: true });

    files.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.md')) {
        const filePath = path.join(MEMORY_BANK_PATH, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);

        if (file.includes('active-context.md') && stats.size > 200 * 1024) {
          this.warnings.push(`active-context.md is too large: ${sizeKB}KB (should be ≤ 200KB)`);
        }

        console.log(`📄 ${file}: ${sizeKB}KB`);
      }
    });
  }

  // Generate report
  generateReport() {
    console.log('\n📊 MEMORY BANK AUDIT REPORT');
    console.log('=====================================');

    if (this.issues.length > 0) {
      console.log('\n❌ ISSUES FOUND:');
      this.issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ No critical issues found');
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    } else {
      console.log('\n✅ No warnings');
    }

    const totalFiles = REQUIRED_FILES.length;
    const existingFiles = REQUIRED_FILES.filter(file =>
      fs.existsSync(path.join(MEMORY_BANK_PATH, file))
    ).length;

    console.log(`\n📈 Coverage: ${existingFiles}/${totalFiles} required files present`);

    // Exit with error code if issues found
    if (this.issues.length > 0) {
      process.exit(1);
    }
  }

  // Main execution
  run() {
    console.log('🚀 Starting Memory Bank Audit...\n');

    this.checkRequiredFiles();
    this.checkActiveContextFormat();
    this.checkProgressFormat();
    this.checkDecisionsFormat();
    this.checkFileSizes();
    this.generateReport();
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new MemoryBankChecker();
  checker.run();
}

module.exports = MemoryBankChecker;
