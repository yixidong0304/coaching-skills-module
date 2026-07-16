import { forwardRef } from 'react'

const variantClasses = {
  primary:
    'bg-forest text-canvas hover:bg-forest-dark focus-visible:outline-forest disabled:bg-line disabled:text-ink-soft disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-ink border border-line hover:bg-mint-tint focus-visible:outline-forest disabled:text-ink-soft disabled:cursor-not-allowed disabled:hover:bg-transparent',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-button px-5 py-2.5 text-body font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'

/**
 * Button or download link (when href is set and not disabled).
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    disabled = false,
    type = 'button',
    className = '',
    onClick,
    href,
    download,
    ...rest
  },
  ref,
) {
  const classes = [
    baseClasses,
    variantClasses[variant] ?? variantClasses.primary,
    className,
  ].join(' ')

  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        download={download}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
