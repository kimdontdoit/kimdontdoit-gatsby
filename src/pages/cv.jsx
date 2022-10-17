import React from "react";

import Seo from "the-great-gatsby-theme/src/components/Seo";

import * as classes from "./cv.module.css";

export default function AboutPage() {
  return (
    <>
      <Seo title="Vladislav Kim, c’est qui?" />

      <section className={`pb-16`}>
        <div className={`container max-w-screen-lg mx-auto`}>
          <div className={classes.cvWrapper}>
            <table>
              <thead>
                <tr>
                  <th>
                    <h1 className="logo">Vladislav Kim</h1>
                  </th>
                  <th className="span">
                    <span>
                      (514) 746-0352
                      <br />
                      vlad@kimdontdoit.com
                    </span>
                  </th>
                </tr>
              </thead>
            </table>

            <table className="table-fixed">
              <thead>
                <tr>
                  <th colSpan="2">
                    <h2>Technical Skills</h2>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <h3>Languages / Frameworks</h3>
                    <p>
                      JS, TypeScript, HTML/CSS, PHP, GraphQL, MySQL, Python,
                      Node.js, Express, Java, C# / React, Gatsby, jQuery,
                      Electron, Vue
                    </p>
                  </td>

                  <td>
                    <h3>Relevant</h3>
                    <p>
                      Git, Docker, Magento, WordPress, Adobe XD, Photoshop,
                      Illustrator, Android Studio, Nginx, AWS, Google Cloud,
                      Firebase
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="experience">
              <thead>
                <tr>
                  <th>
                    <h2>Professional Experience</h2>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <h3>Front-end Developer</h3>
                    <span>O2 Web, Montreal (June 2021 – present, 1 year)</span>
                    <ul className="list-disc">
                      <li>
                        Contributed to the realization and maintenance of 8
                        mid-large e-commerce projects' using
                        <i>React</i> and the{" "}
                        <i>Adobe Commerce platform (Magento EE)</i> whilst
                        managing multiple priorities and deadlines
                      </li>

                      <li>
                        Excelled in cross-functional 5+ teams while applying and
                        improving our methodologies and practices (
                        <i>
                          Agile scrum, Git, code reviews, documentation, project
                          management
                        </i>
                        )
                      </li>
                      <li>
                        Collaborated with the QA team, designers, PO and
                        external partners to contribute throughout different
                        stages of the project lifecycle
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h3>Front-end Developer</h3>
                    <span>
                      ProgyMedia, Blainville (Feb 2018 – June 2021, 3 years, 4
                      months)
                    </span>
                    <ul className="list-disc">
                      <li>
                        Developed complex client projects on various stacks
                        including a custom e-commerce platform running on
                        <i>React</i> and <i>Magento 2</i>, <i>Vue.js PWA</i>,
                        multiple
                        <i>Woocommerce</i> with sometimes 10k+ products
                      </li>
                      <li>
                        Mentored and successfully onboarded junior front-end
                        developers
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    <h3>Web Development Intern</h3>
                    <span>
                      Fortune Lab, Blainville (Feb – May 2016, 4 months)
                    </span>
                    <ul className="list-disc">
                      <li>
                        Deliver WordPress sites and custom functionalities based
                        on mock-ups and analysis of clients' needs with a close
                        focus on responsive, SEO and user experience
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="education">
              <thead>
                <tr>
                  <th>
                    <h2>Education</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h3>Grad. Certificate in Administration</h3>
                    <span>ESG UQAM, Montreal (2020)</span>

                    <h3>Bachelor of IT Engineering</h3>
                    <span>
                      École de Technologie Supérieure, Montreal (2017 -
                      incomplete)
                    </span>
                    <h3>DEC Computer Science Technology</h3>
                    <span>Collège Montmorency, Laval (2016)</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="footer">
              <tbody>
                <tr>
                  <td>
                    <span>
                      View web version on{" "}
                      <a
                        href="https://kimdontdoit.com"
                        target="_blank"
                        rel="noreferrer">
                        kimdontdoit.com/cv
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
