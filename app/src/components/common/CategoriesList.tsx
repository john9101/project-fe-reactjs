import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button } from '@mui/material';
import '../../assets/css/style.module.scss'
import { useEffect, useState } from 'react';
import http from '../../util/http';
import { Category } from '../../types/category.type';
const MenuPopupState: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<Category[]>(`categories`)
                setCategories(response.data.map(category => category.name))
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
        // borderBottom: '1px solid #d3ebff',
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
                        className="col-lg-4">
                        Categories
                    </Button>
                    <Menu {...bindMenu(popupState)} className="MenuCategories" sx={{ ...styleMenuCategories }}>
                        {categories.map((category, index) => (
                            <MenuItem
                                key={index}
                                onClick={popupState.close}
                                className="MenuCategoriesItem"
                                sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default MenuPopupState;
