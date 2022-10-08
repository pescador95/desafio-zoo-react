import { ExitIcon } from "../../assets";
import { useSession } from "../../hooks/useSession";
import styles from "./header.module.css";
export const Header = ({ title }) => {
  const { signOut } = useSession();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <button onClick={signOut}>
        <ExitIcon />
        Sair
      </button>
    </div>
  );
};
