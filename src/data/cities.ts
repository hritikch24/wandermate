export interface CityData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  vibe: 'adventure' | 'spiritual' | 'romantic' | 'party' | 'serene' | 'cultural';
  highlights: string[];
  bestTime: string;
  avgBudget: string;
  popularTrips: TripTemplate[];
  coordinates: { lat: number; lng: number };
  state: string;
  country: string;
}

export interface TripTemplate {
  id: string;
  title: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  estimatedCost: string;
  highlights: string[];
}

export interface TravelerProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio: string;
  travelStyle: string;
  languages: string[];
  verified: boolean;
  rating: number;
  tripsCompleted: number;
  sponsorType: 'sponsor' | 'need-sponsor' | 'just-join';
  interests: string[];
  destination: string;
  dateRange: string;
}

export const CITIES: Record<string, CityData> = {
  dehradun: {
    slug: 'dehradun',
    name: 'Dehradun',
    tagline: 'Where the mountains whisper your name',
    description: 'Nestled in the Doon Valley, Dehradun is the gateway to the Himalayas. With its lush green landscapes, ancient temples, and vibrant culture, it\'s the perfect starting point for unforgettable adventures.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Robber\'s Cave', 'Sahastradhara', 'Forest Research Institute', 'Mindrolling Monastery'],
    bestTime: 'March to June, September to November',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 30.3165, lng: 78.0322 },
    state: 'Uttarakhand',
    country: 'India',
    popularTrips: [
      { id: 'dd-1', title: 'Dehradun Heritage Walk', duration: '1 day', difficulty: 'easy', estimatedCost: '₹1,500', highlights: ['FRI', 'Clock Tower', 'Paltan Bazaar'] },
      { id: 'dd-2', title: 'Cave & Waterfall Explorer', duration: '2 days', difficulty: 'moderate', estimatedCost: '₹3,500', highlights: ['Robber\'s Cave', 'Sahastradhara', 'Lachhiwala'] },
    ],
  },
  mussoorie: {
    slug: 'mussoorie',
    name: 'Mussoorie',
    tagline: 'The Queen of Hills awaits your story',
    description: 'Perched at 2,005 metres, Mussoorie offers misty mornings, colonial charm, and panoramic Himalayan views. A place where every sunset feels like it was painted just for you.',
    heroImage: 'https://images.unsplash.com/photo-1626714100232-d89623e6ed30?w=1920&q=80',
    vibe: 'romantic',
    highlights: ['Kempty Falls', 'Mall Road', 'Gun Hill', 'Lal Tibba', 'Cloud\'s End'],
    bestTime: 'April to June, September to November',
    avgBudget: '₹2,500 - ₹6,000/day',
    coordinates: { lat: 30.4598, lng: 78.0644 },
    state: 'Uttarakhand',
    country: 'India',
    popularTrips: [
      { id: 'ms-1', title: 'Mussoorie Romantic Getaway', duration: '3 days', difficulty: 'easy', estimatedCost: '₹8,000', highlights: ['Mall Road', 'Company Garden', 'Sunset at Gun Hill'] },
      { id: 'ms-2', title: 'Cloud\'s End Trek', duration: '1 day', difficulty: 'moderate', estimatedCost: '₹2,000', highlights: ['Cloud\'s End', 'Benog Wildlife Sanctuary'] },
    ],
  },
  rishikesh: {
    slug: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Find your soul by the sacred Ganges',
    description: 'The yoga capital of the world meets adventure paradise. White-water rafting, bungee jumping, ancient ashrams, and the magical Ganga Aarti — Rishikesh is where thrill meets tranquility.',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat', 'Beatles Ashram', 'River Rafting'],
    bestTime: 'February to May, September to November',
    avgBudget: '₹1,500 - ₹4,000/day',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    state: 'Uttarakhand',
    country: 'India',
    popularTrips: [
      { id: 'rk-1', title: 'Rafting & Camping Adventure', duration: '2 days', difficulty: 'moderate', estimatedCost: '₹4,500', highlights: ['16km rafting', 'Beach camping', 'Bonfire night'] },
      { id: 'rk-2', title: 'Yoga & Spiritual Retreat', duration: '5 days', difficulty: 'easy', estimatedCost: '₹12,000', highlights: ['Daily yoga', 'Meditation', 'Ganga Aarti', 'Ashram stay'] },
    ],
  },
  kullu: {
    slug: 'kullu',
    name: 'Kullu',
    tagline: 'The Valley of Gods calls you home',
    description: 'Known as the Valley of Gods, Kullu is a paradise of apple orchards, rushing rivers, and ancient temples. The Beas river valley stretches like a dream between towering peaks.',
    heroImage: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Great Himalayan National Park', 'Bijli Mahadev', 'Manikaran', 'Kullu Dussehra'],
    bestTime: 'March to June, October to February',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 31.9579, lng: 77.1095 },
    state: 'Himachal Pradesh',
    country: 'India',
    popularTrips: [
      { id: 'kl-1', title: 'Kullu Valley Explorer', duration: '3 days', difficulty: 'moderate', estimatedCost: '₹7,000', highlights: ['Bijli Mahadev', 'Paragliding', 'River crossing'] },
      { id: 'kl-2', title: 'Manikaran Hot Springs Trip', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,000', highlights: ['Hot springs', 'Gurudwara Sahib', 'Parvati Valley'] },
    ],
  },
  manali: {
    slug: 'manali',
    name: 'Manali',
    tagline: 'Where every trail leads to wonder',
    description: 'Snow-capped peaks, pine forests, and the spirit of adventure — Manali is the ultimate backpacker\'s paradise. From Solang Valley to Old Manali\'s bohemian cafes, every corner has a story.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Old Manali', 'Hadimba Temple', 'Jogini Falls'],
    bestTime: 'October to February (snow), March to June (pleasant)',
    avgBudget: '₹2,500 - ₹7,000/day',
    coordinates: { lat: 32.2432, lng: 77.1892 },
    state: 'Himachal Pradesh',
    country: 'India',
    popularTrips: [
      { id: 'mn-1', title: 'Solang Valley Snow Adventure', duration: '2 days', difficulty: 'moderate', estimatedCost: '₹5,500', highlights: ['Skiing', 'Snowboarding', 'Cable car', 'Igloo stay'] },
      { id: 'mn-2', title: 'Manali to Leh Road Trip', duration: '5 days', difficulty: 'challenging', estimatedCost: '₹18,000', highlights: ['Rohtang Pass', 'Keylong', 'Jispa', 'Sarchu'] },
    ],
  },
  goa: {
    slug: 'goa',
    name: 'Goa',
    tagline: 'Sun, sand, and souls that sync',
    description: 'India\'s party capital is so much more — Portuguese architecture, spice plantations, hidden beaches, and a sunset that makes strangers feel like old friends. The perfect place to find your travel tribe.',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&q=80',
    vibe: 'party',
    highlights: ['Baga Beach', 'Dudhsagar Falls', 'Old Goa Churches', 'Anjuna Flea Market', 'Palolem'],
    bestTime: 'November to February',
    avgBudget: '₹3,000 - ₹8,000/day',
    coordinates: { lat: 15.2993, lng: 74.124 },
    state: 'Goa',
    country: 'India',
    popularTrips: [
      { id: 'ga-1', title: 'North Goa Beach Hopping', duration: '3 days', difficulty: 'easy', estimatedCost: '₹9,000', highlights: ['Baga', 'Calangute', 'Anjuna', 'Vagator'] },
      { id: 'ga-2', title: 'Hidden Goa Explorer', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['Dudhsagar trek', 'Spice plantation', 'Butterfly beach'] },
    ],
  },
  kerala: {
    slug: 'kerala',
    name: 'Kerala',
    tagline: 'God\'s own country, your own journey',
    description: 'Emerald backwaters, fragrant spice gardens, misty hill stations, and golden beaches — Kerala is a sensory masterpiece. Float through life on a houseboat and find peace you never knew existed.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=80',
    vibe: 'serene',
    highlights: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Varkala Cliff', 'Thekkady', 'Wayanad'],
    bestTime: 'September to March',
    avgBudget: '₹3,000 - ₹8,000/day',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    state: 'Kerala',
    country: 'India',
    popularTrips: [
      { id: 'ke-1', title: 'Backwater Houseboat Experience', duration: '2 days', difficulty: 'easy', estimatedCost: '₹8,000', highlights: ['Alleppey houseboat', 'Village walks', 'Kerala cuisine'] },
      { id: 'ke-2', title: 'Munnar to Thekkady Trail', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹14,000', highlights: ['Tea gardens', 'Eravikulam', 'Periyar Wildlife'] },
    ],
  },
  nepal: {
    slug: 'nepal',
    name: 'Nepal',
    tagline: 'Where the roof of the world meets your heart',
    description: 'From the bustling streets of Kathmandu to the serene trails of Annapurna, Nepal is a land of temples, peaks, and profound beauty. Every step here is a step closer to yourself.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Everest Base Camp', 'Pokhara', 'Kathmandu Durbar Square', 'Chitwan', 'Lumbini'],
    bestTime: 'October to December, March to May',
    avgBudget: '₹2,000 - ₹6,000/day',
    coordinates: { lat: 28.3949, lng: 84.124 },
    state: '',
    country: 'Nepal',
    popularTrips: [
      { id: 'np-1', title: 'Annapurna Base Camp Trek', duration: '10 days', difficulty: 'challenging', estimatedCost: '₹35,000', highlights: ['Poon Hill', 'Hot springs', 'ABC', 'Machapuchare view'] },
      { id: 'np-2', title: 'Kathmandu & Pokhara Explorer', duration: '5 days', difficulty: 'easy', estimatedCost: '₹15,000', highlights: ['Swayambhunath', 'Phewa Lake', 'Paragliding', 'Thamel'] },
    ],
  },
};

