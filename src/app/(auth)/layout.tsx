import Background from "@/components/auth/background";

interface Props {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return ( 
    <div className="relative isolate min-h-screen overflow-hidden">
      <Background />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
};
 
export default Layout;