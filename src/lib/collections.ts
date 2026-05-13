import { getCollection, getEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Enriches boat entries with images from the public folder
 */
async function enrichBoats(boats: any[]) {
  const publicImagesDir = path.join(process.cwd(), 'public/images/fleet');
  let allFiles: string[] = [];
  
  try {
    if (fs.existsSync(publicImagesDir)) {
      allFiles = fs.readdirSync(publicImagesDir);
    }
  } catch (e) {
    console.error('Error reading fleet images:', e);
  }

  return boats.map(boat => {
    const id = boat.id;
    // Find all images that start with the boat id
    // We match 'boat-id-' to avoid matching 'karel-ithaca' with 'karel-ithaca-pro'
    const matched = allFiles
      .filter(f => f.startsWith(id))
      .sort((a, b) => {
        // Try numerical sort if possible (e.g. boat-1.jpg vs boat-10.jpg)
        const numA = parseInt(a.match(/(\d+)/)?.[0] || '0');
        const numB = parseInt(b.match(/(\d+)/)?.[0] || '0');
        return numA - numB;
      })
      .map(f => `/images/fleet/${f}`);

    const enriched = { ...boat };
    
    // 1. Update Gallery
    // If we found images in the folder, use them. 
    // We prioritize folder images over manual gallery entries for "dynamic" behavior
    if (matched.length > 0) {
      enriched.data.gallery = matched;
    }

    // 2. Update Main Image
    // If the main image is a placeholder or doesn't exist, use the first matched image
    if (matched.length > 0 && (!enriched.data.image || enriched.data.image.includes('placeholder'))) {
      enriched.data.image = matched[0];
    }

    return enriched;
  });
}

/**
 * Get all fleet boats enriched with dynamic images
 */
export async function getFleet() {
  const allBoats = await getCollection('fleet');
  const enriched = await enrichBoats(allBoats);
  return enriched.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

/**
 * Get featured boats sorted by order
 */
export async function getFeaturedFleet(limit = 3) {
  const fleet = await getFleet();
  return fleet.slice(0, limit);
}

/**
 * Get latest blog posts
 */
export async function getLatestPosts(limit = 3) {
  const allPosts = await getCollection('blog');
  return allPosts
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .slice(0, limit);
}

/**
 * Get sorted tours
 */
export async function getSortedTours() {
  const allTours = await getCollection('tours');
  return allTours.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

/**
 * Get sorted services
 */
export async function getSortedServices() {
  const allServices = await getCollection('services');
  return allServices.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

/**
 * Get sorted locations
 */
export async function getSortedLocations() {
  const allLocations = await getCollection('locations');
  return allLocations.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

/**
 * Get organized FAQs by category
 */
export async function getOrganizedFaqs() {
  const allFaqs = await getCollection('faqs');
  const grouped: Record<string, any[]> = {};

  allFaqs.forEach(faq => {
    const category = faq.data.category || 'general';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(faq.data);
  });

  return grouped;
}

/**
 * Get site main settings
 */
export async function getSiteSettings() {
  const entry = await getEntry('site', 'main');
  return entry?.data;
}
