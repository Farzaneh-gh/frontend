import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";

export default function Navbar() {
  const { userInfos, isLoggedIn } = useContext(AuthContext);
  const [allMenus, setAllMenus] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = React.useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/menus`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure each menu has a submenus array
        const normalizedMenus = data.map((menu) => ({
          ...menu,
          submenus: Array.isArray(menu.submenus) ? menu.submenus : [],
        }));
        setAllMenus(normalizedMenus);
      });
  }, []);

  return (
    <div className={styles.mainHeaderContent}>
      <div className="d-md-none d-flex justify-content-between align-items-center">
        <i
          className={`fas fa-bars d-md-none fs-1`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>
      </div>
      <div className={styles.mainHeaderRight}>
        <img src="/images/logo/Logo.png" className="" alt="لوگوی سبزلرن" />

        <ul
          className={`${styles.mainHeaderMenu} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <li className={styles.mainHeaderItem}>
            <Link to="/" className={styles.mainHeaderLink}>
              صفحه اصلی
            </Link>
          </li>
          {allMenus.map((menu, index) => (
            <li
              className={styles.mainHeaderItem}
              key={index}
              onClick={() =>
                setOpenSubmenuIndex(index === openSubmenuIndex ? null : index)
              }
            >
              <Link to="#" className={styles.mainHeaderLink}>
                <div className="d-flex align-items-center justify-content-between">
                  <span>{menu.title}</span>
                  {Array.isArray(menu.submenus) && menu.submenus.length > 0 && (
                    <i
                      className={`fas fa-angle-down ${styles.mainHeaderLinkIcon}`}
                    ></i>
                  )}
                </div>

                {Array.isArray(menu.submenus) && menu.submenus.length > 0 && (
                  <ul
                    className={`${styles.mainHeaderDropdown} ${
                      openSubmenuIndex === index ? styles.open : ""
                    }`}
                  >
                    {menu.submenus.map((submenu, subIndex) => (
                      <li
                        className={styles.mainHeaderDropdownItem}
                        key={subIndex}
                      >
                        <Link
                          to={submenu.href}
                          className={styles.mainHeaderDropdownLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.mainHeaderLeft}>
        <Link to="#" className={styles.mainHeaderCartBtn}>
          <i
            className={`fas fa-shopping-cart ${styles.mainHeaderCartIcon}`}
          ></i>
        </Link>

        <div className="d-none d-md-flex align-items-center">
          {isLoggedIn ? (
            <Link to="/my-account" className={styles.mainHeaderProfile}>
              <span className={styles.mainHeaderProfileText}>
                {userInfos.name}
              </span>
            </Link>
          ) : (
            <Link to="/login" className={styles.mainHeaderProfile}>
              <span className={styles.mainHeaderProfileText}>
                ورود / ثبت نام
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
