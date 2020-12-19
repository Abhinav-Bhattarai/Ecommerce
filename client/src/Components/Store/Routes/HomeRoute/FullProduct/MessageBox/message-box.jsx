import React, { Fragment } from 'react';
import { UserIcon } from '../fullproduct';

const MessageBox = (props) => {
    return (
        <Fragment>
            <article>
                <main className='review-container'>
                <header className='review-input-container'>
                    <div className='review-input-pic'><UserIcon/></div>
                    <input className='review-input' type='text' value={props.chat_input} onChange={props.ChangeChatInput} placeholder='Ask a Question about the product'/>
                    <button className='review-send' onClick={props.SendMessageHandler}>Send</button>
                </header>
                </main>
            </article>
        </Fragment>
    )
}

export default MessageBox
