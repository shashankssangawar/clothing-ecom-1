import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "LUMEN | Next-Gen Fashion",
  description: "A premium clothing e-commerce experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground`}>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  );
}
