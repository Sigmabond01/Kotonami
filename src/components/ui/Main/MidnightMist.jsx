export default function MidnightMistWrapper({ children }) {
  return (
    <div className="relative w-full min-h-screen text-white bg-black">
      <div className="absolute inset-0 z-0 bg-midnight-mist" />
      <div className="absolute inset-0 z-0 bg-black/40 opacity-80" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
