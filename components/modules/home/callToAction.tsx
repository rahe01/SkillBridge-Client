import React from "react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Ready to Take the Next Step?
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Whether you're a student looking for personalized learning or an expert tutor ready to share your knowledge, 
          our platform is designed to make the experience seamless, rewarding, and impactful. 
          Join our growing community today and unlock the full potential of education.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="/become-tutor"
            className="px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition"
          >
            Become a Tutor
          </a>
          <a
            href="/tutors"
            className="px-8 py-4 bg-pink-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-pink-700 transition"
          >
            Find a Tutor
          </a>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto">
          Join thousands of learners and educators who trust us to deliver quality education. 
          Explore subjects, schedule sessions, and achieve your goals with ease.
        </p>
      </div>
    </section>
  );
}
