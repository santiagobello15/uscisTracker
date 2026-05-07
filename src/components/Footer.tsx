export default function Footer() {
  return (
    <footer className="border-t border-border-light mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} USCIS Tracker. Not affiliated with USCIS.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
