import { tv } from 'tailwind-variants'

export const typograph = tv({
  base: 'text-base font-medium',
  variants: {
    size: {
      title: 'text-2xl font-medium',
      detail: 'text-sm',
      result: 'text-xl',
      xs: 'text-xs',
    },
    color: {
      detail: 'text-[#555]',
      skeleton: 'text-[#888]',
      sub: 'text-[#444]',
    },
  },
})
