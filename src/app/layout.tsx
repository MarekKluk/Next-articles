import type { Metadata } from "next";
import Providers from './providers';

export const metadata: Metadata = {
  title: "Next Articles",
  description: "A simple Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
