import React, {useState}  from 'react'

function ToDoList() {

    const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        // funzione per gestire quello che viene inserito nell'input

        setNewTask(event.target.value); /*con questa funzione possiamo scrivere nell'input*/
    }

    function addTask() {
        // funzione per aggiungere una task alla lista

        if(newTask.trim() !== ""){  /*usando trim rimuovo tutti gli spazi bianchi, 
                                    se dopo averli levati non è vuota allora aggiunge una task.
                                    questo previene che venga aggiunta una task vuota al click*/

            // uso una update f tramite una arrow f, chiamo "tasks" con la prima lettera e spreaddo il mio array
            setTasks(t => [...t, newTask]);
            // una volta aggiunta la task, resetto il campo
            setNewTask("");
        }
    }

    function deleteTask(index) {
        // funzione per eliminare una task

        // filtro il mio array
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

    }

    function moveTaskUp(index) {
        // funzione per spostare la task in sù nella lista

        // se l'elemtno ha index 0 non può andare sopra
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        // funzione per spostare la task in giù nella lista
        
        // l'ultimo elemento non può andare sotto
        if(index < tasks.length -1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
        <div className='to-do-list'>
            <h1>To Do</h1>
            <div>
                <input 
                    type="text" 
                    placeholder='Enter a task...' 
                    value={newTask} 
                    onChange={handleInputChange}/>
                <button 
                    className='add-btn'
                    onClick={addTask}>
                    Add Task
                </button>
            </div>

            <ol>
               {tasks.map((task, index) =>
            //    aggiungo l'attributo key alla <li> (index, id etc) perchè lo vuole react
                <li key={index}> 
                        <span className='text'>{task}</span>
                        <button
                            className='delete-btn'
                            // passo come param l'index della task che voglio eliminare e uso una arrow f altimenti la funzione verrebbe chiamata subito
                            onClick={() => deleteTask(index)}>
                            ❌
                        </button>
                        <button
                            className='move-btn'
                            onClick={() => moveTaskUp(index)}>
                            ⬆️
                        </button>
                        <button
                            className='move-btn'
                            onClick={() => moveTaskDown(index)}>
                            ⬇️ 
                        </button>
                    </li>
                )} 
            </ol>

        </div>
    );
}

export default ToDoList