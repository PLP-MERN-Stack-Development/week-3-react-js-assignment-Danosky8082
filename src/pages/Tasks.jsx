import React, { useState, useEffect, useContext, createContext } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const { toggleTheme } = useContext(ThemeContext);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newEntry = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newEntry]);
    setNewTask('');
  };

  const handleToggleComplete = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="border p-2 rounded w-full"
        />
        <Button onClick={handleAddTask}>Add</Button>
        <Button variant="secondary" onClick={toggleTheme}>Toggle Theme</Button>
      </div>
      <div className="space-x-2 mb-4">
        {['all', 'active', 'completed'].map(status => (
          <Button
            key={status}
            variant={filter === status ? 'primary' : 'secondary'}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {filteredTasks.map(task => (
          <Card key={task.id}>
            <div className="flex justify-between items-center">
              <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
              <div className="space-x-2">
                <Button variant="primary" onClick={() => handleToggleComplete(task.id)}>Toggle</Button>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TasksPage = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TaskManager />
    </ThemeContext.Provider>
  );
};

export default TasksPage;
