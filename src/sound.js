import clickSoundUrl from "./assets/click.mp3?url";

const POOL = Array.from({ length: 4 }, () => {
  const a = new Audio(clickSoundUrl);
  a.volume = 0.25;
  return a;
});
let next = 0;

export const playClick = () => {
  const s = POOL[next];
  s.currentTime = 0;
  s.play().catch(() => {});
  next = (next + 1) % POOL.length;
};
