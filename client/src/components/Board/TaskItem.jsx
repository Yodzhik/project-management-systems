import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {useDraggable} from "@dnd-kit/core";
import Task from "../Task/Task.jsx";

const TaskItem = ({task, t, isOverlay = false}) => {
    const [showTaskModal, setShowTaskModal] = useState(false);

    const handleOpenTaskModal = () => setShowTaskModal(true);
    const handleCloseTaskModal = () => setShowTaskModal(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: task.id,
    });

    if (isDragging && !isOverlay) return null;

    const style = isOverlay
        ? {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: 0.95,
            cursor: 'grabbing',
        }
        : {
            transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            opacity: 1,
            cursor: 'grab',
        };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'danger';
            case 'Medium':
                return 'warning';
            case 'Low':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <>
            <Card
                ref={setNodeRef}
                style={style}
                className="mb-2"
            >
                <Card.Body onClick={(e) => handleOpenTaskModal(e)} className={'p-2'}>
                    <div className={'w-100'}>
                        <div className={'d-flex justify-content-between align-items-center w-100'}>
                            <div className={'mb-2'}>
                                 <span
                                     {...listeners}
                                     {...attributes}
                                     className="me-2"
                                     style={{cursor: 'grab'}}
                                     onClick={(e) => e.stopPropagation()}
                                 >
                                     <i className="bi bi-grip-vertical"/>
                                 </span>
                                <i
                                    title={t('board.priority') + ': ' + task?.priority}
                                    className={`bi bi-record-circle me-2 text-${getPriorityColor(task?.priority)}`}
                                />
                                <span className={'text-muted'}>#{task.id}</span>
                            </div>
                            {task?.assignee?.avatarUrl && (
                                <img
                                    src={task?.assignee.avatarUrl}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '18px', height: '18px'}}
                                    title={task?.fullName}
                                />
                            )}
                        </div>
                        <div>
                            <span className="line-clamp">{task.title}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {showTaskModal &&
                <Task show={showTaskModal} close={handleCloseTaskModal} taskId={task.id}/>
            }
        </>

    );
};

export default TaskItem;