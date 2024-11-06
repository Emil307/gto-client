import { Navbar } from "@/src/widgets/navbar";
import { Home as HomeWidget } from "@/src/widgets/home";
import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeWidget />
      <Navbar />
    </main>
  );
}
