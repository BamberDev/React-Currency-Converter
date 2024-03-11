import styles from "./Loader.module.scss";
import clsx from "clsx";

const Loader = ({ loading }) => (
  <div
    className={clsx(styles.loader, {
      [styles.visible]: loading,
      [styles.hidden]: !loading,
    })}
  ></div>
);

export default Loader;
