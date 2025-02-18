export const BASEURL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  product: {
    list: ({ search, skip, limit }: { search: string, skip: number, limit: number }) => `${BASEURL}/products/search?q=${search}&skip=${skip}&limit=${limit}`
  }
}