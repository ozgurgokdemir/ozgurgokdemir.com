import { runOnce } from '@/utils/runtime-registry';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const HASH_NAVIGATION_SELECTOR = 'a[href*="#"]';

export type HashNavigationTarget = {
  pathname: string;
  hash: string;
  sectionId?: string;
};

type ResolvedHashNavigationTarget = {
  pathname: string;
  hash: string;
  sectionId: string;
};

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

function normalizeHash(hash: string) {
  const normalizedHash = hash.replace(/^#/, '');

  try {
    return decodeURIComponent(normalizedHash);
  } catch {
    return normalizedHash;
  }
}

function createHashNavigationMap(targets: HashNavigationTarget[]) {
  const entries = new Map<string, ResolvedHashNavigationTarget>();

  targets.forEach((target) => {
    const key = `${normalizePathname(target.pathname)}#${normalizeHash(target.hash)}`;
    entries.set(key, {
      ...target,
      pathname: normalizePathname(target.pathname),
      hash: normalizeHash(target.hash),
      sectionId: target.sectionId ?? normalizeHash(target.hash),
    });
  });

  return entries;
}

function getHashNavigationKey(pathname: string, hash: string) {
  return `${normalizePathname(pathname)}#${normalizeHash(hash)}`;
}

function getHashUrl(link: HTMLAnchorElement) {
  if (link.hasAttribute('download')) return null;
  if (link.target && link.target !== '_self') return null;

  const href = link.getAttribute('href');
  if (!href) return null;

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin || !url.hash) return null;

  return url;
}

function isPrimaryUnmodifiedClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function getSameRouteTarget(
  link: HTMLAnchorElement,
  targets: Map<string, ResolvedHashNavigationTarget>,
) {
  const url = getHashUrl(link);
  if (!url) return null;

  const isSamePath =
    normalizePathname(url.pathname) ===
    normalizePathname(window.location.pathname);

  if (!isSamePath || url.search !== window.location.search) return null;

  const hashNavigationTarget = targets.get(
    getHashNavigationKey(url.pathname, url.hash),
  );
  if (!hashNavigationTarget) return null;

  const sectionId = hashNavigationTarget.sectionId;
  const section = document.getElementById(sectionId);
  if (!section) return null;

  return { url, section };
}

function clearHash() {
  const newUrl = window.location.pathname + window.location.search;
  history.replaceState(history.state, '', newUrl);
}

export function initHashNavigation(targets: HashNavigationTarget[] = []) {
  const hashNavigationTargets = createHashNavigationMap(targets);

  runOnce('hash-navigation:handlers', () => {
    function syncConfiguredHashHide() {
      const currentUrl = new URL(window.location.href);
      const key = getHashNavigationKey(currentUrl.pathname, currentUrl.hash);
      if (!hashNavigationTargets.has(key)) return;
      clearHash();
    }

    function handleHashNavigationClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (!isPrimaryUnmodifiedClick(event)) return;

      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(HASH_NAVIGATION_SELECTOR);
      if (!link) return;

      const sameRouteTarget = getSameRouteTarget(link, hashNavigationTargets);
      if (!sameRouteTarget) return;

      event.preventDefault();

      const prefersReducedMotion =
        window.matchMedia(REDUCED_MOTION_QUERY).matches;

      sameRouteTarget.section.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      if (
        hashNavigationTargets.has(
          getHashNavigationKey(
            sameRouteTarget.url.pathname,
            sameRouteTarget.url.hash,
          ),
        )
      ) {
        clearHash();
      }
    }

    document.addEventListener('click', handleHashNavigationClick, {
      capture: true,
    });

    document.addEventListener('astro:after-swap', syncConfiguredHashHide);
    document.addEventListener('astro:page-load', syncConfiguredHashHide);
  });
}
