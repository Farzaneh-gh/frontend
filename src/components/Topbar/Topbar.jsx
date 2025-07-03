import React, { useEffect } from "react";
import styles from "./Topbar.module.css";
import { Link } from "react-router-dom";
 function Topbar() {
  const [topbarlinks, setTopbarlinks] = React.useState([]);
  const [infoIndex, setInfoIndex] = React.useState({});

  const getInfoIndex=async () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/infos/index`)
      .then((res) => res.json())
      .then((data) => {
        setInfoIndex(data);
      });
  }
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/menus/topbar`)
        .then((res) => res.json())
        .then((data) => {
          setTopbarlinks(data);
        });
    } catch (err) {
      console.log(err);
    };
    getInfoIndex();
  }, []);

  const getRandmLinkItems = (arr, count) => {
    const suffedArr = arr.sort(() => Math.random() - 0.5);
    return suffedArr.slice(0, count);
  };
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContent}>
        <div className={styles.topBarRight}>
          <ul className={styles.topBarMenu}>
            {getRandmLinkItems(topbarlinks, 5).map((link,index) => (
              <li className={styles.topBarItem} key={index}>
                <Link to={link.href} className={styles.topBarLink}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.topBarLeft}>
          <div className={styles.topBarEmail}>
            <Link
              to="#"
              className={`${styles.topBarEmailText} ${styles.topBarLink}`}
            >
              {infoIndex.email}
            </Link>
            <i className={`fas fa-envelope ${styles.topBarEmailIcon}`}></i>
          </div>

          <div className={styles.topBarPhone}>
            <Link
              to="#"
              className={`${styles.topBarPhoneText} ${styles.topBarLink}`}
            >
             {infoIndex.phone }
            </Link>
            <i className={`fas fa-phone ${styles.topBarPhoneIcon}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Topbar);