export interface BoatSpec {
  label: string;
  value: string;
}

export interface Boat {
  id: string;
  data: {
    name: string;
    type: string;
    priceFrom: string | number;
    length: string;
    capacity: number | string;
    horsepower: number | string;
    imagePlaceholder?: string;
    features?: string[];
    order?: number;
    featured?: boolean;
  };
}

export interface Service {
  id: string;
  data: {
    title: string;
    description: string;
    icon: string;
    href: string;
    price?: string;
    accent?: string;
    order?: number;
  };
}

export interface Tour {
  id: string;
  data: {
    title: string;
    description: string;
    duration: string;
    heroGradient: string;
    pricing: Array<{
      label: string;
      price: string;
    }>;
    order?: number;
  };
}

export interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  service?: string;
}

export interface SiteSettings {
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  whyUs: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
}
