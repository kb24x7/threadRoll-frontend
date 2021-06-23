import { Meta } from '../components/Meta'
import { Sidebar } from '../components/Sidebar'
import { Nav } from '../components/Nav'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Meta title="Article Reader" description="Read articles, your way" />
      <Nav />
      <Sidebar active="Home" />
    </>
  )
}