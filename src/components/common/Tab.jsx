/**
 * Tab Component
 *
 * A reusable tab switcher that displays a set of tabs (buttons) based on provided data.
 * When a user clicks on a tab, it updates the selected state via `setField`.
 *
 * Props:
 *  - tabData: Array of objects → contains information about each tab.
 *      Example: [{ id: 1, type: "student", tabName: "Student" }, { id: 2, type: "instructor", tabName: "Instructor" }]
 *  - field: string → represents the currently active/selected tab.
 *  - setField: function → function to update the active tab (state setter).
 */

export default function Tab({ tabData, field, setField }) {
  return (
    // Wrapper div for the tab component
    <div
      style={{
        // Adds an inset shadow effect under the tabs for subtle visual separation
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {/* Loop through each tab in tabData and render a button */}
      {tabData.map((tab) => (
        <button
          key={tab.id} // unique key for each tab (required by React)
          
          // When the button is clicked, update the selected tab using setField
          onClick={() => setField(tab.type)}

          // Conditionally apply styles based on whether the tab is active
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-richblack-5"  // Active tab style
              : "bg-transparent text-richblack-200"  // Inactive tab style
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {/* Display the tab's label */}
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
