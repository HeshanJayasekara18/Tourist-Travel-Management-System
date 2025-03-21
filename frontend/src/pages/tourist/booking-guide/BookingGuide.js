import React from "react";
import "./BookingGuide.css";

const guides = [
    {
        id: 1,
        name: "Saman Kumara",
        price: "$27.00",
        languages: "English, French",
        rating: "⭐⭐⭐⭐⭐",
        image: "null"
    },
    {
        id: 2,
        name: "Natasha Fernando",
        price: "$15.00",
        languages: "English, German",
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },
    {
        id: 3,
        name: "Kamal Peter",
        price: "$10.00",
        languages: "English, German",
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },
    {
        id: 4,
        name: "Nimal Peter",
        price: "$10.00",
        languages: "English, German",
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    },

    {
        id: 4,
        name: "Nimal Peter",
        price: "$10.00",
        languages: "English, German",
        rating: "⭐⭐⭐⭐☆",
        image: "null"
    }
];

function BookingGuide() {
    return (
        <div className="guide-container rtl">
            {guides.map((guide) => (
                <div className="card" key={guide.id}>
                    <img src={guide.image} alt="Tour Guide" className="card-image" />
                    <div className="card-content">
                        <div className="rating">{guide.rating}</div>
                        <h3 className="name">{guide.name}</h3>
                        <p className="price">
                            <span className="price-value">{guide.price}</span> / Day
                        </p>
                        <p className="languages">Languages - {guide.languages}</p>
                        <button className="book-button">Book</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookingGuide;