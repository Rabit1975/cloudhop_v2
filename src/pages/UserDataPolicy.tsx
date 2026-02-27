export default function UserDataPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-invert dark:prose max-w-none">
          <h1>User Data Policy</h1>
          <p className="text-muted-foreground">
            <strong>Last Updated: February 26, 2026</strong>
          </p>

          <h2>Google API Services User Data Policy Compliance</h2>
          <p>
            CloudHop complies with Google's API Services User Data Policy regarding the handling of user data obtained
            through Google Sign-In and related APIs.
          </p>

          <h2>1. Permitted Uses of User Data</h2>
          <p>CloudHop uses Google Sign-In data <strong>only</strong> for:</p>
          <ul>
            <li>Authentication and account management</li>
            <li>Personalizing your experience within CloudHop</li>
            <li>Improving the CloudHop service and user experience</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>2. Prohibited Uses</h2>
          <p>CloudHop <strong>does not</strong>:</p>
          <ul>
            <li>Sell user data to third parties</li>
            <li>Share user data with advertisers or marketers (except aggregated, non-identifying data)</li>
            <li>Use user data for purposes outside the scope of providing CloudHop services</li>
            <li>Store sensitive OAuth tokens longer than necessary</li>
            <li>Combine user data with data from other services without consent</li>
          </ul>

          <h2>3. Data Retention</h2>
          <p>We retain user data only as long as:</p>
          <ul>
            <li>Necessary to provide the Service</li>
            <li>Required by law</li>
            <li>As specified in our Privacy Policy</li>
          </ul>
          <p>You can request data deletion at any time by contacting legal@cloudhop.cloud.</p>

          <h2>4. Data Security</h2>
          <p>We protect user data through:</p>
          <ul>
            <li>Encryption in transit (HTTPS/TLS)</li>
            <li>Secure storage with access controls</li>
            <li>Regular security audits and updates</li>
            <li>Minimal data retention practices</li>
          </ul>

          <h2>5. Third-Party Access</h2>
          <p>
            User data is shared only with service providers who:
          </p>
          <ul>
            <li>Agree to comply with this Data Policy</li>
            <li>Use data only to provide services to CloudHop</li>
            <li>Are bound by confidentiality agreements</li>
          </ul>

          <h3>Current service providers:</h3>
          <ul>
            <li>
              <strong>Supabase</strong>: Database and authentication
            </li>
            <li>
              <strong>Vercel</strong>: Hosting and deployment
            </li>
            <li>
              <strong>Google Analytics</strong>: Usage analytics (non-identifying data only)
            </li>
          </ul>

          <h2>6. User Control</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your data</li>
            <li>Request corrections to your data</li>
            <li>Request data deletion</li>
            <li>Disconnect your Google Account from CloudHop</li>
          </ul>
          <p>To exercise these rights, contact: legal@cloudhop.cloud</p>

          <h2>7. Transparency</h2>
          <p>CloudHop commits to:</p>
          <ul>
            <li>Clear disclosure of what data we collect</li>
            <li>Transparent data handling practices</li>
            <li>Regular policy updates</li>
            <li>Prompt notification of data breaches</li>
          </ul>

          <h2>8. Compliance</h2>
          <p>CloudHop adheres to:</p>
          <ul>
            <li>Google API Services User Data Policy</li>
            <li>GDPR (General Data Protection Regulation)</li>
            <li>CCPA (California Consumer Privacy Act)</li>
            <li>Other applicable privacy laws</li>
          </ul>

          <h2>9. Questions or Concerns</h2>
          <p>If you have questions about how CloudHop handles your data:</p>
          <ul>
            <li>Email: privacy@cloudhop.cloud</li>
            <li>Website: https://cloudhop.cloud</li>
          </ul>

          <hr className="my-8" />
          <p className="text-sm text-muted-foreground">© 2026 CloudHop. All rights reserved.</p>
        </article>
      </div>
    </div>
  );
}
