'use client';

import { useState } from 'react';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);

    const header = document.getElementsByClassName('header')[0];
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      if (header) header.classList.remove('menu-opened');
      html.classList.remove('mobile-overflow');
      body.classList.remove('mobile-overflow');
    } else {
      if (header) header.classList.add('menu-opened');
      html.classList.add('mobile-overflow');
      body.classList.add('mobile-overflow');
    }
  };

  return (
    <div className="hamburger" onClick={toggle}>
      <span className="line1"></span>
      <span className="line2"></span>
      <span className="line3"></span>
    </div>
  );
};

export default Hamburger;
