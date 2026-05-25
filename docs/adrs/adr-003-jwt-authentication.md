# ADR 003: JWT Authentication for API and Dashboard

**Status:** Accepted
**Date:** May 25, 2026

## Context

MailT needs a secure way to authenticate both human users (logging into the React dashboard) and external servers (calling the headless API to fetch templates). [cite_start]In a previous project (HomeFit), stateful Session Cookies were used, which introduced significant cross-origin (CORS) and third-party cookie blocking issues between Vercel and Render[cite: 206, 225]. Because MailT's primary offering is an API for external consumption, relying on a stateful cookie architecture creates unnecessary friction.

## Decision

We will use **JSON Web Tokens (JWTs)** for authentication instead of stateful Session Cookies.

## Consequences

- **Positive:** Statelessness. The Node.js backend does not need to store active sessions in the database or Redis, saving memory and complexity.
- **Positive:** API-Friendly. External applications can easily attach a JWT as a `Bearer` token in the `Authorization` header without worrying about browser cookie policies.
- **Positive:** Cross-Origin safe. [cite_start]JWTs are sent via headers, completely bypassing browser third-party cookie blocking rules[cite: 226, 242].
- **Negative:** Token Revocation. Unlike session cookies which can be instantly deleted on the server, a signed JWT remains valid until it expires. We will need to keep expiration times short (e.g., 15-60 minutes) to mitigate risk.
