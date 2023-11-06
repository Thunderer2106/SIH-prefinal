import React, { useState, useEffect } from "react";
import ticket from "./Ticket";
import countries from "./data";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../../features/user/userSlice";

import {
  setTicket,
  getUserTickets,
  reset,
} from "../../features/ticket/ticketSlice";

function CreateTicket({ TicketID, Status, Description }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div
      className={`flex items-center p-3 border rounded-lg ${
        isMouseOver ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
      }`}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="flex flex-col">
        <button
          onClick={toggleDescription}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <span className="font-semibold text-lg">
            #{TicketID} - {Status}
          </span>
          <img src="/images/down-arrow.png" alt="arrow" className="h-4" />
        </button>
        {showDescription && (
          <div className="mt-2 bg-white border rounded-lg p-4">
            <p className="text-gray-800">{Description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CenterPortion() {
  const [selectedLanguage, setSelectedLanguage] = useState("en-GB");

  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [translatedText, setTranslatedText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const [ticketss, setTickets] = useState([]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/userlogin");
    }
    dispatch(getUserTickets);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const [randomNumber, setRandomNumber] = useState(null);
  function generateRandomNumber() {
    const min = 10000; // Minimum five-digit number
    const max = 99999; // Maximum five-digit number
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(random);
    return random;
  }

  const setUserTicket = async (e) => {
    e.preventDefault();
    generateRandomNumber();
    const id = generateRandomNumber();
    const formData = { text: inputText, id: id };

    await dispatch(setTicket(formData));
  };

  const handleTranslate = () => {
    if (!inputText) return;

    const apiUrl = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${selectedLanguage}|en-GB`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.responseData && data.responseData.translatedText) {
          const newTranslatedMessage = {
            text: data.responseData.translatedText,
            type: "bot",
          };
          setChatMessages([...chatMessages, newTranslatedMessage]);
          setInputText("");
          setTranslatedText(data.responseData.translatedText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="bg-black text-white w-full md:w-1/4 p-4 space-y-4">
        <p className="text-2xl font-semibold">Your Phone Number: XXXXX XXXXX</p>
        <div className="space-y-2">
          {ticketss.map((t) => (
            <CreateTicket key={t.TicketID} {...t} />
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-3/4 p-4">
        <div className="mb-4">
          <label
            htmlFor="languageSelect"
            className="text-2xl font-semibold text-black"
          >
            Select Language:
          </label>
          <select
            id="languageSelect"
            className="form-select w-full md:w-1/4 p-2 rounded-lg"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {Object.entries(countries).map(([country_code, country_name]) => (
              <option key={country_code} value={country_code}>
                {country_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="inputText"
            className="text-2xl font-semibold text-black"
          >
            Input Text:
          </label>
          <div className="relative">
            <textarea
              id="inputText"
              className="w-full h-32 p-2 border rounded-lg"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
            ></textarea>
            <button
              className="absolute right-2 bottom-2 bg-gray-600 text-white py-2 px-4 rounded-lg"
              onClick={setUserTicket}
            >
              Send
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="outputText"
            className="text-2xl font-semibold text-black"
          >
            Translated Text:
          </label>
          <div
            id="outputText"
            className="w-full p-2 border rounded-lg bg-gray-100"
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.type === "bot"
                    ? "text-left text-black"
                    : "text-right text-black"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterPortion;
