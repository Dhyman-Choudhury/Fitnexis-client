import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Fitnexis";
  }, []);

  return (
    <div className="bg-gray-100  py-10 px-2 md:px-6  my-10">
      <div className="mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Please read these Terms & Conditions carefully before using our
          services. By accessing or using Fitnexis, you agree to comply with
          these terms.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our website, you confirm that you accept these Terms &
              Conditions and agree to abide by them. If you do not agree, please
              do not use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              2. Use of Our Services
            </h2>
            <p>
              You agree to use our services only for lawful purposes and in a
              way that does not infringe the rights of, restrict, or inhibit
              anyone else’s use and enjoyment of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              3. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and data on this website are the property
              of Fitnexis or our licensors and are protected by copyright and
              intellectual property laws. You may not reproduce or distribute
              any content without our permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              4. Limitation of Liability
            </h2>
            <p>
              Fitnexis will not be liable for any damages or losses arising from
              the use or inability to use our services, including but not
              limited to indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              5. External Links
            </h2>
            <p>
              Our website may contain links to third-party sites. We do not
              endorse or take responsibility for the content or practices of
              those websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms &
              Conditions at any time without prior notice. Changes will be
              posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              7. Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by the laws of Bangladesh.
              Any disputes shall be subject to the exclusive jurisdiction of the
              courts of Dhaka.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us at:
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

export default TermsAndConditions;
