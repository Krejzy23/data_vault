import Header from "@/components/Header";
import { getCurrentUser } from "@/actions/user.actions";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser}/>
      <section className="flex flex-1 flex-col h-full ">
        <MobileNavigation {...currentUser}/>
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
