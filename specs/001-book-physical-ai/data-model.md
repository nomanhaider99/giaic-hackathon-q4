# Data Model: Physical AI & Humanoid Robotics Book

**Feature**: 001-book-physical-ai
**Created**: 2025-01-17
**Status**: Phase 1 Complete

## Overview

This document defines the data model for the Physical AI & Humanoid Robotics book project. Since this is a documentation project rather than a traditional application, our "data" consists of content entities, their relationships, and metadata required for proper documentation structure and validation.

## Content Entities

### Document
- **Fields**:
  - id: string (unique identifier, typically filename)
  - title: string (document title for navigation)
  - description: string (brief summary of content)
  - module: string (parent module directory)
  - position: integer (order within module)
  - word_count: integer (actual word count for constraint compliance)
  - authors: array of strings (content contributors)
  - created_date: string (ISO format)
  - last_modified: string (ISO format)
  - review_status: enum (draft, reviewed, approved)
  - sources: array of Source objects (citations and references)

- **Relationships**:
  - belongs_to: Module
  - references: array of Document objects (cross-references)
  - has_many: Citation objects

- **Validation rules**:
  - word_count must be between 300 and 800 (to meet total word requirement while maintaining modularity)
  - title is required and must be unique within module
  - module must exist in defined modules
  - review_status must be one of the valid enum values
  - sources array must contain minimum 3 items for technical accuracy

### Module
- **Fields**:
  - id: string (directory name, e.g., "module-1-ros2")
  - name: string (display name, e.g., "Module 1: ROS 2 Fundamentals")
  - description: string (brief overview of module content)
  - learning_objectives: array of strings (what reader should understand)
  - prerequisites: array of strings (expected prior knowledge)
  - duration_hours: number (estimated completion time)
  - order: integer (sequence in learning progression)
  - status: enum (planned, in_progress, completed)

- **Relationships**:
  - has_many: Document objects
  - has_many: ArchitectureDiagram objects
  - has_many: CodeExample objects

- **Validation rules**:
  - id must be unique and follow the pattern module-N-name
  - order must be sequential from 1 to 6
  - duration_hours must be between 5 and 20
  - status must be one of the valid enum values

### Source
- **Fields**:
  - id: string (unique identifier)
  - type: enum (academic_paper, official_documentation, standard_specification, website, book)
  - title: string (full title of source)
  - authors: array of strings (authors/contributors)
  - publication_date: string (ISO format or year)
  - url: string (URL if online resource)
  - doi_or_isbn: string (identifier for academic papers or books)
  - relevance: enum (high, medium, low) to module content
  - verification_status: enum (verified, pending, failed)

- **Relationships**:
  - used_in: array of Document objects
  - has_many: Citation objects

- **Validation rules**:
  - type must be one of the defined enum values
  - verification_status must be one of the defined enum values
  - For academic_paper type: doi_or_isbn is required
  - For official_documentation type: url is required and must be from official source

### Citation
- **Fields**:
  - source_id: string (reference to Source object)
  - document_id: string (reference to Document object where cited)
  - citation_type: enum (reference, quote, paraphrase)
  - location: string (section or paragraph where cited)
  - text: string (actual cited text for quotes)
  - apa_format: string (properly formatted APA citation)

- **Relationships**:
  - belongs_to: Source
  - belongs_to: Document

- **Validation rules**:
  - source_id must reference an existing Source
  - document_id must reference an existing Document
  - citation_type must be one of the defined enum values
  - For quote type: text field is required
  - apa_format must follow correct APA formatting

### ArchitectureDiagram
- **Fields**:
  - id: string (unique identifier)
  - title: string (descriptive title)
  - module_id: string (parent module)
  - description: string (text description of the diagram content)
  - diagram_type: enum (system_architecture, data_flow, component_relationship, process_flow)
  - source_reference: string (either "original_content" or reference to Source id)
  - file_path: string (path to diagram asset if applicable)

- **Relationships**:
  - belongs_to: Module
  - references: array of Source objects (if not original content)

- **Validation rules**:
  - source_reference must be either "original_content" or an existing Source id
  - diagram_type must be one of the defined enum values
  - All diagrams must have proper attribution or be marked as original

### CodeExample
- **Fields**:
  - id: string (unique identifier)
  - title: string (descriptive title)
  - module_id: string (parent module)
  - language: string (programming language or configuration format)
  - description: string (what the example demonstrates)
  - code: string (actual code content)
  - expected_output: string (what the code should produce)
  - source_reference: string (either "original_content" or reference to Source id)
  - is_executable: boolean (whether can be run as-is)

- **Relationships**:
  - belongs_to: Module
  - references: array of Source objects (if not original content)

- **Validation rules**:
  - source_reference must be either "original_content" or an existing Source id
  - is_executable implies code is syntactically valid
  - language must be appropriate for the module's technology focus

## Key Relationships

### Content Progression
- Modules form a sequential learning path (Foundations → Module 1-4 → Capstone)
- Documents within modules reference each other as needed for continuity
- Cross-module references are allowed but minimized to maintain modularity

### Quality Assurance
- Each Document must have multiple Sources (at least 3) to ensure technical accuracy
- All ArchitectureDiagrams must have proper attribution or be original
- CodeExamples must be validated against authoritative documentation

## State Transitions

### Document Review Process
1. **Draft**: Initial content creation
2. **Reviewed**: Content reviewed for technical accuracy against sources
3. **Approved**: Final validation completed, ready for publication

### Module Status Flow
1. **Planned**: Module structure defined but content not started
2. **In Progress**: Content being developed
3. **Completed**: All documents in module completed and approved

## Constraints and Business Rules

1. **Constitution Compliance**: All content entities must adhere to the project constitution principles
2. **Citation Requirements**: Minimum 40% of sources must be peer-reviewed papers
3. **Technical Accuracy**: All claims must be verifiable against authoritative sources
4. **Modular Independence**: Each module should be independently comprehensible
5. **Length Constraints**: Total document count should result in 6,000-8,000 words
6. **APA Citation**: All citations must follow APA format
7. **Accessibility**: Text descriptions must accompany all diagrams and figures