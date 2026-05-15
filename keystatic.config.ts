import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    fleet: collection({
      label: 'Fleet',
      slugField: 'slug',
      path: 'src/content/fleet/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug (Must match filename)' }),
        name: fields.text({ label: 'Boat Name' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'No License Required', value: 'no-license' },
            { label: 'With License', value: 'with-license' },
            { label: 'RIB / Inflatable', value: 'rib' },
            { label: 'Yacht', value: 'yacht' },
          ],
          defaultValue: 'no-license',
        }),
        length: fields.text({ label: 'Length' }),
        capacity: fields.number({ label: 'Capacity (Persons)' }),
        horsepower: fields.number({ label: 'Horsepower (HP)' }),
        priceFrom: fields.number({ label: 'Price From' }),
        priceHalfDay: fields.number({ label: 'Price Half Day (Optional)' }),
        priceFullDay: fields.number({ label: 'Price Full Day' }),
        priceWeekly: fields.number({ label: 'Price Weekly (Optional)' }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Features',
          itemLabel: props => props.value,
        }),
        description: fields.text({ label: 'Short SEO Description', multiline: true }),
        content: fields.markdoc({ 
          label: 'Main Page Content',
          extension: 'md'
        }),
        imagePlaceholder: fields.select({
          label: 'Image Placeholder',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Muted', value: 'muted' },
            { label: 'Ocean', value: 'ocean' },
            { label: 'Sunset', value: 'sunset' },
            { label: 'Turquoise', value: 'turquoise' },
          ],
          defaultValue: 'dark',
        }),
        available: fields.checkbox({ label: 'Available', defaultValue: true }),
        image: fields.text({ label: 'Primary Image Path', defaultValue: '/images/fleet/placeholder.jpg' }),
        gallery: fields.array(fields.text({ label: 'Gallery Image Path' }), {
          label: 'Gallery',
          itemLabel: props => props.value,
        }),
        galleryTitle: fields.text({ label: 'Gallery Section Title' }),
        order: fields.number({ label: 'Order', defaultValue: 99 }),
      },
    }),
    blog: collection({
      label: 'Blog',
      slugField: 'slug', 
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug (Must match filename)' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date' }),
        author: fields.text({ label: 'Author', defaultValue: 'Skiathos Boats Team' }),
        imagePlaceholder: fields.select({
          label: 'Image Placeholder',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Muted', value: 'muted' },
            { label: 'Ocean', value: 'ocean' },
            { label: 'Sunset', value: 'sunset' },
            { label: 'Turquoise', value: 'turquoise' },
          ],
          defaultValue: 'dark',
        }),
        image: fields.text({ label: 'Cover Image Path', defaultValue: '/images/stock/s1tock images.jpg' }),
        gallery: fields.array(fields.text({ label: 'Gallery Image Path' }), {
          label: 'Gallery',
          itemLabel: props => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value,
        }),
        readTime: fields.number({ label: 'Read Time (Minutes)' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Guide', value: 'guide' },
            { label: 'Destination', value: 'destination' },
            { label: 'Tips', value: 'tips' },
            { label: 'Comparison', value: 'comparison' },
          ],
          defaultValue: 'guide',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        showMap: fields.checkbox({ label: 'Show Map on Page', defaultValue: false }),
        mapLat: fields.number({ label: 'Map Latitude (e.g. 39.1527)' }),
        mapLng: fields.number({ label: 'Map Longitude (e.g. 23.4033)' }),
        mapLabel: fields.text({ label: 'Map Label' }),
        mapZoom: fields.number({ label: 'Map Zoom Level', defaultValue: 14 }),
        content: fields.markdoc({
          label: 'Article Content',
          extension: 'md'
        }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        icon: fields.text({ label: 'Lucide Icon Name' }),
        href: fields.text({ label: 'Link URL' }),
        price: fields.text({ label: 'Price (Optional)' }),
        accent: fields.select({
          label: 'Accent Color',
          options: [
            { label: 'Ocean', value: 'ocean' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'Gold', value: 'gold' },
            { label: 'Navy', value: 'navy' },
          ],
          defaultValue: 'ocean',
        }),
        order: fields.number({ label: 'Order', defaultValue: 99 }),
        pricing: fields.array(
          fields.object({
            duration: fields.text({ label: 'Duration' }),
            price: fields.text({ label: 'Price' }),
            notes: fields.text({ label: 'Notes (Optional)' }),
            highlight: fields.checkbox({ label: 'Highlight', defaultValue: false }),
          }),
          { label: 'Pricing Options', itemLabel: props => `${props.fields.duration.value}: ${props.fields.price.value}` }
        ),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Service Specific FAQs', itemLabel: props => props.fields.question.value }
        ),
      },
    }),
    activities: collection({
      label: 'Activities',
      slugField: 'slug',
      path: 'src/content/activities/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug (Must match filename)' }),
        title: fields.text({ label: 'Title' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle' }),
        heroGradient: fields.select({
          label: 'Hero Gradient',
          options: [
            { label: 'Ocean', value: 'ocean' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'Gold', value: 'gold' },
            { label: 'Navy', value: 'navy' },
          ],
          defaultValue: 'ocean',
        }),
        icon: fields.text({ label: 'Lucide Icon Name' }),
        href: fields.text({ label: 'Link URL' }),
        price: fields.text({ label: 'Price (Optional)' }),
        accent: fields.select({
          label: 'Accent Color',
          options: [
            { label: 'Ocean', value: 'ocean' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'Gold', value: 'gold' },
            { label: 'Navy', value: 'navy' },
          ],
          defaultValue: 'ocean',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Watersports', value: 'watersports' },
            { label: 'Rental', value: 'rental' },
            { label: 'Transfers', value: 'transfers' },
          ],
          defaultValue: 'watersports',
        }),
        order: fields.number({ label: 'Order', defaultValue: 99 }),
        image: fields.text({ label: 'Cover Image Path', defaultValue: '/images/stock/s10tock images.jpg' }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Features (check-list)',
          itemLabel: props => props.value,
        }),
        specs: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value' }),
          }),
          { label: 'Specifications', itemLabel: props => props.fields.label.value }
        ),
        perks: fields.array(
          fields.object({
            icon: fields.text({ label: 'Icon Name' }),
            title: fields.text({ label: 'Title' }),
            desc: fields.text({ label: 'Description' }),
          }),
          { label: 'Perks', itemLabel: props => props.fields.title.value }
        ),
        destinations: fields.array(
          fields.object({
            place: fields.text({ label: 'Place' }),
            time: fields.text({ label: 'Time from port' }),
          }),
          { label: 'Destinations', itemLabel: props => props.fields.place.value }
        ),
        itineraries: fields.array(
          fields.object({
            title: fields.text({ label: 'Itinerary Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Suggested Itineraries', itemLabel: props => props.fields.title.value }
        ),
        inclusions: fields.array(
          fields.object({
            text: fields.text({ label: 'Item' }),
            type: fields.select({
              label: 'Type',
              options: [
                { label: 'Included', value: 'included' },
                { label: 'Add-on', value: 'addon' },
              ],
              defaultValue: 'included',
            }),
          }),
          { label: 'Inclusions / Add-ons', itemLabel: props => props.fields.text.value }
        ),
        highlights: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description' }),
          }),
          { label: 'Highlights (card grid)', itemLabel: props => props.fields.title.value }
        ),
        pricing: fields.array(
          fields.object({
            duration: fields.text({ label: 'Duration' }),
            price: fields.text({ label: 'Price' }),
            notes: fields.text({ label: 'Notes (Optional)' }),
            highlight: fields.checkbox({ label: 'Highlight', defaultValue: false }),
          }),
          { label: 'Pricing Options', itemLabel: props => `${props.fields.duration.value}: ${props.fields.price.value}` }
        ),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Activity Specific FAQs', itemLabel: props => props.fields.question.value }
        ),
        content: fields.markdoc({ 
          label: 'Page Body Content',
          extension: 'md'
        }),
      },
    }),
    tours: collection({
      label: 'Tours',
      slugField: 'slug',
      path: 'src/content/tours/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Title' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        content: fields.markdoc({ 
          label: 'Full Page Content',
          extension: 'md'
        }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle' }),
        heroGradient: fields.select({
          label: 'Hero Gradient',
          options: [
            { label: 'Ocean', value: 'ocean' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'Gold', value: 'gold' },
            { label: 'Navy', value: 'navy' },
          ],
          defaultValue: 'ocean',
        }),
        duration: fields.text({ label: 'Duration' }),
        capacity: fields.text({ label: 'Capacity' }),
        departure: fields.text({ label: 'Departure Point & Time', defaultValue: 'Skiathos Old Port, 09:00' }),
        order: fields.number({ label: 'Order', defaultValue: 99 }),
        image: fields.text({ label: 'Cover Image Path', defaultValue: '/images/stock/s16tock images.jpg' }),
        gallery: fields.array(fields.text({ label: 'Gallery Image Path' }), {
          label: 'Gallery',
          itemLabel: props => props.value,
        }),
        boats: fields.array(fields.text({ label: 'Fleet Boat Slug' }), {
          label: 'Boats Used for This Tour',
          itemLabel: props => props.value,
        }),
        itinerary: fields.array(
          fields.object({
            time: fields.text({ label: 'Time' }),
            label: fields.text({ label: 'Label' }),
            description: fields.text({ label: 'Description', multiline: true }),
            lat: fields.number({ label: 'Map Latitude (optional)' }),
            lng: fields.number({ label: 'Map Longitude (optional)' }),
          }),
          { label: 'Itinerary', itemLabel: props => props.fields.label.value }
        ),
        includes: fields.array(
          fields.object({
            item: fields.text({ label: 'Item' }),
            included: fields.checkbox({ label: 'Included', defaultValue: true }),
          }),
          { label: 'What is Included', itemLabel: props => props.fields.item.value }
        ),
        pricing: fields.array(
          fields.object({
            duration: fields.text({ label: 'Duration' }),
            price: fields.text({ label: 'Price' }),
            notes: fields.text({ label: 'Notes (Optional)' }),
            highlight: fields.checkbox({ label: 'Highlight', defaultValue: false }),
          }),
          { label: 'Pricing Options', itemLabel: props => `${props.fields.duration.value}: ${props.fields.price.value}` }
        ),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Tour Specific FAQs', itemLabel: props => props.fields.question.value }
        ),
      },
    }),
    routes: collection({
      label: 'Routes',
      slugField: 'slug',
      path: 'src/content/routes/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Title' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        content: fields.markdoc({ 
          label: 'Full Page Content',
          extension: 'md'
        }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle' }),
        fromLocation: fields.text({ label: 'From Location' }),
        toLocation: fields.text({ label: 'To Location' }),
        originLat: fields.number({ label: 'Origin Latitude (e.g. 39.1624)' }),
        originLng: fields.number({ label: 'Origin Longitude (e.g. 23.4920)' }),
        destLat: fields.number({ label: 'Destination Latitude' }),
        destLng: fields.number({ label: 'Destination Longitude' }),
        duration: fields.text({ label: 'Duration' }),
        distance: fields.text({ label: 'Distance' }),
        pricing: fields.array(
          fields.object({
            duration: fields.text({ label: 'Duration' }),
            price: fields.text({ label: 'Price' }),
            notes: fields.text({ label: 'Notes (Optional)' }),
            highlight: fields.checkbox({ label: 'Highlight', defaultValue: false }),
          }),
          { label: 'Pricing Options', itemLabel: props => `${props.fields.duration.value}: ${props.fields.price.value}` }
        ),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'Route Specific FAQs', itemLabel: props => props.fields.question.value }
        ),
      },
    }),
    locations: collection({
      label: 'Locations',
      slugField: 'slug',
      path: 'src/content/locations/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Title' }),
        seoTitle: fields.text({ label: 'SEO Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        content: fields.markdoc({ 
          label: 'Full Page Content',
          extension: 'md'
        }),
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle' }),
        locationName: fields.text({ label: 'Location Name' }),
        heroGradient: fields.select({
          label: 'Hero Gradient',
          options: [
            { label: 'Ocean', value: 'ocean' },
            { label: 'Turquoise', value: 'turquoise' },
            { label: 'Gold', value: 'gold' },
            { label: 'Navy', value: 'navy' },
          ],
          defaultValue: 'ocean',
        }),
        image: fields.text({ label: 'Cover Image Path', defaultValue: '/images/stock/s22tock images.jpg' }),
        gallery: fields.array(fields.text({ label: 'Gallery Image Path' }), {
          label: 'Gallery',
          itemLabel: props => props.value,
        }),
        icon: fields.text({ label: 'Lucide Icon Name', defaultValue: 'map-pin' }),
        status: fields.text({ label: 'Status Label', defaultValue: 'Operating' }),
        directions: fields.text({ label: 'Directions', multiline: true, defaultValue: '' }),
        latitude: fields.number({ label: 'Latitude (e.g. 39.1624)' }),
        longitude: fields.number({ label: 'Longitude (e.g. 23.4920)' }),
        mapZoom: fields.number({ label: 'Map Zoom Level', defaultValue: 14 }),
        boats: fields.array(fields.text({ label: 'Fleet Boat Slug' }), {
          label: 'Boats at This Location',
          itemLabel: props => props.value,
        }),
        services: fields.array(
          fields.object({
            icon: fields.text({ label: 'Icon' }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description' }),
            href: fields.text({ label: 'Link' }),
            price: fields.text({ label: 'Price' }),
          }),
          { label: 'Offered Services', itemLabel: props => props.fields.title.value }
        ),
        order: fields.number({ label: 'Order', defaultValue: 99 }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({ label: 'Answer', multiline: true }),
        category: fields.text({ label: 'Category', defaultValue: 'general' }),
      },
    }),
    legal: collection({
      label: 'Legal Pages',
      slugField: 'slug',
      path: 'src/content/legal/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'SEO Description', multiline: true }),
        content: fields.markdoc({ 
          label: 'Page Content',
          extension: 'md'
        }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'src/content/site/main',
      format: { data: 'json' },
      schema: {
        id: fields.text({ label: 'ID', defaultValue: 'main' }),
        phone: fields.text({ label: 'Phone Number' }),
        email: fields.text({ label: 'Email Address' }),
        whatsapp: fields.text({ label: 'WhatsApp Number' }),
        address: fields.text({ label: 'Physical Address' }),
        socials: fields.object({
          instagram: fields.text({ label: 'Instagram URL' }),
          facebook: fields.text({ label: 'Facebook URL' }),
          tripadvisor: fields.text({ label: 'TripAdvisor URL' }),
        }),
        hero: fields.object({
          title: fields.text({ label: 'Main Hero Title' }),
          subtitle: fields.text({ label: 'Main Hero Subtitle' }),
        }),
        whyUs: fields.array(
          fields.object({
            icon: fields.text({ label: 'Lucide Icon Name' }),
            title: fields.text({ label: 'Title' }),
            desc: fields.text({ label: 'Description' }),
          }),
          { label: 'Why Us Section', itemLabel: props => props.fields.title.value }
        ),
        seo: fields.object({
          siteName: fields.text({ label: 'Site Name' }),
          defaultTitle: fields.text({ label: 'Default Title' }),
          defaultDescription: fields.text({ label: 'Default Description' }),
        }),
      },
    }),
    testimonials: singleton({
      label: 'Featured Testimonials',
      path: 'src/content/testimonials/featured',
      format: { data: 'json' },
      schema: {
        testimonials: fields.array(
          fields.object({
            id: fields.text({ label: 'ID' }),
            quote: fields.text({ label: 'Quote', multiline: true }),
            author: fields.text({ label: 'Author' }),
            location: fields.text({ label: 'Location (e.g. UK)' }),
            rating: fields.number({ label: 'Rating (1-5)', defaultValue: 5 }),
            service: fields.text({ label: 'Service Used' }),
            featured: fields.checkbox({ label: 'Featured', defaultValue: true }),
          }),
          { label: 'Testimonials', itemLabel: props => props.fields.author.value }
        ),
      },
    }),
  },
});
