export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Product</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>© 2025 No-Code Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
