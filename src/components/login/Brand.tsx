export default function Brand() {
  return (
    <div
      className="w-1/2 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A0F00 100%)',
      }}
    >
      {/* Orange accent glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 26, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-16 max-w-2xl">
        {/* Logo */}
        <div className="mb-20">
          <span className="text-white text-base font-normal tracking-[0.15em] uppercase">
            TASKFLOW
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-white text-5xl font-light leading-[1.15] mb-6">
          Organize work.
          <br />
          Move faster.
          <br />
          Ship together.
        </h1>

        {/* Subtitle */}
        <p className="text-[#FFFFFF80] text-sm font-light leading-[1.7] mb-16 max-w-lg">
          A minimal workspace for teams who value clarity. Track tasks, manage sprints, and stay
          aligned — without the noise.
        </p>

        {/* Feature pills */}
        <div className="flex gap-3">
          {['Sprint boards', 'Team roles', 'Real-time sync'].map((feature) => (
            <div
              key={feature}
              className="px-3.5 py-1.5 rounded-full border border-[#FFFFFF20] bg-transparent text-[#FFFFFF60] text-xs"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
