#!/usr/bin/env node
/**
 * Download Game Images from rssfeed.json
 * Fetches all game artwork and stores locally
 * Updates rssfeed.json with local image paths
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const feedPath = path.join(__dirname, 'public/rssfeed.json');
const imagesDir = path.join(__dirname, 'public/game-images');

// Create images directory
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`📁 Created ${imagesDir}`);
}

// Read feed
let feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
let games = Array.isArray(feed) ? feed : feed.items || feed.games || [];

console.log(`\n🎮 Found ${games.length} games in rssfeed.json`);
console.log(`📥 Downloading game images...\n`);

let downloaded = 0;
let failed = 0;

// Download each image
for (const game of games) {
  if (!game.image) continue;

  const gameId = game.id || game.guid;
  const imageUrl = game.image;
  const filename = `${gameId}.jpg`;
  const filepath = path.join(imagesDir, filename);

  // Skip if already downloaded
  if (fs.existsSync(filepath)) {
    console.log(`✓ ${game.title || game.name} (cached)`);
    game.image = `/game-images/${filename}`;
    continue;
  }

  // Download image
  await new Promise((resolve) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(imageUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ ${game.title || game.name}`);
        game.image = `/game-images/${filename}`;
        downloaded++;
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.log(`✗ ${game.title || game.name} (${err.message})`);
      game.image = '/game-images/placeholder.jpg';
      failed++;
      resolve();
    });
  });
}

// Save updated feed
fs.writeFileSync(feedPath, JSON.stringify(games, null, 2));

console.log(`\n✅ Complete!`);
console.log(`   Downloaded: ${downloaded}`);
console.log(`   Failed: ${failed}`);
console.log(`   Images saved to: ${imagesDir}`);
console.log(`   Updated rssfeed.json with local paths`);
