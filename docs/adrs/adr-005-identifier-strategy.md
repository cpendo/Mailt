# ADR 005: Primary Key / Identifier Strategy

**Status:** Accepted
**Date:** May 28, 2026

## Context

MailT is multi-tenant and exposes a public, read-only **headless delivery API**, where external applications fetch a published template's compiled HTML by its ID. Identifiers therefore appear in URLs and are visible to every API consumer.

Sequential integer primary keys (auto-increment) are a poor fit for this:

- They are **enumerable** — a consumer can iterate `/templates/1`, `/templates/2`, … and probe for resources belonging to other tenants (an IDOR / enumeration risk in a multi-tenant product).
- Their magnitude **leaks information** — row counts and growth rate become observable.

We need an identifier that is non-guessable, globally unique (multi-tenant today, possibly distributed later), and efficient to store and index in PostgreSQL.

## Decision

We will use **UUID primary keys, generated as UUID v7**, stored with PostgreSQL's native `uuid` type. In Prisma: `@default(uuid(7)) @db.Uuid`, with every foreign key using the same native type.

**Alternatives considered:**

- **Auto-increment `Int`** — rejected. Enumerable on the public API and leaks row counts.
- **UUID v4 (random)** — rejected as the default. Non-guessable, but random ordering causes poor B-tree index locality (page splits, extra I/O on insert).
- **CUID2** — rejected. Not an interoperable standard, and PostgreSQL has no native type for it (stored as `text` larger, unvalidated, no index optimization).

## Consequences

- **Positive:** IDs are non-guessable, removing the enumeration / IDOR vector on the public delivery API.
- **Positive:** The native `@db.Uuid` type stores 16 bytes (vs a 36-character text string), is format-validated, and is index-friendly.
- **Positive:** UUID v7's time-ordered prefix restores good index locality, mitigating UUID's main historical drawback on inserts.
- **Positive:** UUID is an RFC standard, understood by any client or tool that consumes the API.
- **Negative:** UUID v7 embeds a creation timestamp, so a record's approximate creation time is inferable from its ID. We accept this minor leak — it exposes no tenant data and does not enable enumeration.
- **Negative:** UUIDs are larger than 4-byte integers, marginally increasing index/storage size and foreign-key column width.
