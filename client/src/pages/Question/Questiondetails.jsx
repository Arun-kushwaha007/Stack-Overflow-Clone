import React, {useState} from 'react';
import moment from 'moment';
import copy from 'copy-to-clipboard'
import upvote from '../../Assets/sort-up.svg'
import downvote from '../../Assets/sort-down.svg'
import './Question.css'
import Avatar from '../../Component/Avatar/Avatar'
import Displayanswer from './Displayanswer';
import { Link } from 'react-router-dom';

const Questiondetails = () => {
  const [answer, setanswer] = useState("");
  const questionlist = null;
  return (
    
    <div className="question-details-page">
      {questionlist === null ?(
        <h1>Loading...</h1>
      ):(
        <>
        {
          questionlist.data.filter((question)=> question._id).map((question)=>(
            <div key={question._id}>
              <section className="question-details-container">
                <h1>{question.questiontitle}</h1>
                <div className="question-details-container-2">
                  <div className="question-votes">
                    <img src={upvote} width={18} className='votes-icon' onClick={handleupvote} alt="" />
                    <p>{question.upvote.length - question.downvote.length}</p>
                    <img src={downvote} width={18} className='votes-icon' onClick={handledownvote} alt="" />
                  </div>
                  <div style={{width:"100%"}}>
                    <p className="question-body">{question.questionbody}</p>
                    <div className="question-details-tags">
                      {question.questiontags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                      ))}
                    </div>
                    <div className="question-actions-user">
                      <div>
                        <button type='button' onClick={handleshare}>
                          Share
                        </button>
                        {
                          user?.result?._id === question.user._id && (
                            <button type='button' onClick={handledelete}>
                              Delete
                            </button>
                          )
                        }
                      </div>
                      <div>
                        <p>Asked {moment(question.askedon).fromNow()}</p>
                        <Link></Link>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </div>
          ))
        }
        </>
      )}
    </div>
  )
}

export default Questiondetails