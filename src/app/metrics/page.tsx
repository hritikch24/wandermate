'use client';

import { useState, useEffect, useCallback } from 'react';

interface MetricsData {
  period: { days: number; since: string };
  traffic: {
    totalViews: number;
    uniqueSessions: number;
    topPages: { path: string; views: number }[];
    topReferrers: { referrer: string; views: number }[];
    devices: { device: string; count: number }[];
    browsers: { browser: string; count: number }[];
    countries: { country: string; count: number }[];
    topSubdomains: { subdomain: string; count: number }[];
    utmSources: { utm_source: string; count: number }[];
    daily: { date: string; views: number }[];
  };
  engagement: {
    totalActions: number;
    byAction: { action: string; count: number }[];
    conversionRate: number;
    dailyActions: { date: string; count: number }[];
  };
  users: {
    totalUsers: number;
    newUsers: number;
    totalTrips: number;
    totalMessages: number;
    totalTripRequests: { total: number; accepted: number; pending: number; rejected: number };
    topDestinations: { destination: string; count: number }[];
  };
}

const ACTION_LABELS: Record<string, string> = {
  connect_request: 'Connect Requests',
  book_guide: 'Guide Bookings',
  chat_start: 'Chat Starts',
  signup: 'Signups',
  trip_create: 'Trip Creates',
  profile_view: 'Profile Views',
};

