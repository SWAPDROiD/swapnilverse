import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Swapnil Nandapure
        </div>
        <SocialLinks size="md" variant="minimal" className="gap-0" />
      </div>
    </footer>
  );
}
