import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import {
  MainPage,
  ContactPage,
  AddContactPage,
  EditContactPage,
} from "./pages";
import styles from "./styles/app.module.scss";
import IphoneImgSrc from "./assets/iphone.png";
import { selectCurrentPage } from "./selectors";
import { Time, DeleteConfirm } from "./components";
import { ReactComponent as WifiIcon } from "./assets/wifi_icon.svg";
import { ReactComponent as BatteryIcon } from "./assets/battery_icon.svg";

const App = () => {
  const currentPage = useSelector(selectCurrentPage);

  const [scrollPosition, setScrollPosition] = useState(0);

  const contentRef = useRef();

  const Content = () => {
    switch (currentPage) {
      case "main":
        return <MainPage />;
      case "contact":
        return <ContactPage />;
      case "add_contact":
        return <AddContactPage />;
      case "edit_contact":
        return <EditContactPage />;
      default:
        return <></>;
    }
  };

  const handleScroll = () => {
    if (currentPage === "main") {
      setScrollPosition(contentRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const handleMobileScroll = () => {
      if (currentPage === "main" && window.scrollY !== 0) {
        setScrollPosition(window.scrollY);
      }
    };

    if (currentPage === "main") {
      contentRef.current.scrollTop = scrollPosition;
    } else {
      contentRef.current.scrollTop = 0;
    }

    if (window.innerWidth <= 425) {
      if (currentPage === "main") {
        window.addEventListener("scroll", handleMobileScroll);
        scrollPosition < 50
          ? window.scroll(0, 0)
          : window.scroll(0, scrollPosition);
      } else {
        window.scroll(0, 0);
      }
    }

    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [currentPage, scrollPosition]);

  return (
    <div className={styles.app}>
      <div className={styles.iphone_div}>
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className={styles.content}
        >
          <Content />
          <DeleteConfirm contentRef={contentRef} />
        </div>
        <div className={styles.status_bar}>
          <div className={styles.time}>
            <Time />
          </div>
          <div>
            <WifiIcon className={styles.status_bar_icon} />
            <BatteryIcon
              className={[
                styles.status_bar_icon,
                styles.states_bar_battery_icon,
              ].join(" ")}
            />
          </div>
        </div>
        <img
          src={IphoneImgSrc}
          alt="iphone image"
          className={styles.iphone_img}
        />
      </div>
    </div>
  );
};

export default App;
