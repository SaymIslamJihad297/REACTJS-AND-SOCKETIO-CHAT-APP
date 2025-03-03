import React, { useEffect, useState } from "react";
import SideBar from "../includes/SideBar.jsx";
import SearchBar from "../includes/SearchBar.jsx";
import Group from "../includes/UserGroup.jsx";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function Home() {
    const [message, setMessage] = useState(""); // Input field state
    const [receivedMessages, setReceivedMessages] = useState([]); // Array of messages
    const [userSocketId, setUserSocketId] = useState(""); // Current user's socket ID

    // Send Message
    const sendMessage = (e) => {
        e.preventDefault(); // Prevent default form behavior

        if (message.trim() === "") return; // Prevent empty messages

        const msgData = {
            id: socket.id, // Sender's socket ID
            message,
        };

        socket.emit("message", msgData); // Send message with socket ID
        setMessage(""); // Clear input
    };

    // Socket event listeners
    useEffect(() => {
        socket.on("connect", () => {
            console.log("✅ Connected to server with ID:", socket.id);
            setUserSocketId(socket.id); // Store user's socket ID
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from server");
        });

        // Receiving messages
        socket.on("receive-message", (msgData) => {
            setReceivedMessages((prevMessages) => [...prevMessages, msgData]); // Append message
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("receive-message");
        };
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar />

            {/* Left Section */}
            <div className="h-screen bg-[#EFF6FC] w-1/5">
                <SearchBar />

                {/* Groups */}
                <div className="bg-white w-full p-3 h-64 rounded-2xl shadow mt-10">
                    <h1>Groups</h1>
                    <div className="overflow-scroll h-full overflow-x-hidden">
                        <Group />
                        <Group />
                        <Group />
                        <Group />
                    </div>
                </div>

                {/* People */}
                <div className="bg-white w-full p-3 h-64 rounded-2xl shadow mt-10">
                    <h1>People</h1>
                    <div className="overflow-scroll h-full overflow-x-hidden">
                        <Group />
                        <Group />
                        <Group />
                        <Group />
                    </div>
                </div>
            </div>

            {/* Chat Dashboard */}
            <div className="bg-white shadow-2xl shadow-black rounded-2xl w-[60%] relative left-30 flex flex-col">
                {/* Chat Header */}
                <div className="flex justify-between mx-5 mt-5 border-b-2 border-black">
                    <div className="flex">
                        <img
                            src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg"
                            className="h-16 rounded-full"
                            alt=""
                        />
                        <div>
                            <h3>Anil</h3>
                            <p>Online - &nbsp;</p>
                        </div>
                        <p className="mt-auto relative bottom-4 font-extralight text-sm">Last seen, 2.02pm</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <i className="fa-solid fa-phone"></i>
                        <i className="fa-solid fa-camera-retro"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>

                {/* Message Container */}
                <div className="h-96 overflow-y-auto border p-2 mb-3 flex flex-col">
                    {receivedMessages.length > 0 ? (
                        receivedMessages.map((msgData, index) => (
                            <p
                                key={index}
                                className={`p-2 rounded mb-2 ${msgData.id === userSocketId
                                    ? "bg-green-300 text-right"
                                    : "bg-blue-300"
                                    }`}
                            >
                                <span className="text-sm text-gray-600 flex">
                                    <img
                                        src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg"
                                        className="h-5 rounded-full"
                                        alt=""
                                    />
                                    {msgData.id}:
                                </span>{" "}
                                {msgData.message}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet...</p>
                    )}
                </div>

                {/* Message Input */}
                <form onSubmit={sendMessage} className="flex mt-auto border-2 border-black">
                    <input
                        type="text"
                        placeholder="Message"
                        className="py-3 w-full px-2 outline-none"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button type="submit" className="py-3 w-fit px-3 border">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
