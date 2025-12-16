import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import { TaskModalProvider } from "@/components/modals/task-modal-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for Desktop */}
      <Sidebar />

      <div className="flex w-full flex-col md:pl-64">
        <Header />
        
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>

      {/* Global Modal Provider */}
      <TaskModalProvider />
    </div>
  )
}
