import {useState} from "react";


function Categories({items}) {
    const [activeItem, setActiveItem] = useState(null)
    // const state = useState(0);
    // const activeItem = state[0];
    // const setActiveItem = state[1];
    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? 'active' : ''}
                    onClick={() => setActiveItem(null)}>Все
                </li>
                {items && items.map((name, index) => (
                    <li key={`${name}_${index}`} onClick={() => setActiveItem(index)}
                        className={activeItem === index ? 'active' : ''}>{name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;