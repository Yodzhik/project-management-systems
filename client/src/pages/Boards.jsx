import React, {useEffect} from 'react';
import {getBoardsApi} from "../components/Boards/api/api.js";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import BoardsItem from "../components/Boards/BoardsItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setBoards} from "../redux/reducers/boards.js";
import MainProvider from "../services/Providers/MainProvider.jsx";

const Boards = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards.boards);

    const getBoards = async () => {
        try {
            const res = await getBoardsApi()
            dispatch(setBoards(res.data.data))
        } catch (e) {
            console.log(e.message)
            toast.error(t('errors.boardsError'))
        }
    }

    useEffect(() => {
        getBoards()
    }, [])

    return (
        <MainProvider>
            <div className={'h-100 d-flex flex-column gap-3 overflow-y-auto mt-4'}>
                {boards?.length > 0 && boards.map((board) => (
                    <BoardsItem t={t} board={board} key={board.id}/>
                ))}
            </div>
        </MainProvider>
    );
};

export default Boards;