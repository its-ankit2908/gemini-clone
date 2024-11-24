import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    // create state for the prompt as input
    const [input,setInput] = useState("");
    
    // to store the data of recent prompt
    const [recentPrompt,setRecentPrompt] = useState("");

    // to store the data of our previous prompts
    const [prevPrompts,setprevPrompts] = useState([]);

    // flag to show results
    const [showResult,setShowResult] = useState(false);

    // flag to handle loading
    const [loading,setLoading] = useState(false);

    // flag to handle result data
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev + " " + nextWord);
        },75*index);
    }

    const newChat = () => {
        setLoading(false);
        showResult(false);

    }

    
    const onSent = async (prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response = "";
        if(prompt != undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);

        }else{

            setprevPrompts(prev => [...prev,input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        
        let responseArr = response.split("**");
        let newResponse = "";

        //todo: here we replace the ** <word> ** with the bold word
        for(let i=0; i< responseArr.length; i++){
            
            if(i === 0 || i%2 == 0 ){
                newResponse += responseArr[i];
            }else{
                newResponse += "<b>"+responseArr[i]+"</b>";
            }
        }

        //todo: here we relace * with the next line 
        let newResponse2 = newResponse.split("*").join("</br>");

        let newResponseArray = newResponse2.split(" ");
        for(let i =0;i < newResponseArray.length;i++){

            delayPara(i,newResponseArray[i]);
        }

        // setResultData(newResponse2);


        setLoading(false);
        setInput(""); // reset the input prompt
        
    }

    // onSent("What is react js")
    
    const contextValue = {
      prevPrompts,
      setprevPrompts,
      onSent,
      recentPrompt,
      setRecentPrompt,
      loading,
      setLoading,
      resultData,
      input,
      setInput,
      showResult,
      newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;