import ThemeToggle from "../common/ThemeToggle";

interface HeaderProps {
  onAddEntry: () => void;
}

export default function Header({ onAddEntry }: HeaderProps) {
  return (
    <header
      className="w-full sticky top-0 z-20"
      style={{
        height: "64px",
        backgroundColor: "var(--color-bg-component)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-header)",
      }}
    >
      <div className="max-w-content mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none" aria-hidden="true">🏗️</span>
          <div>
            <h1
              className="font-semibold leading-tight"
              style={{ fontSize: "20px", color: "var(--color-text-heading)" }}
            >
              Work Log
            </h1>
            <p
              className="text-sm leading-none mt-0.5"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Construction Site Daily Record
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={onAddEntry} className="btn-primary btn-lg">
            + Add Entry
          </button>
        </div>
      </div>
    </header>
  );
}
