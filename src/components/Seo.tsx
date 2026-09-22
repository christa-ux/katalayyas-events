import { site } from '../data/site'

/**
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
 * into <head>, so per-page metadata needs no external head manager.
 */
export function Seo({
  title,
  description,
  path,
  image = '/images/reception-gold.jpg',
  noindex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}) {
  const fullTitle = `${title} | ${site.name}`
  const url = `${site.origin}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.origin}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
