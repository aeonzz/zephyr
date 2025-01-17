import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid h-screen w-full md:grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>
      <div className="relative hidden md:block">
        <Image
          src="/login-image.jpg"
          alt="Image"
          fill
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
      </div>
    </main>
  );
}
