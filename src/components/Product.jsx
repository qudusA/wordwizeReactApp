import PageNav from "./PageNav";
import styles from "./product.module.css";
import image1 from "../../img-1.jpg";

export default function Product() {
  return (
    <section className="container">
      <PageNav />
      <main className={styles.main}>
        <div>
          <img className={styles.img1} src={image1} alt="product image" />
        </div>
        <div className={styles.aboutContainer}>
          <h2>About WordldWize.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laborum
            natus, dolorum deserunt eaque nobis aliquid consectetur veritatis?
            Perspiciatis, ab quis. Recusandae esse doloremque eveniet ut sunt,
            dignissimos voluptas asperiores. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ratione, consequuntur dignissimos
            libero quibusdam aut eveniet! Eum tempore esse voluptates possimus
            amet praesentium laboriosam perferendis reprehenderit, placeat,
            porro, cum tenetur consequuntur.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
            assumenda magnam similique? Eligendi, debitis cum quidem repellendus
            accusamus soluta obcaecati odio sint quo in, nemo quia, suscipit
            iure saepe repellat.
          </p>
        </div>
      </main>
    </section>
  );
}
