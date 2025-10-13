import React from 'react'

// Array containing statistical data to be displayed on the page
const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
]

// StatsComponent – displays key statistics such as number of students, mentors, courses, etc.
const StatsComponent = () => {
  return (
    // Section wrapper for semantic structure
    <section>
      <div>
        {/* Flex container for horizontal alignment of stats */}
        <div className='flex gap-x-5'>
          {
            // Loop through the Stats array to render each stat dynamically
            Stats.map((data, index) => {
              return (
                // Each stat item with a unique key (using index)
                <div key={index}>
                  {/* Count (e.g., 5K, 10+) displayed prominently */}
                  <h1>
                    {data.count}
                  </h1>

                  {/* Label describing what the count represents */}
                  <h2>
                    {data.label}
                  </h2>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponent // Exporting component for use in other parts of the app
