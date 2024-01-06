import React, { useState , useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddToDoListModal from './addTodoModal'

const initialItems = [
  { id: '1', title: 'Sample Task 1'  , priority: 1 },
  { id: '2', title: 'サンプルタスク 2', priority: 2 },
  { id: '3', title: 'さんぷるたすく 3', priority: 3 },
];

function TodoList() {
  const [items, setItems] = useState(initialItems);
  const [showAddModal ,setShowAddModal] = useState(false)

  const getTasks = async () => {
      const result = await fetch('/api/tasks/Todo' , { credentials : 'include'})
      
      if (!result.ok){
          alert('TODOリストの取得に失敗しました');
          return;
      }
      
      const json = await result.json();
      const tasks = json.tasks;
      
      setItems(tasks);
  }
  
  /** 初回とモーダル変更時にリスト再取得 */
  useEffect(() => {getTasks()} , [showAddModal])
  

  const handleDragEnd = (result:any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const handleSavePriority = async () => {
    items.forEach( (element , index) => {
      element.priority = index;
    });

    const result = await fetch('/api/tasks/Todo/update/bulk/' 
    ,{method : 'PUT', headers :{'Content-Type': 'application/json'} ,credentials : 'include'
      ,body :JSON.stringify(items) }
    );

    if (!result.ok){
      console.error(result)
    }
    
    const resp = await result.json()
    alert(resp.message)

    await getTasks();
  }

  return (
    <div>
      {/* ADD BUTTON AND MODAL */}
      <button onClick={() => setShowAddModal(true)}>追加</button>
      <AddToDoListModal show={showAddModal} setShow={setShowAddModal} />

      {/*  */}
      <button onClick={() => handleSavePriority()}>この順番で保存</button>

      {/* TODOLIST AREA */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={"" + item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;