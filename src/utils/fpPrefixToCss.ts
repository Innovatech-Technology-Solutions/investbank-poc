  /* Util function to prefix the class names with fp */
export const fp = (...cls: string[]) => {
  const result: string[] = [];
  cls?.forEach((maybeClass) => {
    if (maybeClass && typeof maybeClass === 'string') {
      maybeClass?.split(' ')?.forEach((singleClass) => result.push(`${singleClass}`));
    }
  });
  return result?.join(' ');
};

