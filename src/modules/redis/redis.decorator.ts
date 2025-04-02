function CacheResult(duration: number) {
  const cache = new Map<string, { timestamp: number; value: any }>();

  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = JSON.stringify(args);
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < duration) {
        return cached.value;
      }

      const result = await method.apply(this, args);
      cache.set(cacheKey, { timestamp: Date.now(), value: result });

      return result;
    };
  };
}

export { CacheResult };
