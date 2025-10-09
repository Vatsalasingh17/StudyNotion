import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    // Access the authentication token from Redux state
    const { token } = useSelector((state) => state.auth);

    // State to hold the user's enrolled courses
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    // Function to fetch enrolled courses from backend API
    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token); // Call API using token
            setEnrolledCourses(response); // Save the response to state
        } catch (error) {
            console.log("Unable to Fetch Enrolled Courses"); // Log error for debugging
        }
    };

    // Fetch enrolled courses when component mounts
    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className='text-white'>
            {/* Page Heading */}
            <div>Enrolled Courses</div>

            {
                // If data is still loading
                !enrolledCourses ? (
                    <div>Loading...</div>
                )
                // If no courses are enrolled
                : !enrolledCourses.length ? (
                    <p>You have not enrolled in any course yet</p>
                )
                // If enrolled courses are available
                : (
                    <div>
                        {/* Header Row */}
                        <div>
                            <p>Course Name</p>
                            <p>Durations</p>
                            <p>Progress</p>
                        </div>

                        {/* Render list of enrolled courses */}
                        {
                            enrolledCourses.map((course, index) => (
                                <div key={index} className='course-card'>
                                    {/* Course Thumbnail and Info */}
                                    <div className='flex gap-3'>
                                        <img src={course.thumbnail} alt={course.courseName} />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>

                                    {/* Course Duration */}
                                    <div>
                                        {course?.totalDuration}
                                    </div>

                                    {/* Course Progress Section */}
                                    <div>
                                        <p>Progress: {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default EnrolledCourses
