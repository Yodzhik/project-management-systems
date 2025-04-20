import React, {useEffect, useState} from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskToBoard, setBoards, updateBoardTask} from '../../redux/reducers/boards.js';
import {
    createTaskApi,
    getUsersApi,
    updateTaskApi,
    getTaskApi,
} from './api/api.js';
import {getBoardsApi} from '../Boards/api/api.js';
import {toast} from 'react-toastify';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {addIssue, updateIssue} from "../../redux/reducers/issues.js";

const Task = ({show, close, taskId}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards.boards);
    const board = useSelector((state) => state.boards.board);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        boardId: '',
        priority: '',
        status: '',
        assigneeId: '',
    });

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isBoardModal = location.pathname.includes('board');
    const isIssuesModal = location.pathname.includes('issues');
    const isEditing = Boolean(taskId);

    useEffect(() => {
        if (!boards.length) getBoards();
        getUsers();
        if (isEditing) getTask();
        if (isBoardModal) {
            setFormData((prev) => ({
                ...prev,
                boardId: params.id || board.id,
            }));
        }
    }, [boards.length, isEditing, params.id, isBoardModal]);

    const getUsers = async () => {
        try {
            const res = await getUsersApi();
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error(t('errors.usersError'));
        }
    };

    const getBoards = async () => {
        try {
            const res = await getBoardsApi();
            dispatch(setBoards(res.data.data));
        } catch (err) {
            console.error(err);
            toast.error(t('errors.boardsError'));
        }
    };

    const getTask = async () => {
        try {
            const res = await getTaskApi(taskId);
            const {title, description, priority, status, assignee, boardName} = res.data.data;
            const findedBoard = boards.find((board) => board.name === boardName)?.id;
            setFormData({
                title,
                description,
                boardId: findedBoard,
                priority,
                status,
                assigneeId: assignee.id,
            });
        } catch (err) {
            console.error(err);
            toast.error(t('errors.taskError'));
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const assigneeObj = users.find(user => user.id === Number(formData.assigneeId));
        const { title, description, boardId, assigneeId } = formData;

        if (!title || !description || !boardId || !assigneeId) {
            toast.error(t('errors.requiredFields'));
            return;
        }

        try {
            if (isEditing) {
                await updateTaskApi(taskId, {...formData, assigneeId: Number(formData.assigneeId)});

                if (isBoardModal) {
                    dispatch(updateBoardTask({taskId, updatedFields: {...formData, assignee: assigneeObj}}));
                } else if (isIssuesModal) {
                    dispatch(updateIssue({taskId, updatedFields: formData}));
                }
                toast.success(t('task.toast.updated'));
            } else {
                const res = await createTaskApi({
                    ...formData,
                    boardId: Number(formData.boardId),
                    assigneeId: Number(formData.assigneeId)
                });
                if (isBoardModal) {
                    dispatch(addTaskToBoard({...formData, id: res.data.data.id, assignee: assigneeObj}));
                } else if (isIssuesModal) {
                    dispatch(addIssue({...formData, id: res.data.data.id}));
                }
                toast.success(t('task.toast.created'));
            }
            close();
        } catch (err) {
            console.error(err);
            toast.error(isEditing ? t('errors.editTaskError') : t('errors.createTaskError'));
        }
    };

    return (
        <Modal size="lg" show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditing ? t('task.header.update') : t('task.header.create')} {t('task.header.task')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                    <Form.Control
                        name="title"
                        placeholder={t('task.body.title')}
                        value={formData.title}
                        onChange={handleChange}
                        isInvalid={!formData.title}
                    />
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        placeholder={t('task.body.description')}
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!formData.description}
                    />
                    <Form.Select
                        name="boardId"
                        value={formData.boardId}
                        disabled={isBoardModal}
                        onChange={handleChange}
                        isInvalid={!formData.boardId}
                    >
                        <option
                            value="">{isBoardModal ? boards?.find(b => String(b.id) === params.id)?.name : t('task.body.project')}</option>
                        {boards.map((board) => (
                            <option key={board.id} value={board.id}>
                                {board.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="">{t('task.body.priority.title')}</option>
                        <option value="High">{t('task.body.priority.high')}</option>
                        <option value="Medium">{t('task.body.priority.medium')}</option>
                        <option value="Low">{t('task.body.priority.low')}</option>
                    </Form.Select>
                    <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="">{t('task.body.status.title')}</option>
                        <option value="Backlog">{t('task.body.status.toDo')}</option>
                        <option value="InProgress">{t('task.body.status.inProgress')}</option>
                        <option value="Done">{t('task.body.status.done')}</option>
                    </Form.Select>
                    <Form.Select
                        name="assigneeId"
                        value={formData.assigneeId}
                        onChange={handleChange}
                        isInvalid={!formData.assigneeId}
                    >
                        <option value="">{t('task.body.assignee')}</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer className={' d-flex justify-content-between'}>
                {isIssuesModal && formData.boardId && (
                    <Button variant={'light'} className={'border-light-subtle'}
                            onClick={() => navigate(`/board/${formData.boardId}`)}>
                        {t('task.body.goToBoard')}
                    </Button>
                )}
                <Button variant={'success'} onClick={handleSubmit}>
                    {isEditing ? t('task.body.updateButton') : t('task.body.createButton')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Task;
