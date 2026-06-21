import { getStateBySlug } from './states';

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
  /** State slug (key into STATES from ./states), or '' for non-Indian destinations */
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
    state: 'uttarakhand',
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
    state: 'uttarakhand',
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
    state: 'uttarakhand',
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
    state: 'himachal-pradesh',
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
    state: 'himachal-pradesh',
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
    state: 'goa',
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
    state: 'kerala',
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
  jaipur: {
    slug: 'jaipur',
    name: 'Jaipur',
    tagline: 'The Pink City of palaces and bazaars',
    description: 'Jaipur is a vibrant tapestry of majestic forts, ornate palaces, and bustling bazaars. From the iconic Hawa Mahal to the grandeur of Amber Fort, every corner tells a story of Rajput royalty and timeless elegance.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Nahargarh Fort', 'Jantar Mantar'],
    bestTime: 'October to March',
    avgBudget: '₹2,500 - ₹6,000/day',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    state: 'rajasthan',
    country: 'India',
    popularTrips: [
      { id: 'jp-1', title: 'Royal Jaipur Heritage Walk', duration: '2 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Johari Bazaar'] },
      { id: 'jp-2', title: 'Jaipur to Pushkar Road Trip', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['Amber Fort', 'Ajmer Dargah', 'Pushkar Lake', 'Desert camping'] },
    ],
  },
  udaipur: {
    slug: 'udaipur',
    name: 'Udaipur',
    tagline: 'The City of Lakes and royal romance',
    description: 'Udaipur is a dreamy waterfront city where shimmering lakes mirror grand palaces. Often called the Venice of the East, it is one of India\'s most romantic destinations with its lake palaces, gardens, and Mewar heritage.',
    heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86d9d438fc?w=1920&q=80',
    vibe: 'romantic',
    highlights: ['Lake Pichola', 'City Palace', 'Jag Mandir', 'Saheliyon ki Bari', 'Monsoon Palace'],
    bestTime: 'September to March',
    avgBudget: '₹2,000 - ₹7,000/day',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    state: 'rajasthan',
    country: 'India',
    popularTrips: [
      { id: 'ud-1', title: 'Udaipur Lakes & Palaces Tour', duration: '3 days', difficulty: 'easy', estimatedCost: '₹8,000', highlights: ['Lake Pichola boat ride', 'City Palace', 'Jag Mandir', 'Bagore ki Haveli'] },
      { id: 'ud-2', title: 'Mewar Heritage Circuit', duration: '5 days', difficulty: 'moderate', estimatedCost: '₹15,000', highlights: ['Chittorgarh Fort', 'Kumbhalgarh', 'Ranakpur Jain Temple', 'Haldighati'] },
    ],
  },
  jodhpur: {
    slug: 'jodhpur',
    name: 'Jodhpur',
    tagline: 'The Blue City under the Mehrangarh Fort',
    description: 'Jodhpur\'s blue-washed old city sprawls beneath the mighty Mehrangarh Fort, one of India\'s largest and most magnificent forts. The city offers an intoxicating mix of desert culture, spicy cuisine, and warrior heritage.',
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Mehrangarh Fort', 'Jaswant Thada', 'Clock Tower Market', 'Umaid Bhawan Palace', 'Blue City lanes'],
    bestTime: 'October to March',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 26.2389, lng: 73.0243 },
    state: 'rajasthan',
    country: 'India',
    popularTrips: [
      { id: 'jd-1', title: 'Blue City & Fort Explorer', duration: '2 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Mehrangarh Fort', 'Blue City walk', 'Clock Tower', 'Zip-lining'] },
      { id: 'jd-2', title: 'Jodhpur to Jaisalmer Desert Safari', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹14,000', highlights: ['Mehrangarh', 'Osian temples', 'Sam Sand Dunes', 'Jaisalmer Fort'] },
    ],
  },
  jaisalmer: {
    slug: 'jaisalmer',
    name: 'Jaisalmer',
    tagline: 'Golden dunes and desert nights',
    description: 'Rising like a golden mirage from the Thar Desert, Jaisalmer is a living fort city with ornate havelis, camel safaris across endless sand dunes, and starlit nights that you\'ll never forget.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon ki Haveli', 'Gadisar Lake', 'Desert Safari'],
    bestTime: 'October to March',
    avgBudget: '₹2,000 - ₹5,500/day',
    coordinates: { lat: 26.9157, lng: 70.9083 },
    state: 'rajasthan',
    country: 'India',
    popularTrips: [
      { id: 'js-1', title: 'Golden City & Desert Camp', duration: '3 days', difficulty: 'easy', estimatedCost: '₹7,000', highlights: ['Jaisalmer Fort', 'Haveli walk', 'Camel safari', 'Desert camping'] },
      { id: 'js-2', title: 'Thar Desert Expedition', duration: '5 days', difficulty: 'moderate', estimatedCost: '₹16,000', highlights: ['Longewala border', 'Kuldhara ghost village', 'Dune bashing', 'Folk music night'] },
    ],
  },
  agra: {
    slug: 'agra',
    name: 'Agra',
    tagline: 'Home of the eternal Taj Mahal',
    description: 'Agra is where the world\'s greatest monument to love stands in white marble perfection. Beyond the Taj, the city holds Mughal treasures like Agra Fort, Fatehpur Sikri, and Mehtab Bagh — a history lover\'s paradise.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah'],
    bestTime: 'October to March',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 27.1767, lng: 78.0081 },
    state: 'uttar-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'ag-1', title: 'Taj Mahal Sunrise & Agra Heritage', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,500', highlights: ['Taj at sunrise', 'Agra Fort', 'Mehtab Bagh sunset', 'Street food tour'] },
      { id: 'ag-2', title: 'Golden Triangle Express', duration: '5 days', difficulty: 'easy', estimatedCost: '₹18,000', highlights: ['Delhi sights', 'Taj Mahal', 'Jaipur forts', 'Fatehpur Sikri'] },
    ],
  },
  varanasi: {
    slug: 'varanasi',
    name: 'Varanasi',
    tagline: 'The oldest living city on sacred Ganga',
    description: 'Varanasi is India\'s spiritual heart — a 5,000-year-old city where ancient ghats meet the sacred Ganges. Witness the mesmerizing Ganga Aarti, explore narrow lanes of temples, and feel a spiritual energy unlike anywhere else.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Ganga Aarti', 'Sarnath', 'Boat ride at dawn'],
    bestTime: 'October to March',
    avgBudget: '₹1,500 - ₹4,000/day',
    coordinates: { lat: 25.3176, lng: 83.0066 },
    state: 'uttar-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'vn-1', title: 'Sacred Varanasi Spiritual Walk', duration: '3 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Dawn boat ride', 'Ganga Aarti', 'Temple tour', 'Sarnath excursion'] },
      { id: 'vn-2', title: 'Varanasi to Prayagraj Pilgrimage', duration: '4 days', difficulty: 'easy', estimatedCost: '₹8,000', highlights: ['Varanasi ghats', 'Sarnath', 'Triveni Sangam', 'Allahabad Fort'] },
    ],
  },
  delhi: {
    slug: 'delhi',
    name: 'Delhi',
    tagline: 'Where empires rose and cultures collide',
    description: 'Delhi is India\'s capital and a sprawling metropolis that seamlessly blends ancient Mughal grandeur with modern cosmopolitan energy. From the lanes of Chandni Chowk to the boulevards of Lutyens, every era of Indian history lives here.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Red Fort', 'Qutub Minar', 'India Gate', 'Chandni Chowk', 'Humayun\'s Tomb', 'Lotus Temple'],
    bestTime: 'October to March',
    avgBudget: '₹2,500 - ₹7,000/day',
    coordinates: { lat: 28.6139, lng: 77.209 },
    state: 'delhi',
    country: 'India',
    popularTrips: [
      { id: 'dl-1', title: 'Old Delhi Food & Heritage Walk', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,000', highlights: ['Chandni Chowk', 'Red Fort', 'Jama Masjid', 'Paranthe Wali Gali'] },
      { id: 'dl-2', title: 'Delhi Complete Explorer', duration: '4 days', difficulty: 'easy', estimatedCost: '₹12,000', highlights: ['Old Delhi', 'Humayun\'s Tomb', 'Qutub Minar', 'Hauz Khas', 'Akshardham'] },
    ],
  },
  shimla: {
    slug: 'shimla',
    name: 'Shimla',
    tagline: 'Queen of Hill Stations with colonial charm',
    description: 'Shimla, the former summer capital of British India, charms visitors with its colonial architecture, pine-covered hills, and panoramic Himalayan views. The Mall Road, Ridge, and toy train make it a timeless hill station.',
    heroImage: 'https://images.unsplash.com/photo-1597074866923-dc0589150458?w=1920&q=80',
    vibe: 'romantic',
    highlights: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri', 'Toy Train'],
    bestTime: 'March to June, December to February',
    avgBudget: '₹2,500 - ₹6,000/day',
    coordinates: { lat: 31.1048, lng: 77.1734 },
    state: 'himachal-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'sm-1', title: 'Shimla Heritage & Snow Trail', duration: '3 days', difficulty: 'easy', estimatedCost: '₹7,000', highlights: ['Mall Road', 'Jakhoo Temple', 'Kufri snow point', 'Toy train ride'] },
      { id: 'sm-2', title: 'Shimla to Kinnaur Road Trip', duration: '6 days', difficulty: 'challenging', estimatedCost: '₹20,000', highlights: ['Narkanda', 'Sangla Valley', 'Chitkul', 'Kalpa'] },
    ],
  },
  dharamshala: {
    slug: 'dharamshala',
    name: 'Dharamshala',
    tagline: 'Home of the Dalai Lama and Tibetan culture',
    description: 'Perched on the edge of the Dhauladhar range, Dharamshala is where Tibetan culture meets Himalayan beauty. McLeod Ganj buzzes with monasteries, cafes, and trekking trails while the cricket stadium offers jaw-dropping mountain views.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['McLeod Ganj', 'Dalai Lama Temple', 'Triund Trek', 'Bhagsu Waterfall', 'HPCA Stadium'],
    bestTime: 'March to June, September to November',
    avgBudget: '₹1,500 - ₹4,500/day',
    coordinates: { lat: 32.2190, lng: 76.3234 },
    state: 'himachal-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'dh-1', title: 'Triund Trek & McLeod Ganj', duration: '3 days', difficulty: 'moderate', estimatedCost: '₹5,000', highlights: ['Triund summit', 'Dalai Lama Temple', 'Bhagsu Nag', 'Tibetan food'] },
      { id: 'dh-2', title: 'Dharamshala to Dalhousie Hill Tour', duration: '5 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['McLeod Ganj', 'Kangra Fort', 'Khajjiar', 'Dalhousie'] },
    ],
  },
  kasol: {
    slug: 'kasol',
    name: 'Kasol',
    tagline: 'Backpacker haven by the Parvati river',
    description: 'Kasol is the beating heart of Parvati Valley — a tiny village on the banks of the Parvati River that has become a backpacker legend. Israeli cafes, mountain trails to Kheerganga, and a laid-back vibe make it irresistible.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Kheerganga Trek', 'Parvati River', 'Tosh Village', 'Malana', 'Riverside cafes'],
    bestTime: 'March to June, September to November',
    avgBudget: '₹1,000 - ₹3,500/day',
    coordinates: { lat: 32.0101, lng: 77.3142 },
    state: 'himachal-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'ks-1', title: 'Kheerganga Hot Spring Trek', duration: '3 days', difficulty: 'moderate', estimatedCost: '₹4,000', highlights: ['Kasol cafes', 'Parvati Valley', 'Kheerganga summit', 'Hot springs'] },
      { id: 'ks-2', title: 'Parvati Valley Complete', duration: '5 days', difficulty: 'moderate', estimatedCost: '₹8,000', highlights: ['Kasol', 'Tosh', 'Malana', 'Kheerganga', 'Manikaran Gurudwara'] },
    ],
  },
  amritsar: {
    slug: 'amritsar',
    name: 'Amritsar',
    tagline: 'Home to the radiant Golden Temple',
    description: 'Amritsar is the spiritual and cultural capital of the Sikh faith. The Golden Temple glows with divine energy, the Wagah Border ceremony stirs patriotism, and the food — oh, the food — is the best in all of North India.',
    heroImage: 'https://images.unsplash.com/photo-1518792528501-352f829886dc?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['Golden Temple', 'Wagah Border', 'Jallianwala Bagh', 'Partition Museum', 'Amritsari Kulcha'],
    bestTime: 'October to March',
    avgBudget: '₹1,500 - ₹4,000/day',
    coordinates: { lat: 31.6340, lng: 74.8723 },
    state: 'punjab',
    country: 'India',
    popularTrips: [
      { id: 'am-1', title: 'Golden Temple & Food Trail', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,000', highlights: ['Golden Temple', 'Langar', 'Wagah Border', 'Amritsari kulcha trail'] },
      { id: 'am-2', title: 'Punjab Heritage Circuit', duration: '4 days', difficulty: 'easy', estimatedCost: '₹10,000', highlights: ['Golden Temple', 'Jallianwala Bagh', 'Wagah', 'Patiala', 'Chandigarh'] },
    ],
  },
  nainital: {
    slug: 'nainital',
    name: 'Nainital',
    tagline: 'Lake city nestled in the Kumaon hills',
    description: 'Nainital is a charming hill station wrapped around the emerald Naini Lake. Surrounded by seven hills, it offers boating, nature walks, panoramic viewpoints, and the nostalgic charm of a classic Indian hill town.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'romantic',
    highlights: ['Naini Lake', 'Mall Road', 'Naina Devi Temple', 'Snow View Point', 'Tiffin Top'],
    bestTime: 'March to June, September to November',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 29.3803, lng: 79.4636 },
    state: 'uttarakhand',
    country: 'India',
    popularTrips: [
      { id: 'nt-1', title: 'Nainital Lake & Viewpoints', duration: '3 days', difficulty: 'easy', estimatedCost: '₹6,000', highlights: ['Naini Lake boating', 'Snow View Point', 'Eco Cave Garden', 'Mall Road'] },
      { id: 'nt-2', title: 'Kumaon Lakes Circuit', duration: '5 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['Nainital', 'Bhimtal', 'Sattal', 'Mukteshwar', 'Ranikhet'] },
    ],
  },
  haridwar: {
    slug: 'haridwar',
    name: 'Haridwar',
    tagline: 'Gateway to the gods on the Ganges',
    description: 'Haridwar is where the Ganges descends from the Himalayas into the plains — one of India\'s holiest cities. The evening Ganga Aarti at Har Ki Pauri is a transcendent experience that draws millions of pilgrims and travelers.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['Har Ki Pauri', 'Ganga Aarti', 'Chandi Devi Temple', 'Mansa Devi', 'Rajaji National Park'],
    bestTime: 'September to November, February to May',
    avgBudget: '₹1,200 - ₹3,500/day',
    coordinates: { lat: 29.9457, lng: 78.1642 },
    state: 'uttarakhand',
    country: 'India',
    popularTrips: [
      { id: 'hw-1', title: 'Haridwar Spiritual Immersion', duration: '2 days', difficulty: 'easy', estimatedCost: '₹3,500', highlights: ['Ganga Aarti', 'Har Ki Pauri', 'Mansa Devi cable car', 'Ganga dip'] },
      { id: 'hw-2', title: 'Haridwar to Rishikesh Sacred Trail', duration: '4 days', difficulty: 'easy', estimatedCost: '₹7,000', highlights: ['Har Ki Pauri', 'Rajaji Safari', 'Rishikesh ashrams', 'Ram Jhula'] },
    ],
  },
  mumbai: {
    slug: 'mumbai',
    name: 'Mumbai',
    tagline: 'The city of dreams that never sleeps',
    description: 'Mumbai is India\'s pulsating megacity — the financial capital, Bollywood hub, and a melting pot of cultures. From the iconic Gateway of India to the street food of Mohammed Ali Road, it\'s chaotic, beautiful, and unforgettable.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    vibe: 'party',
    highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Colaba Causeway', 'Bandra-Worli Sea Link'],
    bestTime: 'November to February',
    avgBudget: '₹3,000 - ₹8,000/day',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    state: 'maharashtra',
    country: 'India',
    popularTrips: [
      { id: 'mb-1', title: 'Mumbai Heritage & Street Food Walk', duration: '2 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Gateway of India', 'Colaba', 'Crawford Market', 'Vada Pav trail'] },
      { id: 'mb-2', title: 'Mumbai to Lonavala Weekend', duration: '3 days', difficulty: 'easy', estimatedCost: '₹8,000', highlights: ['Marine Drive', 'Elephanta Caves', 'Lonavala', 'Khandala'] },
    ],
  },
  bangalore: {
    slug: 'bangalore',
    name: 'Bangalore',
    tagline: 'Garden city meets silicon valley',
    description: 'Bangalore is India\'s tech capital with a soul — think craft breweries, stunning parks, live music, and perfect weather year-round. Beyond the IT corridor lies a city of heritage palaces, street art, and incredible South Indian food.',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1920&q=80',
    vibe: 'party',
    highlights: ['Lalbagh', 'Cubbon Park', 'Bangalore Palace', 'MG Road', 'Nandi Hills'],
    bestTime: 'October to February',
    avgBudget: '₹2,500 - ₹6,000/day',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    state: 'karnataka',
    country: 'India',
    popularTrips: [
      { id: 'bl-1', title: 'Bangalore City & Brew Tour', duration: '2 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Cubbon Park', 'Bangalore Palace', 'Craft brewery tour', 'MG Road nightlife'] },
      { id: 'bl-2', title: 'Bangalore to Coorg Coffee Trail', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['Nandi Hills sunrise', 'Mysore Palace', 'Coorg coffee estates', 'Abbey Falls'] },
    ],
  },
  leh: {
    slug: 'leh',
    name: 'Leh Ladakh',
    tagline: 'Where the earth meets the sky',
    description: 'Leh Ladakh is the ultimate frontier — barren moonscapes, turquoise lakes, ancient monasteries, and the highest motorable passes on earth. It\'s not just a destination, it\'s a rite of passage for every Indian traveler.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'adventure',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La', 'Magnetic Hill', 'Thiksey Monastery'],
    bestTime: 'June to September',
    avgBudget: '₹3,000 - ₹8,000/day',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    state: 'jammu-and-kashmir',
    country: 'India',
    popularTrips: [
      { id: 'lh-1', title: 'Leh Ladakh Road Trip', duration: '7 days', difficulty: 'challenging', estimatedCost: '₹25,000', highlights: ['Khardung La', 'Pangong Lake', 'Nubra Valley', 'Magnetic Hill'] },
      { id: 'lh-2', title: 'Manali to Leh Highway Adventure', duration: '10 days', difficulty: 'challenging', estimatedCost: '₹35,000', highlights: ['Rohtang Pass', 'Jispa', 'Sarchu', 'Tanglang La', 'Pangong'] },
    ],
  },
  srinagar: {
    slug: 'srinagar',
    name: 'Srinagar',
    tagline: 'Paradise on earth wrapped in shikaras',
    description: 'Srinagar is Kashmir\'s crown jewel — a city of floating gardens, ornate houseboats on Dal Lake, and Mughal gardens that inspired emperors. The shikara rides, snow-capped horizons, and warm Kashmiri hospitality create pure magic.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
    vibe: 'serene',
    highlights: ['Dal Lake', 'Mughal Gardens', 'Shankaracharya Temple', 'Gulmarg', 'Pahalgam'],
    bestTime: 'March to October',
    avgBudget: '₹3,000 - ₹7,000/day',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    state: 'jammu-and-kashmir',
    country: 'India',
    popularTrips: [
      { id: 'sr-1', title: 'Kashmir Valley Dream Tour', duration: '5 days', difficulty: 'easy', estimatedCost: '₹18,000', highlights: ['Dal Lake houseboat', 'Mughal Gardens', 'Gulmarg gondola', 'Pahalgam'] },
      { id: 'sr-2', title: 'Srinagar to Sonmarg Trek', duration: '7 days', difficulty: 'challenging', estimatedCost: '₹22,000', highlights: ['Dal Lake', 'Sonamarg', 'Thajiwas Glacier', 'Kashmir Great Lakes'] },
    ],
  },
  pushkar: {
    slug: 'pushkar',
    name: 'Pushkar',
    tagline: 'A sacred lake town of camel fairs',
    description: 'Pushkar is a tiny, mystical town built around a sacred lake, home to the world\'s only Brahma Temple. Famous for the annual camel fair, it blends spirituality, desert culture, and a surprisingly vibrant backpacker scene.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    vibe: 'spiritual',
    highlights: ['Pushkar Lake', 'Brahma Temple', 'Camel Fair', 'Savitri Temple', 'Desert camping'],
    bestTime: 'October to March',
    avgBudget: '₹1,200 - ₹3,500/day',
    coordinates: { lat: 26.4898, lng: 74.5511 },
    state: 'rajasthan',
    country: 'India',
    popularTrips: [
      { id: 'pk-1', title: 'Sacred Pushkar & Desert Night', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,000', highlights: ['Pushkar Lake', 'Brahma Temple', 'Desert camel ride', 'Sunset point'] },
      { id: 'pk-2', title: 'Pushkar to Ajmer Spiritual Trail', duration: '3 days', difficulty: 'easy', estimatedCost: '₹6,000', highlights: ['Pushkar Lake', 'Savitri Temple trek', 'Ajmer Dargah', 'Ana Sagar Lake'] },
    ],
  },
  lucknow: {
    slug: 'lucknow',
    name: 'Lucknow',
    tagline: 'City of Nawabs and exquisite cuisine',
    description: 'Lucknow, the city of tehzeeb (etiquette), is where Mughal-era architecture meets the world\'s finest kebabs. The Bara Imambara, Rumi Darwaza, and the legendary Tunday Kababi make it a cultural and culinary paradise.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Bara Imambara', 'Rumi Darwaza', 'Chota Imambara', 'Hazratganj', 'Tunday Kababi'],
    bestTime: 'October to March',
    avgBudget: '₹1,500 - ₹4,000/day',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    state: 'uttar-pradesh',
    country: 'India',
    popularTrips: [
      { id: 'lk-1', title: 'Lucknow Heritage & Food Walk', duration: '2 days', difficulty: 'easy', estimatedCost: '₹4,000', highlights: ['Bara Imambara', 'Rumi Darwaza', 'Kebab trail', 'Hazratganj'] },
      { id: 'lk-2', title: 'Awadhi Culture Immersion', duration: '3 days', difficulty: 'easy', estimatedCost: '₹7,000', highlights: ['Imambaras', 'Residency ruins', 'Chikankari shopping', 'Malihabad mango tour'] },
    ],
  },
  mysore: {
    slug: 'mysore',
    name: 'Mysore',
    tagline: 'Royal heritage and sandalwood fragrance',
    description: 'Mysore is Karnataka\'s cultural gem — a royal city of illuminated palaces, fragrant sandalwood, silk saris, and the grand Dasara festival. The Mysore Palace lit up at night is one of India\'s most breathtaking sights.',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80',
    vibe: 'cultural',
    highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Devaraja Market', 'St. Philomena\'s Church'],
    bestTime: 'October to February',
    avgBudget: '₹2,000 - ₹5,000/day',
    coordinates: { lat: 12.2958, lng: 76.6394 },
    state: 'karnataka',
    country: 'India',
    popularTrips: [
      { id: 'my-1', title: 'Royal Mysore Experience', duration: '2 days', difficulty: 'easy', estimatedCost: '₹5,000', highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Mysore Pak'] },
      { id: 'my-2', title: 'Mysore to Ooty Hill Trail', duration: '4 days', difficulty: 'moderate', estimatedCost: '₹12,000', highlights: ['Mysore Palace', 'Bandipur Safari', 'Ooty', 'Nilgiri Mountain Railway'] },
    ],
  },
};

export const CITY_SLUGS = Object.keys(CITIES);

/**
 * Returns the full StateData object for a given city, by resolving the
 * city's `state` slug against the STATES data in ./states.
 * Returns undefined for cities with no associated Indian state (e.g. Nepal).
 */
export function getCityState(citySlug: string) {
  const city = CITIES[citySlug];
  if (!city || !city.state) return undefined;
  return getStateBySlug(city.state);
}

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
