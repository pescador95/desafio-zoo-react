import { ExitIcon } from "../../assets";
import { useSession } from "../../hooks/useSession";
import {Navigate} from "react-router-dom";
import styles from "./header.module.css";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { ROUTES } from "../../routes/routes";

export const Header = ({ title }) => {
  const { signOut } = useSession();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.button_container}>
        <button onClick={() => {
                window.location.pathname = ROUTES.profile;
        }}>
        <PermIdentityIcon />
        Meu Perfil
        </button>
        <button onClick={signOut}>
          <ExitIcon />
          Sair
        </button>
      </div>
    </div>
  );
};
