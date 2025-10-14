import React from 'react'

// Reusable HighlightText component to emphasize specific text
import HighlightText from "../components/core/HomePage/HighlightText"

// Banner images for the About page header
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"

// Custom components used in the About page
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className='mx-auto mt-[100px] text-white'>
      
      {/* ---------------- Section 1: Hero Section ---------------- */}
      <section>
        <div>
          <header>
            {/* Main heading with highlighted text */}
            Driving Innovation in Online Education for a 
            <HighlightText text={"Brighter Future"} />
            
            {/* Supporting paragraph */}
            <p>
              Studynotion is at the forefront of driving innovation in online education. 
              We're passionate about creating a brighter future by offering cutting-edge courses, 
              leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
          </header>

          {/* Banner images displayed side-by-side */}
          <div className='flex gap-x-3 mx-auto'>
            <img src={BannerImage1} alt="About Us Banner 1" />
            <img src={BannerImage2} alt="About Us Banner 2" />
            <img src={BannerImage3} alt="About Us Banner 3" />
          </div>
        </div>
      </section>

      {/* ---------------- Section 2: Inspirational Quote ---------------- */}
      <section>
        <div>
          <Quote />
        </div>
      </section>

      {/* ---------------- Section 3: Founding Story, Vision, and Mission ---------------- */}
      <section>
        <div className='flex flex-col'>
          
          {/* ---- Founding Story ---- */}
          <div className='flex'>
            {/* Left column: Story text */}
            <div>
              <h1>Our Founding Story</h1>

              <p>
                Our e-learning platform was born out of a shared vision and passion for transforming education. 
                It all began with a group of educators, technologists, and lifelong learners who recognized the need 
                for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
              </p>

              <p>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional 
                education systems. We believed that education should not be confined to the walls of a classroom or 
                restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower 
                individuals from all walks of life to unlock their full potential.
              </p>
            </div>

            {/* Right column: Supporting image */}
            <div>
              <img src={FoundingStory} alt="Founding Story Illustration" />
            </div>
          </div>

          {/* ---- Vision & Mission Section ---- */}
          <div className='flex'>
            {/* Vision (left) */}
            <div>
              <h1>Our Vision</h1>
              <p>
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize 
                the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive 
                platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive 
                learning experience.
              </p>
            </div>

            {/* Mission (right) */}
            <div>
              <h1>Our Mission</h1>
              <p>
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, 
                where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in 
                an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live 
                sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Section 4: Stats Section ---------------- */}
      {/* Displays key metrics like learners, instructors, and courses */}
      <StatsComponent />

      {/* ---------------- Section 5: Learning Grid & Contact Form ---------------- */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
        {/* Displays learning categories or key features */}
        <LearningGrid />

        {/* Contact form for user inquiries */}
        <ContactFormSection />
      </section>

      {/* ---------------- Section 6: Reviews ---------------- */}
      <section>
        <div>
          Reviews from other learners 
          {/* Future enhancement: Add ReviewSlider component here */}
          {/* <ReviewSlider /> */}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </div>
  )
}

export default About
