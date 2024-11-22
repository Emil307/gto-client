import { Header } from "@/src/widgets/header";
import styles from "../styles/styles.module.scss";

export default function Page() {
  return (
    <main className={styles.page}>
      <Header title="Рейтинг спортсменов" confirmClose={false} />
      <h5 className={styles.working}>
        Страница с рейтингом находится в разработке
      </h5>
    </main>
  );
}
