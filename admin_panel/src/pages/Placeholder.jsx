export default function Placeholder({ title }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif">{title}</h1>
        <p className="text-muted-foreground mt-1">Manage information for this section.</p>
      </div>
      
      <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground shadow-sm">
        <p>This module is under construction.</p>
        <p className="text-sm mt-2">Soon you'll be able to manage {title.toLowerCase()} here.</p>
      </div>
    </div>
  );
}
