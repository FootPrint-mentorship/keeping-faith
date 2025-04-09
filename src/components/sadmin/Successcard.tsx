import { IoCloseSharp } from "react-icons/io5";
import styles from "../../styles/Successcard.module.scss";
import { RiShieldCheckFill } from "react-icons/ri";

interface SuccessCardProps {
  message: string;
  onClose: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ message, onClose }) => {
  return (
    <div className="style.container">
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoCloseSharp />
        </button>
        <div className={styles.iconWrapper}>
          <RiShieldCheckFill className={styles.icon} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default SuccessCard;
