import React from 'react'
import { BiRefresh } from 'react-icons/bi'
import { useI18next } from 'gatsby-plugin-react-i18next'

// import * as classes from "./notice.module.css";

const Notice = () => {
  const { t } = useI18next()

  return (
    <section className="pb-16 container flex">
      <div
        className={` w-full md:max-w-screen-lg mx-auto p-4  bg-yellow-100  rounded-lg `}>
        <div className="text-yellow-700 text-sm">
          <span className="flex items-center font-medium text-base">
            <BiRefresh className="text-lg mr-2" />
            {` ${t('post-requires-update')}`}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Notice
