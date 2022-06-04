import React, { ComponentProps, FC } from 'react';
import clsx from 'clsx';

type ButtonProps = ComponentProps<'button'> & {
  color?: 'primary' | 'info' | 'success' | 'danger' | 'warning';
};

// TODO pattern (Proxy Component)
const Button: FC<ButtonProps> = ({
  color = 'primary',
  className,
  ...restProps
}) => {
  const buttonClassName = clsx('btn', `btn-outline-${color}`, className);
  return <button {...restProps} className={buttonClassName} />;
};

export default Button;
