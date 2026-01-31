
import { Footer } from "@/components/shared/footer2";
import { Navbar } from "@/components/shared/navbar1";


const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="container mx-auto">
    
    <Navbar></Navbar>
    
    {children}
    
    
   <Footer></Footer>
    
    
    </div>;
};

export default CommonLayout;
