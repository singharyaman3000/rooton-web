/* eslint-disable jsx-a11y/no-static-element-interactions */
// Update ToggleSwitch component to accept props
const ToggleSwitch = ({ isToggled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isToggled);
  };

  return (
    <div onClick={handleToggle} style={{
      width: '50px',
      height: '25px',
      borderRadius: '25px',
      backgroundColor: isToggled ? '#D69A28' : '#eeeeee',
      cursor: 'pointer',
      position: 'relative',
      border: '1px solid #ccc',
    }}>
      <div style={{
        width: '23px',
        height: '23px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '0px',
        left: isToggled ? '25px' : '0px',
        transition: 'left 0.2s',
      }} />
    </div>
  );
};

export default ToggleSwitch;
