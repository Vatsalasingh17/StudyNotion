import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
      {/* Page Title */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>

      {/* Section to change profile picture */}
      <ChangeProfilePicture />

      {/* Section to edit profile information such as name, contact, etc. */}
      <EditProfile />

      {/* Section to update account password */}
      <UpdatePassword />

      {/* Section to delete the account permanently */}
      <DeleteAccount />
    </>
  )
}
