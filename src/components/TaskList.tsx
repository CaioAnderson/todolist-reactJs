import { useState } from 'react';
import { FiTrash, FiPlus, FiCheckSquare } from 'react-icons/fi';

import { Modal } from './Modal';

import '../styles/tasklist.scss';

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}


export function TaskList() {

    const [openModal, setOpenModal] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    function handleCreateNewTask() {

        if (newTaskTitle !== '') {
            const id = Date.now();
            const newTask = {
                id,
                title: newTaskTitle,
                isComplete: false
            }

            const task = [...tasks, newTask];
            setTasks(task);
            setNewTaskTitle('');
            setOpenModal(!openModal);

        }

    }

    function handleToggleTaskCompletion(id: number) {

        //copiando lista de tasks
        const taskCopy = [...tasks];

        //Pegando valores da lista pelo id
        const findTask = taskCopy.find(task => task.id === id) as Task;

        //Retornando indice da task que quero editar
        const indexTaskToEdit = taskCopy.findIndex(task => task.id === id);

        //Atualizando lista pelo indice da task
        taskCopy.splice(indexTaskToEdit, 1, { id: findTask.id, title: findTask.title, isComplete: !findTask.isComplete });

        //salvando task
        setTasks(taskCopy);

    }

    function handleRemoveTask(id: number) {
        const taskCopy = [...tasks];
        const indexTaskToDelete = taskCopy.findIndex(task => task.id === id);

        taskCopy.splice(indexTaskToDelete, 1);

        setTasks(taskCopy);

    }


    return (
        <section className="task-list">
            <main>
                <ul>
                    {tasks.length === 0 && (
                        <div className="empty">
                            <h2>Sem to.do's para completar</h2>
                        </div>
                    )}

                    {tasks.map(task => (
                        <li key={task.id}>
                            <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={task.isComplete}
                                        onClick={() => handleToggleTaskCompletion(task.id)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{task.title}</p>
                            </div>

                            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}

                </ul>
            </main>

            <div className="add-todo-list">
                <button type='button' onClick={() => setOpenModal(true)}>
                    <FiPlus size={40} />
                </button>
            </div>

            {openModal ? (
                <Modal onClose={() => setOpenModal(false)}>
                    <section>
                        <h3>Adicione seu to.do list</h3>

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder='Digite aqui...'
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                value={newTaskTitle}
                            />
                            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
                                <FiCheckSquare size={16} color="#fff" />
                            </button>
                        </div>
                    </section>
                </Modal>
            ) : (null)}

        </section>

    )
}