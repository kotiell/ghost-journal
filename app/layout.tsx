import './globals.css'

export const metadata = {
  title: 'Ghost Getter',
  description: 'An app created to help you get them ghosts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
