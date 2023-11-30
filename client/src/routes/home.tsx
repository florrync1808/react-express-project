import { Hero } from '@/components/hero'
import { Layout } from '@/components/layout'

export default function HomePage() {
  return (
    <Layout>
      <Hero
        title="Search Country by Name"
        content="enter a name, doesnt have to be exact"
      />
    </Layout>
  )
}
