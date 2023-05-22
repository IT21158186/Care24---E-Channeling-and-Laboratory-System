import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

//import './CSS/faq.css'

export default function Faqs() {

  const [allFaqs, setFaqs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
      function getFaqs(){
        axios.get("http://localhost:4500/faqs/").then((res)=>{
            setFaqs(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
      }
      getFaqs();
  }, [])

  //Search function
  function searchTable(allFaqs) {
    return allFaqs.filter((i) => {
      return (
        i.topic.toLowerCase().includes(searchInput.toLowerCase()) 
      );
    });
  }

  return (
    <body>
        <div class="container-faq">
            <h1 class="titl">
                Freequently Asked Questions
            </h1>
            <main class="accordion">
                <div class="faq-img">
                    <img src="img/faq.svg" alt="" class="accordion-img" />
                </div>
                <div class="content-accordion">
                    <div class="question-answer">
                        {searchTable(allFaqs).map((i, index) => {
                            return (
                                <div  key={index}>
                                    <div class="question">
                                        <h3 class="title-question">
                                            {i.topic}
                                        </h3>
                                        <button class="question-btn">
                                            <span class="up-icon">
                                                <i class="fa-solid fa-chevron-up"></i>
                                            </span>
                                            <span class="down-icon">
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="answer">
                                        <p>{i.intro}</p>
                                    </div>
                                </div>  
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
        <script src="/js/faqPage.js"></script>
    </body>
  );
}
