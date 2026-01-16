"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Cart from "@/components/Cart/Cart";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Для админки показываем только children без хедера и корзины
    if (pathname?.startsWith("/admin-panel")) {
        return <>{children}</>;
    }
    
    return (
        <>
            <div className="container">
                <Header />
                <main className="main-content">{children}</main>
            </div>
            <Cart />
        </>
    );
}
