import { ButtonHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
};

const buttonSizes = {
  sm: tw`px-4 py-1`,
  md: tw`px-6 py-2`,
  lg: tw`px-8 py-3`
};

const buttonVariants = {
  primary: tw`bg-gradient-to-r from-purple-600 to-purple-800 shadow text-white hover:from-purple-800 hover:to-purple-600`,
  secondary: tw`border border-purple-800`
};

const baseButtonStyle = tw`rounded focus:outline-none focus:ring-2 focus:ring-offset-2`;

const getStyles = ({ size = 'md', variant = 'primary' }: Pick<ButtonProps, 'size' | 'variant'>) => ({
  ...baseButtonStyle,
  ...buttonSizes[size],
  ...buttonVariants[variant]
});

const StyledButton = styled.button(getStyles);

export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
