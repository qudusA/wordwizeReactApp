import PageNav from "./PageNav";
import styles from "./pricing.module.css";
import image2 from "../../img-2.jpg";

export default function Pricing() {
  return (
    <section className={`container`}>
      <PageNav />
      <main className={styles.main}>
        <div className={styles.pricingContainer}>
          <h2>
            Simple pricing.
            <br /> just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            officiis, dolores perferendis unde dignissimos facilis tempore.
            Doloremque aliquid quos aperiam perspiciatis optio illo blanditiis,
            obcaecati nostrum sapiente unde rerum maiores.
          </p>
        </div>
        <div>
          <img className={styles.img} src={image2} alt="pricing image" />
        </div>
      </main>
    </section>
  );
}
