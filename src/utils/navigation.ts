export function isCurrentPath(pathname: string) {
  const normalize = (path: string) => path.replace(/\/+$/, '');
  return normalize(pathname) === normalize(location.pathname);
}
