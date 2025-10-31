import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/Common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"

function Catalog() {
  // Accessing loading state from Redux store
  const { loading } = useSelector((state) => state.profile)

  // Get the catalog name from the URL parameter
  const { catalogName } = useParams()

  // Local state for tab switching ("Most Popular" or "New")
  const [active, setActive] = useState(1)

  // Local state to store fetched catalog data
  const [catalogPageData, setCatalogPageData] = useState(null)

  // Local state to store the selected category ID
  const [categoryId, setCategoryId] = useState("")

  // ------------------- FETCH ALL CATEGORIES -------------------
  useEffect(() => {
    ;(async () => {
      try {
        // Call API to get all categories
        const res = await apiConnector("GET", categories.CATEGORIES_API)

        // Find the category that matches the URL slug
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id

        // Save category ID to state
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])
  // Runs whenever the catalog name changes in the URL

  // ------------------- FETCH CATALOG PAGE DATA -------------------
  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          // Fetch catalog page data for selected category
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])
  // Runs only after categoryId is set

  // ------------------- LOADING OR ERROR STATES -------------------
  if (loading || !catalogPageData) {
    // Show spinner while loading
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    // If API response failed, show Error component
    return <Error />
  }

  // ------------------- MAIN PAGE CONTENT -------------------
  return (
    <>
      {/* ---------- HERO SECTION ---------- */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          {/* Breadcrumb Navigation */}
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          {/* Category Title */}
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>

          {/* Category Description */}
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* ---------- SECTION 1: Courses to Get You Started ---------- */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>

        {/* Tabs: Most Popular / New */}
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>

          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        {/* Course Slider Component */}
        <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* ---*
