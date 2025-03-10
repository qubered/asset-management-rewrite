import { ModeToggle } from "@/components/themes/theme-button";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 flex justify-end h-16 shrink-0 items-center gap-2 px-4">
        <ModeToggle />
      </header>
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <div>
          {children}
        </div>
      </div>
    </>
  )
}