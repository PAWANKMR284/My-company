export const blogPosts = [
  {
    slug: "web-app-architecture-that-scales-without-chaos",
    title: "Web App Architecture That Scales Without Chaos",
    category: "Architecture",
    author: "Pawan Kumar",
    publishedAt: "2026-08-15",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&fm=webp&w=1200&q=82",
    excerpt:
      "A clean architecture keeps your product fast, maintainable, and easier to grow as your team and traffic increase.",
    tags: ["Architecture", "React", "Scalability"],
    sections: [
      {
        heading: "Start with the user journey",
        body: "Most product teams skip the architecture discussion until the bugs pile up. That is the point when code becomes fragile, teams start duplicating logic, and everyone feels the cost in slow releases. The better approach is to design the system around the user journey from the start. Map out the main flows, the data involved, and the moments where the product needs to stay fast and reliable.",
      },
      {
        heading: "Keep the core simple",
        body: "You do not need a complicated stack to launch well. A simple architecture with clear responsibilities between frontend, API, database, and deployment pipeline is often stronger than an over-engineered platform. Build the essential pieces first, then add complexity only when actual user demand requires it.",
      },
      {
        heading: "Make performance part of the plan",
        body: "Scaling is not only about adding servers. It is also about reducing unnecessary data loads, reducing API calls, caching what is static, and measuring what matters. When a frontend can render faster and the backend can answer quickly, the whole experience feels premium without needing expensive infrastructure early on.",
      },
      {
        heading: "Design for change",
        body: "Your product will change. The service layer will evolve, the database may change, and the UI will likely be redesigned multiple times before maturity. If your architecture is modular and well-documented, those changes become manageable instead of expensive and risky.",
      },
    ],
  },
  {
    slug: "why-businesses-need-strong-uiux-before-launch",
    title: "Why Businesses Need Strong UI/UX Before Launch",
    category: "Design",
    author: "Pawan Kumar",
    publishedAt: "2026-07-02",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&q=82",
    excerpt:
      "A good application is not just functional; it creates trust, increases conversion, and reduces support friction from day one.",
    tags: ["UI/UX", "Product Design", "Conversion"],
    sections: [
      {
        heading: "Design shapes trust",
        body: "Before a user reads your product copy, they react to the interface. Visual hierarchy, spacing, color, and clarity all quietly communicate trust. If a product feels confusing or cluttered, users assume it is unreliable even before they understand the actual value.",
      },
      {
        heading: "User-first design reduces confusion",
        body: "When the interface is designed around actual user goals, it cuts the number of support questions and onboarding friction. People can finish actions faster because they can recognize paths, understand statuses, and feel confident about every click.",
      },
      {
        heading: "Good design speeds product launches",
        body: "Many teams delay launch because they keep refining details without checking the real experience. Strong UX research and prototype validation help you remove guesswork early, saving both time and money in the long run.",
      },
      {
        heading: "The real ROI is retention",
        body: "A product that is easy to use does not just convert more visitors — it keeps them engaged longer. That is where real business value begins: better retention, stronger referrals, and fewer drop-offs after the first session.",
      },
    ],
  },
  {
    slug: "mvp-development-for-startups-without-wasting-time",
    title: "MVP Development for Startups Without Wasting Time",
    category: "Startups",
    author: "Pawan Kumar",
    publishedAt: "2026-06-18",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=webp&w=1200&q=82",
    excerpt:
      "The right MVP helps you validate assumptions quickly while keeping your team focused on the features that matter most.",
    tags: ["MVP", "Startup", "Product"],
    sections: [
      {
        heading: "Define the real problem first",
        body: "A common startup mistake is to start building before proving the demand. The strongest MVPs begin by clarifying the exact user problem and the smallest useful workflow that solves it. That keeps the team aligned and the budget focused.",
      },
      {
        heading: "Prioritize the few features that matter",
        body: "Not all features are equally valuable. Focus on the critical actions that prove your concept and the ones users need to complete their core task. Remove extras that feel impressive but do not validate the business idea.",
      },
      {
        heading: "Build for learning",
        body: "Your MVP is not a final product. It is a learning engine. Your product should be easy to observe, measure, and revise based on real feedback. That means clean analytics, feedback loops, and a team ready to act quickly.",
      },
      {
        heading: "Launch lean, learn faster",
        body: "When the first version reaches real users sooner, the team gets better signal earlier. That feedback is where product direction becomes clearer — and smarter decisions are made.",
      },
    ],
  },
  {
    slug: "ai-tools-that-actually-improve-productivity",
    title: "AI Tools That Actually Improve Productivity",
    category: "AI",
    author: "Pawan Kumar",
    publishedAt: "2026-05-24",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&fm=webp&w=1200&q=82",
    excerpt:
      "The best AI strategies are not about chasing hype. They are about removing repetitive work and improving clarity across the team.",
    tags: ["AI", "Automation", "Efficiency"],
    sections: [
      {
        heading: "Use AI to remove boring work",
        body: "The highest-value AI use cases are often simple: sorting customer requests, summarizing meeting notes, drafting initial versions of content, or extracting information from documents. These tasks are repetitive but necessary, and automating them creates time for strategic work.",
      },
      {
        heading: "Keep humans in the loop",
        body: "AI is most effective when it supports decision-making rather than replacing it. Human review is still essential for quality, context, and nuance. The goal is better leverage, not blind automation.",
      },
      {
        heading: "Choose tools that fit your process",
        body: "Before adopting a tool, ask how it changes your team’s workflow and whether it is measurable. AI should save time, improve quality, or reduce friction — not just look impressive in a demo.",
      },
      {
        heading: "Build a realistic AI roadmap",
        body: "Start small, measure outcomes, and expand carefully. A thoughtful AI roadmap creates more value than a big-bang rollout built on excitement alone.",
      },
    ],
  },
];

export function getReadingTime(post) {
  const words = post.sections.reduce(
    (total, section) =>
      total + section.body.split(/\s+/).filter(Boolean).length,
    0,
  );

  return Math.max(2, Math.ceil(words / 220));
}
