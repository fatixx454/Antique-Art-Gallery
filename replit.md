# Antique Gallery

## Overview
A Victorian antique-style art gallery app showcasing famous classical paintings with their stories in Arabic. The UI is in English with an editorial magazine layout featuring alternating warm beige and dark sections.

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js API
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter

## Design
- Victorian antique aesthetic matching warm chai-milk beige (#ddd0bc) and dark (#1a1510) alternating sections
- Playfair Display serif font throughout
- Editorial magazine-style layout with large painting images
- Painting titles in English, info/stories in Arabic
- Famous paintings: Van Gogh, Da Vinci, Hokusai, Vermeer, Dali, Botticelli, Munch, Monet

## Key Files
- `shared/schema.ts` - Data models (paintings table with country, artistImageUrl fields)
- `server/db.ts` - Database connection
- `server/seed.ts` - Seed data with 18 famous world paintings
- `server/routes.ts` - API routes
- `server/storage.ts` - Database storage layer
- `client/src/pages/home.tsx` - Gallery home with alternating sections
- `client/src/pages/painting-detail.tsx` - Story narrative detail page with artist portrait

## Artist Portraits
- Real historical portraits/photos from Wikimedia Commons stored in `client/public/images/artist{N}.jpg`
- 12 artists have portraits: Van Gogh, Da Vinci, Hokusai, Vermeer, Dalí, Botticelli, Munch, Monet, Shishkin, Velasco, Friedrich, Dinet
- 6 artists without portraits (ancient/no surviving image): Fan Kuan, Reza Abbasi, Egyptian artist, Mughal artists, Thomas Baines, Abdulhalim Radwi

## API Endpoints
- `GET /api/paintings` - Returns all paintings
- `GET /api/paintings/:id` - Returns a single painting by ID
