import fs from 'fs'
// import prisma from '@/lib/prisma'

// Dynamically Generate sitemap.xml
export const getServerSideProps = async ({ res }) => {
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  // const staticPages = fs
  // .readdirSync('./.next/server/pages')
  // .filter((staticPage) => {
  //   console.log(staticPage)
  //   return ![
  //   ].includes(staticPage)
  // })
  // .map((staticPagePath) => {
  //   return `${baseUrl}/${staticPagePath}`;
  // })

  // const feed = await prisma.post.findMany({
  //   where: { published: true },
  //   select: { slug: true, editedAt: true }
  // })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/uses</loc>
    <priority>1.0</priority>
  </url>
    
  </urlset>
`

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return { props: {} }
}

const Sitemap = () => {}
export default Sitemap