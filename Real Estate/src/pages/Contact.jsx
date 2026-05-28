import { useState } from 'react'
import PropertyMap from '../components/PropertyMap'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="card p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-stone-600 dark:text-stone-400 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="input-field"
                      placeholder="Property enquiry, General question..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field min-h-[150px]"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Office</h3>
                <p className="text-stone-600 dark:text-stone-400 mb-2">
                  Attabira Market Main Office, Dist-Bargarh, Odisha
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-stone-600 dark:text-stone-400 mb-2">
                  <strong>Phone:</strong> +91 8260474351, +91 9692157014
                </p>
                <p className="text-stone-600 dark:text-stone-400">
                  <strong>Email:</strong> surajbhoi1203@gmail.com, hiteshputel100@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
                <p className="text-stone-600 dark:text-stone-400">
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Find Us</h3>
                <PropertyMap lat="34.0736" lng="-118.4004" className="h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
