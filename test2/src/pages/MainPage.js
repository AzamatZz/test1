import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import TaskListPage from './TaskListPage'; // Импортируем страницу с задачами

function App() {
    const [taskText, setTaskText] = useState(''); // Состояние для текста задачи
    const [buttonState, setButtonState] = useState('default');
    const navigate = useNavigate(); // Для навигации на другую страницу

    // Функция для обновления текста задачи
    const handleChange = (e) => {
        setTaskText(e.target.value);
    };

    // Функция для добавления задачи
    const handleAddTask = () => {
        if (taskText.trim() === '') return; // Если текст пустой, не добавляем задачу
        // Пример задачи, которую вы хотите передать на страницу задач
        const tasks = [
            { id: 1, text: 'task1' },
        ];
        navigate('/tasks', { state: { tasks } }); // Переход с передачей задач
    };

    const handleMouseDown = () => setButtonState('pressed');
    const handleMouseUp = () => setButtonState('hover');
    const handleMouseLeave = () => setButtonState('default');

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <h1 className={styles.header}>TO DO</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter a task"
                        value={taskText}
                        onChange={handleChange} // Обрабатываем изменение текста
                    />
                    <button
                        className={`${styles.button} ${styles[buttonState]}`}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAddTask}
                        disabled={!taskText.trim()} // Делаем кнопку неактивной, если текст пустой
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tasks" element={<TaskListPage />} />
            </Routes>
        </Router>
    );
}

export default AppWrapper;
