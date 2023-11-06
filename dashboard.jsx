// src/Dashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { getDeptTickets, reset } from "../../features/ticket/ticketSlice";
import { logout } from "../../features/dept/deptSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dept } = useSelector((state) => state.dept);
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );

  const [selectedLocation, setSelectedLocation] = useState("All"); // Initialize with 'All' to show all complaints
  const [ticketss, setTickets] = useState(tickets);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!dept) {
      navigate("/deptlogin");
    }

    dispatch(getDeptTickets());

    return () => {
      dispatch(reset());
    };
  }, [dept, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTickets = ticketss.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);

    if (location === "All") {
      setTickets(tickets);
    } else {
      const filteredTickets = tickets.filter(
        (ticket) => ticket.location === location
      );
      setTickets(filteredTickets);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-white">
        Ticket Dashboard
      </h1>

      {/* Location Filter Dropdown */}
      <div className="mb-4">
        <label className="text-white font-semibold">Filter by Location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="All">All</option>
          {/* Generate options from unique locations in tickets */}
          {Array.from(new Set(ticketss.map((ticket) => ticket.location))).map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            )
          )}
        </select>
      </div>

      <table className="table-auto w-full bg-white bg-opacity-80 rounded-md">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-4 py-2">Ticket</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Complaint</th>
          </tr>
        </thead>
        <tbody>
          {ticketss.map((ticket) => (
            <tr key={ticket._id}>
              <td className="px-4 py-2">{ticket.id}</td>
              <td className="px-4 py-2">
                <select
                  value={ticket.status}
                  id={ticket._id}
                  onChange={(e) =>
                    handleStatusChange(ticket._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="Pending" className="text-red-500">
                    Pending
                  </option>
                  <option value="In Progress" className="text-yellow-500">
                    In Progress
                  </option>
                  <option value="Closed" className="text-green-500">
                    Closed
                  </option>
                </select>
              </td>
              <td className="px-4 py-2">{ticket.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={logoutHandler}
        className="mx-2 my-5 rounded-xl px-2 py-2 bg-black text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
