// components/AppButton.jsx
import { Link } from 'react-router-dom';

const AppButton = ({
  label,
  type = 'button',
  to,
  isLink = false,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
}) => {
  const variantClass = variant === 'secondary' ? 'app_button--secondary' : '';
  const combinedClass = `app_button ${variantClass} ${className}`.trim();

  if (isLink && to) {
    return (
      <Link to={to} className={combinedClass} data-variant={variant}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default AppButton;