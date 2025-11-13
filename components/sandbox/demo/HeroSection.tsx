export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Build Apps Without Code
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Create beautiful websites and web applications using natural language
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
              Get Started
            </button>
            <button className="rounded-lg border-2 border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
