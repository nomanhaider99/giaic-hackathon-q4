# Speckit Command Reference

## Overview

The Speckit methodology is a structured approach to software development that emphasizes specification, planning, and systematic implementation. The methodology uses a series of commands with the prefix `/speckit` to guide the development process from initial concept to deployed deliverables.

## Command Set

### `/speckit.specify`
Purpose: Create initial feature specifications
- Defines user stories and requirements
- Establishes success criteria
- Sets project boundaries and scope

### `/speckit.plan`
Purpose: Generate implementation plans and architecture
- Creates technical architecture documentation
- Defines data models and relationships
- Outlines project structure and dependencies
- Establishes quickstart guides and integration scenarios

### `/speckit.tasks`
Purpose: Break down implementation work into specific, trackable tasks
- Creates detailed task lists in `tasks.md`
- Defines execution phases and dependencies
- Identifies parallel vs sequential work
- Maps tasks to specific user stories

### `/speckit.implement` (Current Focus)
Purpose: Execute the implementation plan by processing and executing all tasks defined in `tasks.md`
- Validates all prerequisites before starting
- Checks completion status of required checklists
- Analyzes implementation context from multiple documentation files
- Verifies project setup and configuration
- Executes tasks following defined phases and dependencies
- Tracks progress and handles errors systematically
- Validates completed work against original specifications

### `/speckit.clarify`
Purpose: Address ambiguous requirements and unclear specifications
- Identifies gaps in existing specifications
- Clarifies technical requirements
- Resolves conflicting requirements

### `/speckit.analyze`
Purpose: Perform technical analysis and architecture review
- Reviews technical decisions
- Analyzes system architecture
- Identifies potential risks and issues

### `/speckit.checklist`
Purpose: Validate compliance with quality standards
- Runs checklist-based quality validation
- Ensures adherence to project constitution
- Verifies technical accuracy requirements

### `/speckit.constitution`
Purpose: Define and validate project constitution principles
- Establishes core principles for the project
- Sets quality standards and guidelines
- Defines compliance verification requirements

### `/speckit.tasksToIssues`
Purpose: Convert tasks to issue tracking system
- Creates GitHub issues from task definitions
- Assigns developers and milestones
- Tracks progress in issue management system

## Implementation Workflow

The typical workflow for a feature follows this sequence:

1. **Specification Phase**: `/speckit.specify`
   - Define feature requirements and user stories
   - Establish success criteria

2. **Planning Phase**: `/speckit.plan` 
   - Create implementation plan and architecture
   - Define data models and relationships

3. **Task Breakdown**: `/speckit.tasks`
   - Split work into specific, executable tasks
   - Define phases, dependencies, and parallel execution opportunities

4. **Execution Phase**: `/speckit.implement`
   - Execute all defined tasks systematically
   - Follow quality checks and validation steps
   - Complete phases in appropriate sequence

## Quality Gates

Each command includes quality validation:

- **Constitution Compliance**: All work must meet project constitution principles
- **Technical Accuracy**: All claims must have authoritative sources
- **Engineering Clarity**: Content suitable for advanced learners
- **Practical Reproducibility**: All configurations and workflows must be verifiable
- **Systems Rigor**: Real-world constraints and integration considerations
- **Source Verification**: Minimum 40% peer-reviewed papers for technical claims

## Best Practices

When using the Speckit methodology:

1. **Follow the sequence**: Complete commands in the recommended order
2. **Complete quality checks**: Ensure all checklists pass before proceeding
3. **Maintain documentation**: Keep all documentation files synchronized
4. **Validate dependencies**: Ensure all prerequisite commands have completed successfully
5. **Monitor progress**: Track task completion and address issues promptly

## Troubleshooting

If a command fails:

- Verify that the preceding command in the sequence has completed successfully
- Check that required files and directories exist
- Ensure quality checklists are completed (especially before `/speckit.implement`)
- Review error messages for specific guidance
- Consider running `/speckit.analyze` to identify root causes of issues