#!/usr/bin/env node

// citation-validator.js
// Script to validate citations in documentation files
const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = './docs';
const MIN_PEER_REVIEWED_PERCENTAGE = 40;

console.log('Starting citation validation...');

// Function to find all markdown files in docs directory
function findAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findAllMarkdownFiles(filePath, fileList);
    } else if (path.extname(file) === '.md' || path.extname(file) === '.mdx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to extract citations from a markdown file
function extractCitations(content) {
  // Simple regex to find APA-style citations (Author, Year) - this is a basic approach
  // In a real implementation, this would be more sophisticated
  const citationRegex = /\([A-Za-z0-9-,.'\s]+,\s*\d{4}\)|\[[^\]]*\]/g;
  const potentialCitations = content.match(citationRegex) || [];
  
  // Filter for actual citations vs other bracketed content
  const citations = potentialCitations.filter(quote => {
    // This is a simplified check - real implementation would be more robust
    return quote.includes(',') || quote.toLowerCase().includes('et al');
  });
  
  return citations;
}

// Function to classify citations as peer-reviewed or not
// This is a simplified approach - real implementation would check against a database of peer-reviewed sources
function classifyCitations(citations) {
  // In a real implementation, we would check DOI prefixes, journal names, etc.
  // For now, we'll simulate by assuming a random percentage are peer-reviewed
  let peerReviewedCount = 0;
  const totalCitations = citations.length;
  
  // Mock classification based on common indicators of peer-reviewed content
  citations.forEach(citation => {
    if (
      citation.toLowerCase().includes('journal') ||
      citation.toLowerCase().includes('conference') ||
      citation.toLowerCase().includes('trans') ||  // Transactions
      citation.toLowerCase().includes('proc') ||   // Proceedings
      citation.includes('arXiv') ||
      citation.includes('doi')
    ) {
      peerReviewedCount++;
    }
  });
  
  return { peerReviewedCount, totalCitations };
}

// Main validation function
function validateCitations() {
  const markdownFiles = findAllMarkdownFiles(DOCS_DIR);
  let totalCitations = 0;
  let peerReviewedCitations = 0;
  let filesWithoutCitations = [];

  console.log(`Found ${markdownFiles.length} markdown files to validate\n`);

  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const citations = extractCitations(content);
    
    if (citations.length === 0) {
      filesWithoutCitations.push(file);
    } else {
      console.log(`${file}: Found ${citations.length} citations`);
      const classification = classifyCitations(citations);
      totalCitations += classification.totalCitations;
      peerReviewedCitations += classification.peerReviewedCount;
      console.log(`  Peer-reviewed: ${classification.peerReviewedCount}/${classification.totalCitations}`);
    }
  });

  console.log('\n--- Validation Summary ---');
  console.log(`Total citations found: ${totalCitations}`);
  console.log(`Peer-reviewed citations: ${peerReviewedCitations}`);
  
  if (totalCitations > 0) {
    const peerReviewedPercentage = (peerReviewedCitations / totalCitations) * 100;
    console.log(`Peer-reviewed percentage: ${peerReviewedPercentage.toFixed(2)}%`);
    
    if (peerReviewedPercentage < MIN_PEER_REVIEWED_PERCENTAGE) {
      console.log(`\n❌ FAIL: Peer-reviewed citations (${peerReviewedPercentage.toFixed(2)}%) below minimum requirement (${MIN_PEER_REVIEWED_PERCENTAGE}%)`);
      process.exitCode = 1;
    } else {
      console.log(`\n✅ PASS: Peer-reviewed citations (${peerReviewedPercentage.toFixed(2)}%) meet minimum requirement (${MIN_PEER_REVIEWED_PERCENTAGE}%)`);
    }
  } else {
    console.log('\n❌ FAIL: No citations found in documentation');
    process.exitCode = 1;
  }

  if (filesWithoutCitations.length > 0) {
    console.log(`\n⚠️  Warning: ${filesWithoutCitations.length} files have no citations:`);
    filesWithoutCitations.forEach(file => console.log(`  - ${file}`));
  }
}

// Create scripts directory if it doesn't exist
if (!fs.existsSync('./scripts')) {
  fs.mkdirSync('./scripts');
}

// Run the validation
validateCitations();

console.log('\nCitation validation completed.');