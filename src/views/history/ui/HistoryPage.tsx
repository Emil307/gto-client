import { Header } from "@/src/widgets/header";
import styles from "../styles/styles.module.scss";
import { History } from "@/src/widgets/history";

export default function Page() {
  return (
    <main className={styles.page}>
      <Header title="История заявок" confirmClose={false} />
      <History />
    </main>
  );
}
