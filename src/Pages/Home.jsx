import React, {useEffect} from 'react'
import {Categories, SortPopup, PizzaBlock} from "../components";

import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../Redux/Actions/filters";
import {fetchPizzas} from "../Redux/Actions/pizzas";

const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
const sortNames = [{name: "популярности", type: 'popular'}, {name: "цене", type: 'price'}, {name: "алфавиту", type: 'alphabet'}]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);

    useEffect(() => {
        if (!items.length){
            dispatch(fetchPizzas());
        }
    },[]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    },[])

    return (
        <div className="container">
            <div className="content__top">
                <Categories onClickItem={onSelectCategory}
                            items={categoryNames}/>
                <SortPopup items={sortNames}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    items && items.map(item => <PizzaBlock key={item.id} {...item}/>)
                }
            </div>
        </div>
    )

}


export default Home