import React from "react";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Our platform brings together the most experienced and passionate tutors, 
          empowering students to achieve their academic goals. Whether you're looking 
          to master a subject, improve your skills, or prepare for exams, our tutors 
          are here to guide you every step of the way.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-primary mb-4">Expert Tutors</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Learn from industry experts and highly qualified educators with years of experience. 
              Each tutor is carefully selected to provide personalized guidance.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-primary mb-4">Flexible Scheduling</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Choose your preferred time slots and learn at your own pace. Our intuitive booking system 
              makes scheduling sessions hassle-free and convenient for students and tutors alike.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-primary mb-4">Affordable Pricing</h3>
            <p className="text-gray-700 dark:text-gray-300">
              High-quality tutoring doesn't have to break the bank. We provide transparent pricing 
              options and flexible payment plans so learning is accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