export const CITY_SLUGS = Object.keys(CITIES);

export type SearchMode = 'partner' | 'guide';

export interface GuideProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  bio: string;
  speciality: string;
  languages: string[];
  verified: boolean;
  rating: number;
  toursCompleted: number;
  pricePerDay: string;
  expertise: string[];
  city: string;
  availability: string;
  localSince: string;
}

export const SAMPLE_GUIDES: GuideProfile[] = [
  {
    id: 'g1', name: 'Deepak Rawat', age: 34, avatar: '', bio: 'Born and raised in Mussoorie. I know every hidden trail, secret waterfall, and the best chai stalls the tourists never find.',
    speciality: 'Mountain Trails & Hidden Gems', languages: ['Hindi', 'English', 'Garhwali'], verified: true, rating: 4.9, toursCompleted: 156,
    pricePerDay: '₹1,500', expertise: ['Trekking', 'History', 'Wildlife', 'Photography spots'], city: 'mussoorie', availability: 'Available now', localSince: '30+ years',
  },
  {
    id: 'g2', name: 'Lakshmi Menon', age: 29, avatar: '', bio: 'Ayurveda practitioner and backwater expert. I\'ll show you the Kerala that even guidebooks miss — the spice trails, toddy shops, and temple festivals.',
    speciality: 'Backwaters & Ayurveda', languages: ['Malayalam', 'Hindi', 'English', 'Tamil'], verified: true, rating: 5.0, toursCompleted: 203,
    pricePerDay: '₹2,000', expertise: ['Ayurveda', 'Backwaters', 'Cuisine', 'Temple tours'], city: 'kerala', availability: 'Available now', localSince: '29 years',
  },
  {
    id: 'g3', name: 'Tenzing Sherpa', age: 38, avatar: '', bio: 'Third-generation mountain guide. Summited Annapurna twice. I don\'t just guide treks — I make sure you come back with stories for a lifetime.',
    speciality: 'High Altitude Trekking', languages: ['Nepali', 'Hindi', 'English', 'Tibetan'], verified: true, rating: 4.9, toursCompleted: 312,
    pricePerDay: '₹2,500', expertise: ['Trekking', 'Mountaineering', 'Camping', 'First Aid'], city: 'nepal', availability: 'Booking for Oct-Dec', localSince: '38 years',
  },
  {
    id: 'g4', name: 'Ravi Kumar', age: 31, avatar: '', bio: 'Rafting instructor and certified adventure guide. From Grade 4 rapids to cliff jumps, I\'ve got your adrenaline covered safely.',
    speciality: 'Adventure Sports', languages: ['Hindi', 'English'], verified: true, rating: 4.8, toursCompleted: 420,
    pricePerDay: '₹1,800', expertise: ['Rafting', 'Bungee', 'Cliff Jumping', 'Camping'], city: 'rishikesh', availability: 'Available now', localSince: '12 years',
  },
  {
    id: 'g5', name: 'Fernandes Gomes', age: 36, avatar: '', bio: 'Goan born, Portuguese roots. I know where the real Goa hides — beyond the beach shacks. Secret forts, spice plantations, and the best fish curry you\'ll ever taste.',
    speciality: 'Heritage & Food Tours', languages: ['Konkani', 'Hindi', 'English', 'Portuguese'], verified: true, rating: 4.7, toursCompleted: 185,
    pricePerDay: '₹2,200', expertise: ['Food Tours', 'Heritage', 'Nightlife', 'Water Sports'], city: 'goa', availability: 'Available now', localSince: '36 years',
  },
  {
    id: 'g6', name: 'Pema Dorji', age: 27, avatar: '', bio: 'Former monk turned guide. I bring a spiritual lens to every trek through the Himalayas. Meditation at sunrise, trail by day.',
    speciality: 'Spiritual & Cultural Treks', languages: ['Hindi', 'English', 'Tibetan'], verified: true, rating: 4.8, toursCompleted: 89,
    pricePerDay: '₹1,200', expertise: ['Meditation', 'Temple Tours', 'Trekking', 'Local Culture'], city: 'dehradun', availability: 'Available now', localSince: '15 years',
  },
  {
    id: 'g7', name: 'Himanshu Thakur', age: 33, avatar: '', bio: 'Snow sports instructor and Manali local. Whether it\'s your first time skiing or you want the secret powder spots — I\'m your guy.',
    speciality: 'Snow Sports & Valley Trails', languages: ['Hindi', 'English', 'Pahari'], verified: true, rating: 4.9, toursCompleted: 245,
    pricePerDay: '₹2,000', expertise: ['Skiing', 'Snowboarding', 'Trekking', 'Camping'], city: 'manali', availability: 'Available now', localSince: '33 years',
  },
  {
    id: 'g8', name: 'Mohan Negi', age: 40, avatar: '', bio: 'Retired army man who knows the Kullu Valley like the back of his hand. Expert in high-altitude treks and survival skills.',
    speciality: 'Wilderness & Survival', languages: ['Hindi', 'English', 'Pahari'], verified: true, rating: 5.0, toursCompleted: 178,
    pricePerDay: '₹1,800', expertise: ['Survival', 'Trekking', 'Fishing', 'Bird Watching'], city: 'kullu', availability: 'Booking for Jul-Sep', localSince: '40 years',
  },
];

