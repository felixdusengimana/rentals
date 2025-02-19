import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/ui/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}
