import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="flex-center mr-20">
            <Image
              src="/assets/icons/favicon.png"
              alt="logo"
              width={64}
              height={64}
              className=""
            />
            <h2 className="h2 text-white font-semibold">
              Data<span className="text-yellow-300">Vault</span>
            </h2>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way you can Do</h1>
            <p className="body-1">
              This is a place where you can store all your documents.
            </p>
          </div>
          <Image
            src="/assets/images/vault_boy.png"
            alt="VaultBoy"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/icons/favicon.png"
              alt="logo"
              width={56}
              height={56}
              className=""
            />
            <h1 className="h1 text-brand-100 font-semibold ml-2">
              Data<span className="text-yellow-300">Vault</span>
            </h1>
          </div>
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
