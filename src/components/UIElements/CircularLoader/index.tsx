import { TailSpin } from 'react-loader-spinner';

const CircularLoader = () => {
  return (
    <div className="px-3">
      <TailSpin
        visible
        height="20"
        width="20"
        color="#E7BA42"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default CircularLoader;