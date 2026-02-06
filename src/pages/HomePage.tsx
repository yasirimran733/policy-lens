export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr,1fr] items-center">
        <div>
          <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Hack4Hope LA • ACS CAN
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Making Cancer Policy Easy to Understand
          </h1>
          <p className="mt-4 max-w-xl text-balance text-base text-slate-600 sm:text-lg">
            An educational tool showing how policy decisions affect access
            to cancer screening — especially for communities that are
            often left out.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Educational simulation • Not medical advice
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Plain‑language explanations</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
              <span>Simple policy simulator</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
              <span>Guided AI Q&amp;A</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-100 via-emerald-50 to-sky-100 blur-2xl" />
          <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Within 30 seconds, you can:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-50 text-[10px] font-semibold text-blue-700">
                  1
                </span>
                <span>See how insurance rules change who gets screened.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                  2
                </span>
                <span>
                  Compare access between urban, suburban, and underserved
                  communities.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sky-50 text-[10px] font-semibold text-sky-700">
                  3
                </span>
                <span>
                  Ask safe, educational questions about cancer policy and
                  advocacy.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            The problem: confusing systems
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Insurance rules limit who gets screened, even when screening
            could find cancer early.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Policy shapes access
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Policies shape access to preventive care, from cost-sharing to
            which clinics are available.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Unequal impact
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Underserved communities face the biggest gaps in screening
            access and follow-up care.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-emerald-900">
          How this tool helps
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-emerald-900">
              Visualize policy impact
            </p>
            <p className="text-sm text-emerald-800">
              Turn simple policy toggles on and off to see how screening
              access changes across communities.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-emerald-900">
              Learn cancer policy basics
            </p>
            <p className="text-sm text-emerald-800">
              Explore short, plain-language explanations built for students
              and first-time learners.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-emerald-900">
              Ask safe, educational questions
            </p>
            <p className="text-sm text-emerald-800">
              Use the AI policy chatbot to ask about insurance, screening
              programs, and advocacy—not medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

