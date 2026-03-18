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

          <h2>10. Google API Services &amp; YouTube Data</h2>
          <p>
            CloudHop's use of information received from Google APIs adheres to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>

          <h3>10.1 Why We Use Google Sign-In</h3>
          <p>
            CloudHop uses Google Sign-In (OAuth 2.0) <strong>only</strong> to authenticate users who wish to
            access the <strong>YouTube Music</strong> feature. Users who do not use Music are never prompted
            for Google authentication.
          </p>

          <h3>10.2 Scopes Requested and Their Purpose</h3>
          <ul>
            <li><strong>openid</strong> — Required by OpenID Connect to verify your identity and issue a signed token.</li>
            <li><strong>email</strong> — Used as your unique CloudHop session identifier to recognise returning users. Not used for marketing without consent.</li>
            <li><strong>profile</strong> — Your display name and photo are shown in the Music player UI only. Not stored in our database beyond the browser session.</li>
          </ul>

          <h3>10.3 Data We Do NOT Collect via Google</h3>
          <ul>
            <li>We do <strong>not</strong> access your YouTube watch history, liked videos, or playlists.</li>
            <li>We do <strong>not</strong> post, upload, delete, or modify content on your YouTube or Google account.</li>
            <li>We do <strong>not</strong> request Drive, Gmail, Calendar, Contacts, or any other Google service data.</li>
            <li>We do <strong>not</strong> store your Google OAuth tokens in our database.</li>
            <li>We do <strong>not</strong> share Google account data with any third party for advertising.</li>
          </ul>

          <h3>10.4 Limited Use Compliance</h3>
          <ul>
            <li>Google API data is used only to provide the YouTube Music feature to the authenticated user.</li>
            <li>We do not use Google API data to serve advertisements.</li>
            <li>We do not allow humans to read your Google account data unless required for a security investigation with your consent.</li>
          </ul>

          <h3>10.5 Revoking Google Access</h3>
          <p>
            Visit{' '}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              myaccount.google.com/permissions
            </a>{' '}
            to remove CloudHop's access at any time.
          </p>

          <h2>11. Contact Us</h2>
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
