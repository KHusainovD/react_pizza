import React, {useEffect} from 'react'
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from "../components";

import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../Redux/Actions/filters";
import {fetchPizzas} from "../Redux/Actions/pizzas";
import {addPizzaToCart} from '../Redux/Actions/cart'

const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
const sortNames = [{name: "популярности", type: 'popular', order:"desc"}, {name: "цене", type: 'price', order:'desc'}, {
    name: "алфавиту",
    type: 'name',
    order: 'asc'
}]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)
    const {category, sortBy} = useSelector(({filters}) => filters);

    useEffect(() => {
        // if (!items.length) {
        //     dispatch(fetchPizzas());
        // }
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, [])
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [])
    const onClickAddPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category}
                            onClickItem={onSelectCategory}
                            items={categoryNames}/>
                <SortPopup activeSortType={sortBy.type} items={sortNames} onChangeSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded
                        ? items.map(item => <PizzaBlock onClickAddPizza={onClickAddPizzaToCart} addedCount={cartItems[item.id] && cartItems[item.id].items.length} isLoading={true} key={item.id} {...item}/>)
                        : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index}/>)
                }
            </div>
        </div>
    )

}


export default Home