import { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import RouteBar from "./components/RouteBar";
import Arrival from "./components/Arrival";
import { PROJECTS } from "./data/projects";
import { ROUTE, VIEW_LINE, VIEW_STOP } from "./lines";
import { playClick } from "./sound";

const SWAP_MS = 225;
const END_MS = 450;

const arrivalLabel = (view, slug) =>
  view === "project"
    ? PROJECTS.find((p) => p.slug === slug)?.name
    : ROUTE.find((stop) => stop.key === VIEW_STOP[view])?.label;

export default function App() {
  const [displayView, setDisplayView] = useState("home");
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [sweepLine, setSweepLine] = useState(1);
  const [arrival, setArrival] = useState(null);
  const pendingView = useRef("home");
  const pendingProjectSlug = useRef(null);
  const mainRef = useRef(null);
  const focusedKey = useRef("home:null");

  const show = (view, slug) => {
    setDisplayView(view);
    setSelectedProjectSlug(slug);
    setArrival({ id: Date.now(), label: arrivalLabel(view, slug) });
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
      window.scrollTo(0, 0);
    }, SWAP_MS);
    const end = setTimeout(() => setTransitioning(false), END_MS);
    return () => {
      clearTimeout(swap);
      clearTimeout(end);
    };
  }, [transitioning]);

  // Move keyboard focus to the new page so screen readers announce it.
  useEffect(() => {
    const key = `${displayView}:${selectedProjectSlug}`;
    if (focusedKey.current === key) return;
    focusedKey.current = key;
    mainRef.current?.focus({ preventScroll: true });
  }, [displayView, selectedProjectSlug]);

  let page;
  if (displayView === "projects") {
    page = <Projects onBack={() => navigate("home")} onOpenProject={(slug) => navigate("project", slug)} />;
  } else if (displayView === "project") {
    page = <ProjectDetail slug={selectedProjectSlug} onBack={() => navigate("projects")} />;
  } else if (displayView === "about") {
    page = <About onBack={() => navigate("home")} />;
  } else {
    page = <Home onNavigate={navigate} />;
  }

  const line = VIEW_LINE[displayView];

  return (
    <>
      <div className={`station line-${line}`}>
        <RouteBar current={VIEW_STOP[displayView]} line={line} onNavigate={navigate} />
        <main className={`station-main${transitioning ? " is-fading" : ""}`} ref={mainRef} tabIndex={-1}>
          {page}
        </main>
      </div>
      {transitioning && <div className={`sweep line-${sweepLine}`} aria-hidden="true" />}
      {arrival && <Arrival key={arrival.id} label={arrival.label} />}
    </>
  );
}
