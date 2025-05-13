import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-blue-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Welcome to Our Platform</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing features and services that will transform your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">Feature {i}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              We are a team of passionate individuals dedicated to creating amazing experiences for our users. Our
              mission is to provide innovative solutions that make a difference.
            </p>
            <p className="text-lg text-gray-600">
              Founded in 2023, we have been at the forefront of technological advancement, constantly pushing the
              boundaries of what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-600 text-white" id="contact">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  rows={4}
                ></textarea>
              </div>
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
