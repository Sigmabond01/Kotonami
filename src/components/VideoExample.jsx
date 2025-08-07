export function VideoExample() {
  return (
    <section className="font-mincho relative text-white">
      <div className="z-10 relative">
        <h1 className="flex justify-center text-5xl pt-16">See Kotonami in Action</h1>
        <div className="max-w-5xl mx-auto font-medium pt-8 px-4 space-y-16">
          <p className="text-2xl">Watch how Kotonami breaks down real Japanese subtitles into bite-sized, interactive learning. 
            <p className="text-center">No boring drills. No fake context. Just raw anime + real-time language mastery.</p>
            </p>
            <div className="flex justify-center">
                    <video controls width="70%">
  <source src="/videos/kotonami-demo.mp4" type="video/mp4" />
</video>
</div>
        </div>
      </div>
    </section>
  );
}
