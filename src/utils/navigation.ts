import { navigate } from 'astro:transitions/client';
import sessionStorage from '@/utils/session-storage';

type Navigation = {
  current: string;
  previous?: string;
};

function getHistory() {
  return sessionStorage.getItem<Navigation>('navigation-history');
}

function syncHistory() {
  const navigationHistory = getHistory();

  const updatedNavigationHistory = {
    current: location.href,
    previous:
      navigationHistory?.current !== location.href
        ? navigationHistory?.current
        : navigationHistory?.previous,
  };

  sessionStorage.setItem('navigation-history', updatedNavigationHistory);
}

function canGoBack() {
  const navigationHistory = getHistory();
  return !!navigationHistory?.previous && history.state.index > 0;
}

function isCurrentPath(pathname: string) {
  const normalize = (path: string) => path.replace(/\/+$/, '');
  return normalize(pathname) === normalize(location.pathname);
}

export default {
  back: () => history.back(),
  forward: () => history.forward(),
  navigate,
  getHistory,
  syncHistory,
  canGoBack,
  isCurrentPath,
};
