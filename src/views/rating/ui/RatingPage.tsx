import { Header } from "@/src/widgets/header";
import styles from "../styles/styles.module.scss";
import { RatingFilters } from "@/src/widgets/ratingFilters";
import { RatingList } from "@/src/widgets/ratingList";

export default function Page() {
  return (
    <main className={styles.page}>
      <Header title="Рейтинг спортсменов" confirmClose={false} />
      <RatingFilters />
      <RatingList />
    </main>
  );
}
