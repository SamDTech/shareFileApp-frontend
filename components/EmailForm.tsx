import axios from "axios";
import React, { FormEvent, useState } from "react";

const EmailForm: React.FC<{ id }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/files/email", {
        id,
        emailTo,
        emailFrom,
      });

      setMessage(data.message);
      setEmailFrom("");
      setEmailTo("");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center p-2 space-y-3">
      <h3>You can also send the file through mail</h3>

      <form
        className="flex flex-col items-center w-full justify-center p-2 space-y-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="bg-gray-800 text-white p-1 border-2 focus:outline-none my-2"
          placeholder="Email From"
          value={emailFrom}
          required
          onChange={(e) => setEmailFrom(e.target.value)}
        />
        <input
          type="email"
          value={emailTo}
          className="bg-gray-800 text-white p-1 border-2 focus:outline-none my-2"
          placeholder="Email To"
          required
          onChange={(e) => setEmailTo(e.target.value)}
        />
        <button
          type="submit"
          className="button px-5  py-2 my-2 bg-gray-900 rounded button w-44 focus:outline-none"
        >
          Email
        </button>
      </form>

      {message && <p className="font-medium text-red-500">{message}</p>}
    </div>
  );
};

export default EmailForm;
