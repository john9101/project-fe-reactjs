import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from '../../assets/color';

// Lazy load menu items
const Home = lazy(() => import('../../pages/Home'));
const About = lazy(() => import('../../pages/About'));
const Designs = lazy(() => import('../../pages/Designs'));
const ActualSample = lazy(() => import('../../pages/ActualSample'));
const Service = lazy(() => import('../../pages/Service'));
const Contact = lazy(() => import('../../pages/Contact'));

const MenuContainer = styled.div`
    // Đặt style cho menu tổng quát ở đây nếu cần
`;

const MenuComponent = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-top: 10px;
`;

const ListItem = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 5%;
    
`;

const Item = styled.li<{ selected: boolean }>`
    padding: 20px 10px;
    cursor: pointer;
    color: ${colors.menu_item_text};

    &:hover {
        background-color: ${colors.menu_item_hover};
        color: ${colors.contact_text};
    }

    ${props => props.selected && css`
        background-color: ${colors.menu_item_active};
        color: ${colors.contact_text};
    `}
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    padding: 20px;
`;

const Menu: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (path: string) => {
        setSelectedItem(path);
    };

    return (
        <Router>
            <MenuContainer>
                <MenuComponent>
                    <ListItem>
                        <Item
                            selected={selectedItem === '/'}
                            onClick={() => handleItemClick('/')}
                        >
                            <StyledNavLink to="/">Trang chủ</StyledNavLink>
                        </Item>
                        <Item
                            selected={selectedItem === '/about'}
                            onClick={() => handleItemClick('/about')}
                        >
                            <StyledNavLink to="/about">Giới thiệu</StyledNavLink>
                        </Item>
                        <Item
                            selected={selectedItem === '/designs'}
                            onClick={() => handleItemClick('/designs')}
                        >
                            <StyledNavLink to="/designs">Mẫu thiết kế</StyledNavLink>
                        </Item>
                        <Item
                            selected={selectedItem === '/actual-sample'}
                            onClick={() => handleItemClick('/actual-sample')}
                        >
                            <StyledNavLink to="/actual-sample">Mẫu thực tế</StyledNavLink>
                        </Item>
                        <Item
                            selected={selectedItem === '/service'}
                            onClick={() => handleItemClick('/service')}
                        >
                            <StyledNavLink to="/service">Dịch vụ</StyledNavLink>
                        </Item>
                        <Item
                            selected={selectedItem === '/contact'}
                            onClick={() => handleItemClick('/contact')}
                        >
                            <StyledNavLink to="/contact">Liên hệ</StyledNavLink>
                        </Item>
                    </ListItem>
                </MenuComponent>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/designs" element={<Designs />} />
                        <Route path="/actual-sample" element={<ActualSample />} />
                        <Route path="/service" element={<Service />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </Suspense>
            </MenuContainer>
        </Router>
    );
};

export default Menu;
