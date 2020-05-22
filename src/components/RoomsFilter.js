import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from '../components/Title'

//get unique values
const getUnique = (items, value) => {
    //returns the type and capacity- only unique values
    //Set() only accepts unique values
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter({ rooms }) {
    //access the room contex
    const context = useContext(RoomContext)
    //gets access to the variables
    const {
        handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context
    //get unique types
    let types = getUnique(rooms, 'type');
    //add "all"- ... is whatever you had before- like +=
    types = ['all', ...types]
    //map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    //get the amount of people
    //each and every room and filter by capacity
    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })


    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* end guests */}
                {/* room price*/}
                <div className="form-group">
                    <label htmlFor="price">
                        Room price ${price}
                        <input type="range" name="price" min={minPrice} max={maxPrice}
                            id="price" value={price} onChange={handleChange} className="form-control" />
                    </label>
                </div>
                {/* end room price*/}
                {/* size*/}
                <div className="form-group">
                    <label htmlFor="sizse">room SQFT</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize}
                            onChange={handleChange} className="size-input" />
                        <input type="number" name="maxSize" id="size" value={maxSize}
                            onChange={handleChange} className="size-input" />
                    </div>
                </div>
                {/* end of size*/}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">Breakfast </label>
                        <br></br>
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">pets </label>
                    </div>
                </div>


                {/* end of extras */}




            </form>
        </section>
    )
}
