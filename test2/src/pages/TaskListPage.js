import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './TaskListPage.module.scss';

function TaskListPage() {
    const { state } = useLocation(); // Получаем переданные данные через state
    const [tasks, setTasks] = useState(state && state.tasks ? state.tasks : [{ id: 1, text: 'task1' }]); // Начинаем с одной задачи
    const [taskText, setTaskText] = useState(''); // Состояние для нового текста задачи
    const [editingIndex, setEditingIndex] = useState(null); // Индекс редактируемой задачи
    const [editedTaskText, setEditedTaskText] = useState(''); // Новый текст задачи для редактирования
    const navigate = useNavigate(); // Для навигации на главную страницу

    // Функция для удаления задачи
    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);

        // Если задач больше нет, переходим на главную страницу
        if (updatedTasks.length === 0) {
            navigate('/'); // Переход на главную страницу
        }
    };

    // Функция для начала редактирования задачи
    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedTaskText(tasks[index].text); // Заполняем инпут текущим текстом задачи
    };

    // Функция для сохранения отредактированной задачи
    const handleSaveEdit = (index) => {
        if (editedTaskText.trim() === '') return; // Не сохраняем, если текст пустой
        const updatedTasks = [...tasks];
        updatedTasks[index].text = editedTaskText; // Обновляем текст задачи
        setTasks(updatedTasks);
        setEditingIndex(null); // Завершаем редактирование
        setEditedTaskText(''); // Очищаем поле редактирования
    };

    // Функция для добавления новой задачи
    const handleAddTask = () => {
        if (taskText.trim()) {
            const newTask = {
                id: Date.now(), // Генерация уникального ID
                text: taskText,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setTaskText(''); // Очищаем поле ввода
        }
    };

    // Функция для очистки всех задач
    const handleClearAll = () => {
        setTasks([]); // Удаляем все задачи
        navigate('/'); // Переходим на главную страницу
    };

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.header}>TO DO</h1>
            <div className={styles.pageWrapper2}>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Task 1"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)} // Обновляем состояние при вводе
                    />
                    <div className={styles.inputContainer2}>
                        <button
                            className={styles.button}
                            onClick={handleAddTask}
                            disabled={!taskText.trim()} // Отключаем кнопку, если поле пустое
                        >
                            Add
                        </button>
                        <div className={styles.actions}>
                            <button
                                className={styles.button}
                                onClick={handleClearAll} // Очищаем все задачи и переходим на главную страницу
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                </div>

                <div className={styles.taskListContainer}>
                    <div className={styles.taskContainer}>
                        {tasks.map((task, index) => (
                            <div key={task.id} className={styles.taskItem}>
                                {editingIndex === index ? (
                                    // Если задача редактируется, показываем инпут
                                    <>
                                        <input
                                            type="text"
                                            value={editedTaskText}
                                            onChange={(e) => setEditedTaskText(e.target.value)} // Обновляем текст задачи
                                            className={styles.input}
                                        />
                                        <button className={styles.button} onClick={() => handleSaveEdit(index)}>
                                            Save
                                        </button>
                                        <button
                                            className={styles.button}
                                            onClick={() => {
                                                setEditingIndex(null); // Отмена редактирования
                                                setEditedTaskText('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    // Если задача не редактируется, показываем обычный текст с кнопками
                                    <>
                                        <input
                                            type="text"
                                            value={task.text}
                                            readOnly
                                            className={styles.input}
                                        />
                                        <button
                                            className={`${styles.button} ${styles.editButton}`}
                                            onClick={() => handleEdit(index)} // Начало редактирования
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${styles.button} ${styles.deleteButton}`}
                                            onClick={() => handleDelete(task.id)} // Удаление задачи
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TaskListPage;
