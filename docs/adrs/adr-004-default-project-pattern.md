# ADR 004: Project Hierarchy and The "Default Project" Pattern

**Status:** Accepted
**Date:** May 25, 2026

## Context

MailT requires a logical grouping mechanism (`Projects`) to organize email templates within a `Tenant` organization. While projects are necessary for scale (e.g., separating "App A" emails from "App B" emails), forcing new users to manually create a project before they can draft their first template introduces unnecessary UX friction. However, making the `project_id` column optional (nullable) on the `templates` table would fragment the API design and complicate SQL queries.

## Decision

We will implement the **Default Project Pattern**.

1. The `project_id` column on the `templates` table will remain strictly `NOT NULL`.
2. When a new Tenant is created, the backend will automatically generate a hidden "Default Project" for that tenant.
3. If a user only has one project, the UI will hide the project selection sidebar and automatically route templates to the default project, maintaining a frictionless experience.

## Consequences

- **Positive:** Ensures strict database relational integrity (no orphaned templates).
- **Positive:** Simplifies API routing (`/api/tenants/:tenant_id/projects/:project_id/templates`).
- **Positive:** Eliminates user onboarding friction.
- **Negative:** Requires slightly more complex backend logic during the Tenant creation lifecycle to automatically provision the default project.
