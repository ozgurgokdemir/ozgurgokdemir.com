import { getItem, setItem } from '@/utils/session-storage';

export type History = {
  current: string;
  previous?: string;
};

export function syncHistory() {
  const history = getHistory();

  const newHistory = {
    current: location.href,
    previous:
      history?.current !== location.href ? history?.current : history?.previous,
  };

  setItem('history', newHistory);
}

export function getHistory() {
  return getItem<History>('history');
}
