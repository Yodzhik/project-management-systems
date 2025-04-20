import React, {useState} from 'react';
import Task from "../Task/Task.jsx";

const IssuesItem = ({t, issue}) => {
    const [showTaskModal, setShowTaskModal] = useState(false);

    const handleOpenTaskModal = () => setShowTaskModal(true);
    const handleCloseTaskModal = () => setShowTaskModal(false);
    return (
        <>
            <div style={{cursor:'pointer'}} className={' p-2 rounded border border-light-subtle'} onClick={handleOpenTaskModal}>
                {issue.title}
            </div>
            {showTaskModal &&
                <Task show={showTaskModal} close={handleCloseTaskModal} taskId={issue.id} />
            }
        </>

    );
};

export default IssuesItem;