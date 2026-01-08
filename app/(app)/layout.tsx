import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { CartSessionHandler } from "@/lib/store/CartSessionHandler";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";


import { SanityLive } from "@/sanity/lib/live";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/app/Header";
import { CartSheet } from "@/components/app/CartSheet";
import { ChatSheet } from "@/components/app/ChatSheet";
import { AppShell } from "@/components/app/AppShell";
import { Providers } from "./providers";


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
              <Header />
              <main>{children}</main>
            </AppShell>

            
            <Toaster position="bottom-center" />
            <SanityLive />
          </ChatStoreProvider>
        </CartStoreProvider>
      </Providers>
    
  );
}
