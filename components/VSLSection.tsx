export default function VSLSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/WLtnDdsYFqc"
            title="Video Sales Letter - Resuelto Agency"
            aria-label="VSL de Resuelto Agency"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
