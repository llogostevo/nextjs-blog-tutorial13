import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './component/Navbar'
import MyProfilePic from './component/MyProfilePic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Lloyd's Blog 😄",
  description: 'A blog about me ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`dark:bg-slate-700 bg-stone-100 ${inter.className}`}>
        <Navbar />
        <MyProfilePic />
        {children}
      </body>
    </html>
  )
}
