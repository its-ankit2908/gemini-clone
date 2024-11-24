import React, { useContext, useState } from "react";

//import assets
import { assets } from "../../assets/assets";

// import style
import "./sidebar.css";
import { Context } from "../../context/Context";

export const SideBar = () => {
  const [extended, setExtended] = useState(false);

  const { onSent, prevPrompts, setRecentPrompt,newChat} = useContext(Context);


  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }



  return (
    <>
      <div
        className="sidebar"
        style={
          extended
            ? { transition: "1s ease-in" }
            : { transition: "1s ease-out" }
        }
      >
        <div className="top">
          <img
            className="menu"
            src={assets.menu_icon}
            alt="Menu icon"
            style={{ width: "30px" }}
            onClick={() => setExtended(!extended)}
          />
          <div className="new-chat" onClick={() => newChat()}>
            <img src={assets.plus_icon} alt="plus icon" />
            {extended ? <p>New Chat</p> : null}
          </div>

          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => {
                return (
                  <>
                    <div className="recent-entry" key={index} onClick={() => loadPrompt(item)}>
                      <img src={assets.message_icon} alt="message icon" />
                      <p>{item.slice(0,18)}...</p>
                    </div>
                  </>
                );
              })}
              
            </div>
          ) : null}
        </div>

        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question_icon" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history_icon" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="setting_icon" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
