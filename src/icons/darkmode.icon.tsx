type DarkModeIconProps = {
  fill?: '#000' | '#FFF';
};

export default function DarkModeIcon({ fill = '#000' }: DarkModeIconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 8.286a2.205 2.205 0 0 1-1.62-.666A2.205 2.205 0 0 1 3.714 6c0-.637.222-1.177.666-1.62A2.205 2.205 0 0 1 6 3.714c.637 0 1.177.222 1.62.666.444.443.666.983.666 1.62 0 .637-.222 1.177-.666 1.62A2.205 2.205 0 0 1 6 8.286zM.22 6.22A.217.217 0 0 1 0 5.997c0-.063.021-.115.063-.156a.217.217 0 0 1 .157-.06h1.56a.217.217 0 0 1 .22.223.207.207 0 0 1-.063.155.217.217 0 0 1-.157.06H.22zm10 0a.217.217 0 0 1-.22-.223c0-.063.021-.115.063-.156a.217.217 0 0 1 .157-.06h1.56a.217.217 0 0 1 .22.223.207.207 0 0 1-.063.155.217.217 0 0 1-.157.06h-1.56zM5.997 2a.207.207 0 0 1-.156-.063.217.217 0 0 1-.06-.157V.22A.217.217 0 0 1 6.003 0c.062 0 .114.021.155.063.04.042.06.095.06.157v1.56a.217.217 0 0 1-.223.22zm0 10a.207.207 0 0 1-.156-.063.217.217 0 0 1-.06-.157v-1.56a.217.217 0 0 1 .223-.22c.062 0 .114.021.155.063.04.042.06.095.06.157v1.56a.217.217 0 0 1-.223.22zM2.868 3.16l-.913-.887a.206.206 0 0 1-.062-.153c0-.06.022-.116.064-.167a.22.22 0 0 1 .157-.072c.057 0 .11.025.159.074l.898.902a.23.23 0 0 1 .07.158.212.212 0 0 1-.064.15.205.205 0 0 1-.15.066.227.227 0 0 1-.159-.07zm6.86 6.885-.9-.902a.23.23 0 0 1-.07-.158c0-.055.026-.107.078-.156a.144.144 0 0 1 .136-.069c.057.004.11.03.16.08l.913.887a.206.206 0 0 1 .062.153c0 .06-.022.116-.064.167a.22.22 0 0 1-.157.072.222.222 0 0 1-.159-.074zm-.9-6.868c-.049-.045-.071-.096-.068-.152a.244.244 0 0 1 .08-.157l.887-.913a.206.206 0 0 1 .153-.062c.06 0 .116.022.167.064a.22.22 0 0 1 .072.157c0 .057-.025.11-.074.159l-.902.898a.214.214 0 0 1-.154.07.245.245 0 0 1-.16-.064zm-6.875 6.872a.24.24 0 0 1-.072-.163c0-.057.025-.11.074-.159l.902-.898a.225.225 0 0 1 .158-.074c.055 0 .107.024.156.074a.17.17 0 0 1 .058.143.27.27 0 0 1-.069.16l-.887.913a.219.219 0 0 1-.159.073.24.24 0 0 1-.16-.07z"
        fill={fill}
        fill-rule="nonzero"
      />
    </svg>
  );
}
