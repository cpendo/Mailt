# Feature Spec: Auth, Tenancy, and Project Management

## 1. Overview
This specification outlines the data models and API contracts for the core management loop of MailT. It covers user authentication via JWTs, organization scoping (Tenants), and the hierarchical grouping of templates (Projects). It strictly enforces the "Default Project" pattern to minimize onboarding friction.

---

## 2. Database Schema

We will use a relational model (PostgreSQL) to ensure strict data integrity. 

### Core Tables

| Table Name | Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`users`** | `id` | UUID | Primary Key | |
| | `name` | String | Not Null | |
| | `email` | String | Unique, Not Null | |
| | `password_hash` | String | Not Null | Bcrypt hashed. |
| | `created_at` / `updated_at` | Timestamp| | |

| Table Name | Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`tenants`** | `id` | UUID | Primary Key | |
| | `name` | String | Not Null | e.g., "Acme Corp". |
| | `created_at` / `updated_at` | Timestamp| | |

| Table Name | Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`tenant_users`** | `tenant_id` | UUID | Foreign Key | Composite PK with `user_id`. |
| | `user_id` | UUID | Foreign Key | |
| | `role` | Enum | Not Null | `'OWNER'`, `'ADMIN'`, `'EDITOR'`, `'VIEWER'`. |
| | `joined_at` | Timestamp| Default Now() | |

| Table Name | Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`projects`** | `id` | UUID | Primary Key | |
| | `tenant_id` | UUID | Foreign Key | |
| | `name` | String | Not Null | |
| | `is_default`| Boolean | Default `false` | Flags the auto-generated project. |
| | `created_at` / `updated_at` | Timestamp| | |

| Table Name | Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`templates`** | `id` | UUID | Primary Key | |
| | `project_id` | UUID | Foreign Key | STRICTLY NOT NULL. |
| | `name` | String | Not Null | e.g., "Welcome Email". |
| | `format` | Enum | Not Null | `'MJML'` or `'HTML'`. |
| | `created_at` / `updated_at` | Timestamp| | |

---

## 3. API Contract

All requests to `/api/tenants/*` must include a valid JWT in the `Authorization: Bearer <token>` header.

### Authentication Module
* **`POST /api/auth/register`**
    * **Body:** `{ "email": "dev@example.com", "password": "...", "name": "John", "tenantName": "John's Studio" }`
    * **Action:** Creates User, creates Tenant, assigns user as `OWNER`, creates a Default Project. Returns JWT.
* **`POST /api/auth/login`**
    * **Body:** `{ "email": "dev@example.com", "password": "..." }`
    * **Returns:** `{ "token": "eyJhb..." }`
* **`GET /api/auth/me`**
    * **Returns:** User profile and an array of their associated tenants.

### Tenant & Project Module
* **`GET /api/tenants/:tenant_id/projects`**
    * **Returns:** Array of project objects belonging to the tenant.
* **`POST /api/tenants/:tenant_id/projects`**
    * **Body:** `{ "name": "Portfolio App" }`
    * **Returns:** The newly created project.
* **`GET /api/tenants/:tenant_id/projects/:project_id/templates`**
    * **Returns:** Array of template summaries (without the full MJML content to keep payloads light).

---

## 4. Business Logic & Edge Cases
* **The Default Project Lifecycle:** When `POST /api/auth/register` is called, the backend must wrap the creation of the User, Tenant, `tenant_users` assignment, and the Default Project inside a single **Database Transaction**. If the Default Project creation fails, the entire user registration must roll back.
* **Middleware Security:** The tenant authorization middleware must parse the `tenant_id` from the URL, decode the user's JWT, and query the `tenant_users` table to ensure the user actually belongs to that tenant before allowing the request to proceed to the controller.
