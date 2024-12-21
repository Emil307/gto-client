import { Header } from "@/src/widgets/header";
import styles from "../styles/styles.module.scss";
import { Rating } from "@/src/widgets/rating";

export default function Page() {
  return (
    <main className={styles.page}>
      <Header title="Рейтинг спортсменов" confirmClose={false} />
      <Rating />
    </main>
  );
}
