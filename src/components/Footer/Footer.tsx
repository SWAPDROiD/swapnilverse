import SocialLinks from "@/components/SocialLinks";
import { i18n } from "@/i18n";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="section-container">
        <div className="bento-card flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
          <div>
            <p className="section-label">SWAPDROiD</p>
            <div className="mt-2 text-sm text-text-secondary">
              {i18n.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
            </div>
          </div>
          <SocialLinks variant="minimal" className="gap-2" />
        </div>
      </div>
    </footer>
  );
}
