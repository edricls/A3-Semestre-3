import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './styles.css';

const TaskModal = ({ date, tasks, onClose, onPrevDay, onNextDay, onDeleteTask }) => {
  const modalRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const takeScreenshot = async () => {
    if (modalRef.current) {
      const canvas = await html2canvas(modalRef.current);
      const imgData = canvas.toDataURL('image/png');
      setScreenshot(imgData);
    }
  };

  return (
    <div className="task-modal">
      <div className="modal-content" ref={modalRef}>
        <h2>Tarefas dia {date}</h2>
        <div className="button-container">
          <button onClick={onPrevDay}>Dia Anterior</button>
          <button onClick={onNextDay}>Próximo Dia</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id || index} className={task.completed ? 'completed' : ''}>
              {task.text}
              <button onClick={() => onDeleteTask(index)} className="delete-button">Excluir</button>
            </li>
          ))}
        </ul>
        <button onClick={takeScreenshot} className="screenshot-button">Compartilhar</button>
        {screenshot && (
          <div className="screenshot-container">
            <h3>Captura de Tela:</h3>
            <img src={screenshot} alt="Screenshot" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;