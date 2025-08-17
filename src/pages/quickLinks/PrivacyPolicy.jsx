import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Fitnexis";
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-2 md:px-6 my-10">
      <div className="mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          At <strong>Fitnexis</strong>, we value your privacy and are committed
          to protecting your personal information. This policy outlines how we
          collect, use, and safeguard your data.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal details such as your name, email address,
              and any information you voluntarily submit through forms or
              comments. We also collect non-personal data such as browser type,
              device information, and website usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to improve our services, respond to your
              inquiries, send newsletters (if subscribed), and enhance user
              experience. We do not sell or rent your personal data to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              3. Cookies & Tracking
            </h2>
            <p>
              We use cookies to personalize your experience and analyze website
              traffic. You can disable cookies in your browser settings, but
              this may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              4. Data Security
            </h2>
            <p>
              We implement security measures to protect your personal
              information. However, no online transmission is 100% secure, so
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              5. Third-Party Links
            </h2>
            <p>
              Our site may contain links to external websites. We are not
              responsible for the privacy practices of those websites and
              encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact
              us at:
            </p>
            <p className="mt-2">
               <strong>Email:</strong> support@fitnexis.ai
            </p>
            <p>
               <strong>Address:</strong> 123 AI Innovation Street, Dhaka,
              Bangladesh
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
