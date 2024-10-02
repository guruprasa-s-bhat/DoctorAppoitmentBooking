import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mb-9 mt-7">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo or Brand Name */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold">Prescripto</h2>
            <p className="mt-1 text-sm text-gray-400">
              Your health, our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-white transition-colors duration-200"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/appointments"
                  className="hover:text-white transition-colors duration-200"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-2 text-sm">
              1234 Health St., Wellness City,
              <br />
              HC 56789
            </p>
            <p className="mt-2 text-sm">Phone: (123) 456-7890</p>
            <p className="mt-2 text-sm">
              Email:{" "}
              <a
                href="mailto:support@healthcareplus.com"
                className="hover:text-white transition-colors duration-200"
              >
                support@healthcareplus.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Prescripto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
