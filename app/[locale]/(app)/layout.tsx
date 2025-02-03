import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <Navbar />
          <div className="flex flex-col gap-20 max-w-5xl p-5">{children}</div>
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default MainLayout;
