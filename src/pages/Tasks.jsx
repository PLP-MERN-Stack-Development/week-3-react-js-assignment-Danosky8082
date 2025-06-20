import React, { useState, useEffect, useContext, createContext } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const filtered = tasks.filter(t => filter === 'all' || (filter === 'active' ? !t.done : t.done));

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText('');
  };
  const toggleDone = id => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input className="border p-2 rounded w-full" value={text} onChange={e => setText(e.target.value)} placeholder="New task..." />
        <Button onClick={addTask}>Add</Button>
        <Button variant="secondary" onClick={toggleTheme}>Toggle Theme</Button>
      </div>
      <div className="mt-4 space-x-2">
        {['all', 'active', 'completed'].map(f => (
          <Button key={f} variant={filter === f ? 'primary' : 'secondary'} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {filtered.map(t => (
          <Card key={t.id}>
            <div className="flex justify-between items-center">
              <span className={t.done ? 'line-through' : ''}>{t.text}</span>
              <div className="space-x-2">
                <Button variant="primary" onClick={() => toggleDone(t.id)}>Toggle</Button>
                <Button variant="danger" onClick={() => deleteTask(t.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Tasks />
    </ThemeContext.Provider>
  );
};
