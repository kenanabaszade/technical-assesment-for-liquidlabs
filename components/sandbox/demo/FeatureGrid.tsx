const features = [
  {
    title: 'Drag & Drop',
    description: 'Intuitive interface for building layouts',
    icon: '🎨',
  },
  {
    title: 'AI-Powered',
    description: 'Generate components with natural language',
    icon: '🤖',
  },
  {
    title: 'Real-time Preview',
    description: 'See your changes instantly',
    icon: '⚡',
  },
  {
    title: 'Export Code',
    description: 'Get clean, production-ready code',
    icon: '💻',
  },
]

export default function FeatureGrid() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
