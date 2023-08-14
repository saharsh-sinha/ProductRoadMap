import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import roadmapDefaultsJson from './roadmap-defaults.json'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: roadmapDefaultsJson.browserTitle,
  description: 'Roadmap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-100 body-bg" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
