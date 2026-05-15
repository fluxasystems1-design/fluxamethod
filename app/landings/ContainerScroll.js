'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './containerScroll.module.css';

export function ContainerScroll(props) {
  var titleComponent = props.titleComponent;
  var children = props.children;
  var containerRef = useRef(null);
  var scroll = useScroll({ target: containerRef });
  var scrollYProgress = scroll.scrollYProgress;
  var isMobileState = useState(false);
  var isMobile = isMobileState[0];
  var setIsMobile = isMobileState[1];

  useEffect(function () {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return function () {
      window.removeEventListener('resize', checkMobile);
    };
  }, [setIsMobile]);

  var rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  var scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  var translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  var cardShadow =
    '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003';

  return (
    <div className={styles.scrollRoot} ref={containerRef}>
      <div className={styles.scrollPerspective} style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} boxShadow={cardShadow}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header(props) {
  var translate = props.translate;
  var titleComponent = props.titleComponent;
  return (
    <motion.div style={{ y: translate }} className={styles.scrollHeader}>
      {titleComponent}
    </motion.div>
  );
}

function Card(props) {
  var rotate = props.rotate;
  var scale = props.scale;
  var children = props.children;
  var boxShadow = props.boxShadow;
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale: scale,
        boxShadow: boxShadow,
      }}
      className={styles.scrollCard}
    >
      <div className={styles.scrollCardInner}>{children}</div>
    </motion.div>
  );
}
