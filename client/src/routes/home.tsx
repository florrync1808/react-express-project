import { Hero } from '@/components/hero'
import { Layout } from '@/components/layout'

export default function HomePage() {
  return (
    <Layout>
      <Hero
        title="Country Information"
        content="Search by country name, it doesnt have to be exact"
      />
    </Layout>
  )
}
