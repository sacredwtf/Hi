import Image from "next/image"

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} neo-depth-subtle rounded-lg p-1.5 bg-card/50`}>
      <Image
        src="/logo.png"
        alt="MMS Logo"
        width={32}
        height={32}
        className="w-full h-full object-contain opacity-80"
      />
    </div>
  )
}
