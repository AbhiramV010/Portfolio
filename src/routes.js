import { PROJECTS } from "./data/projects";

export const SITE_URL = "https://abhiramv.runs-on.dev";

const ABOUT_BLURB =
  "High school student and aspiring electrical engineer. Builds custom circuit boards, writes low-level code, and designs software to solve real-world problems.";

export const pathFor = (view, slug) => {
  if (view === "projects") return "/projects";
  if (view === "project") return `/projects/${slug}`;
  if (view === "about") return "/about";
  return "/";
};

// Unknown paths and unknown project slugs fall back to the nearest real page.
export const parsePath = (pathname) => {
  const [first, slug] = pathname.split("/").filter(Boolean);
  if (first === "about") return { view: "about", slug: null };
  if (first === "projects") {
    return slug && PROJECTS.some((p) => p.slug === slug)
      ? { view: "project", slug }
      : { view: "projects", slug: null };
  }
  return { view: "home", slug: null };
};

export const metaFor = (view, slug) => {
  if (view === "project") {
    const project = PROJECTS.find((p) => p.slug === slug);
    if (project) {
      const desc = project.desc.length > 200 ? `${project.desc.slice(0, 197)}...` : project.desc;
      return { title: `${project.name} | Abhiram Vadali`, description: desc };
    }
  }
  if (view === "projects") {
    return {
      title: "Projects | Abhiram Vadali",
      description: `Hackathon builds and side projects: ${PROJECTS.slice(0, 4).map((p) => p.name).join(", ")} and more.`,
    };
  }
  if (view === "about") return { title: "About Me | Abhiram Vadali", description: ABOUT_BLURB };
  return { title: "Abhiram Vadali - Portfolio", description: ABOUT_BLURB };
};

// Every URL the site answers at, with the view it renders.
export const allRoutes = () => [
  { view: "home", slug: null },
  { view: "projects", slug: null },
  { view: "about", slug: null },
  ...PROJECTS.map((p) => ({ view: "project", slug: p.slug })),
];
