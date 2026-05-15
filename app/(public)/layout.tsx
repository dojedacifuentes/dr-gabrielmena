import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'
import { WhatsAppButton } from '@/components/public/whatsapp-button'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
