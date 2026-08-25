import React, { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Moon, Sun } from '@phosphor-icons/react';

const STORAGE_KEY = 'rv-vendor-theme';

export const getPreferredTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const applyTheme = (next, rootEl) => {
  try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', next);
  }
  if (rootEl) rootEl.setAttribute('data-theme', next);
};

const ThemeToggle = ({ rootRef, color = 'var(--text-2)', plain = false }) => {
  const [theme, setTheme] = useState(() => getPreferredTheme());

  const apply = useCallback((next) => {
    setTheme(next);
    applyTheme(next, rootRef?.current);
  }, [rootRef]);

  useEffect(() => {
    applyTheme(theme, rootRef?.current);
  }, [rootRef, theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <IconButton
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
      icon={theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
      onClick={() => apply(next)}
      variant={plain ? 'unstyled' : 'rvGhost'}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      minW="40px"
      w="40px"
      h="40px"
      p={0}
      borderRadius="var(--r-control)"
      color={color}
      _hover={{ bg: 'var(--panel-2)' }}
      _active={{ bg: 'var(--panel)' }}
    />
  );
};

export default ThemeToggle;
