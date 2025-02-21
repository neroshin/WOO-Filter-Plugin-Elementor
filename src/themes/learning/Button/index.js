import React from 'react';
import styles from './style.module.css';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className??''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Example usage
// export function ButtonExample() {
//   return (
//     <div className="space-y-4 p-8 bg-gray-100">
//       <div className="space-x-4">
//         <ModernButton variant="primary" size="small">Small Primary</ModernButton>
//         <ModernButton variant="primary">Medium Primary</ModernButton>
//         <ModernButton variant="primary" size="large">Large Primary</ModernButton>
//       </div>
//       <div className="space-x-4">
//         <ModernButton variant="secondary" size="small">Small Secondary</ModernButton>
//         <ModernButton variant="secondary">Medium Secondary</ModernButton>
//         <ModernButton variant="secondary" size="large">Large Secondary</ModernButton>
//       </div>
//       <div className="space-x-4">
//         <ModernButton variant="primary" disabled>Disabled Primary</ModernButton>
//         <ModernButton variant="secondary" disabled>Disabled Secondary</ModernButton>
//       </div>
//     </div>
//   );
// }