import { useState } from 'react';
import '../index.css'

function Navbar(props) {
  const [activePage, setActivePage] = useState('File Input');

  return (
    <nav className="bg-light-primary flex justify-between items-center px-6 py-4">
      <div className="text-main-primary font-bold text-lg">NavAid.</div>
      <div className="flex items-center">
        <button
          className={`mr-4 text-white ${
            activePage === 'File Input' ? 'underline' : ''
          }`}
          onClick={() => 
            {
              setActivePage('File Input');
              props.onChoosePage("File Input");
            }}
        >
          File Input
        </button>
        <button
          className={`text-white ${
            activePage === 'Google Maps' ? 'underline' : ''
          }`}
          onClick={() => 
            {
              setActivePage('Google Maps');
              props.onChoosePage("Google Maps");
            }}
        >
          Google Maps
        </button>
      </div>
    </nav>
  );
}

export default Navbar;