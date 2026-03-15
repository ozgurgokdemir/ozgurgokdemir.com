---
title: 'DesignToken Studio'
description: 'A design system platform.'
image: '../../assets/designtokenstudio.png'
color: '#4f46e5'
livePreview: https://designtokenstudio.com
category: SaaS
featured: true
order: 0
---

## Overview

DesignToken Studio is a full-stack SaaS product built to help teams manage design tokens from a single source of truth. Instead of scattering values across code, design files, and documentation, it gives teams one shared system for creating token sets, shaping themes, collaborating on changes, and exporting implementation-ready outputs.

I designed and built the product end to end, covering the product workflow, editor experience, shared token model, export pipeline, backend architecture, authentication, collaboration, and billing.

## Problem

Design systems often lose consistency because token values are duplicated across too many tools. That creates drift between design and engineering, slows iteration, and makes handoff less reliable as systems grow.

I wanted to turn token management into a real product workflow rather than a local editor demo, which meant solving not only editing and export, but also persistence, team access, and product-grade account management.

## Solution

The result is a monorepo-based web application where users can start from presets or a blank project, edit token categories in a visual workspace, define theme modes, invite collaborators, and export code-ready artifacts from a shared token model.

The product combines marketing pages, authenticated app flows, and backend infrastructure in one system. I kept the core token logic and export behavior in shared packages so the editor UI would stay focused on interaction instead of owning business logic directly.

## Key Features

- Start projects from `Blank`, `shadcn/ui`, `Material UI`, or `Mantine` presets
- Edit colors, typography, spacing, borders, breakpoints, and animation tokens in a visual editor
- Support token references and theme-aware values across light, dark, or custom modes
- Export CSS custom properties and Tailwind CSS v4 theme output with configurable naming behavior
- Invite collaborators with viewer and editor roles for shared project workflows
- Manage subscriptions, trials, and access control as part of a complete SaaS experience

## Technical Highlights

- Built with TypeScript, React 19, Next.js App Router, and Tailwind CSS v4
- Structured as a monorepo with separate packages for the token domain, export engine, and database layer
- Modeled token data to support references, multiple categories, and theme-aware values without making the editor brittle
- Used Prisma and PostgreSQL for persistence, with Better Auth, Polar, and Upstash Redis for authentication, billing, and rate limiting
- Designed the export pipeline as reusable shared logic so outputs stay predictable and independent from UI implementation details

## Outcome

DesignToken Studio demonstrates both product thinking and systems-level engineering. It goes beyond interface polish by covering the full workflow of building and shipping token-based design systems, including collaboration, permissions, exports, persistence, and commercial SaaS concerns.

The current implementation already supports the core end-to-end experience for teams managing design tokens on the web, while leaving room for future expansions such as deeper ecosystem integrations.
