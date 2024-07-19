import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import http from '../../util/http';
import { Category } from '../../types/category.type';

const CategoriesList: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get<Category[]>(`categories`);
                setCategories(response.data.map((category) => category.name));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick} style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <ListItemText primary="Categories" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding style={{ position: 'absolute' }}>
                    {categories.map((category, index) => (
                        <ListItemButton key={index} sx={{ pl: 4 }} style={{ borderBottom: '1px solid #d3ebff', backgroundColor: 'white' }}>
                            <ListItemText primary={category} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
};

export default CategoriesList;
