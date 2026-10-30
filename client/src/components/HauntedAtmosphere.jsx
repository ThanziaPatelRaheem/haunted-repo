export default function HauntedAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/haunted-graveyard.png')",
        }}
      />

      <div className="absolute inset-0 bg-[#090711]/40" />
    </div>
  );
}
