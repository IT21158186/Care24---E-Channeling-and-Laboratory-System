import React from "react";
export default function Footer({ name, email, phone }) {
    return (
        <>
            <footer className="footer border-t-2 border-gray-300 pt-5">
            <ul className="flex flex-wrap items-center justify-center">
                <li>
                    <span className="font-bold">Your name: </span> {name}
                </li>
                <li>
                    <span className="font-bold">Email: </span> {email}
                </li>
                <li>
                    <span className="font-bold">Phone: </span> {phone}
                </li>
            </ul>
            </footer>
        </>
    )
}