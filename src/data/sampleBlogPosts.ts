export interface SampleBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  state: string | null;
  tags: string[];
  readTime: number;
  coverImage: string;
  author: string;
  publishedAt: string;
}

export const BLOG_CATEGORIES = [
  'All',
  'Hidden Gems',
  'Itineraries',
  'Travel Guides',
  'Packing Tips',
  'Festivals',
  'Food',
  'Budget Travel',
] as const;

export const SAMPLE_BLOG_POSTS: SampleBlogPost[] = [
  {
    slug: '10-hidden-gems-rajasthan-youve-never-heard-of',
    title: "10 Hidden Gems in Rajasthan You've Never Heard Of",
    excerpt:
      'Beyond Jaipur and Udaipur lies a Rajasthan few travelers ever see — forgotten step-wells, lake-side forts, and desert villages untouched by mass tourism. Here are ten offbeat spots worth the detour, perfect for travel buddies craving authentic Rajasthan tourism away from the crowds.',
    category: 'Hidden Gems',
    state: 'rajasthan',
    tags: ['Rajasthan tourism', 'hidden gems india', 'offbeat travel rajasthan', 'desert travel'],
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-01-12',
  },
  {
    slug: 'ultimate-7-day-kerala-backwaters-itinerary',
    title: 'Ultimate 7-Day Kerala Backwaters Itinerary',
    excerpt:
      'From a houseboat cruise through Alleppey to sunrise at Kumarakom, this day-by-day Kerala backwaters itinerary covers everything a first-time visitor needs. Ideal for couples, solo travelers, or a group travel India trip looking to slow down and soak in God\'s Own Country.',
    category: 'Itineraries',
    state: 'kerala',
    tags: ['Kerala backwaters', 'Kerala itinerary', 'houseboat alleppey', 'south india travel'],
    readTime: 9,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-01-18',
  },
  {
    slug: 'budget-travel-northeast-india-under-15000',
    title: 'Budget Travel Guide: Exploring Northeast India Under ₹15,000',
    excerpt:
      'Meghalaya\'s living root bridges, Assam\'s tea gardens, and Nagaland\'s Hornbill culture — all on a shoestring. This budget travel india guide breaks down transport, stays, and food costs for a 10-day Northeast India backpacking trip that won\'t break the bank.',
    category: 'Budget Travel',
    state: null,
    tags: ['Northeast India travel', 'budget travel india', 'backpacking india', 'Meghalaya Assam Nagaland'],
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-01-25',
  },
  {
    slug: 'best-time-to-visit-ladakh-month-by-month',
    title: 'Best Time to Visit Ladakh: Month by Month Guide',
    excerpt:
      'Pangong Lake in June looks nothing like Pangong Lake in October. This month-by-month breakdown of Ladakh travel covers road conditions, weather, festivals, and crowd levels so you can time your Himalayan adventure perfectly — whether you\'re riding the Manali-Leh highway or flying straight into Leh.',
    category: 'Travel Guides',
    state: 'ladakh',
    tags: ['Ladakh travel', 'best time to visit Ladakh', 'Himalayan road trip', 'Leh Manali highway'],
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1589793907316-f94025b46850?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-02-02',
  },
  {
    slug: 'solo-female-travel-india-safety-tips-destinations',
    title: 'Solo Female Travel in India: Safety Tips & Best Destinations',
    excerpt:
      'Solo female travel india is more popular — and safer — than ever when you know where to go and how to prepare. From choosing verified travel partners to the safest cities for women travelers, this guide covers practical safety tips alongside the best solo-friendly destinations across the country.',
    category: 'Travel Guides',
    state: null,
    tags: ['solo female travel india', 'travel safety tips', 'solo travel india', 'women travel india'],
    readTime: 10,
    coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-02-09',
  },
  {
    slug: 'street-food-trail-mumbai-to-delhi-10-days',
    title: 'Street Food Trail: Mumbai to Delhi in 10 Days',
    excerpt:
      'Vada pav in Mumbai, kachori in Indore, and chaat in Old Delhi — this 10-day street food trail strings together India\'s best cities for food lovers. A perfect itinerary for a travel buddy duo who plan trips around their next meal as much as the sights.',
    category: 'Food',
    state: null,
    tags: ['india street food', 'mumbai delhi travel', 'food tour india', 'travel mate foodie trip'],
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-02-16',
  },
  {
    slug: 'monsoon-magic-8-destinations-come-alive-in-rain',
    title: 'Monsoon Magic: 8 Destinations That Come Alive in Rain',
    excerpt:
      'Most travelers avoid the monsoon — these eight destinations are exactly why they shouldn\'t. From Meghalaya\'s waterfalls in full flow to Goa\'s quiet, green off-season charm, discover the best monsoon travel destinations india has to offer for a different kind of group travel adventure.',
    category: 'Travel Guides',
    state: null,
    tags: ['monsoon travel india', 'rainy season destinations', 'Goa monsoon', 'Meghalaya waterfalls'],
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-02-23',
  },
  {
    slug: 'digital-nomad-guide-best-coworking-spots-india',
    title: 'Digital Nomad Guide: Best Co-working Spots Across India',
    excerpt:
      'Goa\'s beach cafes, Dharamshala\'s mountain hostels, and Bangalore\'s buzzing tech hubs — digital nomad india is having a moment. This guide ranks the best co-working spaces and nomad-friendly cities for remote workers who want to explore india while staying productive.',
    category: 'Travel Guides',
    state: null,
    tags: ['digital nomad india', 'remote work travel', 'coworking spaces india', 'Goa Dharamshala nomad'],
    readTime: 9,
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-03-02',
  },
  {
    slug: 'temple-trail-south-india-most-stunning-temples',
    title: "Temple Trail: South India's Most Stunning Temples",
    excerpt:
      'From the towering gopurams of Madurai\'s Meenakshi Temple to the rock-cut wonders of Mahabalipuram, this temple tour india itinerary covers South India\'s most awe-inspiring spiritual tourism sites — ideal for cultural travelers and pilgrimage trips alike.',
    category: 'Travel Guides',
    state: 'tamil-nadu',
    tags: ['temple tour india', 'south india temples', 'spiritual tourism india', 'Tamil Nadu Karnataka heritage'],
    readTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-03-09',
  },
  {
    slug: 'adventure-sports-india-paragliding-to-scuba',
    title: 'Adventure Sports in India: From Paragliding to Scuba',
    excerpt:
      'Paraglide over Bir Billing, scuba dive in the Andamans, or white-water raft the Ganga in Rishikesh — adventure sports india has never been more accessible. A complete rundown of the best spots, costs, and seasons for every adrenaline-seeking travel partner.',
    category: 'Travel Guides',
    state: null,
    tags: ['adventure sports india', 'paragliding Bir Billing', 'scuba diving Andaman', 'rafting Rishikesh'],
    readTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-03-16',
  },
  {
    slug: 'festival-calendar-2025-when-where-celebrate-india',
    title: 'Festival Calendar 2025: When & Where to Celebrate in India',
    excerpt:
      'Plan your year around India\'s most vibrant celebrations. This festival travel india calendar covers Holi in Mathura, Pushkar Camel Fair, Hornbill Festival, Onam in Kerala, and more — with dates, locations, and tips for joining a group travel trip around each one.',
    category: 'Festivals',
    state: null,
    tags: ['festival travel india', 'festival calendar 2025', 'Holi Pushkar Hornbill', 'cultural tourism india'],
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1583395838144-09a9a93a533a?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-03-23',
  },
  {
    slug: 'packing-list-himalayan-treks-what-you-actually-need',
    title: 'Packing List for Himalayan Treks: What You Actually Need',
    excerpt:
      'Skip the overpacked duffel. This no-nonsense Himalayan trekking packing list — built from real treks in Himachal, Uttarakhand, and Ladakh — covers layers, footwear, and gear that actually matter, plus what first-timers always over-pack and regret carrying.',
    category: 'Packing Tips',
    state: 'himachal-pradesh',
    tags: ['Himalayan trek packing list', 'trekking india', 'Himachal Pradesh trip', 'mountain trek partner'],
    readTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=1200',
    author: 'Luventra Team',
    publishedAt: '2025-03-30',
  },
];

export function getSampleBlogPostBySlug(slug: string): SampleBlogPost | undefined {
  return SAMPLE_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedSamplePosts(post: SampleBlogPost, limit = 3): SampleBlogPost[] {
  return SAMPLE_BLOG_POSTS
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.state === post.state))
    .slice(0, limit);
}
