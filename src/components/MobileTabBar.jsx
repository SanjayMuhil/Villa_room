import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHouse, FaHotel, FaCalendarCheck, FaAddressBook } from 'react-icons/fa6';

export default function MobileTabBar() {
  return (
    <nav className="mobile-tab-bar" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `mobile-tab-item ${isActive ? 'active' : ''}`}
      >
        <FaHouse />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/villas"
        className={({ isActive }) => `mobile-tab-item ${isActive ? 'active' : ''}`}
      >
        <FaHotel />
        <span>Villas</span>
      </NavLink>

      <NavLink
        to="/book"
        className={({ isActive }) => `mobile-tab-item ${isActive ? 'active' : ''}`}
      >
        <FaCalendarCheck />
        <span>Book</span>
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) => `mobile-tab-item ${isActive ? 'active' : ''}`}
      >
        <FaAddressBook />
        <span>Contact</span>
      </NavLink>
    </nav>
  );
}
