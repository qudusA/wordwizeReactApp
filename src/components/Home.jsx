// import PageNav from "./PageNav";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import PageNav from "./PageNav";

export default function Home() {
  return (
    <section className={`${styles.homeContainer}`}>
      <PageNav />
      <main className={styles.main}>
        <h2>
          You travel the world
          <br /> WorldWise Keeps track of your
          <br /> Adventures.
        </h2>
        <p>
          A world map that traks your footsteps into every city you canthink of.
          Never forget
          <br /> your wonderful experiences. and show your friends how you have
          wandered the <br /> world.
        </p>
        <p>
          <Link className={styles.cta} to={"/login"}>
            start tracking now
          </Link>
        </p>
      </main>
    </section>
  );
}
