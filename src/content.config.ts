import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const fleet = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/fleet' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    type: z.enum(['no-license', 'with-license', 'rib', 'yacht']),
    length: z.string(),
    capacity: z.number(),
    horsepower: z.number(),
    priceFrom: z.number(),
    priceHalfDay: z.number().optional(),
    priceFullDay: z.number(),
    priceWeekly: z.number().optional(),
    features: z.array(z.string()),
    description: z.string(),
    image: z.string().optional(),
    imagePlaceholder: z.enum(['dark', 'light', 'muted', 'ocean', 'sunset', 'turquoise']).default('dark'),
    gallery: z.array(z.string()).optional(),
    galleryTitle: z.string().optional(),
    available: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Sea Skiathos Team'),
    imagePlaceholder: z.enum(['dark', 'light', 'muted', 'ocean', 'sunset', 'turquoise']).default('dark'),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]),
    readTime: z.number(),
    category: z.enum(['guide', 'destination', 'tips', 'comparison']),
    featured: z.boolean().default(false),
    showMap: z.boolean().default(false),
    mapLat: z.number().optional(),
    mapLng: z.number().optional(),
    mapLabel: z.string().optional(),
    mapZoom: z.number().default(14).optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    href: z.string(),
    price: z.string().optional(),
    accent: z.enum(['ocean', 'turquoise', 'gold', 'navy']).default('ocean'),
    order: z.number().default(99),
    pricing: z.array(z.object({
      duration: z.string(),
      price: z.string(),
      notes: z.string().optional(),
      highlight: z.boolean().default(false)
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/activities' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string().default(''),
    heroGradient: z.string().default('ocean'),
    icon: z.string(),
    href: z.string(),
    price: z.string().optional(),
    accent: z.enum(['ocean', 'turquoise', 'gold', 'navy']).default('ocean'),
    category: z.enum(['watersports', 'rental', 'transfers']),
    order: z.number().default(99),
    image: z.string().optional(),
    features: z.array(z.string()).optional(),
    specs: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    perks: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
    destinations: z.array(z.object({
      place: z.string(),
      time: z.string(),
    })).optional(),
    itineraries: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    inclusions: z.array(z.object({
      text: z.string(),
      type: z.enum(['included', 'addon']).default('included'),
    })).optional(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    pricing: z.array(z.object({
      duration: z.string(),
      price: z.string(),
      notes: z.string().optional(),
      highlight: z.boolean().default(false)
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
  }),
});

const tours = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/tours' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroGradient: z.string().default('ocean'),
    duration: z.string(),
    capacity: z.string(),
    departure: z.string().default('Skiathos Old Port, 09:00'),
    order: z.number().default(99),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    boats: z.array(z.string()).optional(),
    itinerary: z.array(z.object({
      time: z.string(),
      label: z.string(),
      description: z.string(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })).optional(),
    routePath: z.array(z.tuple([z.number(), z.number()])).optional(),
    includes: z.array(z.object({
      item: z.string(),
      included: z.boolean()
    })).optional(),
    pricing: z.array(z.object({
      duration: z.string(),
      price: z.string(),
      notes: z.string().optional(),
      highlight: z.boolean().default(false)
    })),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
  }),
});

const routes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/routes' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    fromLocation: z.string(),
    toLocation: z.string(),
    originLat: z.number(),
    originLng: z.number(),
    destLat: z.number(),
    destLng: z.number(),
    waypoints: z.array(z.object({
      label: z.string().optional(),
      lat: z.number(),
      lng: z.number(),
    })).optional(),
    duration: z.string(),
    distance: z.string(),
    pricing: z.array(z.object({
      duration: z.string(),
      price: z.string(),
      notes: z.string().optional(),
      highlight: z.boolean().default(false)
    })),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/locations' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    locationName: z.string(),
    heroGradient: z.string().default('ocean'),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    icon: z.string().default('map-pin'),
    status: z.string().default('Operating'),
    directions: z.string().default(''),
    latitude: z.number(),
    longitude: z.number(),
    mapZoom: z.number().default(14),
    boats: z.array(z.string()).optional(),
    services: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
      href: z.string(),
      price: z.string()
    })),
    order: z.number().default(99),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    location: z.string(),
    rating: z.number(),
    service: z.string(),
    featured: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().default('general'),
    order: z.number().default(0),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/site' }),
  schema: z.object({
    // main.json
    id: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    whatsapp: z.string().optional(),
    address: z.string().optional(),
    socials: z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      tripadvisor: z.string().optional(),
    }).optional(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }).optional(),
    whyUs: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
    seo: z.object({
      siteName: z.string().optional(),
      defaultTitle: z.string().optional(),
      defaultDescription: z.string().optional(),
    }).optional(),
    // rental.json
    steps: z.array(z.object({
      step: z.string(),
      icon: z.string().optional(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
    pricingSummary: z.array(z.object({
      duration: z.string(),
      price: z.string(),
      notes: z.string().optional(),
      highlight: z.boolean().optional(),
    })).optional(),
    // about.json
    milestones: z.array(z.object({
      year: z.string(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
    values: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/legal' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { fleet, blog, services, activities, tours, routes, locations, testimonials, faqs, site, legal };
