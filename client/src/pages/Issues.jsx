import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Button, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {getIssuesApi} from "../components/Issues/api/api.js";
import IssuesItem from "../components/Issues/IssuesItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setIssues} from "../redux/reducers/issues.js";
import Task from "../components/Task/Task.jsx";
import MainProvider from "../services/Providers/MainProvider.jsx";

const Issues = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const issues = useSelector(state => state.issues.issues);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('');

    const statuses = {
        Backlog: t('task.body.status.toDo'),
        InProgress: t('task.body.status.inProgress'),
        Done: t('task.body.status.done')
    };

    const filteredIssues = issues.filter(issue => {
        const lowerText = searchText.toLowerCase();

        const matchesSearch =
            issue.title.toLowerCase().includes(lowerText) ||
            issue.assignee.fullName.toLowerCase().includes(lowerText);

        const matchesStatus = selectedStatus ? issue.status === selectedStatus : true;
        const matchesBoard = selectedBoard ? issue.boardName === selectedBoard : true;

        return matchesSearch && matchesStatus && matchesBoard;
    });

    const handleOpenTaskModal = () => setShowTaskModal(true);
    const handleCloseTaskModal = () => setShowTaskModal(false);

    const getIssues = async () => {
        try {
            const res = await getIssuesApi()
            dispatch(setIssues(res.data.data))
        } catch (e) {
            console.log(e.message)
            toast.error(t('errors.issuesError'))
        }
    }

    useEffect(() => {
        if (!issues.length) getIssues()
    }, [])

    return (
        <MainProvider>
            <div style={{height: 'calc(100% - 80px)'}} className={' d-flex flex-column'}>
                <div className={'d-flex justify-content-between my-3'}>
                    <Form className="d-flex gap-2 w-100">
                        <Form.Control
                            type="text"
                            placeholder={t("issues.searchTitleOrAssignee")}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Form.Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="">{t("issues.allStatuses")}</option>
                            {Object.entries(statuses).map(([key, status] )=> (
                                <option key={key} value={key}>{status}</option>
                            ))}
                        </Form.Select>
                        <Form.Select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
                            <option value="">{t("issues.allBoards")}</option>
                            {[...new Set(issues.map(issue => issue.boardName))].map(board => (
                                <option key={board} value={board}>{board}</option>
                            ))}
                        </Form.Select>
                    </Form>
                </div>
                <div
                    className={'d-flex flex-column rounded h-100 overflow-y-auto gap-3 p-3 border border-light-subtle border-bottom-0 rounded-bottom-0'}>
                    {filteredIssues.length > 0 ? (
                        filteredIssues.map((issue) => (
                            <IssuesItem key={issue.id} t={t} issue={issue}/>
                        ))
                    ) : (
                        <div>{t('issues.noMatches')}</div>
                    )}
                </div>
                <div className={'w-100 justify-content-end d-flex border border-light-subtle border-top-0 rounded-bottom p-3 pt-2'}>
                    <Button variant={'success'} onClick={handleOpenTaskModal}>
                        {t('issues.createIssue')}
                    </Button>
                </div>
                {showTaskModal &&
                    <Task show={showTaskModal} close={handleCloseTaskModal} />
                }
            </div>
        </MainProvider>
    );
};

export default Issues;