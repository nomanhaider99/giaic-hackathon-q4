# Quickstart Guide: Physical AI & Humanoid Robotics Book

**Feature**: 001-book-physical-ai
**Created**: 2025-01-17
**Status**: Phase 1 Complete

## Overview

This quickstart guide provides the essential information to begin working with the Physical AI & Humanoid Robotics book project. It covers the setup, structure, and key processes needed to contribute content or build the documentation.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git for version control
- Basic familiarity with Markdown syntax
- Academic or technical background in robotics, AI, or computer science (for content understanding)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [repository-url]
cd [repository-name]
```

### 2. Install Dependencies
```bash
cd [repository-root]
npm install
```

### 3. Verify Setup
```bash
npm run build
```
This should complete without errors, indicating all dependencies are correctly installed.

## Project Structure

```
docs/
├── intro.md                    # Introduction to the book
├── /foundations/              # Foundational concepts
│   ├── physical-ai-overview.md
│   └── embodiment-constraints.md
├── /module-1-ros2/            # ROS 2 fundamentals
│   ├── ros2-architecture.md
│   ├── nodes-topics-services.md
│   ├── urdf-humanoids.md
│   └── python-rclpy-integration.md
├── /module-2-digital-twin/    # Simulation environments
│   ├── gazebo-physics.md
│   ├── unity-hri.md
│   └── sensor-simulation.md
├── /module-3-isaac/           # NVIDIA Isaac integration
│   ├── isaac-sim.md
│   ├── synthetic-data.md
│   └── vslam-nav2.md
├── /module-4-vla/             # Vision-Language-Action
│   ├── speech-to-action.md
│   ├── llm-task-planning.md
│   └── ros-action-mapping.md
├── /capstone/                 # Integration module
│   ├── autonomous-humanoid-architecture.md
│   └── end-to-end-pipeline.md
├── docusaurus.config.js       # Docusaurus configuration
├── sidebars.js               # Navigation structure
├── package.json              # Project dependencies
└── static/                   # Static assets (images, diagrams)
    ├── img/
    └── diagrams/

specs/001-book-physical-ai/   # Planning artifacts
├── spec.md                   # Feature specification
├── plan.md                   # Implementation plan
├── research.md               # Research findings
├── data-model.md             # Data model
└── quickstart.md             # This file
```

## Development Workflow

### 1. Content Creation Process

1. Choose a module directory where your content belongs
2. Create a new Markdown file with descriptive name
3. Follow the content template structure:
   ```markdown
   # [Title]
   
   ## Overview
   [Brief description of the topic]
   
   ## Key Concepts
   [Technical concepts and explanations]
   
   ## Architecture
   [System architecture diagrams or text descriptions]
   
   ## Implementation
   [Detailed implementation steps or concepts]
   
   ## Best Practices
   [Recommended approaches and considerations]
   
   ## References
   [APA-formatted citations]
   ```

### 2. Building the Documentation

To run a local development server:
```bash
npm start
```

To build the static site:
```bash
npm run build
```

To serve the built site locally:
```bash
npm run serve
```

### 3. Validation Checks

Before committing changes, run these validation steps:

1. **Build validation**: `npm run build` (must succeed without errors)
2. **Link validation**: Check for broken internal references
3. **Citation validation**: Verify all technical claims have authoritative sources
4. **Cross-module consistency**: Ensure terminology aligns with other modules

## Content Guidelines

### Writing Style
- Target Flesch-Kincaid grade level 11-13
- Use consistent terminology aligned with ROS 2, NVIDIA Isaac, and robotics literature
- Focus on conceptual depth rather than exhaustive implementation details
- Include system architecture diagrams or text descriptions

### Citation Requirements
- Minimum 40% of sources must be peer-reviewed papers
- Follow APA citation format for all references
- All technical claims must be verifiable against authoritative sources
- Include both official documentation and academic sources

### Quality Standards
- Content must comply with the project constitution:
  - Technical accuracy grounded in fundamentals
  - Engineering clarity for advanced learners
  - Practical reproducibility of described systems
  - Systems rigor with real-world constraints
  - Source verification and attribution

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start local development server |
| `npm run build` | Build static site for production |
| `npm run serve` | Serve built site locally |
| `npm run docusaurus` | Direct access to Docusaurus CLI |

## Common Tasks

### Adding a New Document
1. Create the Markdown file in the appropriate module directory
2. Update `sidebars.js` to include the new document in navigation
3. Add cross-references to related documents if applicable

### Adding Diagrams or Images
1. Place assets in the `static/img/` or `static/diagrams/` directory
2. Reference using Docusaurus's static asset handling: `![Alt text](/img/your-image.png)`

### Validating Citations
1. Ensure each technical claim links to authoritative source
2. Verify APA format for all citations
3. Check that minimum 40% of sources are peer-reviewed papers

## Troubleshooting

### Build Errors
- Verify Node.js version is 18 or higher
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Missing Navigation
- Check that the document is added to `sidebars.js`
- Verify the document path is correct in the sidebar configuration

### Broken Links
- Use Docusaurus link validation tools
- Ensure all internal references use proper relative paths or Docusaurus link syntax