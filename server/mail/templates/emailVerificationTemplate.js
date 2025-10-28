// Function to generate an HTML email template for OTP verification
const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>

		<style>
			/* ===== Global Styles ===== */
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			/* ===== Container for Centered Layout ===== */
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			/* ===== Logo Styling ===== */
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			/* ===== Main Message/Heading ===== */
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			/* ===== Email Body Text ===== */
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			/* ===== Call-to-Action Button (Not used here, but kept for consistency) ===== */
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
	
			/* ===== Support Information Styling ===== */
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			/* ===== Highlighted Text (used for OTP) ===== */
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<!-- ===== Logo Section (links back to StudyNotion website) ===== -->
			<a href="https://studynotion-edtech-project.vercel.app">
				<img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
			</a>

			<!-- ===== Email Header ===== -->
			<div class="message">OTP Verification Email</div>

			<!-- ===== Email Body ===== -->
			<div class="body">
				<p>Dear User,</p>
				<p>
					Thank you for registering with <strong>StudyNotion</strong>. 
					To complete your registration, please use the following OTP 
					(One-Time Password) to verify your account:
				</p>

				<!-- Display dynamic OTP value -->
				<h2 class="highlight">${otp}</h2>

				<p>
					This OTP is valid for <strong>5 minutes</strong>. 
					If you did not request this verification, please disregard this email.
					Once your account is verified, you will have full access to our platform and features.
				</p>
			</div>

			<!-- ===== Support/Contact Section ===== -->
			<div class="support">
				If you have any questions or need assistance, please feel free to reach out to us at 
				<a href="mailto:info@studynotion.com">info@studynotion.com</a>. 
				We are here to help!
			</div>
		</div>
	</body>
	
	</html>`;
};

// Export the template function for use in other parts of the application
module.exports = otpTemplate;
