export default function UKFlagIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path id="auxk6jldea" d="M0 0h16v16H0z" />
        <path id="al8w9452wc" d="M0 0v16h32V0z" />
        <path d="M16 8h16v8L16 8zm0 0v8H0l16-8zm0 0H0V0l16 8zm0 0V0h16L16 8z" id="8mdku3hgwe" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="ufyv4pmw9b" fill="#fff">
          <use xlinkHref="#auxk6jldea" />
        </mask>
        <use fill="#D8D8D8" xlinkHref="#auxk6jldea" />
        <g mask="url(#ufyv4pmw9b)">
          <g transform="translate(-8)">
            <mask id="s7c07onwhd" fill="#fff">
              <use xlinkHref="#al8w9452wc" />
            </mask>
            <g mask="url(#s7c07onwhd)">
              <path fill="#012169" fillRule="nonzero" d="M0 0v16h32V0z" />
              <path d="m0 0 32 16m0-16L0 16" stroke="#FFF" strokeWidth="3.2" fill="#000" fillRule="nonzero" />
              <mask id="8eoqt2qgpf" fill="#fff">
                <use xlinkHref="#8mdku3hgwe" />
              </mask>
              <path
                d="m0 0 32 16m0-16L0 16"
                stroke="#C8102E"
                strokeWidth="2.133"
                fill="#000"
                fillRule="nonzero"
                mask="url(#8eoqt2qgpf)"
              />
              <path d="M16 0v16M0 8h32" stroke="#FFF" strokeWidth="5.333" fill="#000" fillRule="nonzero" />
              <path d="M16 0v16M0 8h32" stroke="#C8102E" strokeWidth="3.2" fill="#000" fillRule="nonzero" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
