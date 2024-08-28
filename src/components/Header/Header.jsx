import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full py-1 bg-gray-700 shadow-md">
      <Container>
        <nav className="flex items-center justify-between flex-wrap">
          <div className="flex items-center mb-2 sm:mb-0">
            <Link to="/">
              <Logo width="65px" />
            </Link>
          </div>
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
          <ul
            className={`${
              isOpen ? 'block' : 'hidden'
            } sm:flex space-x-2 text-white text-sm sm:text-base flex-wrap justify-center sm:justify-end w-full sm:w-auto`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate(item.slug);
                    }}
                    className="px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
