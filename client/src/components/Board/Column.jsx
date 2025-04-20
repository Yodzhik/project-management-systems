import React from 'react';
import {useDroppable} from "@dnd-kit/core";
import {Col} from "react-bootstrap";
import TaskItem from "./TaskItem.jsx";

const Column = ({board, status, t}) => {
    const {setNodeRef} = useDroppable({id: status});

    return (
        <Col ref={setNodeRef} className={'d-flex flex-column rounded bg_column h-100 border'}>
            <div className={'p-2 d-flex align-items-center justify-content-between'}>
                <span className={'m-0 mx-2 fs-5 fw-bold'}>
                    {t(`board.status.${status}`) || status}
                </span>

            </div>

            <div className={'d-flex flex-column overflow-y-auto mb-2 px-2'}>
                {board.length > 0 && board
                    ?.filter(task => task.status === status)
                    ?.map(task => (
                        <TaskItem t={t} key={task.id} task={task}/>
                    ))}
            </div>
        </Col>
    );
};

export default Column;