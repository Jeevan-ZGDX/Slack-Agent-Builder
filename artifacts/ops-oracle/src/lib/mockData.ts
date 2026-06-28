export const mockIncidents = Array.from({ length: 50 }).map((_, i) => ({
  id: `INC-2026-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Checkout Service Degradation',
    'Payment Gateway Timeout',
    'Redis Cache Miss Spike',
    'Database CPU at 99%',
    'API Latency > 2s',
  ][Math.floor(Math.random() * 5)],
  severity: ['P1', 'P2', 'P3'][Math.floor(Math.random() * 3)],
  status: ['Active', 'Investigating', 'Resolved', 'Postmortem'][Math.floor(Math.random() * 4)],
  service: ['Checkout', 'Payments', 'Inventory', 'Auth', 'Database'][Math.floor(Math.random() * 5)],
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  mttr: Math.floor(Math.random() * 60) + 10,
  engineers: ['Sarah J.', 'Mike T.', 'Alex K.', 'Elena R.'].slice(0, Math.floor(Math.random() * 3) + 1),
  rootCause: 'Connection pool exhaustion leading to cascading timeouts.',
  relatedIncidents: Math.floor(Math.random() * 5),
}));

export const mockEngineers = Array.from({ length: 25 }).map((_, i) => ({
  id: `USR-${i}`,
  name: [
    'Sarah Jenkins', 'Mike Torres', 'Alex Kim', 'Elena Rodriguez', 'David Chen',
    'Nina Patel', 'James Wilson', 'Lisa Zhang', 'Tom Baker', 'Rachel Green'
  ][Math.floor(Math.random() * 10)] + ` ${i}`,
  dept: ['SRE', 'Backend', 'Database', 'Platform'][Math.floor(Math.random() * 4)],
  expertise: Math.floor(Math.random() * 30) + 70,
  pastIncidents: Math.floor(Math.random() * 50) + 5,
  availability: ['Available', 'Busy', 'On-Call'][Math.floor(Math.random() * 3)],
  confidence: Math.floor(Math.random() * 20) + 80,
  reason: 'Resolved similar timeout issues 3 times this quarter.',
}));

export const mockServices = [
  { name: 'Checkout', health: 'Critical', uptime: 98.4, alertCount: 42 },
  { name: 'Payments', health: 'Warning', uptime: 99.1, alertCount: 15 },
  { name: 'Inventory', health: 'Healthy', uptime: 99.9, alertCount: 2 },
  { name: 'Auth', health: 'Healthy', uptime: 99.99, alertCount: 0 },
  { name: 'Notifications', health: 'Healthy', uptime: 99.8, alertCount: 5 },
  { name: 'Recommendations', health: 'Warning', uptime: 98.9, alertCount: 12 },
  { name: 'Analytics', health: 'Healthy', uptime: 99.5, alertCount: 4 },
  { name: 'CDN', health: 'Healthy', uptime: 99.99, alertCount: 1 },
];

export const mockRunbooks = Array.from({ length: 15 }).map((_, i) => ({
  id: `RB-${i}`,
  title: [
    'Redis Connection Pool Exhaustion Mitigation',
    'Payment Gateway Failover Procedure',
    'Database Replica Promotion',
    'High API Latency Diagnostics',
    'Kafka Cluster Recovery'
  ][Math.floor(Math.random() * 5)],
  summary: 'Steps to identify and resolve resource exhaustion in the connection pool.',
  steps: Math.floor(Math.random() * 10) + 3,
  successRate: Math.floor(Math.random() * 20) + 80,
  estimatedTime: Math.floor(Math.random() * 30) + 5,
}));

export const mockAnalyticsData = [
  { name: 'Mon', incidents: 4 },
  { name: 'Tue', incidents: 3 },
  { name: 'Wed', incidents: 7 },
  { name: 'Thu', incidents: 2 },
  { name: 'Fri', incidents: 5 },
  { name: 'Sat', incidents: 1 },
  { name: 'Sun', incidents: 2 },
];
