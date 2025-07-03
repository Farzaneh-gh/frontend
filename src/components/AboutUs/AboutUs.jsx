import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.aboutUs}>
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"
        />

        <div className="container">
          <div className="row">
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده !"
              icon="far fa-copyright"
            />
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده !"
              icon="fa-solid fa-leaf"
            />
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده !"
              icon="fa-solid fa-gem"
            />

            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارائه میده !"
              icon="fa-solid fa-crown"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
