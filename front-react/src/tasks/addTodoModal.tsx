import { useState } from 'react'
import './todoListModal.css'

interface Props{
    setShow : Function
    show : boolean
}
export default function AddTodoModal(props :Props){
    const [titleTxt , setTitleTxt] = useState('')

    const handlePutTodo = async () =>{
        const result = await fetch('/api/tasks/Todo/new' ,{ method : 'PUT' ,headers :{'Content-type':'application/json'} ,credentials : "include" ,body: JSON.stringify({title :titleTxt})})
        const resp = await result.json()
        alert(resp.message)
    }

    return (
        <div className='modal'>
            {props.show ? 
                <div className="overlay">
                    <div className="content">
                        <p>追加するタスクのタイトルを記入してください</p>
                        <p><label htmlFor='title'>タイトル</label><input type='text' id='title' value={titleTxt} onChange={(event) => setTitleTxt(event.target.value)} /></p>
                        <p><button onClick={handlePutTodo}>タスク追加</button></p>
                        <p><button onClick={() => props.setShow(false)}>close</button></p>
                    </div>
                </div>
            : null }
        </div>
    )
}