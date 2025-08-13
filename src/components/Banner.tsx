// src/components/Banner.tsx
import React from 'react';

export const bannerText = `
██╗    ██╗ █████╗ ██╗  ██╗███████╗███████╗██████╗ 
██║    ██║██╔══██╗██║  ██║██╔════╝██╔════╝██╔══██╗
██║ █╗ ██║███████║███████║█████╗  █████╗  ██████╔╝
██║███╗██║██╔══██║██╔══██║██╔══╝  ██╔══╝  ██╔══██╗
╚███╔███╔╝██║  ██║██║  ██║███████╗███████╗██████╔╝
  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ 

Welcome to my personal cli on the web.
type 'help' or '?' to see available commands or start typing for suggestions.
`;

export   const getWaheebBanner = (): string[] => [
  '██╗    ██╗ █████╗ ██╗  ██╗███████╗███████╗██████╗ ',
  '██║    ██║██╔══██╗██║  ██║██╔════╝██╔════╝██╔══██╗',
  '██║ █╗ ██║███████║███████║█████╗  █████╗  ██████╔╝',
  '██║███╗██║██╔══██║██╔══██║██╔══╝  ██╔══╝  ██╔══██╗',
  '╚███╔███╔╝██║  ██║██║  ██║███████╗███████╗██████╔╝',
  ' ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ',
  '',
  'Welcome to my personal cli on the web.',
  "type 'help' or '?' to see available commands or start typing for suggestions.",
  '---'
]
