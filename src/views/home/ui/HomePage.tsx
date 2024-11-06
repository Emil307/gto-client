import { Navbar } from "@/src/widgets/navbar";
import { Home as HomeWidget } from "@/src/widgets/home";

export default function Home() {
  return (
    <main>
      <HomeWidget />
      <Navbar />
    </main>
  );
}
