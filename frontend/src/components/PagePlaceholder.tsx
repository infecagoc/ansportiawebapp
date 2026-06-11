export default function PagePlaceholder({ note }: { note?: string }) {
  return (
    <div className="rounded-lg border border-dashed bg-white p-10 text-center text-gray-500">
      <p>{note ?? 'This module is scaffolded. CRUD UI and data wiring come next.'}</p>
    </div>
  );
}
