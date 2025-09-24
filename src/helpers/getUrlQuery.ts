export const getUrlQuery = (Astro: { request: { url: string } }): Record<string, string> => {
  const url = new URL(Astro.request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  return queryParams;
}
