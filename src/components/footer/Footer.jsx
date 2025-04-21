import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-indigo-950 text-white">
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="-m-6 flex flex-wrap">
              <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 inline-flex items-center">
                    <Logo width="100px" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      &copy; Copyright 2025. All Rights Reserved by TaskFlow.
                    </p>
                  </div>
                </div>
              </div>
    
              {/* Footer Link Section */}
              {[
                {
                  title: "Company",
                  links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
                },
                {
                  title: "Support",
                  links: ["Account", "Help", "Contact Us", "Customer Support"],
                },
                {
                  title: "Legals",
                  links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
                },
              ].map((section) => (
                <div key={section.title} className="w-full p-6 md:w-1/2 lg:w-2/12">
                  <div className="h-full">
                    <h3 className="tracking-wider mb-5 text-xs font-semibold uppercase text-gray-400">
                      {section.title}
                    </h3>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link} className="mb-3">
                          <Link
                            to="/"
                            className="text-base text-white hover:text-green-400 transition-all duration-200"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}

export default Footer