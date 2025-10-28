// Function to generate a course enrollment confirmation email
exports.courseEnrollmentEmail = (courseName, name) => {
    // Return an HTML email template with dynamic course name and user name
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>

        <style>
            /* Basic email styling */
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            /* Centered container for email content */
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            /* Logo styling */
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }

            /* Header message styling */
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            /* Main body text styling */
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            /* Call-to-action button styling */
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }

            /* Support/contact section styling */
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            /* Emphasized text */
            .highlight {
                font-weight: bold;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <!-- Logo and link to the website -->
            <a href="https://studynotion-edtech-project.vercel.app">
                <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
            </a>

            <!-- Main heading -->
            <div class="message">Course Registration Confirmation</div>

            <!-- Email body content -->
            <div class="body">
                <p>Dear ${name},</p>
                <p>
                    You have successfully registered for the course 
                    <span class="highlight">"${courseName}"</span>. 
                    We are excited to have you as a participant!
                </p>
                <p>
                    Please log in to your learning dashboard to access the course materials 
                    and start your learning journey.
                </p>

                <!-- Call-to-action button linking to the dashboard -->
                <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">
                    Go to Dashboard
                </a>
            </div>

            <!-- Support contact information -->
            <div class="support">
                If you have any questions or need assistance, please feel free to reach out to us at 
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. 
                We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};
