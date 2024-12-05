import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Navigation = ({ account, setAccount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = [
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [imageUrls.length]);

  const backgroundImageStyle = {
    backgroundImage: `url('${imageUrls[currentIndex]}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  const disconnectHandler = () => {
    setAccount(null);
  };

  return (
    <nav style={backgroundImageStyle}>
      <div className="nav__brand">
        <h2>Cinema Theatre</h2>
        <ul className="nav__links">
          <li><a href="/">Sci-fi</a></li>
          <li><a href="/">Action</a></li>
          <li><a href="/">Drama</a></li>
          <li><a href="/">Thriller</a></li>
        </ul>
      </div>

      {account ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="nav__account">{account}</span>
          <button type="button" className="nav__connect" onClick={disconnectHandler}>
            Disconnect
          </button>
        </div>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect to Metamask
        </button>
      )}
    </nav>
  );
};

export default Navigation;