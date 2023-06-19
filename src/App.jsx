import React from "react";
import { useState } from 'react';
import "/src/Contacts.css";
import axios from "axios";



const Contacts = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = async () => {
    if (!name || !mail || !text) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const message = `Name: ${name}\nMail: ${mail}\nText: ${text}`;

      const response = await axios.post(
        "https://api.telegram.org/bot6078796206:AAEq0UPzsa1wsUW0Dm0meCjWSb-AStkE_dg/sendMessage",
        {
          chat_id: "1431921953",
          text: message,
        }
      );

      console.log(response.data);

      // Очищаем поля ввода после отправки сообщения
      setName("");
      setMail("");
      setText("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cnt-main">
      <div className="contact">
        <h1 className="cnt">Contact me</h1>
        <p className="cnt-p">
          If you’d like to chat about a project please fill in the form below
          and I’ll get back <br /> within 1-2 days.
        </p>
      </div>
      <hr className="my-5 bg-light" />
      <div id="contacts" className="status">
        <p className="sts">Status</p>
        <h3 className="avb">
          Aviable <br /> I’m currently taking on new projects!
        </h3>
      </div>
      <div className="form">
        <label className="text-white">Name</label>
        <input
          className="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-white">Email</label>
        <input
          className="mail"
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label className="text-white">Message</label>
        <textarea
          className="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="send" type="submit" onClick={sendMessage}>
          Send Message
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Contacts;