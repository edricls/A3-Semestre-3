import React, { useState } from 'react';
import './styles.css';
import TaskModal from './TaskModal';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(5); // Junho (os meses em JavaScript são baseados em zero)

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "" || !selectedDate) return;
    const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[key]) {
        updatedTasks[key] = [];
      }
      updatedTasks[key].push({ text: newTask, completed: false });
      return updatedTasks;
    });
    setNewTask("");
  };

  const handleDeleteTask = (taskIndex) => {
    const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[key]) {
        updatedTasks[key].splice(taskIndex, 1);
        if (updatedTasks[key].length === 0) {
          delete updatedTasks[key];
        }
      }
      return updatedTasks;
    });
  };

  const handleOpenModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevDay = () => {
    if (selectedDate > 1) {
      setSelectedDate(selectedDate - 1);
    } else if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
      setSelectedDate(new Date(currentYear, currentMonth, 0).getDate());
    } else {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
      setSelectedDate(new Date(currentYear, 12, 0).getDate());
    }
  };

  const handleNextDay = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    if (selectedDate < daysInMonth) {
      setSelectedDate(selectedDate + 1);
    } else if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
      setSelectedDate(1);
    } else {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
      setSelectedDate(1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleYearChange = (e) => {
    setCurrentYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(parseInt(e.target.value, 10));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>
          <select value={currentMonth} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select value={currentYear} onChange={handleYearChange}>
            {Array.from({ length: 7 }, (_, index) => 2024 + index).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </h2>
        <div className="navigation">
          <button onClick={handlePrevMonth}>Anterior</button>
          <button onClick={handleNextMonth}>Próximo</button>
        </div>
      </div>
      <div className="weekdays">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div key={index} className="empty"></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => {
          const date = day + 1;
          const isSelected = date === selectedDate;
          const key = `${currentYear}-${currentMonth + 1}-${date}`;
          return (
            <div
              key={date}
              className={`day ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {date}
              {tasks[key] && tasks[key].length > 0 && (
                <div className="task-cube"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova Tarefa"
        />
        <button onClick={handleAddTask} className="add-button">
          Adicionar Tarefa
        </button>
        <button onClick={handleOpenModal} className="open-modal-button">
          Abrir Tarefas do Dia
        </button>
      </div>
      {isModalOpen && (
        <TaskModal
          date={selectedDate}
          tasks={tasks[`${currentYear}-${currentMonth + 1}-${selectedDate}`] || []}
          onClose={handleCloseModal}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Calendar;