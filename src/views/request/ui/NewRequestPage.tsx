import styles from "../styles/styles.module.scss";
import { RequestTabs } from "@/src/widgets/request";

export default function Page() {
  return (
    <main className={styles.page}>
      <RequestTabs />
    </main>
  );
}
