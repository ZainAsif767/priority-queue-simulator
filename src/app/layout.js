import "./globals.css"
import { Inter } from "next/font/google"
import Container from "@mui/material/Container"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "M/M/2",
  description: "Priority Queue Simulator M/M/2",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container maxWidth="lg">{children}</Container>
      </body>
    </html>
  )
}
