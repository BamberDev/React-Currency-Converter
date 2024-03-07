import styles from "./Loader.module.scss";

const Loader = ({ loading }) => (
  <div
    className={styles.loader}
    style={{ display: loading ? "block" : "none" }}
  ></div>
);

export default Loader;
