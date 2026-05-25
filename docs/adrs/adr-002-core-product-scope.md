# ADR 002: Core Product Scope and Feature Boundaries

**Status:** Accepted
**Date:** May 25, 2026

## Context

As development begins on MailT (a Headless Email Template Manager), there is a high risk of scope creep, particularly regarding the template editing experience. Building a full drag-and-drop visual email builder is a massive undertaking that distracts from the core value proposition: providing a centralized API for external applications to fetch compiled email templates. We need a strict definition of the Minimum Viable Product (MVP) to keep development focused, efficient, and tailored to our primary audience (developers).

## Decision

We will restrict the MVP to a strict set of headless CMS features and a developer-centric split-pane editor. We explicitly reject building a drag-and-drop visual builder.

**In-Scope Features (The MVP):**

1. **Multi-Tenancy & Project Isolation:** Users can create an organization (tenant) and group templates into specific projects.
2. **Template Management:** CRUD operations for email templates.
3. **Split-Pane Code Editor:** A dual-pane workspace (Left: Code, Right: Live iframe preview) supporting both MJML and Raw HTML.
4. **Dynamic Variables:** Support for defining and injecting variables (e.g., `{{firstName}}`) for real-time previewing and API delivery.
5. **Version Control:** Templates have states (Draft vs. Published). Every published change creates a new version with rollback capabilities.
6. **Audit History:** A log tracking template modifications.
7. **Headless Delivery API:** A read-only API endpoint for external applications to fetch the compiled HTML of a published template.

**Out-of-Scope Features (Do Not Build for MVP):**

- Drag-and-drop visual email builders.
- Actual email delivery/SMTP integration (MailT does not send emails).
- AI-driven template generation.
- Complex user roles and permissions (beyond basic tenant membership).

## Consequences

- **Positive:** Development time is drastically reduced by utilizing a simple code editor rather than a complex canvas UI.
- **Positive:** The product remains hyper-focused on the target persona (developers who are comfortable writing HTML/MJML).
- **Positive:** The backend architecture is simplified by focusing solely on data storage, MJML compilation, and API delivery.
- **Negative:** Marketing teams or non-technical users may find the app difficult to use without developer assistance, though this tradeoff is acceptable for the MVP target audience.
