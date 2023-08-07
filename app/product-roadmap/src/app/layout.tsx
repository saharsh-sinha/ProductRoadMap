import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Product Map',
  description: 'Product Roadmap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html  className="h-100 body-bg" lang="en">
      <body className={inter.className}>{children}</body>
      {/* <body className="h-100">{children}</body> */}
    </html>
  )
}
