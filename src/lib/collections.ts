import { getCollection, getEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Enriches boat entries with images from the public folder
 */
async function enrichBoats(boats: any[]) {
  return boats.map(boat => {
    const enriched = { ...boat };
    // Gallery comes from the content file's frontmatter — that's the source of truth.
    // Remove hero image from gallery if present (it's already shown in the hero).
    if (enriched.data.gallery && enriched.data.image) {
      enriched.data.gallery = enriched.data.gallery.filter(
        (img: string) => img !== enriched.data.image
      );
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
