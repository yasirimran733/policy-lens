# Making Cancer Policy Easy to Understand

This repository contains a frontend-only, demo-ready advocacy web app built for Hack4Hope Los Angeles. The app is an educational tool that helps first-time users understand how policy decisions affect access to cancer screening. It is not a medical product, does not provide clinical advice, and does not use real patient data.

## Purpose

The goal is to explain cancer policy plainly, visualize how a few simple policy choices change screening access across communities, and allow safe, educational policy questions via an AI-powered chatbot. The experience is designed to be understandable within 30 seconds for non-technical audiences.

## Core Features

- Home / Landing Page: A concise introduction to the problem and how the tool helps. No charts; clear messaging and calls to action.
- Policy Impact Simulator: A simple, visual demonstration showing how three policy toggles affect screening access across three fixed communities (Urban, Suburban, Underserved).
- AI Policy Chatbot: An educational chatbot preloaded with policy context that answers policy-focused questions and politely rejects medical or diagnostic queries.

## Target Users

- Students and community members
- First-time learners
- Hackathon judges and non-technical audiences

## Pages and Behavior

1. Home / Landing
   - Headline: "Making Cancer Policy Easy to Understand"
   - Subheading and short explanation of the app's educational purpose.
   - Problem section with three short cards describing core issues.

2. Policy Impact Simulator
   - Communities (fixed): Urban, Suburban, Underserved.
   - Base screening access (illustrative): Urban 40%, Suburban 75%, Underserved 25%.
   - Three policy toggles: Expand Insurance Coverage, Free Cancer Screening Programs, Mobile Screening Clinics.
   - Visual output: Simple bar chart or card-based percentages with clear labels and color coding (green/orange/red).
   - Prominent disclaimer noting that values are simplified and not predictive.

3. AI Policy Chatbot
   - Preloaded with non-clinical context about screening, insurance barriers, policy impact, underserved communities, and ACS CAN advocacy goals.
   - Responds only to policy-focused, educational questions; rejects medical/diagnostic requests.
   - Displays example questions and an educational disclaimer.

## Design & UX Guidelines

- Tone: Calm, trustworthy, human
- Visuals: Soft blues/greens and neutral backgrounds
- Accessibility: Large readable text, good contrast, responsive layout
- Simplicity: Minimal text blocks, clear headings, no dense charts or dashboards

## Technical Constraints

- Frontend-only application (no backend server)
- No authentication
- No real-time external data fetching for policies
- AI integration accepts an API key via an environment variable; a placeholder is used until a key is provided

## Getting Started (Developer)

Prerequisites: Node.js and npm/yarn

Install dependencies and run the dev server from the `frontend` folder:

```
cd frontend
npm install
npm run dev
```

Notes:
- If you plan to enable the AI chatbot, set the required API key in your environment before starting the app (the project reads the key from an environment variable; see the code for the specific variable name).

## Disclaimer

This project is educational only. It does not provide medical advice, perform predictions, or use real patient data. The simulator uses simplified values to show cause-and-effect for demonstrative purposes only.

## Sources & Inspiration

High-level inspiration and conceptual sources include publicly available material from the American Cancer Society (ACS), the American Cancer Society Cancer Action Network (ACS CAN), the CDC, and the National Cancer Institute (NCI).
