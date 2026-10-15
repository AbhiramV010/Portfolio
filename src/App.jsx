import { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import RouteBar from "./components/RouteBar";
import Arrival from "./components/Arrival";
import ResumeModal from "./components/ResumeModal";
import { PROJECTS } from "./data/projects";
import { ROUTE, VIEW_LINE, VIEW_STOP } from "./lines";
import { metaFor, parsePath, pathFor } from "./routes";
import { playClick } from "./sound";

const SWAP_MS = 225;
const END_MS = 450;

const arrivalLabel = (view, slug) =>
  view === "project"
    ? PROJECTS.find((p) => p.slug === slug)?.name
    : ROUTE.find((stop) => stop.key === VIEW_STOP[view])?.label;

export default function App() {
  const [initial] = useState(() => parsePath(window.location.pathname));
  const [displayView, setDisplayView] = useState(initial.view);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(initial.slug);
  const [transitioning, setTransitioning] = useState(false);
  const [sweepLine, setSweepLine] = useState(1);
  const [arrival, setArrival] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const pendingView = useRef(initial.view);
  const pendingProjectSlug = useRef(initial.slug);
  const mainRef = useRef(null);
  const focusedKey = useRef(`${initial.view}:${initial.slug}`);

  const show = (view, slug) => {
    setDisplayView(view);
    setSelectedProjectSlug(slug);
    setArrival({ id: Date.now(), label: arrivalLabel(view, slug) });
    window.history.pushState(null, "", pathFor(view, slug));
    window.scrollTo(0, 0);
  };

  const navigate = (target, projectSlug = null) => {
    if (transitioning || (target === displayView && projectSlug === selectedProjectSlug)) return;
    playClick();

    // Projects <-> detail stay on the same line, so no fade.
    if (target === "project" || (target === "projects" && displayView === "project")) {
      show(target, projectSlug);
      return;
    }

    pendingView.current = target;
    pendingProjectSlug.current = projectSlug;
    setSweepLine(VIEW_LINE[target]);
    setTransitioning(true);
  };

  useEffect(() => {
    if (!transitioning) return;
    const swap = setTimeout(() => {
      setDisplayView(pendingView.current);
      setSelectedProjectSlug(pendingProjectSlug.current);
      setArrival({ id: Date.now(), label: arrivalLabel(pendingView.current, pendingProjectSlug.current) });
      window.history.pushState(null, "", pathFor(pendingView.current, pendingProjectSlug.current));
      window.scrollTo(0, 0);
    }, SWAP_MS);
    const end = setTimeout(() => setTransitioning(false), END_MS);
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
    };
  }, [transitioning]);

  // Canonicalise the URL we landed on (trailing slash, unknown project slug).
  useEffect(() => {
    window.history.replaceState(null, "", pathFor(initial.view, initial.slug));
  }, [initial]);

  // Browser back/forward: swap the view straight away.
  useEffect(() => {
    const onPop = () => {
      const { view, slug } = parsePath(window.location.pathname);
      setDisplayView(view);
      setSelectedProjectSlug(slug);
      setArrival({ id: Date.now(), label: arrivalLabel(view, slug) });
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = metaFor(displayView, selectedProjectSlug).title;
  }, [displayView, selectedProjectSlug]);

  // Move keyboard focus to the new page so screen readers announce it.
  useEffect(() => {
    const key = `${displayView}:${selectedProjectSlug}`;
    if (focusedKey.current === key) return;
    focusedKey.current = key;
    mainRef.current?.focus({ preventScroll: true });
  }, [displayView, selectedProjectSlug]);

  const openResume = () => {
    playClick();
    setResumeOpen(true);
  };

  let page;
  if (displayView === "projects") {
    page = <Projects onBack={() => navigate("home")} onOpenProject={(slug) => navigate("project", slug)} />;
  } else if (displayView === "project") {
    page = <ProjectDetail slug={selectedProjectSlug} onBack={() => navigate("projects")} />;
  } else if (displayView === "about") {
    page = <About onBack={() => navigate("home")} />;
  } else {
    page = <Home onNavigate={navigate} onResume={openResume} />;
  }

  const line = VIEW_LINE[displayView];

  return (
    <>
      <div className={`station line-${line}`}>
        <RouteBar current={VIEW_STOP[displayView]} line={line} onNavigate={navigate} onResume={openResume} />
        <main className={`station-main${transitioning ? " is-fading" : ""}`} ref={mainRef} tabIndex={-1}>
          {page}
        </main>
      </div>
      {transitioning && <div className={`sweep line-${sweepLine}`} aria-hidden="true" />}
      {arrival && <Arrival key={arrival.id} label={arrival.label} />}
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </>
  );
}
