import { useState } from "react";
import "./passwordStyling.css";
import { IoMdRefresh, IoIosCopy } from "react-icons/io";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(10);
  const [options, setOptions] = useState({
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let characters = "";
    if (options.uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) characters += "0123456789";
    if (options.symbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    characters += "abcdefghijklmnopqrstuvwxyz"; // Always include lowercase

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error copying password:", error));
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="length-cont">
        <span>Password Length:{length}</span>
        <input
          type="range"
          min="1"
          max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <div className="check-boxes">
        <label>
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) =>
              setOptions({ ...options, uppercase: e.target.checked })
            }
          />
          Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) =>
              setOptions({ ...options, numbers: e.target.checked })
            }
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={(e) =>
              setOptions({ ...options, symbols: e.target.checked })
            }
          />
          Symbols
        </label>
      </div>
      <div className="buttons">
        <button className="generateBtn" onClick={generatePassword}>
          <IoMdRefresh />
          Generate Password
        </button>
        <button className="copyBtn" onClick={copyToClipboard}>
          <IoIosCopy />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="new-pass">
        Generated Password: <span>{password}</span>
      </p>
      <div className="copy-rights">
        ©2024 EMAD RASHAD
        <a href="https://emadrashad.com/" target="_block">
          my website
        </a>
      </div>
    </div>
  );
}

export default PasswordGenerator;
