import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/app/Header";
import { AppShell } from "@/components/app/AppShell";
import { Providers } from "./providers";
import { AuthSessionHandler } from "@/lib/store/AuthSessionHandler";
import { CartSheet } from "@/components/app/cart/CartSheet";
import { AdminSidebarSheet } from "@/components/admin/AdminSidebarSheet";


export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    
      <Providers>
        <CartStoreProvider>
          <ChatStoreProvider>
            <AppShell>
                <AuthSessionHandler>
                  <Header />
                  <CartSheet/>
                  
                  <main>{children}</main>
                </AuthSessionHandler>
            </AppShell>
            <Toaster position="bottom-center" />
            <SanityLive />
          </ChatStoreProvider>
        </CartStoreProvider>
      </Providers>
    
  );
}
