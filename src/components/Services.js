import React, { Component } from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
import Title from './Title'
export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Happy Hour Mon-Fri",
                info: 'Starting every weeknight at 5pm we have happy hour. Enjoy our list of wines, beers, and cockatils all for an amaizing 3-1 price. Perfect after a long day of exploring.'

            },
            {
                icon: <FaHiking />,
                title: "Daily Excursions",
                info: 'Tours guided by area experts for you and your family to get only the best experience and make memories together that last forever.'

            },
            {
                icon: <FaShuttleVan />,
                title: "Shuttle Gratis",
                info: 'Tenemos un Shuttle que está disponsible 24 horas cada dia. Le llevamos dónde sea necesita estar usted.'

            },
            {
                icon: <FaBeer />,
                title: "Genießen Sie unser lecker  importiert Bier",
                info: 'Wir haben viele Beer für Sie zu trinken. Es kommt auf Deutchsland, Österreich, Belgien, und anderes Länder. Nur die besten Bier für Sie.'

            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section >
        )
    }
}
