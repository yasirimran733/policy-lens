import { NavLink, Outlet } from 'react-router-dom'

const navLinkBase =
  'px-3 py-2 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'

const activeClasses = 'bg-blue-600 text-white'
const inactiveClasses =
  'text-slate-700 hover:bg-blue-50 hover:text-blue-700'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-emerald-500 to-sky-400 text-white shadow-sm">
              <span className="text-lg font-semibold">PL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-900">
                Policy Lens
              </span>
              <span className="text-xs text-slate-500">
                Cancer Policy Education • Hack4Hope LA
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive ? activeClasses : inactiveClasses
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/simulator"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive ? activeClasses : inactiveClasses
                }`
              }
            >
              Policy Impact Simulator
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive ? activeClasses : inactiveClasses
                }`
              }
            >
              AI Policy Chatbot
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-600 sm:px-6">
          <p className="font-medium text-slate-700">
            Educational disclaimer
          </p>
          <p className="mt-1">
            This tool is for general cancer policy education only. It does
            not provide medical advice, diagnosis, or treatment
            recommendations. No real patient data is used.
          </p>
          <p className="mt-1">
            Inspired by publicly available cancer policy research and
            advocacy materials from the American Cancer Society (ACS), the
            American Cancer Society Cancer Action Network (ACS CAN), the
            Centers for Disease Control and Prevention (CDC), and the
            National Cancer Institute (NCI).
          </p>
        </div>
      </footer>
    </div>
  )
}

