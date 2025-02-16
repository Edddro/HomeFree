import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import "./styles.css"

export default function LandingPage() {
  return (
    <div>
      <div>
        <div className="hero bg-hero-section">
          <div className="tagline-container">
            <MapPin className="pin-icon" />
            <div className="tagline-text-container">
              <p className="tagline-text">
                <strong>Stay Connected. Stay Safe.</strong>
              </p>
              <p className="tagline-description">
                Walk with confidence, day or night. AI video calls, real-time alerts, and smart monitoring keep you protected.
              </p>
            </div>
          </div>

          <div className="image-container">
            <div className="video-container">
              <Image
                src="/HeaderImg.png"
                alt="Video call interface illustration"
                width={400}
                height={300}
                className="video-illustration"
                priority
              />
            </div>
          </div>

          <button className="cta-button">Get Started</button>
        </div>
      </div>


      <p className="description">
        HomeSafe ensures your safety when walking alone by providing real-time AI video calls, location sharing, and
        emergency alerts. Our intelligent system can detect threats, recognize known criminals, and guide you
        through difficult situations.
      </p>

      <section className="features">
        <h2 className="features-title">Features</h2>
        <div className="feature-cards">
          <div className="feature-card" style={{ "--index": 0 } as any}>
            <div className="feature-content">
              <h3 className="feature-title">AI De-Escalation</h3>
              <p className="feature-description">Get real-time guidance to safely handle tense situations.</p>
            </div>
          </div>

          <div className="feature-card" style={{ "--index": 1 } as any}>
            <div className="feature-content">
              <h3 className="feature-title">Automatic Emergency Response</h3>
              <p className="feature-description">AI detects danger and alerts emergency services instantly.</p>
            </div>
          </div>

          <div className="feature-card" style={{ "--index": 2 } as any}>
            <div className="feature-content">
              <h3 className="feature-title">Personalized AI Companion</h3>
              <p className="feature-description">Talk to an AI version of your friends to keep you company.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}