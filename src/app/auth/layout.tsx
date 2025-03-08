export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-2">
            <div>
                {children}
            </div>
        </div>
    )
}