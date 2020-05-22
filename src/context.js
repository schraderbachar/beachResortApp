import React, { Component } from 'react'
import items from './data'
import Client from './Contentful'
const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 100,
        minPrice: 100,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }
    //get data
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResort",
                order: "fields.price"
            })
            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true)
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))

            this.setState({
                rooms, featuredRooms, sortedRooms: rooms, loading: false, price: maxPrice, maxPrice, maxSize
            })

        } catch (error) {
            console.log(error)
        }
    }




    componentDidMount() {
        this.getData()
    }

    formatData(items) {
        //maps over all items in item array in data.js- gets the id image and room and sets it as a room object-
        //returns the room object for each room 
        //return the itmes and sends it to the comp did mount
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = { ...item.fields, images, id }
            return room;
        })

        return tempItems
    }
    getRoom = slug => {
        // gets all the rooms in room array- and then picks the room that matches the slug (id) and returns it
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }
    handleChange = event => {
        const target = event.target
        //have to do this bc its a checkbox
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name]: value
        },
            this.filterRooms)


    }
    //filters the room and only returns the rooms that match the search criteria
    filterRooms = () => {
        //use rooms instead of sorted rooms beacuse then if you wnat to go back to all rooms you can
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state

        //rooms
        let tempRooms = [...rooms]
        //transform values- cahnge from string to number
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if (type !== 'all') {
            //return only the rooms that match the new type
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by capacity
        if (capacity !== 1) {
            //return only rooms with cap at 2 or more
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
        //filter by price
        tempRooms = tempRooms.filter(room => price <= room.price)

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //filter by breakfast and pets
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        //change state
        this.setState({
            //sorts the rooms into temp rooms
            sortedRooms: tempRooms
        })


    }

    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

//easier way to wrap the component so it can be implemented in other files with greater ease
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component{...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext };