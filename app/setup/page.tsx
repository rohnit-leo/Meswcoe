import { SetupGuide } from "@/components/setup-guide"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 py-20">
      <div className="container mx-auto px-4">
        <SetupGuide />
      </div>
    </div>
  )
}
