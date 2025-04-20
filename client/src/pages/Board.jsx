import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {getBoardApi, updateTaskStatusApi} from "../components/Board/api/api.js";
import {useParams} from "react-router-dom";
import {Row} from "react-bootstrap";
import Column from "../components/Board/Column.jsx";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors, DragOverlay
} from "@dnd-kit/core";
import TaskItem from "../components/Board/TaskItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatus, setBoard, setBoards} from "../redux/reducers/boards.js";
import {getBoardsApi} from "../components/Boards/api/api.js";
import MainProvider from "../services/Providers/MainProvider.jsx";

const statuses = {
    Backlog: 'Backlog',
    InProgress: 'InProgress',
    Done: 'Done'
};

const Board = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const board = useSelector(state => state.boards.board);
    const boards = useSelector(state => state.boards.boards);
    const [activeTask, setActiveTask] = useState(null);

    const getBoard = async (id) => {
        try {
            const res = await getBoardApi(id);
            dispatch(setBoard(res.data.data));
        } catch (e) {
            console.log(e.message);
            toast.error(t('errors.boardError'));
        }
    };

    const handleChangeStatus = async (id, status) => {
        try {
            await updateTaskStatusApi(id, {status: status});
        } catch (e) {
            console.log(e.message);
            toast.error(t('errors.statusError'));
        }
    };

    const getBoards = async () => {
        try {
            const res = await getBoardsApi()
            dispatch(setBoards(res.data.data))
        } catch (e) {
            console.log(e.message)
            toast.error(t('errors.boardsError'))
        }
    }

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = (event) => {
        const {active} = event;
        const draggedTask = board.find(task => task.id === active.id);
        setActiveTask(draggedTask);
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;
        setActiveTask(null);

        if (!over || active.id === over.id) return;

        const taskId = active.id;
        const newStatus = over.id;

        dispatch(changeTaskStatus({taskId, newStatus}))

        handleChangeStatus(taskId, newStatus)

    };

    useEffect(() => {
        if (!boards.length) getBoards()
    }, [])

    useEffect(() => {
        if (params.id !== board.id) {
            getBoard(params?.id);
        }
    }, [params?.id]);

    return (
        <MainProvider>
            <div className="h-100">
                <h2 className="my-4">{boards?.find(b => String(b.id) === params.id)?.name}</h2>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Row style={{height: 'calc(100% - 100px)'}} className={'m-0 gap-3'}>
                        {Object.entries(statuses).map(([key, status]) => (
                            <Column board={board} key={key} status={status} t={t}/>
                        ))}
                    </Row>

                    <DragOverlay>
                        {activeTask ? (
                            <TaskItem task={activeTask} t={t} isOverlay/>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </MainProvider>
    );
};

export default Board;