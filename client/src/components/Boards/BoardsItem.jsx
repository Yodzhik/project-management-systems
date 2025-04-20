import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const BoardsItem = ({t, board}) => {
    const navigate = useNavigate();
    return (
        <div key={board.id}
             className={'p-3 rounded border border-light-subtle d-flex justify-content-between align-items-center'}>
            <span>{board.name}</span>
            <Button variant={'success'} size={'sm'} onClick={() => navigate(`/board/${board.id}`)}>
                {t('boards.goToBoard')}
            </Button>
        </div>
    );
};

export default BoardsItem;