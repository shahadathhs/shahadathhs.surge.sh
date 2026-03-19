import { contactEmail } from '@/constant/contactInfo';

export default function Contact() {
  return (
    <section className="space-y-4 mb-16">
      <h2 className="text-xs font-bold uppercase tracking-widest opacity-40">
        Contact
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Get in touch via email at{' '}
        <a
          href={`mailto:${contactEmail}`}
          className="text-foreground font-bold hover:underline decoration-border underline-offset-4"
        >
          {contactEmail}
        </a>
        {' or view my '}
        <a
          href="https://drive.google.com/file/d/1dtZCEgZyof-qrUreeVpXDlOovosegpuf/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground font-bold hover:underline decoration-border underline-offset-4"
        >
          Resume
        </a>
        .
      </p>
    </section>
  );
}
