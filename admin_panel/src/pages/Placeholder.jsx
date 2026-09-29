export default function Placeholder({ title }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold font-serif">{title}</h1>
      <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground shadow-sm">
        <p>This module is under construction.</p>
        <p className="text-sm mt-2">Soon you'll be able to manage {title.toLowerCase()} here.</p>
      </div>
    </div>
  );
}
