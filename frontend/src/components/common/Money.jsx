import React from 'react';

const THIN = '\u00A0';
const MINUS = '\u2212';

const formatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (value, { signed = false } = {}) => {
  const n = Number(value);
  const amount = Number.isFinite(n) ? n : 0;
  const abs = formatter.format(Math.abs(amount));
  if (signed) {
    const sign = amount > 0 ? '+' : amount < 0 ? MINUS : '';
    return `${sign}₹${THIN}${abs}`;
  }
  if (amount < 0) return `${MINUS}₹${THIN}${abs}`;
  return `₹${THIN}${abs}`;
};

const Money = ({
  value = 0,
  signed = false,
  as: Tag = 'span',
  className,
  style,
  ...rest
}) => {
  const n = Number(value);
  const amount = Number.isFinite(n) ? n : 0;
  const tone = signed
    ? amount > 0
      ? 'var(--ok)'
      : amount < 0
        ? 'var(--bad)'
        : 'var(--text)'
    : 'inherit';

  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--f-num)',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
        color: tone,
        ...style,
      }}
      {...rest}
    >
      {formatMoney(amount, { signed })}
    </Tag>
  );
};

export default Money;
