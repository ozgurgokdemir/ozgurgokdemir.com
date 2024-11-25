type Collection = {
  data: {
    order?: number;
  };
};

export function sortByOrder<T extends Collection>(array: T[]) {
  return array.sort(
    (a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity),
  );
}
