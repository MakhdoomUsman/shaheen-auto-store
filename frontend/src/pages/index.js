import OverallInventory from "@/components/Inventory/OverallInventory";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <OverallInventory />
      <div> pos system</div>
    </main>
  );
}
