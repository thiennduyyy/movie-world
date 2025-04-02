'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GenresContext } from '@/lib/genresProvider';
import { FiSearch, FiX } from 'react-icons/fi';
import Link from 'next/link';

const navList = [
  { name: 'Home', path: '/' },
  { name: 'TV shows', path: '/tv' },
  { name: 'Movies', path: '/movies' }
];

function Nav() {
  const [showSearch, setShowSearch] = useState(false);
  const genresContext = useContext(GenresContext);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLFormElement>(null);
  const [search, setSearch] = useState('');
  const [show, handleShow] = useState(false);

  if (!genresContext) {
    console.error('GenresContext is not provided');
    throw new Error('GenresContext must be used within a GenresProvider');
  }
  const { tab, setTab } = genresContext;

  const handleTab = (item: string) => {
    setTab(item);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    setTab('Movies');
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setShowSearch(false);
  };

  const clearSearch = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const transitionNavBar = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  useEffect(() => {
    if (pathname === '/tv') {
      setTab('TV shows');
    } else if (pathname === '/movies') {
      setTab('Movies');
    } else if (pathname === '/') {
      setTab('Home');
    }
  }, [pathname, setTab]);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  return (
    <nav 
      className={`
        fixed w-full z-50 transition-all duration-500 ease-in
        ${show ? 'border-b border-[#444444] border-opacity-100 backdrop-blur-[15px]' : 'bg-gradient-to-b from-black/80 to-transparent'}
        flex items-center justify-between px-4 md:px-8 py-3 space-x-2 md:space-x-8
      `}
    >
      <Link href={"/"} className='flex items-end space-x-1'>
        <img
          className="w-12" src="/movie-icon.png" alt="Netflix_logo" />
        <h2 className="text-red-600 text-xl font-bold cursor-pointer">
          Movieworld
        </h2>
      </Link>
      <ul className="hidden md:flex items-center space-x-10">
        {navList.map((item) => (
          <li key={item.name}>
            <Link 
            prefetch={true}
              href={item.path}
              onClick={() => handleTab(item.name)}
              className={`
                cursor-pointer text-lg font-medium transition-all duration-300
                hover:text-red-500 relative py-2 inline-block
                ${tab === item.name ? 'text-red-500' : 'text-gray-200'}
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-full after:h-0.5 after:bg-red-600 
                after:transform after:scale-x-0 after:transition-transform
                after:duration-300 ${tab === item.name ? 'after:scale-x-100' : ''}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <form
          ref={searchContainerRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={`
            relative flex items-center
            ${showSearch ? 'w-[280px] md:w-[320px]' : 'w-10'}
            transition-all duration-300 ease-in-out
          `}
        >
          <div
            
            className={`
              absolute inset-0 rounded-full overflow-hidden
              ${showSearch ? 'bg-black/60 shadow-[0_0_15px_rgba(255,50,50,0.4)]' : ''}
              transition-all duration-300
              ${showSearch ? 'border border-red-500/50' : ''}
            `}
          />
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            type="button"
            className={`
              relative z-10 p-2.5 text-red-400 hover:text-red-300
              transition-colors duration-300 rounded-full
            `}
          >
            <FiSearch className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies, TV shows..."
            className={`
              relative z-10 w-full bg-transparent text-white placeholder-gray-300
              text-sm py-2 px-1 outline-none transition-all duration-300
              ${showSearch ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
            `}
          />
          {showSearch && search && (
            <button
              type="button"
              onClick={clearSearch}
              className="relative z-10 p-2 text-red-300 hover:text-white 
                transition-colors duration-200 mr-1 rounded-full hover:bg-red-500/30"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
          {showSearch && (
            <div className="absolute bottom-0 left-[40px] right-4 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"></div>
          )}
        </form>
        <div className="h-10 w-10 rounded-md overflow-hidden border-2 border-transparent hover:border-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          <img
            src="/avatar.webp"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;