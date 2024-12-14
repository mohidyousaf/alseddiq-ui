const Logo = props => {
  return (
    <img
      // src="public/images/assets/logo4.jpeg" // Replace with the actual image path
      // alt="Alseddiq Labs Logo"
      style={{ height: '30px', objectFit: 'contain' }} // Adjust size as needed
      {...props}
    />
  );
};

export default Logo;
