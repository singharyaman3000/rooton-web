type HamburgerIconProps = {
  fill?: '#FFF' | '#000'
}

export default function HamburgerIcon({ fill = '#FFF' }: HamburgerIconProps) {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v2H0zm0 8h24v2H0zm0 8h24v2H0z" fill={fill} fill-rule="evenodd" />
    </svg>
  );
}
