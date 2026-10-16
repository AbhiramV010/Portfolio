export const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1Aoqh2NOuuVGJBky6L_klo7wSXrcyaYZW/view?usp=sharing";
export const RESUME_PREVIEW_URL = "https://drive.google.com/file/d/1Aoqh2NOuuVGJBky6L_klo7wSXrcyaYZW/preview";

export const ROUTE = [
  { key: "home", label: "Home", line: 1 },
  { key: "projects", label: "Projects", line: 2 },
  { key: "about", label: "About Me", line: 5 },
  { key: "resume", label: "Resume", line: "3", modal: true },
];

// `project` (detail) shares the Projects stop and line.
export const VIEW_STOP = { home: "home", projects: "projects", project: "projects", about: "about" };
export const VIEW_LINE = { home: 1, projects: 2, project: 2, about: 5 };
