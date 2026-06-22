# WeMeet UI

<div align="center">

**The Centralized Dashboard & User Management Web Interface for WeMeet**

*Graduation Thesis Project - School of Computer Science and Engineering*

[![TypeScript](https://img.shields.io/badge/TypeScript-96.9%25-blue)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Next.js-14%2B-black)](https://nextjs.org/)

</div>

##  Introduction
**WeMeet UI** is the primary entry point and web portal interface for the WeMeet platform. Built utilizing **Next.js (App Router)** and typed strictly with TypeScript, this repository governs administrative user experiences, authentication workflow gates, and meeting session deployment configurations prior to entering real-time streaming states.

It connects asynchronously to the database layer via `WeMeet-server` to orchestrate session criteria and validate access token workflows safely.

### Core Tech Stack:
- **Framework**: Next.js (App Router architecture)
- **Programming Language**: TypeScript
- **Styling Engine**: TailwindCSS & shadcn/ui
- **State Management**: React Hooks & Context APIs
- **Deployment**: Multistage Dockerfile environment setup

##  Core Portal Features
-  **Secure Authentication Gates**: Centralized login and user identity registration interfaces backed by JWT token lifecycles.
-  **Dynamic Session Allocation**: Quick UI controls to initialize or update instant meeting room parameters (capacity thresholds, custom limits).
-  **Breakout Room Orchestration**: Pre-configuration interfaces to organize sub-session member pool structures.
-  **Supabase/Database Metadata Integration**: Real-time validation mapping to fetch user profile attributes smoothly.

##  Installation & Local Development

### Project Initialization
Ensure your local node package manager is configured, then install workspace dependencies:
```bash
cd wemeet-ui
npm install
# or if using pnpm
pnpm install