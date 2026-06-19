import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const passwordHash = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'arjun@example.com' },
      update: {},
      create: {
        name: 'Arjun Mehta', email: 'arjun@example.com', passwordHash, age: 27,
        bio: 'Software engineer by day, mountain lover by heart. Looking for someone to share chai at 14,000 feet.',
        travelStyle: 'Backpacker', languages: JSON.stringify(['Hindi', 'English']),
        interests: JSON.stringify(['Trekking', 'Photography', 'Camping']),
        verified: true, rating: 4.8, tripsCount: 12,
      },
    }),
    prisma.user.upsert({
      where: { email: 'priya@example.com' },
      update: {},
      create: {
        name: 'Priya Sharma', email: 'priya@example.com', passwordHash, age: 24,
        bio: "Travel blogger exploring India one city at a time. Let's create memories worth writing about!",
        travelStyle: 'Explorer', languages: JSON.stringify(['Hindi', 'English', 'French']),
        interests: JSON.stringify(['Culture', 'Food', 'Photography']),
        verified: true, rating: 4.9, tripsCount: 28,
      },
    }),
    prisma.user.upsert({
      where: { email: 'rahul@example.com' },
      update: {},
      create: {
        name: 'Rahul Verma', email: 'rahul@example.com', passwordHash, age: 30,
        bio: 'Just quit my corporate job to travel. Budget is tight but spirits are high!',
        travelStyle: 'Budget Traveler', languages: JSON.stringify(['Hindi', 'English']),
        interests: JSON.stringify(['Adventure', 'Local Food', 'Hostels']),
        verified: true, rating: 4.5, tripsCount: 5,
      },
    }),
    prisma.user.upsert({
      where: { email: 'ananya@example.com' },
      update: {},
      create: {
        name: 'Ananya Das', email: 'ananya@example.com', passwordHash, age: 26,
        bio: 'Yoga instructor who believes travel is the best meditation. Come find peace together.',
        travelStyle: 'Wellness Traveler', languages: JSON.stringify(['Hindi', 'English', 'Bengali']),
        interests: JSON.stringify(['Yoga', 'Meditation', 'Nature']),
        verified: true, rating: 4.7, tripsCount: 15,
      },
    }),
    prisma.user.upsert({
      where: { email: 'vikram@example.com' },
      update: {},
      create: {
        name: 'Vikram Singh', email: 'vikram@example.com', passwordHash, age: 32,
        bio: "Entrepreneur who loves sponsoring adventures for fellow travelers. Your company is my reward.",
        travelStyle: 'Luxury', languages: JSON.stringify(['Hindi', 'English', 'Punjabi']),
        interests: JSON.stringify(['Fine Dining', 'Luxury Stays', 'Photography']),
        verified: true, rating: 5.0, tripsCount: 40,
      },
    }),
    prisma.user.upsert({
      where: { email: 'meera@example.com' },
      update: {},
      create: {
        name: 'Meera Nair', email: 'meera@example.com', passwordHash, age: 23,
        bio: "College student with wanderlust. Can't afford much but I'll bring the best playlist and positive vibes!",
        travelStyle: 'Budget Backpacker', languages: JSON.stringify(['Hindi', 'English', 'Malayalam']),
        interests: JSON.stringify(['Music', 'Beaches', 'Street Food']),
        verified: true, rating: 4.6, tripsCount: 8,
      },
    }),
    prisma.user.upsert({
      where: { email: 'karan@example.com' },
      update: {},
      create: {
        name: 'Karan Patel', email: 'karan@example.com', passwordHash, age: 29,
        bio: 'Wildlife photographer on a mission to capture every national park. Need a brave companion!',
        travelStyle: 'Adventure', languages: JSON.stringify(['Hindi', 'English', 'Gujarati']),
        interests: JSON.stringify(['Wildlife', 'Photography', 'Camping']),
        verified: true, rating: 4.8, tripsCount: 22,
      },
    }),
    prisma.user.upsert({
      where: { email: 'sneha@example.com' },
      update: {},
      create: {
        name: 'Sneha Gupta', email: 'sneha@example.com', passwordHash, age: 25,
        bio: "History buff and architecture nerd. Let's explore temples and ancient ruins together!",
        travelStyle: 'Cultural Explorer', languages: JSON.stringify(['Hindi', 'English']),
        interests: JSON.stringify(['History', 'Architecture', 'Museums']),
        verified: true, rating: 4.7, tripsCount: 18,
      },
    }),
  ]);

  // Create trips
  await Promise.all([
    prisma.trip.create({ data: { userId: users[0].id, destination: 'manali', title: 'Manali Snow Adventure', description: 'Looking for a partner to explore Solang Valley and attempt Rohtang.', startDate: new Date('2026-07-15'), endDate: new Date('2026-07-22'), sponsorType: 'sponsor', budget: '₹15,000', interests: JSON.stringify(['Trekking', 'Photography', 'Camping']) } }),
    prisma.trip.create({ data: { userId: users[1].id, destination: 'goa', title: 'Goa Content Creation Trip', description: 'Shooting a travel vlog across North and South Goa. Need a fun travel companion!', startDate: new Date('2026-08-01'), endDate: new Date('2026-08-07'), sponsorType: 'just-join', budget: '₹20,000', interests: JSON.stringify(['Culture', 'Food', 'Photography']) } }),
    prisma.trip.create({ data: { userId: users[2].id, destination: 'rishikesh', title: 'Budget Rishikesh Adventure', description: 'Rafting, camping, and ashram hopping on a tight budget. Just need good company!', startDate: new Date('2026-07-20'), endDate: new Date('2026-07-25'), sponsorType: 'need-sponsor', budget: '₹5,000', interests: JSON.stringify(['Adventure', 'Local Food']) } }),
    prisma.trip.create({ data: { userId: users[3].id, destination: 'rishikesh', title: 'Yoga Retreat & River Meditation', description: 'A spiritual journey along the Ganges. Morning yoga, evening aarti, inner peace.', startDate: new Date('2026-08-05'), endDate: new Date('2026-08-12'), sponsorType: 'just-join', budget: '₹12,000', interests: JSON.stringify(['Yoga', 'Meditation', 'Nature']) } }),
    prisma.trip.create({ data: { userId: users[4].id, destination: 'kerala', title: 'Luxury Kerala Backwaters', description: "I'll sponsor the entire trip - houseboat, Ayurveda spa, tea plantation tour. Just need great company.", startDate: new Date('2026-09-01'), endDate: new Date('2026-09-08'), sponsorType: 'sponsor', budget: '₹50,000', interests: JSON.stringify(['Fine Dining', 'Luxury Stays', 'Photography']) } }),
    prisma.trip.create({ data: { userId: users[5].id, destination: 'goa', title: 'Beach Vibes on a Budget', description: "Looking for someone to split hostel costs and explore hidden beaches together.", startDate: new Date('2026-07-10'), endDate: new Date('2026-07-17'), sponsorType: 'need-sponsor', budget: '₹4,000', interests: JSON.stringify(['Music', 'Beaches', 'Street Food']) } }),
    prisma.trip.create({ data: { userId: users[6].id, destination: 'nepal', title: 'Annapurna Photography Expedition', description: 'Serious photography trip to capture the Himalayas. Looking for fellow photographers.', startDate: new Date('2026-10-01'), endDate: new Date('2026-10-15'), sponsorType: 'just-join', budget: '₹35,000', interests: JSON.stringify(['Wildlife', 'Photography', 'Camping']) } }),
    prisma.trip.create({ data: { userId: users[7].id, destination: 'nepal', title: 'Kathmandu Temple Trail', description: "Exploring the ancient temples and architecture of the Kathmandu Valley. History nerds welcome!", startDate: new Date('2026-11-05'), endDate: new Date('2026-11-15'), sponsorType: 'sponsor', budget: '₹25,000', interests: JSON.stringify(['History', 'Architecture', 'Museums']) } }),
  ]);

  // Create guide users + guide profiles
  const guideUsers = await Promise.all([
    prisma.user.upsert({ where: { email: 'deepak.rawat@example.com' }, update: {}, create: { name: 'Deepak Rawat', email: 'deepak.rawat@example.com', passwordHash, age: 34, bio: 'Born and raised in Mussoorie. I know every hidden trail, secret waterfall, and the best chai stalls.', languages: JSON.stringify(['Hindi', 'English', 'Garhwali']), verified: true, rating: 4.9 } }),
    prisma.user.upsert({ where: { email: 'lakshmi.menon@example.com' }, update: {}, create: { name: 'Lakshmi Menon', email: 'lakshmi.menon@example.com', passwordHash, age: 29, bio: "Ayurveda practitioner and backwater expert. I'll show you the Kerala that guidebooks miss.", languages: JSON.stringify(['Malayalam', 'Hindi', 'English', 'Tamil']), verified: true, rating: 5.0 } }),
    prisma.user.upsert({ where: { email: 'tenzing@example.com' }, update: {}, create: { name: 'Tenzing Sherpa', email: 'tenzing@example.com', passwordHash, age: 38, bio: "Third-generation mountain guide. Summited Annapurna twice.", languages: JSON.stringify(['Nepali', 'Hindi', 'English', 'Tibetan']), verified: true, rating: 4.9 } }),
    prisma.user.upsert({ where: { email: 'ravi.kumar@example.com' }, update: {}, create: { name: 'Ravi Kumar', email: 'ravi.kumar@example.com', passwordHash, age: 31, bio: "Rafting instructor and certified adventure guide. Grade 4 rapids to cliff jumps.", languages: JSON.stringify(['Hindi', 'English']), verified: true, rating: 4.8 } }),
    prisma.user.upsert({ where: { email: 'fernandes@example.com' }, update: {}, create: { name: 'Fernandes Gomes', email: 'fernandes@example.com', passwordHash, age: 36, bio: "Goan born, Portuguese roots. Secret forts, spice plantations, best fish curry.", languages: JSON.stringify(['Konkani', 'Hindi', 'English', 'Portuguese']), verified: true, rating: 4.7 } }),
    prisma.user.upsert({ where: { email: 'pema@example.com' }, update: {}, create: { name: 'Pema Dorji', email: 'pema@example.com', passwordHash, age: 27, bio: "Former monk turned guide. Spiritual lens to every Himalayan trek.", languages: JSON.stringify(['Hindi', 'English', 'Tibetan']), verified: true, rating: 4.8 } }),
    prisma.user.upsert({ where: { email: 'himanshu@example.com' }, update: {}, create: { name: 'Himanshu Thakur', email: 'himanshu@example.com', passwordHash, age: 33, bio: "Snow sports instructor and Manali local. First time skiing or secret powder spots.", languages: JSON.stringify(['Hindi', 'English', 'Pahari']), verified: true, rating: 4.9 } }),
    prisma.user.upsert({ where: { email: 'mohan@example.com' }, update: {}, create: { name: 'Mohan Negi', email: 'mohan@example.com', passwordHash, age: 40, bio: "Retired army man. Expert in high-altitude treks and survival skills.", languages: JSON.stringify(['Hindi', 'English', 'Pahari']), verified: true, rating: 5.0 } }),
  ]);

  // Create guide profiles
  const guideData = [
    { userId: guideUsers[0].id, speciality: 'Mountain Trails & Hidden Gems', city: 'mussoorie', pricePerDay: 1500, expertise: JSON.stringify(['Trekking', 'History', 'Wildlife', 'Photography spots']), localSince: '30+ years', toursCompleted: 156, verified: true },
    { userId: guideUsers[1].id, speciality: 'Backwaters & Ayurveda', city: 'kerala', pricePerDay: 2000, expertise: JSON.stringify(['Ayurveda', 'Backwaters', 'Cuisine', 'Temple tours']), localSince: '29 years', toursCompleted: 203, verified: true },
    { userId: guideUsers[2].id, speciality: 'High Altitude Trekking', city: 'nepal', pricePerDay: 2500, expertise: JSON.stringify(['Trekking', 'Mountaineering', 'Camping', 'First Aid']), localSince: '38 years', toursCompleted: 312, verified: true },
    { userId: guideUsers[3].id, speciality: 'Adventure Sports', city: 'rishikesh', pricePerDay: 1800, expertise: JSON.stringify(['Rafting', 'Bungee', 'Cliff Jumping', 'Camping']), localSince: '12 years', toursCompleted: 420, verified: true },
    { userId: guideUsers[4].id, speciality: 'Heritage & Food Tours', city: 'goa', pricePerDay: 2200, expertise: JSON.stringify(['Food Tours', 'Heritage', 'Nightlife', 'Water Sports']), localSince: '36 years', toursCompleted: 185, verified: true },
    { userId: guideUsers[5].id, speciality: 'Spiritual & Cultural Treks', city: 'dehradun', pricePerDay: 1200, expertise: JSON.stringify(['Meditation', 'Temple Tours', 'Trekking', 'Local Culture']), localSince: '15 years', toursCompleted: 89, verified: true },
    { userId: guideUsers[6].id, speciality: 'Snow Sports & Valley Trails', city: 'manali', pricePerDay: 2000, expertise: JSON.stringify(['Skiing', 'Snowboarding', 'Trekking', 'Camping']), localSince: '33 years', toursCompleted: 245, verified: true },
    { userId: guideUsers[7].id, speciality: 'Wilderness & Survival', city: 'kullu', pricePerDay: 1800, expertise: JSON.stringify(['Survival', 'Trekking', 'Fishing', 'Bird Watching']), localSince: '40 years', toursCompleted: 178, verified: true },
  ];

  for (const g of guideData) {
    await prisma.guide.upsert({
      where: { userId: g.userId },
      update: {},
      create: g,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
