---
title: 'Kindled'
description: 'Game save progress analyzer.'
image: '../../assets/kindled.png'
color: '#c45100'
livePreview: https://kindled.ozgurgokdemir.com
sourceCode: https://github.com/ozgurgokdemir/save-analyzer
category: Gaming
featured: true
order: 4
---

## Overview

Kindled is a game save progress analyzer. It turns raw save-file data into a clear report showing what the player has collected, what is missing, and what cannot yet be determined reliably.

Sekiro: Shadows Die Twice is the first supported game and the current focus. Kindled can analyze its collectibles, upgrades, skills, key items, and ending-route evidence directly from a save file.

## Problem

Completion progress is often difficult to reconstruct from inside a game. Players may need to compare their inventory against several guides, remember earlier decisions, or revisit locations without knowing whether an item has already been collected.

The save file contains much of this information, but it is stored in undocumented binary structures. Even after extracting the data, inventory records and progression flags do not always provide enough evidence to confidently label something as collected or missing.

I wanted Kindled to make that information understandable without presenting uncertain interpretations as facts.

## Approach

I built Kindled around separate parsing and analysis layers. The parser reads a game's save format and extracts relevant records, while the analyzer converts those records into a normalized progress report.

Each supported game can provide its own parser, evidence mappings, and progression rules without changing the interface or shared report model. This keeps the current Sekiro implementation game-specific while allowing Kindled to expand to other games over time.

For Sekiro, the browser reads the BND4 `.sl2` container, extracts the active save slot, and evaluates inventory records and event flags against source-backed game data.

## Key Challenge

The hardest part was determining what the save file could actually prove.

A missing inventory item does not always mean the player has never collected it. Some items can be consumed, converted, awarded through alternate routes, or represented by several different progression flags. Other states cannot yet be verified from a known persistent record.

Kindled therefore uses an evidence-driven status model. When the available data supports a conclusion, the report marks the entry accordingly. When it does not, the status remains `unknown` instead of being inferred from incomplete evidence.

## Technical Highlights

- Parses Sekiro BND4 save containers entirely in the browser
- Reports Gourd Seeds, Prayer Beads, Prosthetic Tools and upgrades, Skills, Key Items, and ending-route evidence
- Reconciles inventory totals with pickup, reward, shop, and progression flags
- Separates parsers, analyzers, game mappings, shared report types, and the Astro interface in a TypeScript monorepo
- Uses a normalized report model designed for additional game integrations
- Stores only the generated report and file name in browser storage

## Outcome and Next Steps

The current Sekiro analyzer has been validated against a verified save fixture, turning low-level binary records into an approachable checklist while clearly communicating the limits of the available evidence.

The current limitation is validation breadth: the analyzer has one verified real-world save fixture, and some states remain intentionally unresolved until reliable evidence can be identified.

Future work will expand the fixture set, improve coverage of uncertain Sekiro states, and introduce parsers and analyzers for additional games.
