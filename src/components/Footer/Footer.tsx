import SocialLinks from "@/components/SocialLinks";
import { i18n } from "@/i18n";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {i18n.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
        </div>
        <SocialLinks variant="minimal" className="gap-1" />
      </div>
    </footer>
  );
}
