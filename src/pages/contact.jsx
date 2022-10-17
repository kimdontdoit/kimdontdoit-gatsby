import React from "react";
import { useFormik } from "formik";

import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

import * as classes from "./contact.module.css";

const WPContactForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      fetch(action, {
        method,
        body,
      })
        .then((response) => response.json())
        .then((response) => {
          }
        })
        .catch((error) => {
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        className="input block"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact" />

      <section className={`pb-16`}>
        <div className={`container max-w-screen-md mx-auto`}>
          <WPContactForm />
        </div>
      </section>
    </>
  );
}
