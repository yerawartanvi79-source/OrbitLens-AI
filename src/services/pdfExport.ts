export function exportAnalyticsReport() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the OrbitLens AI briefing.');
    return;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>OrbitLens AI - Space Intelligence Briefing Report</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #0f172a;
      background: #ffffff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 2px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .logo {
      font-size: 26px;
      font-weight: 800;
      color: #1e1b4b;
      letter-spacing: -0.5px;
    }
    .logo span {
      color: #06b6d4;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .meta {
      font-size: 13px;
      color: #64748b;
      text-align: right;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    .stat-value {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
      text-transform: uppercase;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-top: 28px;
      margin-bottom: 12px;
      border-left: 4px solid #06b6d4;
      padding-left: 10px;
    }
    .insight-card {
      background: #f1f5f9;
      border-left: 4px solid #8b5cf6;
      border-radius: 0 8px 8px 0;
      padding: 16px 20px;
      margin-bottom: 20px;
    }
    .insight-title {
      font-size: 15px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 8px;
    }
    ul {
      margin: 0;
      padding-left: 20px;
      color: #334155;
      font-size: 14px;
    }
    li {
      margin-bottom: 6px;
    }
    .footer {
      margin-top: 50px;
      border-top: 1px solid #cbd5e1;
      padding-top: 20px;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
    .disclaimer {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 15px;
      line-height: 1.4;
      background: #f8fafc;
      padding: 12px;
      border-radius: 6px;
    }
    .no-print-bar {
      background: #0f172a;
      color: white;
      padding: 12px 24px;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -40px -40px 30px -40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .btn {
      background: #06b6d4;
      color: #000;
      font-weight: 600;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    @media print {
      .no-print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div><strong>OrbitLens AI</strong> — Space Intelligence & Analytics Platform</div>
    <div>
      <button class="btn" onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="header">
    <div>
      <div class="logo">ORBIT<span>LENS</span> AI</div>
      <div style="font-size: 14px; color: #64748b; margin-top: 4px;">Global Satellite & Astrodynamics Intelligence Briefing</div>
    </div>
    <div class="meta">
      <span class="badge">Analytical Report</span>
      <div style="margin-top: 6px;">Generated: <strong>${currentDate}</strong></div>
      <div>Source: Public Space Telemetry</div>
    </div>
  </div>

  <div class="grid">
    <div class="stat-card">
      <div class="stat-value">10,240+</div>
      <div class="stat-label">Active Satellites</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">36,500+</div>
      <div class="stat-label">Tracked Debris (>10cm)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">81.5%</div>
      <div class="stat-label">LEO Orbital Share</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">188</div>
      <div class="stat-label">Launches YTD</div>
    </div>
  </div>

  <div class="section-title">1. Orbital Distribution & Megaconstellation Dynamics</div>
  <div class="insight-card">
    <div class="insight-title">Low Earth Orbit (LEO) Hyper-Congestion</div>
    <ul>
      <li>Low Earth Orbit (LEO, 200–2,000 km) now hosts 81.5% of all functional satellites worldwide.</li>
      <li>Commercial broadband mega-constellations (Starlink, OneWeb, Amazon Kuiper) account for over 65% of all active spacecraft.</li>
      <li>Geostationary Orbit (GEO) maintains 5.8% share, vital for sovereign telecommunications and meteorology.</li>
      <li>SSO (Sun-Synchronous) remains the premier corridor for multispectral Earth Observation and synthetic aperture radar (SAR).</li>
    </ul>
  </div>

  <div class="section-title">2. Global Launch Cadence & Commercialization</div>
  <div class="insight-card">
    <div class="insight-title">Commercial Launcher Flight Cadence</div>
    <ul>
      <li>United States entities operate over 60% of all registered active spacecraft, led by commercial space launch reusability.</li>
      <li>China maintains steady national cadence with Long March series, deploying Tiangong Space Station modules and BeiDou-3 GNSS.</li>
      <li>ISRO (India) and ESA (Europe) continue pioneering commercial rideshare launches, lunar probes, and climate monitoring satellites.</li>
      <li>Cost-per-kilogram to LEO has dropped by ~85% over the past decade, democratizing orbital access for academic CubeSats.</li>
    </ul>
  </div>

  <div class="section-title">3. Space Traffic Management & Sustainability</div>
  <div class="insight-card">
    <div class="insight-title">Orbital Debris Mitigation & Conjunction Assessment</div>
    <ul>
      <li>Over 36,500 pieces of orbital debris larger than 10 cm are cataloged by space surveillance networks.</li>
      <li>The peak congestion altitude band sits between 500 km and 850 km altitude.</li>
      <li>Automated optical collision avoidance algorithms (CARA) are now mandatory for LEO fleet operators to mitigate the Kessler syndrome.</li>
    </ul>
  </div>

  <div class="disclaimer">
    <strong>DISCLAIMER & TERMS OF USE:</strong> OrbitLens AI is developed strictly for educational, scientific research, and data visualization purposes. Telemetry, coordinates, and orbital elements are aggregated from public repositories (including NASA, CelesTrak, and satellite ephemeris models) and must not be used for mission-critical flight navigation, tactical defense decisions, or official aerospace launch guidance.
  </div>

  <div class="footer">
    <div>OrbitLens AI — Space Intelligence & Analytics</div>
    <div>Page 1 of 1 • Internal Educational Report</div>
  </div>
</body>
</html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
