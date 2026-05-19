import { SITE_EMAIL, SITE_MOBILE } from '@/lib/constants';

export default function HelpPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">Help &amp; Quick Guide</h1>
      <p className="text-sm text-secondary mb-8">
        Everything you need to manage your stock from this admin panel.
      </p>

      <div className="space-y-6">
        <Section title="How to log in">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>
              Bookmark <span className="text-white">/admin/login</span> on your phone&apos;s home screen so you can open it in one tap.
            </li>
            <li>Type your email address and password.</li>
            <li>Tap <span className="text-white">Sign In</span>.</li>
            <li>Let your phone&apos;s browser save the password so you don&apos;t have to type it next time.</li>
          </ol>
          <Tip>Forgot your password? Contact the developer below and they&apos;ll reset it for you.</Tip>
        </Section>

        <Section title="How to add a car">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>From the sidebar, tap <span className="text-white">Vehicles</span> &rarr; <span className="text-white">Add Vehicle</span>.</li>
            <li>Fill in Make, Model, Year, Price and Mileage &mdash; these are required.</li>
            <li>Pick the fuel type, gearbox and body type from the drop-downs.</li>
            <li>Add colour, doors, engine size, horsepower and a monthly price if you want to show one.</li>
            <li>Write a short description and a comma-separated list of features (e.g. &quot;Leather, Sat Nav, Cruise Control&quot;).</li>
            <li>Tick <span className="text-white">Featured on homepage</span> if you want this car on the front page.</li>
            <li>Upload photos (see below), then tap <span className="text-white">Save Vehicle</span>.</li>
          </ol>
        </Section>

        <Section title="How to upload photos">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>Scroll to the &quot;Photos&quot; section on the Add/Edit page.</li>
            <li>Tap the upload box. On a phone, you&apos;ll see options like <span className="text-white">Take Photo</span> or <span className="text-white">Photo Library</span>.</li>
            <li>Pick or shoot multiple photos at once. Each one must be under 10MB.</li>
            <li>The first photo is the main one (it shows on the listings page). Tap <span className="text-white">Make Main</span> on any other photo to promote it, or use the arrows to reorder.</li>
            <li>Tap the &times; on a photo to remove it.</li>
          </ol>
          <Tip>Best results: take photos outside in natural light. 6&ndash;10 photos per car is usually enough.</Tip>
        </Section>

        <Section title="How to mark a car as sold">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>Open <span className="text-white">Vehicles</span> from the sidebar.</li>
            <li>Find the car and tap the green <span className="text-white">available</span> badge to toggle it to <span className="text-white">sold</span>.</li>
            <li>Sold cars stop appearing on the public website automatically.</li>
            <li>If you want more control (e.g. mark as &quot;Reserved&quot;), tap the pencil icon to edit and change the Status field.</li>
          </ol>
        </Section>

        <Section title="How to edit or delete a car">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>Open <span className="text-white">Vehicles</span> and tap the pencil icon next to the car.</li>
            <li>Change any details, swap photos, then tap <span className="text-white">Update Vehicle</span>.</li>
            <li>To remove a car completely, tap the bin icon and confirm. This is permanent.</li>
          </ol>
        </Section>

        <Section title="Checking customer enquiries">
          <p>
            All contact-form, finance and valuation messages from the public site land in <span className="text-white">Enquiries</span> in the sidebar.
            Check it daily so you don&apos;t miss a lead.
          </p>
        </Section>

        <Section title="If something looks broken">
          <p>
            Try a hard refresh first (close and reopen the page). If the issue persists:
          </p>
          <ul className="list-disc list-inside space-y-1.5 mt-2">
            <li>
              Call or WhatsApp the developer: <span className="text-white">{SITE_MOBILE}</span>
            </li>
            <li>
              Email: <a href={`mailto:${SITE_EMAIL}`} className="text-accent">{SITE_EMAIL}</a>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm text-secondary space-y-2 leading-relaxed">{children}</div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-xs text-accent bg-accent/5 border border-accent/20 rounded px-3 py-2">
      Tip: {children}
    </p>
  );
}
