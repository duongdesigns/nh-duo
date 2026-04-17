import Hero from "../components/home/Hero"
import FeaturedWork from "../components/home/FeaturedWork"
import Principles from "../components/home/Principles"
import ContactSection from "../components/home/ContactSection"

export default function HomePage({
  onExplore,
  onCaseStudy,
  hoveredProject,
  setHoveredProject,
}) {
  return (
    <>
      <Hero onExplore={onExplore} onCaseStudy={onCaseStudy} />
      <FeaturedWork
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
        onOpenCaseStudy={onCaseStudy}
      />
      <Principles />
      <ContactSection />
    </>
  )
}