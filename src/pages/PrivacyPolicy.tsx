export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-invert dark:prose max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">
            <strong>Last Updated: February 26, 2026</strong>
          </p>

          <h2>1. Introduction</h2>
          <p>
            CloudHop ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and otherwise handle your information when you use our website and
            services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide</h3>
          <ul>
            <li>Account registration information (email, username, profile data)</li>
            <li>Google Account information when you sign in with Google</li>
            <li>Content you upload or create (playlists, preferences, gameplay data)</li>
            <li>Communications you send us</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <ul>
            <li>Device information (OS, browser type, IP address)</li>
            <li>Usage data (pages visited, games played, features used)</li>
            <li>Cookie and tracking data</li>
            <li>Analytics data (via Google Analytics)</li>
          </ul>

          <h3>2.3 Third-Party Services</h3>
          <p>
            When you authenticate via Google Sign-In, we receive:
          </p>
          <ul>
            <li>Email address</li>
            <li>Profile name and picture</li>
            <li>Linked accounts (YouTube, etc.)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Authenticate users and manage accounts</li>
            <li>Personalize your experience</li>
            <li>Send you updates and announcements</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and secure our services</li>
            <li>Analyze usage patterns and optimize performance</li>
          </ul>

          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do <strong>not</strong> sell your personal information. We may share information with:
          </p>
          <ul>
            <li>Service providers (hosting, analytics, payments)</li>
            <li>Legal authorities when required by law</li>
            <li>Your explicit consent</li>
          </ul>

          <h3>4.1 Third-Party Services</h3>
          <ul>
            <li>
              <strong>Google Sign-In</strong>: Your authentication and profile data
            </li>
            <li>
              <strong>YouTube API</strong>: Game and music video integration
            </li>
            <li>
              <strong>Supabase</strong>: Database and authentication infrastructure
            </li>
            <li>
              <strong>Analytics</strong>: Usage analytics (non-identifying data)
            </li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
          <ul>
            <li>HTTPS encryption for data in transit</li>
            <li>Secure database storage</li>
            <li>Regular security audits</li>
            <li>Limited access controls</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> No method of transmission over the Internet is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request data deletion</li>
            <li>Opt-out of certain data uses</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact us at: legal@cloudhop.cloud</p>

          <h2>7. Cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>Maintain your session</li>
            <li>Remember preferences</li>
            <li>Track usage analytics</li>
            <li>Improve user experience</li>
          </ul>
          <p>You can control cookies through your browser settings.</p>

          <h2>8. Children's Privacy</h2>
          <p>
            CloudHop is not intended for children under 13. We do not knowingly collect information from children under
            13. If we learn we've collected such information, we'll delete it promptly.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. We'll notify you of significant changes by updating the "Last Updated"
            date.
          </p>

          <h2>10. Contact Us</h2>
          <p>For privacy questions or concerns:</p>
          <ul>
            <li>Email: legal@cloudhop.cloud</li>
            <li>Website: https://cloudhop.cloud</li>
          </ul>

          <hr className="my-8" />
          <p className="text-sm text-muted-foreground">© 2026 CloudHop. All rights reserved.</p>
        </article>
      </div>
    </div>
  );
}
