import PROJECTS_RAW from '../../projects.json';

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// `event` doubles as an award line and a bare year in the source data. Only the
// award case is worth surfacing as a separate label; a lone year is already
// covered by the year column.
function parseAccolade(event, year) {
  if (!event) return null;
  const trimmed = String(event).trim();
  const yr = String(year);
  if (trimmed === yr) return null;

  let label = trimmed;
  if (label.endsWith(yr)) {
    label = label.slice(0, -yr.length).trim().replace(/[-–—]$/, "").trim();
  }

  return label || null;
}

export const PROJECTS = PROJECTS_RAW.map((p) => ({
  ...p,
  slug: slugify(p.name),
  accolade: parseAccolade(p.event, p.year),
})).sort((a, b) => b.year - a.year);

export const YEARS = [...new Set(PROJECTS.map((p) => String(p.year)))].sort().reverse();
