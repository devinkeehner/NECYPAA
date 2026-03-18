import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  // Currently defaulting to English. When locale routing is added
  // (app/[locale]/ structure), this will read from the route param.
  const locale = "en"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