export const SAMPLE_TRAVELERS: TravelerProfile[] = [
  {
    id: '1', name: 'Arjun Mehta', age: 27, avatar: '', bio: 'Software engineer by day, mountain lover by heart. Looking for someone to share chai at 14,000 feet.',
    travelStyle: 'Backpacker', languages: ['Hindi', 'English'], verified: true, rating: 4.8, tripsCompleted: 12,
    sponsorType: 'sponsor', interests: ['Trekking', 'Photography', 'Camping'], destination: 'manali', dateRange: 'Jul 15-22',
  },
  {
    id: '2', name: 'Priya Sharma', age: 24, avatar: '', bio: 'Travel blogger exploring India one city at a time. Let\'s create memories worth writing about!',
    travelStyle: 'Explorer', languages: ['Hindi', 'English', 'French'], verified: true, rating: 4.9, tripsCompleted: 28,
    sponsorType: 'just-join', interests: ['Culture', 'Food', 'Photography'], destination: 'goa', dateRange: 'Aug 1-7',
  },
  {
    id: '3', name: 'Rahul Verma', age: 30, avatar: '', bio: 'Just quit my corporate job to travel. Budget is tight but spirits are high!',
    travelStyle: 'Budget Traveler', languages: ['Hindi', 'English'], verified: true, rating: 4.5, tripsCompleted: 5,
    sponsorType: 'need-sponsor', interests: ['Adventure', 'Local Food', 'Hostels'], destination: 'rishikesh', dateRange: 'Jul 20-25',
  },
  {
    id: '4', name: 'Ananya Das', age: 26, avatar: '', bio: 'Yoga instructor who believes travel is the best meditation. Come find peace together.',
    travelStyle: 'Wellness Traveler', languages: ['Hindi', 'English', 'Bengali'], verified: true, rating: 4.7, tripsCompleted: 15,
    sponsorType: 'just-join', interests: ['Yoga', 'Meditation', 'Nature'], destination: 'rishikesh', dateRange: 'Aug 5-12',
  },
  {
    id: '5', name: 'Vikram Singh', age: 32, avatar: '', bio: 'Entrepreneur who loves sponsoring adventures for fellow travelers. Your company is my reward.',
    travelStyle: 'Luxury', languages: ['Hindi', 'English', 'Punjabi'], verified: true, rating: 5.0, tripsCompleted: 40,
    sponsorType: 'sponsor', interests: ['Fine Dining', 'Luxury Stays', 'Photography'], destination: 'kerala', dateRange: 'Sep 1-8',
  },
  {
    id: '6', name: 'Meera Nair', age: 23, avatar: '', bio: 'College student with wanderlust. Can\'t afford much but I\'ll bring the best playlist and positive vibes!',
    travelStyle: 'Budget Backpacker', languages: ['Hindi', 'English', 'Malayalam'], verified: true, rating: 4.6, tripsCompleted: 8,
    sponsorType: 'need-sponsor', interests: ['Music', 'Beaches', 'Street Food'], destination: 'goa', dateRange: 'Jul 10-17',
  },
  {
    id: '7', name: 'Karan Patel', age: 29, avatar: '', bio: 'Wildlife photographer on a mission to capture every national park. Need a brave companion!',
    travelStyle: 'Adventure', languages: ['Hindi', 'English', 'Gujarati'], verified: true, rating: 4.8, tripsCompleted: 22,
    sponsorType: 'just-join', interests: ['Wildlife', 'Photography', 'Camping'], destination: 'nepal', dateRange: 'Oct 1-15',
  },
  {
    id: '8', name: 'Sneha Gupta', age: 25, avatar: '', bio: 'History buff and architecture nerd. Let\'s explore temples and ancient ruins together!',
    travelStyle: 'Cultural Explorer', languages: ['Hindi', 'English'], verified: true, rating: 4.7, tripsCompleted: 18,
    sponsorType: 'sponsor', interests: ['History', 'Architecture', 'Museums'], destination: 'nepal', dateRange: 'Nov 5-15',
  },
];
