---
title: 'Chat'
description: 'Real-time communication platform.'
image: '../../assets/chat.png'
color: '#1971c2'
livePreview: https://chat.ozgurgokdemir.com
category: Communication
featured: true
order: 2
---

## Overview

Chat is a full-stack communication app built as a monorepo. It combines a React and Vite web client with a Hono API on Cloudflare Workers, shared TypeScript contracts, D1 persistence, R2-backed media storage, and Durable Objects for voice-channel coordination.

## Architecture

The app is designed around a single-origin deployment model: the Worker serves the built web app and mounts the API under `/api/*`. That keeps browser requests, auth callbacks, cookies, assets, and API routing on one domain instead of splitting the product across separate origins.

Inside the UI, the main experience is a three-panel chat workspace: conversations on the left, messages in the center, and group/member or voice context on the right. The interface supports desktop layouts while still handling mobile navigation through collapsible panels.

## Core Features

- Sign in with Better Auth and keep the active session available to both the web app and Worker API
- Create direct chats and group chats with admin/member roles
- Invite people into groups with token-based invite links and preview pages
- Send text messages, replies, attachments, GIFs, and saved stickers
- Edit and delete your own messages while preserving system and group events
- Track unread counts, read position, online presence, and last-seen state
- Upload group avatars and message files to Cloudflare R2 with validation and cleanup paths
- Create, join, leave, and manage voice channels through Cloudflare RealtimeKit and Durable Objects

## Technical Highlights

- Built with TypeScript, React 19, Vite, TanStack Router, TanStack Query, Mantine, Hono, and Cloudflare Workers
- Uses a PNPM workspace with `apps/web`, `apps/api`, and `packages/shared` so request and response contracts stay typed across the client and server
- Models chats, members, messages, attachments, GIFs, stickers, invites, sessions, and presence with Drizzle and Cloudflare D1
- Stores media in R2 and separates attachment, group avatar, sticker, and demo media flows
- Keeps voice state outside the database through Durable Objects, including channel registries, active channel objects, and transport indexes
- Includes demo seeding for realistic screenshot and local QA data without hand-building conversations every time

## Outcome

Chat demonstrates how I approach a real-time product as both a user interface and a backend system. The frontend focuses on everyday chat ergonomics like initial unread positioning, scroll restoration, message grouping, reply navigation, and compact controls.

On the backend, the project keeps the deployment shape intentionally simple while still covering the core challenges of a communication app: auth, persistence, media ownership, invite flows, read state, presence, and temporary voice sessions.
