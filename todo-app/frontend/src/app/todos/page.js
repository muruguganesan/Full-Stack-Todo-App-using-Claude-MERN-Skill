'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const priorityColors = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos');
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const { data } = await api.post('/todos', form);
      setTodos([data, ...todos]);
      setForm({ title: '', description: '', priority: 'medium' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create todo');
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const { data } = await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === todo._id ? data : t));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
        <p className="text-gray-500 text-sm mt-1">
          {completedCount} of {todos.length} tasks completed
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
          <button className="ml-2 underline" onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      {/* Add Todo Form */}
      <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Add New Todo</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3 items-center">
            <select
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <button
              type="submit"
              className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium transition text-sm"
            >
              + Add Todo
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white border text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📋</div>
          <p>{filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos.`}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map(todo => (
            <div
              key={todo._id}
              className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4 transition ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
                className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{todo.description}</p>
                )}
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1.5 font-medium ${priorityColors[todo.priority]}`}>
                  {todo.priority}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-gray-300 hover:text-red-500 transition text-lg leading-none"
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Stats footer */}
      {todos.length > 0 && (
        <div className="mt-4 text-center text-xs text-gray-400">
          {todos.length - completedCount} items left
        </div>
      )}
    </div>
  );
}
