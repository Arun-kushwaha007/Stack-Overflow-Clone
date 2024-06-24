import React,{useState} from 'react';
import './Askquestion.css'
import { useNavigate } from 'react-router-dom';


const Askquestion = () => {
    const navigate = useNavigate();
    const user= 1;
    const [questiontitle, setquestiontitle] = useState("");
    const [questionbody, setquestionbody] = useState("");
    const [questiontags,setquestiontags] = useState("");

    const handlesubmit = (e)=>{
        e.preventDefault();
        if(user){
            if(questionbody && questiontitle && questiontags){
                alert("you have successfuly posted a question")
            }else{
                alert("Please enter all the fiels")
            }
        }else{
            alert("Login to ask question")
        }
    }

    const handleenter=(e)=>{
        if(e.code === 'Enter'){
            setquestionbody(questionbody + "\n");
        }
    }

  return (
    <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handlesubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specif and imagin you're asking a question to another person</p>
                        <input type="text" id='ask-ques-title'onChange={(e)=>{
                            setquestiontitle(e.target.value);
                        }} placeholder='e.g. Is there an R function for finding the index of an element in a vector ?' />
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea name="" id="ask-ques-body" onChange={(e)=>{
                            setquestionbody(e.target.value)
                        }}
                        cols="30"
                        rows="10"
                        onKeyDown={handleenter}
                        ></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text"  id='ask-ques-tags' onChange={(e)=>{
                            setquestiontags(e.target.value.split(" "));

                        }}
                        placeholder='e.g. html typescript wordpress'
                        />
                    </label>
                </div>
                <input type="submit"
                value="Review your question" className='review=btn' />
            </form>
        </div>
    </div>
  )
}

export default Askquestion