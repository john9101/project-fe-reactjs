import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button } from '@mui/material';
import '../../assets/css/style.module.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
const MenuPopupState: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/categories'); // Thay đổi đường dẫn tương ứng với API của bạn
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);
    const styleCategoriesList = {
        top: '5px',
        width: '360px',
        background: 'var(--primary)',
        color: 'var(--light)',
        '&:hover': {
            background: '#c17a74 ',
        }
    }
    const styleMenuCategories = {
        padding: '0'
    }
    const styleMenuCategoriesItem = {
        width: '360px',
        padding: '8px 16px',
        borderBottom: '1px solid #d3ebff',
        '&:hover': {
            backgroundColor: 'var(--primary)',
            color: 'white',
        }
    }
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant='contained' {...bindTrigger(popupState)}
                        sx={{ maxWidth: 360, height: 50, ...styleCategoriesList }}
                        className="col-lg-4 CategoriesList">
                        Categories
                    </Button>
                    {/* <Menu {...bindMenu(popupState)} className="MenuCategories"
                        sx={{ ...styleMenuCategories }}
                    >
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Dresses</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Shirts</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Jeans</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Swimwear</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Sleepwear</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Sportswear</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Jumpsuits</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Blazers</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Jackets</MenuItem>
                        <MenuItem onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>Shoes</MenuItem>
                    </Menu> */}
                    <Menu {...bindMenu(popupState)} className="MenuCategories">
                        {categories.map((category, index) => (
                            <MenuItem key={index} onClick={popupState.close} className="MenuCategoriesItem" sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}>
                                {category} {/* Sử dụng thuộc tính name hoặc tùy chỉnh tùy vào cấu trúc dữ liệu trả về từ backend */}
                            </MenuItem>
                        ))}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default MenuPopupState;
