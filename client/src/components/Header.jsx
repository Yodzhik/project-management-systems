import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Button, Dropdown, Nav, Navbar} from "react-bootstrap";
import {useTranslation} from 'react-i18next';
import Task from "./Task/Task.jsx";

const Header = () => {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const [showTaskModal, setShowTaskModal] = useState(false);

    const handleOpenTaskModal = () => setShowTaskModal(true);
    const handleCloseTaskModal = () => setShowTaskModal(false);

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <>
            <header className={'root_header'}>
                <Navbar className="px-3 px-lg-5 w-100 shadow-sm" collapseOnSelect expand="lg">
                    <Navbar.Brand as={Link} to="/">
                        <img width={40} src={'../../public/logo.png'} alt={t('header.logoAlt')}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className={location.pathname.includes('issues') ? 'border-bottom border-success' : ''} as={Link} to="/issues">{t('header.allIssues')}</Nav.Link>
                            <Nav.Link className={location.pathname.includes('board') ? 'border-bottom border-success' : ''} as={Link} to="/boards">{t('header.boards')}</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button size={'sm'} variant={'light'} className={'border-light-subtle'} onClick={handleOpenTaskModal}>
                                {t('header.createIssue')}
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle
                                    size={'sm'}
                                    variant={'light'}
                                    bsPrefix={'ms-2 border-light-subtle'}
                                >
                                    {i18n.language.toUpperCase()}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleChangeLanguage('ru')}>RU</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleChangeLanguage('en')}>EN</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            {showTaskModal &&
            <Task show={showTaskModal} close={handleCloseTaskModal}/>
            }
        </>
    );
};

export default Header; 