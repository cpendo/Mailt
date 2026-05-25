# ADR 001: Backend Language and Framework Selection

**Status:** Accepted
**Date:** May 25, 2026

## Context
MailT requires a backend service to manage multi-tenant authentication, handle API requests, and most importantly, compile MJML syntax into cross-client compatible HTML. The initial proposed technology stack was React (Frontend), PostgreSQL (Database), and Django/Python (Backend). However, the official and most reliable compiler for MJML is written as a Node.js library. Running MJML in Python requires executing the Node CLI in a child process or relying on third-party community ports, which introduces unnecessary performance overhead and deployment complexity.

## Decision
We will use **Node.js** (with a framework like Express.js) for the backend API and compilation service instead of Django.

## Consequences
* **Positive:** Native, first-party support for the MJML compiler.
* **Positive:** Faster template compilation times (no child-process overhead).
* **Positive:** Unifies the tech stack into JavaScript/TypeScript (React + Node), reducing context switching.
* **Negative:** The development team must pivot away from Django and set up a Node.js environment, requiring a shift in the planned ORM (e.g., using Prisma or Sequelize instead of Django ORM).
