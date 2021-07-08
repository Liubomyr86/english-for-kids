import React from 'react';
import './Footer.scss';

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <a
            className="github"
            href="https://github.com/Liubomyr86"
            target="_blank"
            rel="noopener noreferrer">
            Liubomyr86
          </a>
          <a className="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
            <span className="rss-year"> 21</span>
          </a>
        </div>
      </footer>
    </>
  );
};
