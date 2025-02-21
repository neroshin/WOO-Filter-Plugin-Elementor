import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = () => {
    const visiblePages = 5
    const halfVisible = Math.floor(visiblePages / 2)
    let startPage = Math.max(currentPage - halfVisible, 1)
    const endPage = Math.min(startPage + visiblePages - 1, totalPages)

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(endPage - visiblePages + 1, 1)
    }

    return pageNumbers.slice(startPage - 1, endPage).map((number) => (
      <li key={number} className={`${styles.pageItem} ${currentPage === number ? styles.active : ""}`}>
        <a
          href="#"
          className={styles.pageLink}
          onClick={(e) => {
            e.preventDefault()
            onPageChange(number)
          }}
        >
          {number}
        </a>
      </li>
    ))
  }
  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={`${styles.pageItem} ${styles.prevNext} ${currentPage === 1 ? styles.disabled : ""}`}>
          <a
            href="#"
            className={styles.pageLink}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) onPageChange(currentPage - 1)
            }}
          >
            &laquo;
          </a>
        </li>

        {currentPage > 3 && totalPages > 5 && (
          <>
            <li className={styles.pageItem}>
              <a
                href="#"
                className={styles.pageLink}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(1)
                }}
              >
                1
              </a>
            </li>
            <li className={styles.pageItem}>
              <span className={styles.ellipsis}>&hellip;</span>
            </li>
          </>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <li className={styles.pageItem}>
              <span className={styles.ellipsis}>&hellip;</span>
            </li>
            <li className={styles.pageItem}>
              <a
                href="#"
                className={styles.pageLink}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(totalPages)
                }}
              >
                {totalPages}
              </a>
            </li>
          </>
        )}

        <li className={`${styles.pageItem} ${styles.prevNext} ${currentPage === totalPages ? styles.disabled : ""}`}>
          <a
            href="#"
            className={styles.pageLink}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) onPageChange(currentPage + 1)
            }}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}
