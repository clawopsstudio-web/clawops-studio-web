import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/sections/Footer"
import LandingClient from "./LandingClient"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LandingClient />
      <Footer />
    </>
  )
}

export const dynamic = 'force-dynamic'