function StatCard({ label, value, sub, icon, trend }: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        {icon && <div className="text-brand-400">{icon}</div>}
      </div>
      <p className="text-3xl font-display font-bold gradient-text tracking-tight">{value}</p>
      {sub && (
        <p className={`text-xs mt-1.5 font-medium ${
          trend === 'up' ? 'text-forest-600' : trend === 'down' ? 'text-romantic-600' : 'text-gray-400'
        }`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionCard({ title, children, className = '' }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-display font-bold text-gray-800 text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function BarChart({ data, labelKey, valueKey, maxBars = 10, color = 'bg-brand-500' }: {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
  maxBars?: number;
  color?: string;
}) {
  const sliced = data.slice(0, maxBars);
  const max = Math.max(...sliced.map((d) => Number(d[valueKey]) || 0), 1);

  return (
    <div className="space-y-3">
      {sliced.map((row, i) => {
        const val = Number(row[valueKey]) || 0;
        const pct = (val / max) * 100;
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600 truncate max-w-[200px] group-hover:text-gray-900 transition-colors" title={String(row[labelKey])}>
                {String(row[labelKey]) || '(direct)'}
              </span>
              <span className="text-sm font-semibold text-gray-800 tabular-nums ml-3">{val.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      {data.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">No data yet</p>
        </div>
      )}
    </div>
  );
}

function MiniChart({ data, valueKey, height = 80 }: {
  data: { date: string; [key: string]: unknown }[];
  valueKey: string;
  height?: number;
}) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-gray-400 text-sm">Not enough data to chart</p>
      </div>
    );
  }

  const values = data.map((d) => Number(d[valueKey]) || 0);
  const max = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);

  return (
    <div>
      <div className="flex items-end gap-[2px]" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 bg-brand-300/40 hover:bg-romantic-400/70 rounded-t-sm transition-colors cursor-default relative group"
            style={{ height: `${Math.max((v / max) * 100, 3)}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {data[i].date.slice(5)}: {v}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        <span>{data[0].date.slice(5)}</span>
        <span className="font-medium text-gray-500">Avg: {avg}/day</span>
        <span>{data[data.length - 1].date.slice(5)}</span>
      </div>
    </div>
  );
}

function ViewsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ConnectIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8a3 3 0 1 0-2.83-4M6 8a3 3 0 1 0 2.83-4M18 21a3 3 0 1 0-2.83-4M6 21a3 3 0 1 0 2.83-4M12 12l4-4M12 12l-4-4M12 12l4 4M12 12l-4 4" />
    </svg>
  );
}

function ConversionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TripsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function MetricsPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<MetricsData | null>(null);
  const [period, setPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'engagement' | 'users'>('overview');

  useEffect(() => {
    const saved = sessionStorage.getItem('_luv_metrics_key');
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  const fetchMetrics = useCallback(async (key: string, p: string) => {
    setLoading(true);
    setError('');
    try {
      const param = p.endsWith('h') ? `hours=${p.slice(0, -1)}` : `days=${p.slice(0, -1)}`;
      const res = await fetch(`/api/metrics?${param}&key=${encodeURIComponent(key)}`);
      if (res.status === 401) {
        setError('Invalid API key');
        setAuthenticated(false);
        sessionStorage.removeItem('_luv_metrics_key');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setAuthenticated(true);
      sessionStorage.setItem('_luv_metrics_key', key);
    } catch {
      setError('Failed to load metrics. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated && apiKey) {
      fetchMetrics(apiKey, period);
    }
  }, [authenticated, apiKey, period, fetchMetrics]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      fetchMetrics(apiKey.trim(), period);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('_luv_metrics_key');
    setAuthenticated(false);
    setData(null);
    setApiKey('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="glass-card rounded-2xl shadow-xl p-10 w-full max-w-sm">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-romantic-500 rounded-2xl flex items-center justify-center mb-6 mx-auto romantic-glow">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-2xl gradient-text text-center mb-1">Luventra Metrics</h1>
          <p className="text-gray-400 text-sm text-center mb-8">Enter your admin API key to continue</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Admin API key"
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 mb-4 transition-all bg-white/80"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-romantic-50 text-romantic-700 text-xs mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={!apiKey.trim() || loading}
            className="w-full bg-gradient-to-r from-brand-500 to-romantic-500 hover:from-brand-600 hover:to-romantic-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-medium">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const pagesPerSession = data.traffic.uniqueSessions > 0
    ? (data.traffic.totalViews / data.traffic.uniqueSessions).toFixed(1)
    : '0';

  const connectRequests = data.engagement.byAction.find((a) => a.action === 'connect_request')?.count || 0;
  const signups = data.engagement.byAction.find((a) => a.action === 'signup')?.count || 0;

  const periodLabels: Record<string, string> = {
    '1h': 'Last hour',
    '6h': 'Last 6 hours',
    '24h': 'Last 24 hours',
    '7d': 'Last 7 days',
    '14d': 'Last 14 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    '365d': 'Last year',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 sticky top-0 z-50 border-b border-warm-500/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-warm-500/20 rounded-lg flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#eca044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-display font-bold text-warm-400 text-lg hidden sm:block">Luventra Metrics</span>
              </div>
              {loading && (
                <div className="w-4 h-4 border-2 border-warm-400/50 border-t-warm-400 rounded-full animate-spin" />
              )}
            </div>

            {/* Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {(['overview', 'traffic', 'engagement', 'users'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-warm-500 text-gray-900 shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-white/10 text-white text-sm border border-white/10 rounded-lg px-3 py-2 focus:ring-warm-400 focus:ring-2 focus:outline-none backdrop-blur-sm"
              >
                <option value="1h" className="text-gray-900">Last 1 hour</option>
                <option value="6h" className="text-gray-900">Last 6 hours</option>
                <option value="24h" className="text-gray-900">Last 24 hours</option>
                <option value="7d" className="text-gray-900">Last 7 days</option>
                <option value="14d" className="text-gray-900">Last 14 days</option>
                <option value="30d" className="text-gray-900">Last 30 days</option>
                <option value="90d" className="text-gray-900">Last 90 days</option>
                <option value="365d" className="text-gray-900">Last year</option>
              </select>
              <button
                onClick={() => fetchMetrics(apiKey, period)}
                className="p-2 text-gray-300 hover:text-warm-400 rounded-lg hover:bg-white/5 transition-all"
                title="Refresh"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-romantic-400 rounded-lg hover:bg-white/5 transition-all"
                title="Sign out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="flex">
          {(['overview', 'traffic', 'engagement', 'users'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab
                  ? 'text-gray-900 border-brand-500'
                  : 'text-gray-400 border-transparent'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900/5 text-gray-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
            {periodLabels[period] || period}
          </span>
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Page Views" value={data.traffic.totalViews.toLocaleString()} sub={periodLabels[period]} icon={<ViewsIcon />} />
              <StatCard label="Sessions" value={data.traffic.uniqueSessions.toLocaleString()} icon={<UsersIcon />} />
              <StatCard label="Pages / Session" value={pagesPerSession} />
              <StatCard label="Signups" value={signups} sub={periodLabels[period]} icon={<UsersIcon />} />
              <StatCard label="Conversion" value={`${data.engagement.conversionRate}%`} sub="Signups / Sessions" icon={<ConversionIcon />} />
              <StatCard label="Connect Requests" value={connectRequests} icon={<ConnectIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Page Views">
                <MiniChart data={data.traffic.daily} valueKey="views" height={120} />
              </SectionCard>
              <SectionCard title="Daily Signups">
                <MiniChart
                  data={data.traffic.daily.map((d) => ({
                    date: d.date,
                    count: data.engagement.dailyActions.find((a) => a.date === d.date)?.count || 0,
                  }))}
                  valueKey="count"
                  height={120}
                />
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SectionCard title="Top Pages">
                <BarChart data={data.traffic.topPages} labelKey="path" valueKey="views" />
              </SectionCard>
              <SectionCard title="Referrers">
                <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" color="bg-romantic-500" />
              </SectionCard>
              <SectionCard title="Top Subdomains">
                <BarChart data={data.traffic.topSubdomains} labelKey="subdomain" valueKey="count" color="bg-forest-500" />
              </SectionCard>
            </div>
          </div>
        )}

        {/* Traffic tab */}
        {activeTab === 'traffic' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Page Views" value={data.traffic.totalViews.toLocaleString()} sub={periodLabels[period]} icon={<ViewsIcon />} />
              <StatCard label="Sessions" value={data.traffic.uniqueSessions.toLocaleString()} icon={<UsersIcon />} />
              <StatCard label="Pages / Session" value={pagesPerSession} />
              <StatCard label="Signups" value={signups} sub={periodLabels[period]} icon={<UsersIcon />} />
              <StatCard label="Conversion" value={`${data.engagement.conversionRate}%`} sub="Signups / Sessions" icon={<ConversionIcon />} />
              <StatCard label="Connect Requests" value={connectRequests} icon={<ConnectIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Page Views">
                <MiniChart data={data.traffic.daily} valueKey="views" height={120} />
              </SectionCard>
              <SectionCard title="Top Subdomains">
                <BarChart data={data.traffic.topSubdomains} labelKey="subdomain" valueKey="count" color="bg-forest-500" />
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SectionCard title="Top Pages">
                <BarChart data={data.traffic.topPages} labelKey="path" valueKey="views" />
              </SectionCard>
              <SectionCard title="Referrers">
                <BarChart data={data.traffic.topReferrers} labelKey="referrer" valueKey="views" color="bg-romantic-500" />
              </SectionCard>
              <SectionCard title="UTM Sources">
                <BarChart data={data.traffic.utmSources} labelKey="utm_source" valueKey="count" color="bg-forest-500" />
              </SectionCard>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SectionCard title="Devices">
                <BarChart data={data.traffic.devices} labelKey="device" valueKey="count" />
              </SectionCard>
              <SectionCard title="Browsers">
                <BarChart data={data.traffic.browsers} labelKey="browser" valueKey="count" color="bg-indigo-500" />
              </SectionCard>
              <SectionCard title="Countries">
                <BarChart data={data.traffic.countries} labelKey="country" valueKey="count" color="bg-sky-500" />
              </SectionCard>
            </div>
          </div>
        )}

        {/* Engagement tab */}
        {activeTab === 'engagement' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {(['connect_request', 'book_guide', 'chat_start', 'trip_create', 'profile_view'] as const).map((action) => (
                <StatCard
                  key={action}
                  label={ACTION_LABELS[action]}
                  value={data.engagement.byAction.find((a) => a.action === action)?.count || 0}
                  icon={<ConnectIcon />}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard title="Daily Actions">
                <MiniChart data={data.engagement.dailyActions} valueKey="count" height={120} />
              </SectionCard>
              <SectionCard title="Action Breakdown">
                <BarChart
                  data={data.engagement.byAction.map((a) => ({ label: ACTION_LABELS[a.action] || a.action, count: a.count }))}
                  labelKey="label"
                  valueKey="count"
                  color="bg-romantic-500"
                  maxBars={6}
                />
              </SectionCard>
            </div>

            <SectionCard title="Conversion Funnel">
              <div className="space-y-4">
                {[
                  { label: 'Sessions', value: data.traffic.uniqueSessions, color: 'bg-brand-500' },
                  { label: 'Signups', value: signups, color: 'bg-warm-500' },
                  { label: 'Connect Requests', value: connectRequests, color: 'bg-romantic-500' },
                  { label: 'Trip Creates', value: data.engagement.byAction.find((a) => a.action === 'trip_create')?.count || 0, color: 'bg-forest-500' },
                ].map((step, i) => {
                  const max = Math.max(data.traffic.uniqueSessions, 1);
                  const pct = Math.max((step.value / max) * 100, 2);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{step.label}</span>
                        <span className="text-sm font-semibold text-gray-800 tabular-nums">{step.value.toLocaleString()}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${step.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Users tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={data.users.totalUsers.toLocaleString()} icon={<UsersIcon />} />
              <StatCard label="New Users" value={data.users.newUsers.toLocaleString()} sub={periodLabels[period]} trend="up" icon={<UsersIcon />} />
              <StatCard label="Total Trips" value={data.users.totalTrips.toLocaleString()} icon={<TripsIcon />} />
              <StatCard label="Messages Sent" value={data.users.totalMessages.toLocaleString()} icon={<MessagesIcon />} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SectionCard title="Trip Requests by Status">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-warm-500" />
                      <span className="text-sm text-gray-700">Pending</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm tabular-nums">{data.users.totalTripRequests.pending}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
                      <span className="text-sm text-gray-700">Accepted</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm tabular-nums">{data.users.totalTripRequests.accepted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-romantic-500" />
                      <span className="text-sm text-gray-700">Rejected</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm tabular-nums">{data.users.totalTripRequests.rejected}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900 text-sm tabular-nums">{data.users.totalTripRequests.total}</span>
                  </div>
                </div>
              </SectionCard>
              <SectionCard title="Most Popular Destinations">
                {data.users.topDestinations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                    <MapPinIcon />
                    <p className="text-sm mt-2">No trips yet</p>
                  </div>
                ) : (
                  <BarChart data={data.users.topDestinations} labelKey="destination" valueKey="count" color="bg-brand-500" />
                )}
              </SectionCard>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
