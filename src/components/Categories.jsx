import {useState} from "react";
import React from 'react'

const Categories = React.memo(function Categories({items, onClickItem}) {
    const [activeItem, setActiveItem] = useState(null)
    const onSelectItem = (index) => {
        setActiveItem(index);
        onClickItem(index)
    }
    // const state = useState(0);
    // const activeItem = state[0];
    // const setActiveItem = state[1];
    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? 'active' : ''}
                    onClick={() => onSelectItem(null)}>Все
                </li>
                {items && items.map((name, index) => (
                    <li key={`${name}_${index}`} onClick={() => onSelectItem(index)}
                        className={activeItem === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    )
})


export default Categories;