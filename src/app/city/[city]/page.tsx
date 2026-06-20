import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, SAMPLE_TRAVELERS, SAMPLE_GUIDES, TravelerProfile, GuideProfile } from '@/data/cities';
import { getStateBySlug } from '@/data/states';
import prisma from '@/lib/prisma';
import CityPageClient from './CityPageClient';

interface Props {
  params: { city: string };
}

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: Props): Metadata {
  const city = CITIES[params.city];
  if (!city) return {};

  const stateData = city.state ? getStateBySlug(city.state) : undefined;
  const stateName = stateData?.name || '';

  const title = `Find Travel Partners in ${city.name} — Luventra`;
  const description = `Looking for a travel buddy in ${city.name}, ${stateName || city.country}? Connect with verified travelers, plan trips together, and explore ${city.name}. ${city.description}`;

  return {
    title,
    description,
    keywords: [
      `travel partner ${city.name}`, `travel buddy ${city.name}`,
      `${city.name} trip partner`, `${city.name} group travel`,
      `things to do in ${city.name}`, `${city.name} travel guide`,
      `backpacking ${city.name}`,
    ],
    alternates: { canonical: `/city/${city.slug}` },
    openGraph: {
      title, description,
      url: `https://luventra.com/city/${city.slug}`,
      images: [{ url: city.heroImage, width: 1200, height: 630, alt: `Travel to ${city.name}` }],
      type: 'website', locale: 'en_IN',
    },
    twitter: { card: 'summary_large_image', title, description, images: [city.heroImage] },
    other: {
      'geo.region': city.country === 'India' ? `IN-${stateName.substring(0, 2).toUpperCase()}` : 'NP',
      'geo.placename': city.name,
      'geo.position': `${city.coordinates.lat};${city.coordinates.lng}`,
      'ICBM': `${city.coordinates.lat}, ${city.coordinates.lng}`,
    },
  };
}

async function getTripsForCity(citySlug: string): Promise<TravelerProfile[]> {
  try {
    const trips = await prisma.trip.findMany({
      where: { destination: citySlug, status: 'open' },
      include: {
        user: {
          select: { id: true, name: true, avatar: true, age: true, bio: true, travelStyle: true, languages: true, verified: true, rating: true, tripsCount: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 12,
    });

    return trips.map((t: any) => ({
      id: t.id,
      name: t.user.name,
      age: t.user.age || 25,
      avatar: t.user.avatar || '',
      bio: t.user.bio || t.description || '',
      travelStyle: t.user.travelStyle || 'Explorer',
      languages: JSON.parse(t.user.languages) as string[],
      verified: t.user.verified,
      rating: t.user.rating,
      tripsCompleted: t.user.tripsCount,
      sponsorType: t.sponsorType as 'sponsor' | 'need-sponsor' | 'just-join',
      interests: JSON.parse(t.interests) as string[],
      destination: t.destination,
      dateRange: formatDateRange(t.startDate, t.endDate),
    }));
  } catch {
    return SAMPLE_TRAVELERS.filter((t) => t.destination === citySlug);
  }
}

async function getGuidesForCity(citySlug: string): Promise<GuideProfile[]> {
  try {
    const guides = await prisma.guide.findMany({
      where: { city: citySlug, active: true },
      include: {
        user: {
          select: { id: true, name: true, avatar: true, age: true, bio: true, languages: true, verified: true, rating: true },
        },
      },
      orderBy: { toursCompleted: 'desc' },
    });

    return guides.map((g: any) => ({
      id: g.id,
      name: g.user.name,
      age: g.user.age || 30,
      avatar: g.user.avatar || '',
      bio: g.user.bio || '',
      speciality: g.speciality,
      languages: JSON.parse(g.user.languages) as string[],
      verified: g.verified,
      rating: g.user.rating,
      toursCompleted: g.toursCompleted,
      pricePerDay: `₹${g.pricePerDay.toLocaleString()}`,
      expertise: JSON.parse(g.expertise) as string[],
      city: g.city,
      availability: g.availability,
      localSince: g.localSince,
    }));
  } catch {
    return SAMPLE_GUIDES.filter((g) => g.city === citySlug);
  }
}

function formatDateRange(start: Date, end: Date): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[start.getMonth()]} ${start.getDate()}-${end.getDate()}`;
}

export default async function CityPage({ params }: Props) {
  const city = CITIES[params.city];
  if (!city) notFound();

  const [cityTravelers, cityGuides] = await Promise.all([
    getTripsForCity(city.slug),
    getGuidesForCity(city.slug),
  ]);

  const otherTravelers = SAMPLE_TRAVELERS.filter((t) => t.destination !== city.slug).slice(0, 4);

  const cityStateData = city.state ? getStateBySlug(city.state) : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: city.name,
    description: city.description,
    geo: { '@type': 'GeoCoordinates', latitude: city.coordinates.lat, longitude: city.coordinates.lng },
    touristType: city.vibe,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: cityStateData?.name || city.country,
      containedInPlace: { '@type': 'Country', name: city.country },
    },
    url: `https://luventra.com/city/${city.slug}`,
    image: city.heroImage,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityPageClient city={city} cityTravelers={cityTravelers} otherTravelers={otherTravelers} cityGuides={cityGuides} />
    </>
  );
}
