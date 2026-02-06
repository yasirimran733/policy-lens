import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'

type CommunityKey = 'urban' | 'suburban' | 'underserved'

const BASE_ACCESS: Record<CommunityKey, number> = {
  urban: 40,
  suburban: 75,
  underserved: 25,
}

const COMMUNITY_LABELS: Record<CommunityKey, string> = {
  urban: 'Urban',
  suburban: 'Suburban',
  underserved: 'Underserved',
}

function getAccessColor(value: number) {
  if (value >= 70) return '#16a34a' // green - higher access
  if (value >= 40) return '#f97316' // orange - moderate
  return '#dc2626' // red - low
}

export function SimulatorPage() {
  const [expandCoverage, setExpandCoverage] = useState(false)
  const [freePrograms, setFreePrograms] = useState(false)
  const [mobileClinics, setMobileClinics] = useState(false)

  const data = useMemo(() => {
    const computeValue = (key: CommunityKey) => {
      let value = BASE_ACCESS[key]

      // 1. Expand Insurance Coverage – increases access for all communities
      if (expandCoverage) {
        value += 8
      }

      // 2. Free Cancer Screening Programs – stronger impact on underserved groups
      if (freePrograms) {
        if (key === 'underserved') value += 15
        else if (key === 'suburban') value += 6
        else value += 4
      }

      // 3. Mobile Screening Clinics – greatest benefit for underserved communities
      if (mobileClinics) {
        if (key === 'underserved') value += 18
        else if (key === 'urban') value += 6
        else value += 4
      }

      // Keep within 0–100 for clarity
      return Math.max(0, Math.min(100, value))
    }

    return (Object.keys(BASE_ACCESS) as CommunityKey[]).map((key) => {
      const access = computeValue(key)
      return {
        key,
        community: COMMUNITY_LABELS[key],
        access,
        color: getAccessColor(access),
      }
    })
  }, [expandCoverage, freePrograms, mobileClinics])

  const anythingOn = expandCoverage || freePrograms || mobileClinics

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Policy Impact Simulator
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Visually explore how three simple policy choices can change access
          to cancer screening for urban, suburban, and underserved
          communities.
        </p>
        <p className="text-xs text-slate-500">
          This simulator uses simplified data to demonstrate cause-and-effect,
          not real-world predictions.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Policy toggles
          </h2>
          <p className="text-xs text-slate-600">
            Turn policies on and off to see how they change simulated
            screening access. Underserved communities benefit the most.
          </p>

          <div className="mt-3 space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={expandCoverage}
                onChange={(e) => setExpandCoverage(e.target.checked)}
              />
              <div>
                <p className="font-medium text-slate-900">
                  Expand insurance coverage
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  More people gain insurance that pays for cancer screening,
                  increasing access in all communities.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={freePrograms}
                onChange={(e) => setFreePrograms(e.target.checked)}
              />
              <div>
                <p className="font-medium text-slate-900">
                  Free cancer screening programs
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Public programs remove out-of-pocket costs, especially
                  helping people in underserved communities.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={mobileClinics}
                onChange={(e) => setMobileClinics(e.target.checked)}
              />
              <div>
                <p className="font-medium text-slate-900">
                  Mobile screening clinics
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Mobile units bring screening to rural and low-access
                  neighborhoods, strongly boosting underserved access.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">
              Screening access by community
            </h2>
            <p className="text-[11px] text-slate-500">
              Green = higher • Orange = moderate • Red = low
            </p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="community"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Access']}
                  labelFormatter={(label) => `${label} community`}
                  contentStyle={{
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="access" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={entry.key ?? index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3 text-xs text-slate-700 sm:grid-cols-3">
            {data.map((item) => (
              <div
                key={item.key}
                className="flex flex-col rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-800">
                    {item.community}
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.access}%
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600">
                  Base access:{' '}
                  <span className="font-medium">
                    {BASE_ACCESS[item.key]}%
                  </span>
                  {anythingOn && item.access !== BASE_ACCESS[item.key] ? (
                    <>
                      {' '}
                      → with selected policies:{' '}
                      <span className="font-medium">{item.access}%</span>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

