import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-yellow-500 font-bold text-2xl tracking-wider">
                DBGMI
              </span>
              <span className="text-white font-medium ml-1">TOURNAMENT</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              The premier BGMI tournament platform for Daudnagar and beyond. Join competitive
              matches, win prizes, and become a BGMI champion!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Contact Tournament Organizer:
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-yellow-500 hover:text-yellow-400"
            >
              WhatsApp <ExternalLink className="ml-1" size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
          {/* The year below updates automatically every year */}
          <p>© {new Date().getFullYear()} DBGMI Tournament. All rights reserved.</p>
          <p className="mt-2">
            <a
              href="https://www.azfaralam.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
              style={{ cursor: 'pointer' }}
            >
              Crafted with passion by <span className="font-bold">Azfar Alam</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
